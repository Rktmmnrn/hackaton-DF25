import React from 'react';
import { Card, Row, Col, Badge, ProgressBar } from 'react-bootstrap';

const RiskDistributionChart = ({ riskData }) => {
    if (!riskData || !riskData.totals) return null;

    const { totals } = riskData;
    const { by_risk_level } = totals;

    // Calculer les totaux
    const totalJobs = totals.total_jobs || 0;
    const totalOffers = totals.total_offers || 0;

    // Calculer les pourcentages
    const highPercent = totalJobs ? ((by_risk_level?.["Élevé"]?.jobs || 0) / totalJobs) * 100 : 0;
    const mediumPercent = totalJobs ? ((by_risk_level?.["Moyen"]?.jobs || 0) / totalJobs) * 100 : 0;
    const lowPercent = totalJobs ? ((by_risk_level?.["Faible"]?.jobs || 0) / totalJobs) * 100 : 0;

    return (
        <Card className="border-0 shadow-sm h-100">
            <Card.Body>
                <Card.Title className="mb-4">
                    📊 Distribution des métiers par risque
                </Card.Title>

                {/* Statistiques principales */}
                <Row className="mb-4">
                    <Col md={6} className="text-center mb-3">
                        <div className="p-3 bg-primary bg-opacity-10 rounded">
                            <div className="h3 fw-bold text-primary">{totalJobs}</div>
                            <div className="small text-muted">Métiers différents</div>
                        </div>
                    </Col>
                    <Col md={6} className="text-center mb-3">
                        <div className="p-3 bg-info bg-opacity-10 rounded">
                            <div className="h3 fw-bold text-info">{totalOffers}</div>
                            <div className="small text-muted">Offres analysées</div>
                        </div>
                    </Col>
                </Row>

                {/* Barre de progression */}
                <div className="mb-4">
                    <ProgressBar className="mb-3" style={{ height: '30px', borderRadius: '15px' }}>
                        <ProgressBar
                            variant="danger"
                            now={highPercent}
                            key={1}
                            label={`${by_risk_level?.["Élevé"]?.jobs || 0}`}
                        />
                        <ProgressBar
                            variant="warning"
                            now={mediumPercent}
                            key={2}
                            label={`${by_risk_level?.["Moyen"]?.jobs || 0}`}
                        />
                        <ProgressBar
                            variant="success"
                            now={lowPercent}
                            key={3}
                            label={`${by_risk_level?.["Faible"]?.jobs || 0}`}
                        />
                    </ProgressBar>
                    <div className="d-flex justify-content-between small text-muted">
                        <span>Élevé ({highPercent.toFixed(1)}%)</span>
                        <span>Moyen ({mediumPercent.toFixed(1)}%)</span>
                        <span>Faible ({lowPercent.toFixed(1)}%)</span>
                    </div>
                </div>

                {/* Détails par niveau */}
                <Row>
                    <Col md={4} className="mb-3">
                        <div className="p-3 border rounded h-100 bg-danger bg-opacity-10">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong className="text-danger">Élevé</strong>
                                <Badge bg="danger" pill>
                                    {by_risk_level?.["Élevé"]?.jobs || 0} métiers
                                </Badge>
                            </div>
                            <div className="small">
                                {by_risk_level?.["Élevé"]?.offers || 0} offres
                            </div>
                            {riskData.risk_categories?.["Élevé"]?.jobs?.[0] && (
                                <div className="mt-2 small text-muted">
                                    Ex: {riskData.risk_categories["Élevé"].jobs[0].job_title}
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col md={4} className="mb-3">
                        <div className="p-3 border rounded h-100 bg-warning bg-opacity-10">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong className="text-warning">Moyen</strong>
                                <Badge bg="warning" pill>
                                    {by_risk_level?.["Moyen"]?.jobs || 0} métiers
                                </Badge>
                            </div>
                            <div className="small">
                                {by_risk_level?.["Moyen"]?.offers || 0} offres
                            </div>
                            {riskData.risk_categories?.["Moyen"]?.jobs?.[0] && (
                                <div className="mt-2 small text-muted">
                                    Ex: {riskData.risk_categories["Moyen"].jobs[0].job_title}
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col md={4} className="mb-3">
                        <div className="p-3 border rounded h-100 bg-success bg-opacity-10">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong className="text-success">Faible</strong>
                                <Badge bg="success" pill>
                                    {by_risk_level?.["Faible"]?.jobs || 0} métiers
                                </Badge>
                            </div>
                            <div className="small">
                                {by_risk_level?.["Faible"]?.offers || 0} offres
                            </div>
                            {riskData.risk_categories?.["Faible"]?.jobs?.[0] && (
                                <div className="mt-2 small text-muted">
                                    Ex: {riskData.risk_categories["Faible"].jobs[0].job_title}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default RiskDistributionChart;