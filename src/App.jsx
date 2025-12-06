import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
// Import des composants
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import LoadingError from './components/LoadingError';
import StatisticsSection from './components/StatisticsSection';
import JobOffersSection from './components/JobOffersSection';
// import JobAnalysisSection from './components/JobAnalysisSection';
import DemoModal from './components/DemoModal';
import Footer from './components/Footer';
import EmptyState from './components/EmptyState';

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
        console.log('Statistique 1 :',statsData.average_risk_score);
        console.log('Statistique 2 :',typeof(statsData.risk_stats));

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
    if (score >= 4 || score < 7) return 'Moyen';
    return 'Faible';
  };

  // Formater la date
  const formatDate = (dateStr) => {
    if (dateStr.includes('jour')) return dateStr;
    return `Publié: ${dateStr}`;
  };
  
  // Recharger la page
  const reloadPage = () => window.location.reload();

  return (
    <Container fluid className="p-0">
      {/* Header avec connexion API */}
      <Header apiHealth={apiHealth} />

      {/* Barre de recherche */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        loading={loading}
        setShowDemo={setShowDemo}
        reloadPage={reloadPage}
      />

      {/* Indicateur de chargement */}
      <LoadingError loading={loading} error={error} />

      <main className="py-4">
        <Container>
          {!loading && !error && (
            <>
              <StatisticsSection statistiques={statistiques} />

              <JobOffersSection
                offresReelles={offresReelles}
                selectedOffer={selectedOffer}
                handleSelectOffer={handleSelectOffer}
                getRiskColor={getRiskColor}
                getRiskText={getRiskText}
                formatDate={formatDate}
                showAllOffers={showAllOffers}
                setShowAllOffers={setShowAllOffers}
              />

              {/* <JobAnalysisSection
                selectedOffer={selectedOffer}
                getRiskColor={getRiskColor}
                getRiskText={getRiskText}
                recommendations={recommendations}
                loadRecommendations={loadRecommendations}
              /> */}

              {!loading && offresReelles.length === 0 && !error && (
                <EmptyState 
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                />
              )}
            </>
          )}
        </Container>
      </main>

      {/* Modal Démo */}
      <DemoModal
        showDemo={showDemo}
        setShowDemo={setShowDemo}
        demoData={demoData}
        handleSelectOffer={handleSelectOffer}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Footer */}
      <Footer apiHealth={apiHealth} />
    </Container>
  );
}

export default App;