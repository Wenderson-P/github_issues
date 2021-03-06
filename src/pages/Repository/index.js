import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Loading,
  Owner,
  IssueList,
  IssueFilter,
  PageActions,
  IssueBadge,
} from './styles';
import Container from '../../components/Container/index';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'Todas' },
      { state: 'open', label: 'Abertas' },
      { state: 'closed', label: 'Fechadas' },
    ],
    filterSelected: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { filterSelected } = this.state;
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filterSelected,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { filterSelected, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filterSelected,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handlePageChange = async page => {
    await this.setState({
      page,
    });
    this.loadIssues();
  };

  async handleFilterChange(e) {
    const optionSelected = e.target.value;
    await this.setState({ filterSelected: optionSelected });
    this.loadIssues();
  }

  render() {
    const { repository, issues, loading, filters, page } = this.state;

    if (loading) {
      return <Loading>Carregando :)</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar para home</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <IssueFilter>
            <select onChange={e => this.handleFilterChange(e)}>
              {filters.map(filter => (
                <option key={filter.label} value={filter.state}>
                  {filter.label}
                </option>
              ))}
            </select>
          </IssueFilter>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <IssueBadge badgeColor={label.color} key={String(label.id)}>
                      {label.name}
                    </IssueBadge>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <PageActions>
          <button
            type="button"
            onClick={() => this.handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span>Página {page}</span>
          <button type="button" onClick={() => this.handlePageChange(page + 1)}>
            {' '}
            Próxima
          </button>
        </PageActions>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
