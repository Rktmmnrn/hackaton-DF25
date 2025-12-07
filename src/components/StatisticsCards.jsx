import React from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StatisticsCards = ({ statistiques }) => {
  const navigate = useNavigate();

  if (!statistiques) return null;

  const { total_offers, risk_distribution, average_risk_score } = statistiques;

  return (
    <Row className="mb-4">
      <Col>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">📊 Aperçu statistique</h5>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                Voir le tableau de bord complet →
              </Button>
            </div>

            <Row className="text-center">
              <Col md={3} className="mb-3">
                <Card className="border-0 bg-primary bg-opacity-10 h-100">
                  <Card.Body className="py-3">
                    <div className="h4 fw-bold text-primary">{total_offers || 0}</div>
                    <div className="text-muted small">Offres analysées</div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} className="mb-3">
                <Card className="border-0 bg-danger bg-opacity-10 h-100">
                  <Card.Body className="py-3">
                    <div className="h4 fw-bold text-danger">{risk_distribution?.Élevé || 0}</div>
                    <div className="text-muted small">Risques élevés</div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} className="mb-3">
                <Card className="border-0 bg-warning bg-opacity-10 h-100">
                  <Card.Body className="py-3">
                    <div className="h4 fw-bold text-warning">{risk_distribution?.Moyen || 0}</div>
                    <div className="text-muted small">Risques moyens</div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} className="mb-3">
                <Card className="border-0 bg-success bg-opacity-10 h-100">
                  <Card.Body className="py-3">
                    <div className="h4 fw-bold text-success">{risk_distribution?.Faible || 0}</div>
                    <div className="text-muted small">Risques faibles</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="text-center mt-3">
              <Badge bg="secondary" className="px-3 py-2">
                Score moyen : {parseFloat(average_risk_score || 0).toFixed(1)}/10
              </Badge>
              <div className="small text-muted mt-2">
                Basé sur l'analyse de {total_offers} offres d'Asako.mg
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsCards;