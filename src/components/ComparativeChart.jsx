import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import {
  ComposedChart, Line, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area
} from 'recharts';

const ComparativeChart = ({ riskData }) => {
  if (!riskData || !riskData.risk_categories) return null;

  // Préparer les données comparatives
  const prepareComparativeData = () => {
    const categories = ['Élevé', 'Moyen', 'Faible'];
    
    return categories.map(category => {
      const categoryData = riskData.risk_categories[category];
      if (!categoryData) return null;
      
      const jobs = categoryData.jobs || [];
      const totalOffers = jobs.reduce((sum, job) => sum + (job.offer_count || 0), 0);
      const avgRiskScore = jobs.reduce((sum, job) => 
        sum + parseFloat(job.avg_risk_score || 0), 0) / (jobs.length || 1);
      
      return {
        name: category,
        'Métiers': jobs.length,
        'Offres': totalOffers,
        'Score moyen': avgRiskScore,
        'Compagnies uniques': new Set(jobs.flatMap(job => job.companies || [])).size,
        color: category === 'Élevé' ? '#ef4444' : 
               category === 'Moyen' ? '#f59e0b' : '#10b981'
      };
    }).filter(Boolean);
  };

  const chartData = prepareComparativeData();
  if (chartData.length === 0) return null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-3 border rounded shadow-sm">
          <p className="fw-bold mb-2">Risque {label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="mb-1">
              {entry.name}: {entry.value}
              {entry.name === 'Score moyen' ? '/10' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <Card.Title className="mb-3">
          📊 Comparaison multi-critères
          <Badge bg="info" className="ms-2">
            Analyse avancée
          </Badge>
        </Card.Title>
        
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
              
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Bar
                yAxisId="left"
                dataKey="Métiers"
                name="Nombre de métiers"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              
              <Bar
                yAxisId="left"
                dataKey="Offres"
                name="Nombre d'offres"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
              />
              
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Score moyen"
                name="Score moyen IA"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="Compagnies uniques"
                name="Compagnies uniques"
                fill="#10b981"
                fillOpacity={0.3}
                stroke="#10b981"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 small text-muted">
          <div className="row">
            <div className="col-md-6">
              <Badge bg="primary" className="me-2">Barres bleues</Badge>
              Métiers & Offres
            </div>
            <div className="col-md-6">
              <Badge bg="danger" className="me-2">Ligne rouge</Badge>
              Score IA moyen
            </div>
          </div>
          <div className="mt-2 text-center">
            Analyse complète des risques par niveau
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ComparativeChart;