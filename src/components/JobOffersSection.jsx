import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';

const JobOffersSection = ({ 
  offresReelles, 
  selectedOffer, 
  handleSelectOffer, 
  getRiskColor, 
  getRiskText, 
  formatDate,
  showAllOffers,
  setShowAllOffers
}) => {
  if (offresReelles.length === 0) return null;

  return (
    <Row className="mb-4">
      <Col>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-0">
                📋 Offres d'emploi réelles (Asako.mg)
                <Badge bg="secondary" className="ms-2">
                  {offresReelles.length} offres
                </Badge>
              </h3>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowAllOffers(!showAllOffers)}
              >
                {showAllOffers ? "Voir moins d'offres" : "Voir toutes les offres"}
              </Button>
            </div>

            <Row>
              {offresReelles.slice(0, showAllOffers ? offresReelles.length : 6).map((offre, index) => (
                <Col key={index} md={6} lg={4} className="mb-4">
                  <Card
                    className={`h-100 border ${selectedOffer?.title === offre.title ? 'border-primary border-3' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSelectOffer(offre)}
                  >
                    <Card.Body>
                      <Card.Title className="fs-6 mb-2 text-truncate">
                        {offre.title}
                      </Card.Title>

                      <div className="mb-3">
                        <Badge
                          bg="custom"
                          className="px-3 py-2 custom-risk-badge"
                          style={{
                            backgroundColor: getRiskColor(offre.ia_risk_score)
                          }}
                        >
                          Score IA: {offre.ia_risk_score}/10 - {getRiskText(offre.ia_risk_score)}
                        </Badge>
                      </div>

                      <div className="small text-muted mb-3">
                        <div className="mb-1">
                          <strong>Entreprise:</strong> {offre.company}
                        </div>
                        <div className="mb-1">
                          <strong>Lieu:</strong> {offre.location}
                        </div>
                        <div className="mb-1">
                          <strong>Contrat:</strong> {offre.contrat}
                        </div>
                        <div className="mb-1">
                          <strong>Secteur:</strong> {offre.secteur}
                        </div>
                        <div>
                          {formatDate(offre.date)}
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(offre.link, '_blank');
                          }}
                        >
                          📄 Voir l'offre
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectOffer(offre);
                          }}
                        >
                          🔍 Analyser
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default JobOffersSection;