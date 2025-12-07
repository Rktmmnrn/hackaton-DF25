import React from 'react';
import { Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';

const StatisticsSection = ({ statistiques }) => {
  if (!statistiques) return null;

  // Extraire les données de la nouvelle structure
  const { 
    total_offers, 
    risk_distribution, 
    average_risk_score,
    top_sectors = [],
    top_locations = [],
    top_companies = []
  } = statistiques;

  // Calculer les pourcentages pour la barre de progression
  const total = risk_distribution?.Élevé + risk_distribution?.Moyen + risk_distribution?.Faible || 1;
  const highRiskPercent = ((risk_distribution?.Élevé || 0) / total) * 100;
  const mediumRiskPercent = ((risk_distribution?.Moyen || 0) / total) * 100;
  const lowRiskPercent = ((risk_distribution?.Faible || 0) / total) * 100;

  return (
    <Row className="mb-4">
      <Col>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4">
            <h3 className="mb-4">
              📊 Statistiques en temps réel
              <Badge bg="info" className="ms-2">
                {total_offers} offres
              </Badge>
            </h3>

            {/* Section 1 : Scores principaux */}
            <Row className="mb-4">
              <Col md={3} className="text-center mb-3">
                <Card className="border-0 bg-primary bg-opacity-10 h-100">
                  <Card.Body className="py-4">
                    <div className="display-5 fw-bold text-primary">
                      {total_offers || 0}
                    </div>
                    <div className="text-muted">Offres analysées</div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} className="text-center mb-3">
                <Card className="border-0 bg-danger bg-opacity-10 h-100">
                  <Card.Body className="py-4">
                    <div className="display-5 fw-bold text-danger">
                      {risk_distribution?.Élevé || 0}
                    </div>
                    <div className="text-muted">Risques élevés</div>
                    <div className="small text-danger mt-1">
                      {highRiskPercent.toFixed(1)}%
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} className="text-center mb-3">
                <Card className="border-0 bg-warning bg-opacity-10 h-100">
                  <Card.Body className="py-4">
                    <div className="display-5 fw-bold text-warning">
                      {risk_distribution?.Moyen || 0}
                    </div>
                    <div className="text-muted">Risques moyens</div>
                    <div className="small text-warning mt-1">
                      {mediumRiskPercent.toFixed(1)}%
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3} className="text-center mb-3">
                <Card className="border-0 bg-success bg-opacity-10 h-100">
                  <Card.Body className="py-4">
                    <div className="display-5 fw-bold text-success">
                      {risk_distribution?.Faible || 0}
                    </div>
                    <div className="text-muted">Risques faibles</div>
                    <div className="small text-success mt-1">
                      {lowRiskPercent.toFixed(1)}%
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Barre de progression des risques */}
            <div className="mb-4">
              <h6 className="mb-3">Distribution des risques :</h6>
              <ProgressBar className="mb-3" style={{ height: '25px' }}>
                <ProgressBar 
                  variant="danger" 
                  now={highRiskPercent} 
                  key={1}
                  label={`${risk_distribution?.Élevé || 0} Élevé`}
                />
                <ProgressBar 
                  variant="warning" 
                  now={mediumRiskPercent} 
                  key={2}
                  label={`${risk_distribution?.Moyen || 0} Moyen`}
                />
                <ProgressBar 
                  variant="success" 
                  now={lowRiskPercent} 
                  key={3}
                  label={`${risk_distribution?.Faible || 0} Faible`}
                />
              </ProgressBar>
              <div className="text-center text-muted small">
                Score moyen de risque IA : <strong>{average_risk_score}/10</strong>
              </div>
            </div>

            {/* Sections en colonnes */}
            <Row>
              {/* Secteurs les plus représentés */}
              <Col md={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <h6 className="text-primary mb-3">
                      🏢 Secteurs les plus actifs
                    </h6>
                    {top_sectors.length > 0 ? (
                      <div className="mt-3">
                        {top_sectors.slice(0, 5).map((sector, idx) => (
                          <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                            <span className="text-truncate" title={sector.secteur}>
                              {sector.secteur}
                            </span>
                            <Badge bg="primary">{sector.count}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted small">Aucune donnée de secteur disponible</div>
                    )}
                  </Card.Body>
                </Card>
              </Col>

              {/* Localisations */}
              <Col md={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <h6 className="text-primary mb-3">
                      📍 Offres par localisation
                    </h6>
                    {top_locations.length > 0 ? (
                      <div className="mt-3">
                        {top_locations.slice(0, 5).map((location, idx) => (
                          <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                            <span>{location.location}</span>
                            <Badge bg="info">{location.count}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted small">Aucune donnée de localisation</div>
                    )}
                  </Card.Body>
                </Card>
              </Col>

              {/* Entreprises */}
              <Col md={4} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <h6 className="text-primary mb-3">
                      🏭 Entreprises les plus actives
                    </h6>
                    {top_companies.length > 0 ? (
                      <div className="mt-3">
                        {top_companies.slice(0, 5).map((company, idx) => (
                          <div key={idx} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                            <span className="text-truncate" title={company.company}>
                              {company.company}
                            </span>
                            <Badge bg="secondary">{company.count}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted small">Aucune donnée d'entreprise</div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Timestamp */}
            {statistiques.timestamp && (
              <div className="mt-3 text-end">
                <small className="text-muted">
                  Dernière mise à jour : {new Date(statistiques.timestamp).toLocaleTimeString()}
                </small>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsSection;