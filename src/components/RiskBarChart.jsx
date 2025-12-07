import React from 'react';
import { Card } from 'react-bootstrap';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const RiskBarChart = ({ riskData }) => {
    if (!riskData || !riskData.totals?.by_risk_level) return null;

    const { by_risk_level } = riskData.totals;

    // Préparer les données pour le graphique
    const chartData = [
        {
            name: 'Élevé',
            métiers: by_risk_level['Élevé']?.jobs || 0,
            offres: by_risk_level['Élevé']?.offers || 0,
            fill: '#ef4444' // Rouge
        },
        {
            name: 'Moyen',
            métiers: by_risk_level['Moyen']?.jobs || 0,
            offres: by_risk_level['Moyen']?.offers || 0,
            fill: '#f59e0b' // Orange
        },
        {
            name: 'Faible',
            métiers: by_risk_level['Faible']?.jobs || 0,
            offres: by_risk_level['Faible']?.offers || 0,
            fill: '#10b981' // Vert
        }
    ];

    return (
        <Card className="border-0 shadow-sm h-100">
            <Card.Body>
                <Card.Title className="mb-3">📊 Métiers par niveau de risque</Card.Title>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                formatter={(value, name) => {
                                    if (name === 'métiers') return [`${value} métiers`, 'Nombre de métiers'];
                                    if (name === 'offres') return [`${value} offres`, "Nombre d'offres"];
                                    return value;
                                }}
                                labelFormatter={(label) => `Risque ${label}`}
                            />
                            <Legend />
                            <Bar
                                dataKey="métiers"
                                name="Nombre de métiers"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="offres"
                                name="Nombre d'offres"
                                fill="#8b5cf6"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-3 small text-muted text-center">
                    Comparaison entre le nombre de métiers différents et le nombre d'offres totales par niveau de risque
                </div>
            </Card.Body>
        </Card>
    );
};

export default RiskBarChart;