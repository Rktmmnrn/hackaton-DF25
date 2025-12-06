import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';

const LoadingError = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <div className="mt-3">Chargement des données...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        <Alert.Heading>⚠️ Problème de connexion</Alert.Heading>
        <p>{error}</p>
        <hr />
        <div className="small">
          <strong>Solution rapide :</strong>
          <ol className="mb-0 mt-2">
            <li>Démarrez le backend : <code>uvicorn main:app --reload --port 5000</code></li>
            <li>Vérifiez l'URL : <code>http://localhost:5000/api/health</code></li>
            <li>Actualisez cette page</li>
          </ol>
        </div>
      </Alert>
    );
  }

  return null;
};

export default LoadingError;