import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { apiService } from '../../services/api';

const FiltersPage = () => {
  const [sectors, setSectors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    sector: '',
    location: '',
    riskLevel: '',
    minScore: 0,
    maxScore: 10
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sectorsData, locationsData] = await Promise.all([
          apiService.getSectors(),
          apiService.getLocations()
        ]);
        
        setSectors(sectorsData.sectors || []);
        setLocations(locationsData.locations || []);
      } catch (error) {
        console.error('Erreur chargement données:', error);
      }
    };

    loadData();
  }, []);

  const handleFilterChange = (key, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    console.log('Filtres appliqués:', selectedFilters);
    // Ici tu pourrais appeler une API avec les filtres
    alert(`Filtres appliqués:\n${JSON.stringify(selectedFilters, null, 2)}`);
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      sector: '',
      location: '',
      riskLevel: '',
      minScore: 0,
      maxScore: 10
    });
  };

  const isAnyFilterActive = Object.values(selectedFilters).some(
    value => value !== '' && value !== 0 && value !== 10
  );

  return (
    <Container fluid className="p-0">
      {/* Header */}
      <div className="bg-light border-bottom py-3 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">🔍 Recherche avancée</h4>
            <p className="text-muted mb-0 small">
              Filtrez les données selon vos critères spécifiques
            </p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-4">Filtres disponibles</Card.Title>
              
              {/* Secteur */}
              <div className="mb-4">
                <h6>Secteur d'activité</h6>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {sectors.map((sector, idx) => (
                    <Button
                      key={idx}
                      variant={selectedFilters.sector === sector ? "primary" : "outline-primary"}
                      size="sm"
                      onClick={() => handleFilterChange('sector', sector)}
                    >
                      {sector}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Localisation */}
              <div className="mb-4">
                <h6>Localisation</h6>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {locations.map((location, idx) => (
                    <Button
                      key={idx}
                      variant={selectedFilters.location === location ? "primary" : "outline-primary"}
                      size="sm"
                      onClick={() => handleFilterChange('location', location)}
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Niveau de risque */}
              <div className="mb-4">
                <h6>Niveau de risque IA</h6>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {['Élevé', 'Moyen', 'Faible'].map((level) => (
                    <Button
                      key={level}
                      variant={selectedFilters.riskLevel === level.toLowerCase() ? "primary" : "outline-primary"}
                      size="sm"
                      onClick={() => handleFilterChange('riskLevel', level.toLowerCase())}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Score IA */}
              <div className="mb-4">
                <h6>Score IA (1-10)</h6>
                <div className="row align-items-center mt-2">
                  <Col xs={3}>
                    <Form.Control
                      type="number"
                      min="0"
                      max="10"
                      value={selectedFilters.minScore}
                      onChange={(e) => handleFilterChange('minScore', parseInt(e.target.value))}
                    />
                  </Col>
                  <Col xs={6} className="text-center">
                    <span>à</span>
                  </Col>
                  <Col xs={3}>
                    <Form.Control
                      type="number"
                      min="0"
                      max="10"
                      value={selectedFilters.maxScore}
                      onChange={(e) => handleFilterChange('maxScore', parseInt(e.target.value))}
                    />
                  </Col>
                </div>
                <div className="small text-muted mt-2">
                  Score minimum: {selectedFilters.minScore}, Score maximum: {selectedFilters.maxScore}
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="d-flex gap-3 mt-4">
                <Button 
                  variant="primary" 
                  className="flex-grow-1"
                  onClick={applyFilters}
                >
                  🔍 Appliquer les filtres
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={clearAllFilters}
                  disabled={!isAnyFilterActive}
                >
                  ✕ Tout effacer
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Filtres actifs */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="mb-3">Filtres sélectionnés</Card.Title>
              
              {isAnyFilterActive ? (
                <div>
                  {selectedFilters.sector && (
                    <Badge bg="primary" className="me-2 mb-2 p-2 d-inline-flex align-items-center">
                      Secteur: {selectedFilters.sector}
                      <Button 
                        variant="link" 
                        className="text-white p-0 ms-2"
                        onClick={() => handleFilterChange('sector', '')}
                      >
                        ✕
                      </Button>
                    </Badge>
                  )}
                  
                  {selectedFilters.location && (
                    <Badge bg="info" className="me-2 mb-2 p-2 d-inline-flex align-items-center">
                      Ville: {selectedFilters.location}
                      <Button 
                        variant="link" 
                        className="text-white p-0 ms-2"
                        onClick={() => handleFilterChange('location', '')}
                      >
                        ✕
                      </Button>
                    </Badge>
                  )}
                  
                  {selectedFilters.riskLevel && (
                    <Badge bg="warning" className="me-2 mb-2 p-2 d-inline-flex align-items-center">
                      Risque: {selectedFilters.riskLevel}
                      <Button 
                        variant="link" 
                        className="text-dark p-0 ms-2"
                        onClick={() => handleFilterChange('riskLevel', '')}
                      >
                        ✕
                      </Button>
                    </Badge>
                  )}
                  
                  {(selectedFilters.minScore > 0 || selectedFilters.maxScore < 10) && (
                    <Badge bg="success" className="me-2 mb-2 p-2 d-inline-flex align-items-center">
                      Score: {selectedFilters.minScore}-{selectedFilters.maxScore}
                      <Button 
                        variant="link" 
                        className="text-white p-0 ms-2"
                        onClick={() => {
                          handleFilterChange('minScore', 0);
                          handleFilterChange('maxScore', 10);
                        }}
                      >
                        ✕
                      </Button>
                    </Badge>
                  )}
                  
                  <div className="mt-3 small text-muted">
                    {Object.values(selectedFilters).filter(v => v !== '' && v !== 0 && v !== 10).length} filtre(s) actif(s)
                  </div>
                </div>
              ) : (
                <div className="text-center py-3 text-muted">
                  Aucun filtre sélectionné
                  <div className="small mt-2">Sélectionnez des filtres ci-contre</div>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Informations */}
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">💡 Conseils</Card.Title>
              <Alert variant="info" className="small">
                <strong>Combinaison de filtres</strong><br/>
                Vous pouvez combiner plusieurs filtres pour affiner votre recherche.
              </Alert>
              <Alert variant="success" className="small">
                <strong>Export des résultats</strong><br/>
                Les résultats filtrés peuvent être exportés en CSV ou PDF.
              </Alert>
              <div className="small text-muted">
                <strong>Astuce :</strong> Commencez par un filtre large, puis affinez progressivement.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FiltersPage;