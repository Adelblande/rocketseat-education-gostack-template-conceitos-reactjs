import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories([...repositories, ...response.data]);
    });
  }, []);
  async function handleAddRepository() {
    const newRepository = {
      title: `Repository ${Date.now()}`,
      url:
        'https://github.com/Adelblande/rocketseat-education-gostack-template-conceitos-nodejs',
      techs: ['ReactJS', 'React-Native'],
    };
    const response = await api.post('/repositories', newRepository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const repo = repositories.filter(repository => repository.id !== id);
    setRepositories(repo);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.length > 0 &&
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
