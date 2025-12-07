import React from 'react';
import { Card } from 'react-bootstrap';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend
} from 'recharts';

const RiskRadarChart = ({ riskData }) => {
    if (!riskData || !riskData.jobs_by_risk?.jobs) return null;

    // Préparer les données pour les métiers à risque moyen et élevé
    const prepareRadarData = () => {
        const allJobs = [];

        // Combiner les jobs de tous les niveaux
        if (riskData.jobs_by_risk?.high) {
            allJobs.push(...riskData.jobs_by_risk.high);
        }
        if (riskData.jobs_by_risk?.medium) {
            allJobs.push(...riskData.jobs_by_risk.medium);
        }
        if (riskData.jobs_by_risk?.low) {
            allJobs.push(...riskData.jobs_by_risk.low);
        }

        // Prendre les 8 métiers avec le plus d'offres
        const topJobs = allJobs
            .sort((a, b) => (b.count || 0) - (a.count || 0))
            .slice(0, 8);

        return topJobs.map(job => ({
            subject: job.job_title?.substring(0, 15) || 'Métier',
            'Score moyen': parseFloat(job.avg_risk_score || 0),
            'Nombre offres': job.count || 1,
            fullName: job.job_title || 'Métier non spécifié',
            riskLevel: job.risk_level || 'Inconnu'
        }));
    };

    const radarData = prepareRadarData();
    if (radarData.length === 0) return null;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip bg-white p-3 border rounded shadow-sm">
                    <p className="fw-bold mb-1">{data.fullName}</p>
                    <p className="mb-1">Score IA: {data['Score moyen'].toFixed(1)}/10</p>
                    <p className="mb-1">Offres: {data['Nombre offres']}</p>
                    <p className="mb-0 small text-muted">Niveau: {data.riskLevel}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="border-0 shadow-sm h-100">
            <Card.Body>
                <Card.Title className="mb-3">📈 Scores IA par métier</Card.Title>

                <div style={{ width: '100%', height: 320 }}>
                    <ResponsiveContainer>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis
                                angle={30}
                                domain={[0, 10]}
                                tickCount={6}
                            />

                            <Radar
                                name="Score IA moyen"
                                dataKey="Score moyen"
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.6}
                            />

                            <Radar
                                name="Nombre d'offres"
                                dataKey="Nombre offres"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.4}
                            />

                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-3 small text-muted">
                    <div className="row">
                        <div className="col-6">
                            <span className="badge bg-primary me-1">●</span>
                            Score IA (0-10)
                        </div>
                        <div className="col-6">
                            <span className="badge bg-success me-1">●</span>
                            Nombre d'offres
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        Plus le score est élevé, plus le métier est à risque
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default RiskRadarChart;