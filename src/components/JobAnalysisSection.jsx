import React from 'react';
import { Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';

const JobAnalysisSection = ({ 
  selectedOffer, 
  getRiskColor, 
  getRiskText, 
  recommendations,
  loadRecommendations 
}) => {
  if (!selectedOffer) return null;

  return (
    <Row className="mb-4">
      <Col>
        <Card className="border-0 shadow-sm border-primary">
          <Card.Body className="p-4">
            <h3 className="mb-4">
              🔍 Analyse détaillée du métier
            </h3>

            <Row>
              <Col md={8}>
                <Card className="mb-4">
                  <Card.Body>
                    <h4>{selectedOffer.title}</h4>
                    <div className="d-flex align-items-center mb-3">
                      <div
                        style={{
                          width: '100%',
                          height: '30px',
                          backgroundColor: '#e9ecef',
                          borderRadius: '15px',
                          overflow: 'hidden',
                          marginRight: '15px'
                        }}
                      >
                        <div
                          style={{
                            width: `${selectedOffer.ia_risk_score * 10}%`,
                            height: '100%',
                            backgroundColor: getRiskColor(selectedOffer.ia_risk_score),
                            transition: 'width 0.5s'
                          }}
                        />
                      </div>
                      <div className="text-nowrap">
                        <strong>Score: {selectedOffer.ia_risk_score}/10</strong>
                      </div>
                    </div>

                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Entreprise:</strong> {selectedOffer.company}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Secteur:</strong> {selectedOffer.secteur}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Métier:</strong> {selectedOffer.metier}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Localisation:</strong> {selectedOffer.location}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Type de contrat:</strong> {selectedOffer.contrat}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Publication:</strong> {selectedOffer.date}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="h-100 bg-light">
                  <Card.Body>
                    <h5 className="mb-3">🚨 Niveau de risque</h5>
                    <div
                      className="text-center p-4 rounded mb-3"
                      style={{
                        backgroundColor: getRiskColor(selectedOffer.ia_risk_score) + '20',
                        border: `2px solid ${getRiskColor(selectedOffer.ia_risk_score)}`
                      }}
                    >
                      <div className="display-4 fw-bold">
                        {selectedOffer.ia_risk_score}/10
                      </div>
                      <div className="fs-5 fw-bold">
                        {selectedOffer.ia_risk_level || getRiskText(selectedOffer.ia_risk_score)}
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      className="w-100 mb-2"
                      onClick={() => window.open(selectedOffer.link, '_blank')}
                    >
                      📋 Postuler à cette offre
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="w-100"
                      onClick={() => loadRecommendations(selectedOffer.metier)}
                    >
                      🔄 Voir des alternatives
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Recommandations */}
            {recommendations.length > 0 && (
              <div className="mt-4">
                <h5 className="mb-3">✅ Alternatives à moindre risque</h5>
                <Row>
                  {recommendations.slice(0, 3).map((reco, idx) => (
                    <Col key={idx} md={4} className="mb-3">
                      <Card className="h-100 border-success">
                        <Card.Body>
                          <Card.Title className="fs-6">
                            {reco.job?.title || 'Alternative'}
                          </Card.Title>
                          <Badge bg="success" className="mb-2">
                            Score: {reco.job?.ia_risk_score}/10
                          </Badge>
                          <p className="small text-muted mb-2">
                            {reco.reason}
                          </p>
                          <div className="small">
                            <strong>Réduction risque:</strong> {reco.difference_risk} points
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default JobAnalysisSection;