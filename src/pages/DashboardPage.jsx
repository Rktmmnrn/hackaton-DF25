import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button } from 'react-bootstrap';
import { apiService } from '../services/api';
import StatisticsSection from '../components/StatisticsSection';
import { useNavigate } from 'react-router-dom';
import RiskDistributionChart from '../components/RiskDistributionChart';
import SectorFilter from '../components/SectorFilter';
import JobsByRiskTable from '../components/JobsByRiskTable';

const DashboardPage = () => {
    const [riskDetailedData, setRiskDetailedData] = useState(null);
    const [filterSector, setFilterSector] = useState('');
    const [filterRiskLevel, setFilterRiskLevel] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statistiques, setStatistiques] = useState(null);
    const [offresReelles, setOffresReelles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Charger les statistiques
                const statsData = await apiService.getStatistics();
                setStatistiques(statsData);

                // Charger quelques offres pour l'exemple
                const offersData = await apiService.getAllOffers();
                setOffresReelles(offersData.offers?.slice(0, 8) || []);
                const riskData = await apiService.getJobsByRiskDetailed();
                setRiskDetailedData(riskData);

                console.log('Dashboard data loaded');
            } catch (err) {
                setError('Erreur de chargement des données du dashboard');
                console.error('Dashboard error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleFilterChange = (filters) => {
        setFilterSector(filters.sector);
        setFilterRiskLevel(filters.riskLevel);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <div className="mt-3">Chargement du tableau de bord...</div>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="m-4">
                <Alert.Heading>Erreur</Alert.Heading>
                <p>{error}</p>
                <Button variant="primary" onClick={() => window.location.reload()}>
                    Réessayer
                </Button>
            </Alert>
        );
    }

    return (
        <Container fluid className="p-0">
            {/* Header du Dashboard */}
            <div className="bg-dark text-white py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col>
                            <div className="d-flex align-items-center">
                                <span className="display-4 me-3">📈</span>
                                <div>
                                    <h1 className="display-5 fw-bold mb-2">Tableau de bord IA</h1>
                                    <p className="lead mb-0">
                                        Analyse complète des risques d'automatisation sur le marché de l'emploi malgache
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Button
                                    variant="outline-light"
                                    className="me-3"
                                    onClick={() => navigate('/')}
                                >
                                    ← Retour à l'accueil
                                </Button>
                                <Button
                                    variant="warning"
                                    onClick={() => window.location.reload()}
                                >
                                    🔄 Actualiser les données
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <main className="py-4">
                <Container>
                    {/* Bannière d'info */}
                    <Alert variant="info" className="mb-4">
                        <div className="d-flex align-items-center">
                            <span className="fs-4 me-3">ℹ️</span>
                            <div>
                                <strong>Données en temps réel</strong> - Analyse basée sur {statistiques?.total_offers || 0} offres
                                d'emploi réelles d'Asako.mg. Mis à jour automatiquement.
                            </div>
                        </div>
                    </Alert>

                    {/* Section Statistiques Complètes */}
                    <StatisticsSection statistiques={statistiques} />

                    <Row className="mb-4">
                        <Col lg={8}>
                            <RiskDistributionChart riskData={riskDetailedData} />
                        </Col>
                        <Col lg={4}>
                            <SectorFilter onFilterChange={handleFilterChange} />
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col>
                            <JobsByRiskTable
                                riskLevel={filterRiskLevel}
                                sector={filterSector}
                            />
                        </Col>
                    </Row>

                    {/* Section Dernières Offres */}
                    {offresReelles.length > 0 && (
                        <Row className="mb-4">
                            <Col>
                                <Card className="border-0 shadow-sm">
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h4 className="mb-0">
                                                📋 Dernières offres analysées
                                                <Badge bg="secondary" className="ms-2">
                                                    {offresReelles.length}
                                                </Badge>
                                            </h4>
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => navigate('/')}
                                            >
                                                Voir toutes les offres →
                                            </Button>
                                        </div>

                                        <Row>
                                            {offresReelles.slice(0, 4).map((offre, index) => (
                                                <Col key={index} md={6} lg={3} className="mb-3">
                                                    <Card className="h-100 border">
                                                        <Card.Body>
                                                            <Card.Title className="fs-6 mb-2">
                                                                {offre.title}
                                                            </Card.Title>
                                                            <Badge
                                                                bg={offre.ia_risk_score >= 7 ? 'danger' :
                                                                    offre.ia_risk_score >= 4 ? 'warning' : 'success'}
                                                                className="mb-2"
                                                            >
                                                                Score IA: {offre.ia_risk_score}/10
                                                            </Badge>
                                                            <div className="small text-muted">
                                                                <div>{offre.company}</div>
                                                                <div>{offre.location}</div>
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

                    {/* Insights et Analyses */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm bg-warning bg-opacity-10">
                                <Card.Body>
                                    <div className="text-warning fs-1 mb-3">💡</div>
                                    <Card.Title>Insights clés</Card.Title>
                                    <ul className="mt-3">
                                        <li className="mb-2">
                                            <strong>Score moyen :</strong> {statistiques?.average_risk_score || 'N/A'}/10
                                        </li>
                                        <li className="mb-2">
                                            <strong>Répartition :</strong> Majorité des offres à risque {statistiques?.risk_distribution?.Élevé > statistiques?.risk_distribution?.Moyen ? 'élevé' : 'moyen'}
                                        </li>
                                        <li className="mb-2">
                                            <strong>Secteur principal :</strong> {statistiques?.top_sectors?.[0]?.secteur || 'Non disponible'}
                                        </li>
                                        <li>
                                            <strong>Localisation principale :</strong> {statistiques?.top_locations?.[0]?.location || 'Antananarivo'}
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="h-100 border-0 shadow-sm bg-info bg-opacity-10">
                                <Card.Body>
                                    <div className="text-info fs-1 mb-3">📊</div>
                                    <Card.Title>Méthodologie d'analyse</Card.Title>
                                    <p className="mt-3">
                                        Notre IA analyse chaque offre selon 5 critères :
                                    </p>
                                    <ol>
                                        <li>Répétitivité des tâches</li>
                                        <li>Exposition aux technologies</li>
                                        <li>Standardisation possible</li>
                                        <li>Compétences transférables</li>
                                        <li>Contexte économique malgache</li>
                                    </ol>
                                    <p className="small text-muted">
                                        Score de 1 (faible risque) à 10 (risque très élevé)
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Container>
    );
};

export default DashboardPage;