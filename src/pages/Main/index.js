import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../components/Container/index';
import { Form, SubmitButton, List, RemoveButton, Error } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    errorMessage: '',
  };

  // Load data from localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Save data from localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({ loading: true, error: false, errorMessage: '' });
      e.preventDefault();
      const { newRepo, repositories } = this.state;

      if (repositories.find(rep => rep.name === newRepo)) {
        await this.setState({ errorMessage: 'O Repositório já foi inserido' });
        throw Error('O Repositório duplicado');
      }
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        error: false,
        errorMessage: '',
      });
    } catch (error) {
      const { errorMessage } = this.state;
      this.setState({
        error: true,
      });
      if (errorMessage.length === 0) {
        this.setState({
          errorMessage: 'Esse repositório não existe',
        });
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleDelete = repository => {
    const { repositories } = this.state;
    this.setState({
      repositories: repositories.filter(rep => rep !== repository),
    });
  };

  render() {
    const { newRepo, repositories, loading, error, errorMessage } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Error>{error && errorMessage}</Error>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            title="Exemplo: facebook/react"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
                <FaPlus color="#FFF" size={14} />
              )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
              <RemoveButton onClick={() => this.handleDelete(repository)}>
                Remover
              </RemoveButton>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
