import React from 'react';
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import StatisticsSection from '../../components/StatisticsSection';
import StatisticsCards from '../../components/StatisticsCards';

const OverviewPage = ({ statistiques, riskDetailedData }) => {
  return (
    <Container fluid className="p-0">
      {/* Header */}
      <div className="bg-light border-bottom py-3 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">📊 Vue d'ensemble</h4>
            <p className="text-muted mb-0 small">
              Analyse globale des risques d'automatisation
            </p>
          </div>
          <Badge bg="info" className="fs-6">
            {statistiques?.total_offers || 0} offres analysées
          </Badge>
        </div>
      </div>

      {/* Alert informative */}
      <Alert variant="info" className="mb-4">
        <div className="d-flex align-items-center">
          <span className="fs-4 me-3">ℹ️</span>
          <div>
            <strong>Données en temps réel</strong> - Cette analyse est basée sur les offres 
            d'emploi actuelles d'Asako.mg. Les statistiques sont mises à jour automatiquement.
          </div>
        </div>
      </Alert>

      {/* Statistiques principales */}
      <StatisticsSection statistiques={statistiques} />

      {/* Métiers à risque élevé (highlight) */}
      {riskDetailedData?.risk_categories?.["Élevé"]?.jobs?.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Card className="border-danger border-2">
              <Card.Body>
                <Card.Title className="text-danger">
                  ⚠️ Métiers à risque élevé détectés
                </Card.Title>
                <div className="mt-3">
                  {riskDetailedData.risk_categories["Élevé"].jobs.map((job, idx) => (
                    <Badge key={idx} bg="danger" className="me-2 mb-2 p-2 fs-6">
                      {job.job_title} ({job.avg_risk_score}/10)
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 small text-muted">
                  Ces métiers présentent un score de risque supérieur à 7/10 et 
                  sont prioritaires pour une reconversion.
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Quick stats */}
      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="display-6 text-primary mb-2">🎯</div>
              <Card.Title>Objectif</Card.Title>
              <Card.Text className="text-muted">
                Identifier les métiers à risque et proposer des alternatives
                concrètes pour protéger l'emploi à Madagascar.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="display-6 text-success mb-2">📈</div>
              <Card.Title>Méthodologie</Card.Title>
              <Card.Text className="text-muted">
                Analyse basée sur 5 critères techniques adaptés au 
                contexte économique malgache.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="display-6 text-warning mb-2">🔄</div>
              <Card.Title>Mise à jour</Card.Title>
              <Card.Text className="text-muted">
                Les données sont actualisées automatiquement à partir 
                des offres publiées sur Asako.mg.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OverviewPage;