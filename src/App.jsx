import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { apiService } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import des composants
import Header from './components/Header';
import Footer from './components/Footer';

// Import des pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [apiHealth, setApiHealth] = useState(null);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const healthData = await apiService.checkHealth();
        setApiHealth(healthData);
      } catch (err) {
        console.error('API health check failed:', err);
      }
    };

    checkApiHealth();
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header apiHealth={apiHealth} />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer apiHealth={apiHealth} />
      </div>
    </Router>
  );
}

export default App;