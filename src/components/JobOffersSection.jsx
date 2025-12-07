import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';

const JobOffersSection = ({
    offresReelles,
    selectedOffer,
    handleSelectOffer,
    getRiskColor,
    getRiskText,
    formatDate,
    showAllOffers,
    setShowAllOffers
}) => {
    const [showAnalysisModal, setShowAnalysisModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleAnalyzeClick = (offre) => {
        setSelectedJob(offre);
        handleSelectOffer(offre);
        setShowAnalysisModal(true);
    };

    if (offresReelles.length === 0) return null;

    return (
        <>
            <Row className="mb-4">
                <Col>
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="mb-0">
                                    📋 Offres d'emploi réelles
                                    <Badge bg="secondary" className="ms-2">
                                        {offresReelles.length} offres
                                    </Badge>
                                </h3>
                            </div>

                            <Row>
                                {offresReelles.slice(0, showAllOffers ? offresReelles.length : 6).map((offre, index) => (
                                    <Col key={index} md={6} lg={4} className="mb-4">
                                        <Card className="h-100 border">
                                            <Card.Body>
                                                <Card.Title className="fs-6 mb-2 text-truncate">
                                                    {offre.title}
                                                </Card.Title>

                                                <div className="mb-3">
                                                    <Badge
                                                        bg="custom"
                                                        className="px-3 py-2 custom-risk-badge"
                                                        style={{
                                                            backgroundColor: getRiskColor(offre.ia_risk_score)
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
                                                        className="flex-fill"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(offre.link, '_blank');
                                                        }}
                                                    >
                                                        📄 Voir l'offre
                                                    </Button>
                                                    <Button
                                                        variant="outline-success"
                                                        size="sm"
                                                        className="flex-fill"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAnalyzeClick(offre);
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
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => setShowAllOffers(!showAllOffers)}
                            >
                                {showAllOffers ? "Voir moins d'offres" : "Voir toutes les offres"}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modal d'analyse */}
            <Modal
                show={showAnalysisModal}
                onHide={() => setShowAnalysisModal(false)}
                size="lg"
                centered
                scrollable
            >
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>
                        🔍 Analyse détaillée - {selectedJob?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedJob && (
                        <div className="p-3">
                            {/* Header avec score */}
                            <div className="text-center mb-4">
                                <div className="d-inline-block p-4 rounded mb-3"
                                    style={{
                                        backgroundColor: getRiskColor(selectedJob.ia_risk_score) + '20',
                                        border: `3px solid ${getRiskColor(selectedJob.ia_risk_score)}`,
                                        minWidth: '250px'
                                    }}
                                >
                                    <div className="display-3 fw-bold mb-2">
                                        {selectedJob.ia_risk_score}/10
                                    </div>
                                    <div className="fs-4 fw-bold">
                                        {selectedJob.ia_risk_level || getRiskText(selectedJob.ia_risk_score)}
                                    </div>
                                    <div className="mt-2 small">
                                        Niveau de risque IA
                                    </div>
                                </div>
                            </div>

                            {/* Barre de progression */}
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Faible risque</span>
                                    <span>Risque élevé</span>
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '20px',
                                        backgroundColor: '#e9ecef',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        marginBottom: '10px'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${selectedJob.ia_risk_score * 10}%`,
                                            height: '100%',
                                            backgroundColor: getRiskColor(selectedJob.ia_risk_score),
                                            transition: 'width 0.5s'
                                        }}
                                    />
                                </div>
                                <div className="text-center text-muted small">
                                    Score: {selectedJob.ia_risk_score}/10
                                </div>
                            </div>

                            {/* Informations détaillées */}
                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <Card className="h-100 border-0 shadow-sm">
                                        <Card.Body>
                                            <h6 className="text-primary mb-3">📋 Informations générales</h6>
                                            <div className="mb-2">
                                                <strong>Entreprise:</strong> {selectedJob.company}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Secteur:</strong> {selectedJob.secteur}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Métier:</strong> {selectedJob.metier}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Type de contrat:</strong> {selectedJob.contrat}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="col-md-6">
                                    <Card className="h-100 border-0 shadow-sm">
                                        <Card.Body>
                                            <h6 className="text-primary mb-3">📍 Localisation</h6>
                                            <div className="mb-2">
                                                <strong>Ville/Région:</strong> {selectedJob.location}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Date de publication:</strong> {formatDate(selectedJob.date)}
                                            </div>
                                            <div className="mb-2">
                                                <strong>Source:</strong> Asako.mg
                                            </div>
                                            <div className="mb-2">
                                                <strong>Lien:</strong>{' '}
                                                <a href={selectedJob.link} target="_blank" rel="noopener noreferrer">
                                                    Voir l'annonce originale
                                                </a>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>

                            {/* Explication du risque */}
                            <Card className="border-warning bg-warning bg-opacity-10 mb-4">
                                <Card.Body>
                                    <h6 className="text-warning mb-3">⚠️ Pourquoi ce score ?</h6>
                                    {selectedJob.ia_risk_score >= 7 ? (
                                        <p className="mb-0">
                                            Ce métier présente un <strong>risque élevé</strong> d'automatisation car il combine
                                            des tâches répétitives, une forte exposition aux nouvelles technologies
                                            et des processus standardisables par l'IA.
                                        </p>
                                    ) : selectedJob.ia_risk_score >= 4 ? (
                                        <p className="mb-0">
                                            Ce métier présente un <strong>risque modéré</strong>. Certaines tâches pourraient
                                            être automatisées, mais l'aspect humain reste important pour d'autres
                                            dimensions du travail.
                                        </p>
                                    ) : (
                                        <p className="mb-0">
                                            Ce métier présente un <strong>faible risque</strong> d'automatisation. Il repose
                                            sur des compétences humaines uniques difficiles à reproduire par l'IA,
                                            comme la créativité, l'empathie ou la prise de décision complexe.
                                        </p>
                                    )}
                                </Card.Body>
                            </Card>

                            {/* Actions */}
                            <div className="d-flex gap-3 mt-4">
                                <Button
                                    variant="primary"
                                    className="flex-fill"
                                    onClick={() => window.open(selectedJob.link, '_blank')}
                                >
                                    📋 Postuler à cette offre
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    className="flex-fill"
                                    onClick={() => {
                                        // Tu peux ajouter ici la logique pour les recommandations
                                        alert("Fonctionnalité recommandations à implémenter");
                                    }}
                                >
                                    🔄 Voir des alternatives
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAnalysisModal(false)}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default JobOffersSection;