import React, { useState, useEffect } from 'react';
import { Card, Form, Badge, Button } from 'react-bootstrap';
import { apiService } from '../services/api';

const SectorFilter = ({ onFilterChange }) => {
    const [sectors, setSectors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedRiskLevel, setSelectedRiskLevel] = useState('');

    useEffect(() => {
        const loadSectors = async () => {
            setLoading(true);
            try {
                const data = await apiService.getSectors();
                setSectors(data.sectors || []);
            } catch (error) {
                console.error('Erreur chargement secteurs:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSectors();
    }, []);

    const handleSectorChange = (e) => {
        const sector = e.target.value;
        setSelectedSector(sector);
        if (onFilterChange) {
            onFilterChange({ sector, riskLevel: selectedRiskLevel });
        }
    };

    const handleRiskLevelChange = (level) => {
        setSelectedRiskLevel(level);
        if (onFilterChange) {
            onFilterChange({ sector: selectedSector, riskLevel: level });
        }
    };

    const clearFilters = () => {
        setSelectedSector('');
        setSelectedRiskLevel('');
        if (onFilterChange) {
            onFilterChange({ sector: '', riskLevel: '' });
        }
    };

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <Card.Title className="mb-3">🔍 Filtres avancés</Card.Title>

                {/* Filtre par niveau de risque */}
                <div className="mb-4">
                    <h6 className="mb-2">Niveau de risque :</h6>
                    <div className="d-flex flex-wrap gap-2">
                        {['Élevé', 'Moyen', 'Faible', 'Tous'].map((level) => (
                            <Button
                                key={level}
                                variant={selectedRiskLevel === level.toLowerCase() ? "primary" : "outline-primary"}
                                size="sm"
                                onClick={() => handleRiskLevelChange(level.toLowerCase())}
                            >
                                {level}
                                {level === 'Élevé' && <Badge bg="danger" className="ms-1">!</Badge>}
                                {level === 'Moyen' && <Badge bg="warning" className="ms-1">~</Badge>}
                                {level === 'Faible' && <Badge bg="success" className="ms-1">✓</Badge>}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Filtre par secteur */}
                <div className="mb-3">
                    <h6 className="mb-2">Secteur d'activité :</h6>
                    {loading ? (
                        <div className="text-muted small">Chargement des secteurs...</div>
                    ) : (
                        <Form.Select
                            value={selectedSector}
                            onChange={handleSectorChange}
                            size="sm"
                        >
                            <option value="">Tous les secteurs</option>
                            {sectors.map((sector, index) => (
                                <option key={index} value={sector}>
                                    {sector}
                                </option>
                            ))}
                        </Form.Select>
                    )}
                    <div className="mt-2 small text-muted">
                        {sectors.length} secteurs disponibles
                    </div>
                </div>

                {/* Filtres appliqués */}
                {(selectedSector || selectedRiskLevel) && (
                    <div className="mt-3 pt-3 border-top">
                        <h6 className="mb-2">Filtres actifs :</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {selectedRiskLevel && (
                                <Badge bg="info" className="p-2">
                                    Risque: {selectedRiskLevel}
                                </Badge>
                            )}
                            {selectedSector && (
                                <Badge bg="secondary" className="p-2">
                                    Secteur: {selectedSector}
                                </Badge>
                            )}
                            <Button
                                variant="link"
                                size="sm"
                                className="p-0 text-danger"
                                onClick={clearFilters}
                            >
                                ✕ Tout effacer
                            </Button>
                        </div>
                    </div>
                )}

                {/* Info */}
                <div className="mt-4 pt-3 border-top small text-muted">
                    <strong>Astuce :</strong> Combinez les filtres pour affiner votre analyse.
                </div>
            </Card.Body>
        </Card>
    );
};

export default SectorFilter;