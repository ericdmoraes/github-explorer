import React, { useEffect, useState } from 'react';
// components
import RepositoryItem from "./RepositoryItem";
// styles 
import "../styles/repositories.scss";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

function RepositoryList() {
    const [repos, setRepos] = useState<Repository[]>([]);

    useEffect(() => {
        fetch('https://api.github.com/users/ericdmoraes/repos')
            .then(response => response.json())
            .then(data => setRepos(data));
    }, [])

    return (
        <section className="repository-list">
            <h1>Lista de repositórios 1</h1>
            <ul>
                {repos.map(repo => <RepositoryItem key={repo.id} repository={repo} />)}
                </ul>
        </section>
    );
}

export default RepositoryList;