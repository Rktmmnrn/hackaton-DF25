import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { apiService } from '../services/api';

// Import des composants
import DashboardSidebar from '../components/DashboardSidebar';

// Import des pages/composants
import StatisticsSection from '../components/StatisticsSection';
import RiskBarChart from '../components/RiskBarChart';
import SectorPieChart from '../components/SectorPieChart';
import JobsByRiskTable from '../components/JobsByRiskTable';
import SectorFilter from '../components/SectorFilter';

const DashboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statistiques, setStatistiques] = useState(null);
    const [riskDetailedData, setRiskDetailedData] = useState(null);
    const [jobsByRiskData, setJobsByRiskData] = useState(null);

    // État pour la navigation
    const [activeTab, setActiveTab] = useState('overview');
    const [filterSector, setFilterSector] = useState('');
    const [filterRiskLevel, setFilterRiskLevel] = useState('');

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Charger toutes les données en parallèle
            const [statsData, riskData, jobsData] = await Promise.all([
                apiService.getStatistics(),
                apiService.getJobsByRiskDetailed(),
                apiService.getJobsByRiskLevel('all')
            ]);

            setStatistiques(statsData);
            setRiskDetailedData(riskData);
            setJobsByRiskData(jobsData);

        } catch (err) {
            console.error('Dashboard error:', err);
            setError('Erreur de chargement des données du dashboard.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Gestion des filtres
    const handleFilterChange = (filters) => {
        setFilterSector(filters.sector);
        setFilterRiskLevel(filters.riskLevel);
    };

    if (loading) {
        return (
            <Container className="py-5">
                <div className="text-center">
                    <Spinner animation="border" variant="primary" size="lg" />
                    <div className="mt-3 h4">Chargement du tableau de bord...</div>
                    <div className="text-muted">Veuillez patienter</div>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    <Alert.Heading>Erreur de chargement</Alert.Heading>
                    <p>{error}</p>
                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-primary" onClick={fetchDashboardData}>
                            Réessayer
                        </button>
                        <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>
                            Retour
                        </button>
                    </div>
                </Alert>
            </Container>
        );
    }

    // Rendu du contenu selon l'onglet actif
    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <StatisticsSection statistiques={statistiques} />

                        <Row className="mb-4">
                            <Col lg={6} className="mb-4">
                                <RiskBarChart riskData={riskDetailedData} />
                            </Col>
                            <Col lg={6} className="mb-4">
                                <SectorPieChart riskData={riskDetailedData} />
                            </Col>
                        </Row>
                    </>
                );

            case 'statistics':
                return (
                    <Row className="mb-4">
                        <Col lg={6} className="mb-4">
                            <RiskBarChart riskData={riskDetailedData} />
                        </Col>
                        <Col lg={6} className="mb-4">
                            <SectorPieChart riskData={riskDetailedData} />
                        </Col>
                    </Row>
                );

            case 'jobs':
                return (
                    <>
                        <Row className="mb-4">
                            <Col lg={8}>
                                <JobsByRiskTable
                                    riskLevel={filterRiskLevel}
                                    sector={filterSector}
                                />
                            </Col>
                            <Col lg={4}>
                                <SectorFilter onFilterChange={handleFilterChange} />
                            </Col>
                        </Row>
                    </>
                );

            case 'filters':
                return (
                    <Row className="mb-4">
                        <Col lg={8}>
                            <div className="text-center py-5">
                                <div className="display-1 mb-3">🔍</div>
                                <h3>Filtres avancés</h3>
                                <p className="text-muted">
                                    Utilisez la section "Métiers" pour filtrer les données
                                </p>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <SectorFilter onFilterChange={handleFilterChange} />
                        </Col>
                    </Row>
                );

            case 'insights':
                return (
                    <div className="text-center py-5">
                        <div className="display-1 mb-3">💡</div>
                        <h3>Insights & Analyses</h3>
                        <p className="text-muted">
                            Cette section sera bientôt disponible avec des analyses avancées
                        </p>
                    </div>
                );

            default:
                return <StatisticsSection statistiques={statistiques} />;
        }
    };

    return (
        <Container fluid className="p-0">
            {/* Header principal */}
            <div className="bg-dark text-white py-4">
                <Container>
                    <Row className="align-items-center">
                        <Col>
                            <div className="d-flex align-items-center">
                                <span className="display-4 me-3">📊</span>
                                <div>
                                    <h1 className="display-6 fw-bold mb-1">Tableau de bord IA</h1>
                                    <p className="lead mb-0">
                                        Analyse des risques d'automatisation - {statistiques?.total_offers || 0} offres analysées
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Contenu principal */}
            <Container fluid className="mt-4">
                <Row>
                    {/* Sidebar */}
                    <Col lg={3} xl={2} className="pe-0">
                        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </Col>

                    {/* Contenu principal */}
                    <Col lg={9} xl={10} className="ps-lg-4">
                        {/* Bannière d'info */}
                        {activeTab === 'overview' && (
                            <Alert variant="info" className="mb-4">
                                <div className="d-flex align-items-center">
                                    <span className="fs-4 me-3">ℹ️</span>
                                    <div>
                                        <strong>Données en temps réel</strong> - Analyse basée sur {statistiques?.total_offers || 0} offres
                                        d'emploi réelles d'Asako.mg. Mis à jour automatiquement.
                                    </div>
                                </div>
                            </Alert>
                        )}

                        {/* Contenu dynamique */}
                        {renderContent()}
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default DashboardPage;