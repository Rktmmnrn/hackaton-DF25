import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';

const StatisticsSection = ({ statistiques }) => {
  if (!statistiques) return null;

  return (
    <Row className="mb-4">
      <Col>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4">
            <h3 className="mb-4">
              📊 Statistiques globales des offres d'emploi
            </h3>

            <Row>
              <Col md={3} className="text-center mb-3">
                <Card className="border-0 bg-primary bg-opacity-10 h-100">
                  <Card.Body className="py-4">
                    <div className="display-5 fw-bold text-primary">
                      {statistiques.total_offers || 100}
                    </div>
                    <div className="text-muted">Offres analysées</div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} className="text-center mb-3">
                <Card className="border-0 bg-danger bg-opacity-10 h-100">
                  <Card.Body className="py-4">
                    <div className="display-5 fw-bold text-danger">
                      {statistiques.risk_distribution?.Élevé || 1}
                    </div>
                    <div className="text-muted">Risques élevés</div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} className="text-center mb-3">
                <Card className="border-0 bg-warning bg-opacity-10 h-100">
                  <Card.Body className="py-4">
                    <div className="display-5 fw-bold text-warning">
                      {statistiques.risk_distribution?.Moyen || 8}
                    </div>
                    <div className="text-muted">Risques moyens</div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} className="text-center mb-3">
                <Card className="border-0 bg-success bg-opacity-10 h-100">
                  <Card.Body className="py-4">
                    <div className="display-5 fw-bold text-success">
                      {statistiques.risk_distribution?.Faible || 7}
                    </div>
                    <div className="text-muted">Risques faibles</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {statistiques.most_risky_jobs && (
              <div className="mt-4">
                <h6>Métiers les plus à risque :</h6>
                <div className="d-flex flex-wrap gap-2">
                  {statistiques.most_risky_jobs.slice(0, 5).map((job, idx) => (
                    <Badge key={idx} bg="danger" className="px-3 py-2">
                      {job.metier} ({job.count})
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsSection;