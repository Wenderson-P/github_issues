import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { Loading, Owner, IssueList, IssueFilter, PageActions } from './styles';
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
      api.get(`/repos/${repoName}/issues`),
      {
        params: {
          state: filterSelected,
          per_page: 5,
        },
      },
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { filterSelected } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filterSelected,
        per_page: 5,
      },
    });

    this.setState({ issues: response.data });
  };

  handleFilterChange(e) {
    const optionSelected = e.target.value;
    this.setState({ filterSelected: optionSelected });
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
                <option value={filter.state}>{filter.label}</option>
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
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <PageActions>
          <button type="button">Anterior</button>
          <span>Página {page}</span>
          <button type="button">Próxima</button>
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
