import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Collapse } from 'react-bootstrap';
import { apiService } from '../services/api';

const JobsByRiskTable = ({ riskLevel = 'all', sector = '' }) => {
    const [jobsData, setJobsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expandedJob, setExpandedJob] = useState(null);

    useEffect(() => {
        const loadJobsData = async () => {
            setLoading(true);
            try {
                const data = await apiService.getJobsByRiskDetailed();
                setJobsData(data);
            } catch (error) {
                console.error('Erreur chargement données jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        loadJobsData();
    }, []);

    // Filtrer les jobs selon les critères
    const getFilteredJobs = () => {
        if (!jobsData || !jobsData.risk_categories) return [];

        let filteredJobs = [];
        const categories = jobsData.risk_categories;

        // Si risque spécifique
        if (riskLevel && riskLevel !== 'all' && riskLevel !== 'tous') {
            const category = riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);
            filteredJobs = categories[category]?.jobs || [];
        } else {
            // Tous les risques
            Object.values(categories).forEach(category => {
                filteredJobs = [...filteredJobs, ...(category.jobs || [])];
            });
        }

        // Filtrer par secteur si spécifié
        if (sector) {
            filteredJobs = filteredJobs.filter(job =>
                job.sector && job.sector.toLowerCase().includes(sector.toLowerCase())
            );
        }

        return filteredJobs;
    };

    const getRiskBadge = (riskLevel) => {
        switch (riskLevel) {
            case 'Élevé': return <Badge bg="danger">Élevé</Badge>;
            case 'Moyen': return <Badge bg="warning">Moyen</Badge>;
            case 'Faible': return <Badge bg="success">Faible</Badge>;
            default: return <Badge bg="secondary">Inconnu</Badge>;
        }
    };

    const filteredJobs = getFilteredJobs();

    if (loading) {
        return (
            <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <div className="mt-3">Chargement des données...</div>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Card.Title className="mb-0">
                        📋 Liste des métiers analysés
                        <Badge bg="secondary" className="ms-2">
                            {filteredJobs.length} métiers
                        </Badge>
                    </Card.Title>
                    <div className="small text-muted">
                        {riskLevel !== 'all' && `Filtré: risque ${riskLevel}`}
                        {sector && ` • secteur: ${sector}`}
                    </div>
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        Aucun métier ne correspond aux filtres sélectionnés.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <Table hover className="mb-0">
                            <thead>
                                <tr>
                                    <th>Métier</th>
                                    <th>Secteur</th>
                                    <th className="text-center">Niveau de risque</th>
                                    <th className="text-center">Score moyen</th>
                                    <th className="text-center">Offres</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredJobs.map((job, index) => {
                                    const riskLevelKey = Object.keys(jobsData.risk_categories || {}).find(
                                        key => jobsData.risk_categories[key].jobs?.some(j => j.job_title === job.job_title)
                                    );

                                    return (
                                        <React.Fragment key={index}>
                                            <tr
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                                            >
                                                <td>
                                                    <strong>{job.job_title}</strong>
                                                    <div className="small text-muted">
                                                        {job.companies?.join(', ') || 'Entreprises non spécifiées'}
                                                    </div>
                                                </td>
                                                <td>{job.sector || 'Non spécifié'}</td>
                                                <td className="text-center">
                                                    {getRiskBadge(riskLevelKey)}
                                                </td>
                                                <td className="text-center">
                                                    <Badge
                                                        bg={job.avg_risk_score >= 7 ? 'danger' :
                                                            job.avg_risk_score >= 4 ? 'warning' : 'success'}
                                                        className="px-3 py-2"
                                                    >
                                                        {parseFloat(job.avg_risk_score || 0).toFixed(1)}/10
                                                    </Badge>
                                                </td>
                                                <td className="text-center">
                                                    <Badge bg="info" pill>{job.offer_count || 0}</Badge>
                                                </td>
                                                <td className="text-center">
                                                    <Button
                                                        variant="link"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setExpandedJob(expandedJob === index ? null : index);
                                                        }}
                                                    >
                                                        {expandedJob === index ? '▲' : '▼'}
                                                    </Button>
                                                </td>
                                            </tr>

                                            {/* Ligne détaillée */}
                                            <tr>
                                                <td colSpan="6" className="p-0 border-0">
                                                    <Collapse in={expandedJob === index}>
                                                        <div>
                                                            <div className="p-3 bg-light border-top">
                                                                <div className="row">
                                                                    <div className="col-md-8">
                                                                        <h6 className="mb-2">💡 Recommandations :</h6>
                                                                        <ul className="mb-3">
                                                                            {(job.suggestions || []).slice(0, 3).map((suggestion, idx) => (
                                                                                <li key={idx} className="small">{suggestion}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <h6 className="mb-2">📊 Statistiques :</h6>
                                                                        <div className="small">
                                                                            <div>Offres trouvées: {job.offer_count || 0}</div>
                                                                            <div>Score min: {job.min_risk_score || job.avg_risk_score || 'N/A'}</div>
                                                                            <div>Score max: {job.max_risk_score || job.avg_risk_score || 'N/A'}</div>
                                                                            {job.time_range_days !== undefined && (
                                                                                <div>Suivi depuis: {job.time_range_days} jours</div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Collapse>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                )}

                {/* Résumé */}
                <div className="mt-4 pt-3 border-top small text-muted">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Légende :</strong>
                            <div className="d-flex gap-2 mt-2">
                                <Badge bg="danger">Élevé (7-10)</Badge>
                                <Badge bg="warning">Moyen (4-6.9)</Badge>
                                <Badge bg="success">Faible (1-3.9)</Badge>
                            </div>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <div>Cliquez sur une ligne pour voir les détails</div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default JobsByRiskTable;