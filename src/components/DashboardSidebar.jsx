import React from 'react';
import { Nav } from 'react-bootstrap';

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', title: 'Aperçu', icon: '📊' },
    { id: 'statistics', title: 'Statistiques', icon: '📈' },
    { id: 'jobs', title: 'Métiers', icon: '📋' },
    { id: 'insights', title: 'Insights', icon: '💡' },
  ];

  return (
    <div className="dashboard-sidebar bg-light border-end" style={{ minHeight: 'calc(100vh - 76px)' }}>
      <div className="p-3 border-bottom">
        <h5 className="mb-0">Navigation</h5>
        <small className="text-muted">Tableau de bord</small>
      </div>
      
      <Nav className="flex-column p-3">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              className={`btn w-100 text-start mb-2 border-0 ${isActive ? 'bg-primary text-white' : 'text-dark'}`}
              style={{
                padding: '12px 16px',
                transition: 'all 0.2s',
                borderRadius: '8px'
              }}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="d-flex align-items-center">
                <span className="fs-5 me-3">{item.icon}</span>
                <div>
                  <div className="fw-medium">{item.title}</div>
                </div>
              </div>
            </button>
          );
        })}
        
        {/* Section infos */}
        <div className="mt-4 pt-3 border-top">
          <div className="small text-muted mb-2">🔄 Données temps réel</div>
          <div className="small text-muted">📅 Mis à jour automatiquement</div>
        </div>
      </Nav>
    </div>
  );
};

export default DashboardSidebar;