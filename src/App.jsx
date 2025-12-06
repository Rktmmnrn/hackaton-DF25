import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container, Row, Col, Card, Button, Badge,
  Form, Modal, Alert, Spinner, ListGroup
} from 'react-bootstrap';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiHealth, setApiHealth] = useState(null);
  const [offresReelles, setOffresReelles] = useState([]);
  const [statistiques, setStatistiques] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showDemo, setShowDemo] = useState(false);
  const [demoData, setDemoData] = useState(null);
  const [showAllOffers, setShowAllOffers] = useState(false);

  // Charger toutes les données au démarrage
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // 1. Vérifier santé API
        const healthData = await apiService.checkHealth();
        setApiHealth(healthData);

        // 2. Charger toutes les offres
        const offersData = await apiService.getAllOffers();
        setOffresReelles(offersData.offers || []);

        // 3. Charger les statistiques
        const statsData = await apiService.getStatistics();
        setStatistiques(statsData);

        // 4. Charger l'exemple démo
        const demoData = await apiService.getDemo();
        setDemoData(demoData);

        console.log('Données chargées avec succès');
      } catch (err) {
        setError(`Erreur de connexion à l'API. Assurez-vous que le backend est démarré sur http://localhost:5000`);
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Fonction de recherche
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const searchData = await apiService.search(searchQuery);
      setOffresReelles(searchData.offers || []);
    } catch (err) {
      console.error('Erreur recherche:', err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les recommandations pour une offre
  const loadRecommendations = async (metier) => {
    try {
      const recos = await apiService.getRecommendations(metier);
      setRecommendations(recos.recommendations || []);
    } catch (err) {
      console.error('Erreur recommandations:', err);
    }
  };

  // Sélectionner une offre
  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
    loadRecommendations(offer.metier || offer.title.split(' ')[0]);
  };

  // Obtenir la couleur du risque selon le score IA (1-10)
  const getRiskColor = (score) => {
    if (score >= 7) return '#dc3545'; // Rouge pour risque élevé
    if (score >= 4) return '#ffc107'; // Jaune pour risque moyen
    return '#28a745'; // Vert pour risque faible
  };

  // Obtenir le texte du risque
  const getRiskText = (score) => {
    if (score >= 7) return 'Élevé';
    if (score >= 4) return 'Moyen';
    return 'Faible';
  };

  // Formater la date
  const formatDate = (dateStr) => {
    if (dateStr.includes('jour')) return dateStr;
    return `Publié: ${dateStr}`;
  };

  return (
    <Container fluid className="p-0">
      {/* Header avec connexion API */}
      <header className="bg-primary text-white py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center mb-2">
                <span className="display-4 me-3">🤖</span>
                <div>
                  <h1 className="display-5 fw-bold mb-0">Safe AI Job Analyzer</h1>
                  <p className="lead mb-0">Analysez les risques IA sur les métiers malgaches</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-md-end">
              {apiHealth && (
                <div className="bg-white rounded-3 p-3 d-inline-block">
                  {/* <div className="text-success fw-bold fs-5">
                    ✅ API Connectée
                  </div> */}
                  <div className="text-muted small">
                    ✅ {apiHealth.offers_count} offres analysées
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </header>

      {/* Barre de recherche */}
      <div className="bg-light py-4 border-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white border-end-0">
                  🔍
                </span>
                <Form.Control
                  type="text"
                  placeholder="Recherchez un métier (ex: chauffeur, mécanicien, coordinateur...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="border-start-0"
                />
                <Button
                  variant="primary"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : 'Rechercher'}
                </Button>
              </div>
            </Col>
            <Col md={4} className="text-end">
              <Button
                variant="warning"
                className="me-2"
                onClick={() => setShowDemo(true)}
              >
                🎬 Voir la démo
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => window.location.reload()}
              >
                🔄 Recharger
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Indicateur de chargement */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <div className="mt-3">Chargement des données...</div>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <Alert variant="danger" className="m-3">
          <Alert.Heading>⚠️ Problème de connexion</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="small">
            <strong>Solution rapide :</strong>
            <ol className="mb-0 mt-2">
              <li>Démarrez le backend : <code>uvicorn main:app --reload --port 5000</code></li>
              <li>Vérifiez l'URL : <code>http://localhost:5000/api/health</code></li>
              <li>Actualisez cette page</li>
            </ol>
          </div>
        </Alert>
      )}

      <main className="py-4">
        <Container>
          {/* Section Statistiques */}
          {statistiques && !loading && (
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
                              {statistiques.total_offers || 50}
                            </div>
                            <div className="text-muted">Offres analysées</div>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={3} className="text-center mb-3">
                        <Card className="border-0 bg-danger bg-opacity-10 h-100">
                          <Card.Body className="py-4">
                            <div className="display-5 fw-bold text-danger">
                              {statistiques.risk_stats?.high_risk || 15}
                            </div>
                            <div className="text-muted">Risques élevés</div>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={3} className="text-center mb-3">
                        <Card className="border-0 bg-warning bg-opacity-10 h-100">
                          <Card.Body className="py-4">
                            <div className="display-5 fw-bold text-warning">
                              {statistiques.risk_stats?.medium_risk || 25}
                            </div>
                            <div className="text-muted">Risques moyens</div>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={3} className="text-center mb-3">
                        <Card className="border-0 bg-success bg-opacity-10 h-100">
                          <Card.Body className="py-4">
                            <div className="display-5 fw-bold text-success">
                              {statistiques.risk_stats?.low_risk || 10}
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
          )}

          {/* Section Offres d'emploi */}
          {offresReelles.length > 0 && !loading && (
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
                        Voir toutes les offres
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
                                  className="px-3 py-2"
                                  style={{
                                    backgroundColor: getRiskColor(offre.ia_risk_score),
                                    fontSize: '0.9em'
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
          )}

          {/* Section Analyse détaillée */}
          {selectedOffer && (
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
          )}

          {/* Message si pas d'offres */}
          {!loading && offresReelles.length === 0 && !error && (
            <Row className="mb-4">
              <Col>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-5 text-center">
                    <div className="display-1 mb-4">🔍</div>
                    <h3 className="mb-3">Commencez votre recherche</h3>
                    <p className="lead mb-4">
                      Recherchez un métier pour voir les offres d'emploi réelles
                      et leur niveau de risque face à l'IA.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        setSearchQuery('chauffeur');
                        handleSearch();
                      }}
                    >
                      🚗 Essayez avec "chauffeur"
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </main>

      {/* Modal Démo */}
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

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-4">
        <Container>
          <Row>
            <Col md={8}>
              <h5 className="mb-3">
                <span className="me-2">🛡️</span>
                Safe AI Job Analyzer
              </h5>
              <p className="mb-0 small">
                Plateforme d'analyse des risques d'automatisation par l'IA
                sur les métiers malgaches. Données fournies par Asako.mg en temps réel.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <div className="mt-3 mt-md-0">
                <div className="text-info small">
                  {apiHealth?.service || 'Backend FastAPI'}
                </div>
                <div className="text-muted small">
                  {apiHealth?.offers_count || 50} offres analysées
                </div>
                <div className="text-muted small mt-2">
                  Hackathon Safe AI - 2024
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </Container>
  );
}

export default App;