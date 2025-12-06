import React from 'react';
import { Modal, Alert, Button, ListGroup, Badge, Spinner } from 'react-bootstrap';

const DemoModal = ({ 
  showDemo, 
  setShowDemo, 
  demoData, 
  handleSelectOffer, 
  setSearchQuery, 
  handleSearch 
}) => {
  return (
    <Modal show={showDemo} onHide={() => setShowDemo(false)} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>🎬 Démonstration - Exemple parfait</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {demoData ? (
          <>
            <Alert variant="danger" className="text-center">
              <h4 className="alert-heading">🚨 EXEMPLE À RISQUE ÉLEVÉ</h4>
              <h3 className="my-3">{demoData.demo_offer?.title}</h3>
              <div className="display-4 fw-bold">
                Score IA: {demoData.demo_offer?.ia_risk_score}/10
              </div>
              <p className="mb-0">Niveau de risque: ÉLEVÉ</p>
            </Alert>

            <h5 className="mt-4">📋 Pourquoi ce métier est à risque ?</h5>
            <p className="text-muted">
              Les métiers combinant tâches manuelles répétitives et conduite sont
              particulièrement exposés à l'automatisation par l'IA et la robotique.
            </p>

            {demoData.recommendations && demoData.recommendations.length > 0 && (
              <>
                <h5 className="mt-4">✅ Alternatives recommandées</h5>
                <ListGroup>
                  {demoData.recommendations.slice(0, 3).map((reco, idx) => (
                    <ListGroup.Item key={idx} className="border-success">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{reco.job?.title}</strong>
                          <div className="small text-muted">{reco.reason}</div>
                        </div>
                        <Badge bg="success">
                          Score: {reco.job?.ia_risk_score}/10
                        </Badge>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            )}

            <div className="mt-4 text-center">
              <Button
                variant="primary"
                className="me-2"
                onClick={() => {
                  if (demoData.demo_offer) {
                    handleSelectOffer(demoData.demo_offer);
                    setShowDemo(false);
                  }
                }}
              >
                🔍 Analyser cet exemple
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setSearchQuery('chauffeur');
                  setShowDemo(false);
                  handleSearch();
                }}
              >
                🔄 Rechercher similaires
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <div className="mt-3">Chargement de la démo...</div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DemoModal;