import React, { useState, useEffect } from "react";
import api from 'services/api';

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    
    const response = await api.post('repositories', { 
      title,
      url: 'https://github.com/jairokoning',
      techs: ['Node.js', 'ReactJS', 'React Native']
    })

    setRepositories([ ...respositories, response.data ])
    setTitle('');
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(respositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <div className="header">
        <div>
          <h2>Portifólio de Repositórios</h2>
        </div>        
      </div>
      <div className="new-repo">
        <input name="title" value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Título do repositório"/>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
      
      <ul data-testid="repository-list">        
        {
          respositories.map(repo => {
            return (
              <li key={repo.id}>          
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }        
      </ul>

      
    </div>
  );
}

export default App;
