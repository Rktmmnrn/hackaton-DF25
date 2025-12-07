import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { apiService } from '../services/api';

// Import des composants
import SearchBar from '../components/SearchBar';
import LoadingError from '../components/LoadingError';
import StatisticsCards from '../components/StatisticsCards'; // Version légère
import JobOffersSection from '../components/JobOffersSection';
import DemoModal from '../components/DemoModal';
import EmptyState from '../components/EmptyState';

function HomePage() {
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

  // Charger les données au démarrage
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const healthData = await apiService.checkHealth();
        setApiHealth(healthData);

        const offersData = await apiService.getAllOffers();
        setOffresReelles(offersData.offers || []);
        console.log("iciii", offersData);

        const statsData = await apiService.getStatistics();
        setStatistiques(statsData);

        const demoData = await apiService.getDemo();
        setDemoData(demoData);
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

  // Charger les recommandations
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

  // Obtenir la couleur du risque
  const getRiskColor = (score) => {
    if (score >= 7) return '#dc3545';
    if (score >= 4) return '#ffc107';
    return '#28a745';
  };

  const getRiskText = (score) => {
    if (score >= 7) return 'Élevé';
    if (score >= 4 || score<7) return 'Moyen';
    return 'Faible';
  };

  const formatDate = (dateStr) => {
    if (dateStr.includes('jour')) return dateStr;
    return `Publié: ${dateStr}`;
  };

  const reloadPage = () => window.location.reload();

  return (
    <Container fluid className="p-0">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        loading={loading}
        setShowDemo={setShowDemo}
        reloadPage={reloadPage}
      />

      <LoadingError loading={loading} error={error} />

      <main className="py-4">
        <Container>
          {!loading && !error && (
            <>
              {/* Statistiques légères */}
              <StatisticsCards statistiques={statistiques} />

              {/* Offres d'emploi */}
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

      <DemoModal
        showDemo={showDemo}
        setShowDemo={setShowDemo}
        demoData={demoData}
        handleSelectOffer={handleSelectOffer}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
    </Container>
  );
}

export default HomePage;