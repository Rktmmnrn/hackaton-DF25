import React, { useMemo } from 'react';
import { Card, Badge } from 'react-bootstrap';
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    Tooltip, Legend
} from 'recharts';

const SectorPieChart = ({ riskData }) => {
    // Extraire et agréger les données par secteur
    const sectorData = useMemo(() => {
        if (!riskData || !riskData.risk_categories) return [];

        const sectorMap = {};

        // Parcourir tous les jobs de tous les niveaux de risque
        Object.values(riskData.risk_categories).forEach(category => {
            category.jobs?.forEach(job => {
                const sector = job.sector || 'Non spécifié';
                if (!sectorMap[sector]) {
                    sectorMap[sector] = {
                        name: sector,
                        value: 0,
                        jobs: new Set()
                    };
                }
                sectorMap[sector].value += job.offer_count || 1;
                sectorMap[sector].jobs.add(job.job_title);
            });
        });

        // Convertir en array et trier
        return Object.values(sectorMap)
            .map(item => ({
                ...item,
                jobCount: item.jobs.size
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8); // Top 8 secteurs
    }, [riskData]);

    // Couleurs pour le graphique
    const COLORS = [
        '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b',
        '#ef4444', '#ec4899', '#14b8a6', '#84cc16',
        '#f97316', '#6366f1'
    ];

    if (sectorData.length === 0) return null;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip bg-white p-3 border rounded shadow-sm">
                    <p className="fw-bold mb-1">{data.name}</p>
                    <p className="mb-1">{data.value} offres</p>
                    <p className="mb-0 small text-muted">{data.jobCount} métiers différents</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="border-0 shadow-sm h-100">
            <Card.Body>
                <Card.Title className="mb-3">
                    🥧 Répartition par secteur
                    <Badge bg="secondary" className="ms-2">
                        Top {sectorData.length}
                    </Badge>
                </Card.Title>

                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={sectorData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {sectorData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-3">
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        {sectorData.slice(0, 5).map((sector, index) => (
                            <Badge
                                key={index}
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                className="px-3 py-2"
                            >
                                {sector.name}: {sector.value}
                            </Badge>
                        ))}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SectorPieChart;