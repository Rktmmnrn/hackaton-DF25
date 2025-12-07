import React from 'react';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import RiskBarChart from '../../components/RiskBarChart';
import SectorPieChart from '../../components/SectorPieChart';
import RiskRadarChart from '../../components/RiskRadarChart';
import ComparativeChart from '../../components/ComparativeChart';

const StatisticsPage = ({ riskDetailedData, jobsByRiskData }) => {
  return (
    <Container fluid className="p-0">
      {/* Header */}
      <div className="bg-light border-bottom py-3 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">📈 Visualisations avancées</h4>
            <p className="text-muted mb-0 small">
              Graphiques interactifs et analyses détaillées
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultActiveKey="distribution" className="mb-4">
        <Tab eventKey="distribution" title="📊 Distribution">
          <Row className="mt-3">
            <Col lg={6} className="mb-4">
              <RiskBarChart riskData={riskDetailedData} />
            </Col>
            <Col lg={6} className="mb-4">
              <SectorPieChart riskData={riskDetailedData} />
            </Col>
          </Row>
          
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Card.Title>📝 Explications</Card.Title>
              <Row>
                <Col md={6}>
                  <h6>Graphique à barres :</h6>
                  <ul className="text-muted">
                    <li>Compare le nombre de métiers différents et d'offres par niveau de risque</li>
                    <li>Montre la concentration des opportunités d'emploi</li>
                    <li>Permet d'identifier les secteurs les plus exposés</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>Graphique circulaire :</h6>
                  <ul className="text-muted">
                    <li>Montre la répartition des offres par secteur</li>
                    <li>Met en évidence les secteurs dominants</li>
                    <li>Aide à prioriser les interventions</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="comparison" title="📈 Comparaison">
          <Row className="mt-3">
            <Col lg={6} className="mb-4">
              <RiskRadarChart riskData={jobsByRiskData} />
            </Col>
            <Col lg={6} className="mb-4">
              <ComparativeChart riskData={riskDetailedData} />
            </Col>
          </Row>
          
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Card.Title>📝 Explications</Card.Title>
              <Row>
                <Col md={6}>
                  <h6>Graphique radar :</h6>
                  <ul className="text-muted">
                    <li>Compare plusieurs métiers sur deux axes : score IA et nombre d'offres</li>
                    <li>Permet d'identifier les métiers à fort volume mais faible risque</li>
                    <li>Aide à trouver des opportunités de reconversion</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>Graphique comparatif :</h6>
                  <ul className="text-muted">
                    <li>Combine plusieurs indicateurs par niveau de risque</li>
                    <li>Montre les corrélations entre différentes métriques</li>
                    <li>Fournit une vue d'ensemble complète</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="custom" title="🎨 Personnalisé">
          <div className="text-center py-5">
            <div className="display-4 mb-3">⚙️</div>
            <h4>Graphiques personnalisés</h4>
            <p className="text-muted">
              Créez vos propres visualisations en combinant différents filtres et paramètres.
            </p>
            <button className="btn btn-primary mt-3">
              Créer un graphique personnalisé
            </button>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default StatisticsPage;