import React, { useState, useEffect } from 'react';
import { Modal, Button, Badge, Alert, Card, Table, Spinner } from 'react-bootstrap';
import { apiService } from '../services/api';

const RecommendationsModal = ({ show, onHide, jobOffer }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && jobOffer) {
      loadRecommendations();
    }
  }, [show, jobOffer]);

  const loadRecommendations = async () => {
    if (!jobOffer) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const metier = jobOffer.metier || jobOffer.title.split(' ')[0];
      const recos = await apiService.getRecommendations(metier.toLowerCase());
      setRecommendations(recos.recommendations || []);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible de charger les recommandations.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score) => {
    if (score >= 7) return 'danger';
    if (score >= 4) return 'warning';
    return 'success';
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>
          ✅ Alternatives pour : {jobOffer?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <div className="mt-3">Recherche des alternatives...</div>
          </div>
        ) : error ? (
          <Alert variant="danger">
            <Alert.Heading>Erreur</Alert.Heading>
            <p>{error}</p>
            <Button variant="primary" onClick={loadRecommendations}>
              Réessayer
            </Button>
          </Alert>
        ) : recommendations.length > 0 ? (
          <>
            <Alert variant="info" className="mb-4">
              <div className="d-flex align-items-center">
                <span className="fs-4 me-3">📊</span>
                <div>
                  <strong>Métier actuel</strong> : Score IA {jobOffer?.ia_risk_score}/10<br/>
                  <strong>{recommendations.length} alternatives</strong> avec un risque réduit
                </div>
              </div>
            </Alert>

            <div className="row">
              {recommendations.slice(0, 6).map((reco, idx) => (
                <div key={idx} className="col-md-6 col-lg-4 mb-4">
                  <Card className="h-100 border-success">
                    <Card.Body>
                      <Card.Title className="fs-6">{reco.metier}</Card.Title>
                      
                      <div className="mb-3">
                        <Badge 
                          bg={getRiskColor(reco.avg_risk_score)}
                          className="px-3 py-2 me-2"
                        >
                          Score: {reco.avg_risk_score}/10
                        </Badge>
                        <Badge bg="info" className="px-3 py-2">
                          -{reco.risk_difference} points
                        </Badge>
                      </div>
                      
                      <div className="small text-muted mb-2">
                        <strong>Secteur:</strong> {reco.secteur || 'Non spécifié'}
                      </div>
                      
                      <div className="small text-muted mb-3">
                        <strong>Offres disponibles:</strong> {reco.offer_count}
                        {reco.example_offer && (
                          <div className="mt-1">
                            <em>Ex: {reco.example_offer}</em>
                          </div>
                        )}
                      </div>
                      
                      {reco.suggestions && (
                        <div className="mb-3">
                          <h6 className="text-warning small">💡 Conseils:</h6>
                          <ul className="small mb-0 ps-3">
                            {reco.suggestions.slice(0, 2).map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        className="w-100"
                        onClick={() => {
                          // Rechercher ce métier
                          window.location.href = `/?search=${encodeURIComponent(reco.metier)}`;
                        }}
                      >
                        🔍 Rechercher ce métier
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
            
            <Card className="mt-4 border-warning">
              <Card.Body>
                <h6 className="text-warning">🎯 Comment utiliser ces recommandations ?</h6>
                <ol className="mb-0 mt-2">
                  <li>Comparez les scores IA (plus bas = mieux)</li>
                  <li>Vérifiez la réduction de risque (différence)</li>
                  <li>Explorez les offres disponibles pour chaque alternative</li>
                  <li>Consultez les conseils de transition proposés</li>
                </ol>
              </Card.Body>
            </Card>
          </>
        ) : (
          <div className="text-center py-5">
            <div className="display-4 mb-3">🔍</div>
            <h4>Aucune alternative trouvée</h4>
            <p className="text-muted">
              Nous n'avons pas encore d'alternatives pour ce métier spécifique.
            </p>
            <Button variant="primary" onClick={onHide}>
              Retour à l'analyse
            </Button>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fermer
        </Button>
        <Button variant="primary" onClick={loadRecommendations}>
          🔄 Recharger
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecommendationsModal;