import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import JobsByRiskTable from '../../components/JobsByRiskTable';

const JobsPage = ({ riskDetailedData }) => {
  const [selectedRisk, setSelectedRisk] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  // Extraire les secteurs uniques
  const getUniqueSectors = () => {
    if (!riskDetailedData || !riskDetailedData.risk_categories) return [];
    
    const sectors = new Set();
    Object.values(riskDetailedData.risk_categories).forEach(category => {
      category.jobs?.forEach(job => {
        if (job.sector) sectors.add(job.sector);
      });
    });
    
    return Array.from(sectors).sort();
  };

  const sectors = getUniqueSectors();

  return (
    <Container fluid className="p-0">
      {/* Header */}
      <div className="bg-light border-bottom py-3 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">📋 Analyse par métier</h4>
            <p className="text-muted mb-0 small">
              Détail des métiers et leurs niveaux de risque
            </p>
          </div>
        </div>
      </div>

      {/* Filtres rapides */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="mb-3">🔍 Filtres rapides</Card.Title>
          
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Niveau de risque</Form.Label>
                <Form.Select 
                  value={selectedRisk} 
                  onChange={(e) => setSelectedRisk(e.target.value)}
                >
                  <option value="">Tous les niveaux</option>
                  <option value="elevé">Élevé</option>
                  <option value="moyen">Moyen</option>
                  <option value="faible">Faible</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Secteur</Form.Label>
                <Form.Select 
                  value={selectedSector} 
                  onChange={(e) => setSelectedSector(e.target.value)}
                >
                  <option value="">Tous les secteurs</option>
                  {sectors.map((sector, idx) => (
                    <option key={idx} value={sector}>{sector}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={4} className="mb-3 d-flex align-items-end">
              <Button 
                variant="outline-secondary" 
                className="w-100"
                onClick={() => {
                  setSelectedRisk('');
                  setSelectedSector('');
                }}
              >
                ✕ Réinitialiser les filtres
              </Button>
            </Col>
          </Row>
          
          {(selectedRisk || selectedSector) && (
            <div className="mt-3 p-3 bg-light rounded">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Filtres actifs :</strong>
                  {selectedRisk && <span className="ms-2">Risque: {selectedRisk}</span>}
                  {selectedSector && <span className="ms-2">Secteur: {selectedSector}</span>}
                </div>
                <div className="small text-muted">
                  {selectedRisk && selectedSector ? 'Combinaison de filtres' : 'Filtre unique'}
                </div>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Tableau des métiers */}
      <JobsByRiskTable 
        riskLevel={selectedRisk} 
        sector={selectedSector} 
      />

      {/* Informations */}
      <Row className="mt-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title>💡 Comment lire ce tableau</Card.Title>
              <ul className="mt-3">
                <li className="mb-2">
                  <strong>Cliquez sur une ligne</strong> pour voir les recommandations
                </li>
                <li className="mb-2">
                  <strong>Score IA</strong> : de 1 (faible risque) à 10 (risque élevé)
                </li>
                <li className="mb-2">
                  <strong>Offres</strong> : nombre d'opportunités disponibles
                </li>
                <li>
                  <strong>Secteur</strong> : domaine d'activité principal
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title>🎯 Recommandations d'action</Card.Title>
              <div className="mt-3">
                <div className="d-flex mb-3">
                  <span className="badge bg-danger me-2">!</span>
                  <div>
                    <strong>Risque élevé</strong> : Priorité de reconversion
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <span className="badge bg-warning me-2">~</span>
                  <div>
                    <strong>Risque moyen</strong> : Renforcement des compétences
                  </div>
                </div>
                <div className="d-flex">
                  <span className="badge bg-success me-2">✓</span>
                  <div>
                    <strong>Risque faible</strong> : Continuité avec adaptation
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobsPage;