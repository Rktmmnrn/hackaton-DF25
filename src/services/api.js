// src/services/api.js - Version axios
import axios from 'axios';

const API_BASE_URL = '';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

const apiService = {
    async checkHealth() {
        const response = await api.get('/api/health');
        return response.data;
    },

    async getAllOffers() {
        const response = await api.get('/api/offers');
        return response.data;
    },

    async search(query) {
        const response = await api.get('/api/search', { params: { q: query } });
        return response.data;
    },

    async getStatistics() {
        const response = await api.get('/api/statistics');
        return response.data;
    },

    getRecommendations: async (job) => {
        try {
            const response = await api.get(`/api/recommendations/${job}`);

            // Normaliser les données
            const data = response.data;

            // S'assurer que recommendations est un array
            if (data && !Array.isArray(data.recommendations)) {
                data.recommendations = [];
            }

            return data;
        } catch (error) {
            console.error(`Erreur récupération recommandations pour ${job}:`, error);

            // Retourner un objet structuré même en cas d'erreur
            return {
                current_job: job,
                current_avg_risk: "0",
                total_current_offers: 0,
                recommendations: []
            };
        }
    },

    async getDemo() {
        const response = await api.get('/api/demo');
        return response.data;
    },

    async getJobsByRiskLevel(level = 'all') {
        const response = await api.get(`/api/jobs-by-risk?level=${level}`);
        return response.data;
    },

    async getJobsByRiskDetailed() {
        try {
            const response = await api.get('/api/jobs-by-risk-detailed');
            return response.data;
        } catch (error) {
            console.error('Erreur récupération jobs par risque:', error);
            throw error;
        }
    },

    /**
  * Récupère tous les secteurs
  * GET /api/sectors
  */
    async getSectors() {
        try {
            const response = await api.get('/api/sectors');
            return response.data;
        } catch (error) {
            console.error('Erreur récupération secteurs:', error);
            throw error;
        }
    },

    /**
   * Récupère toutes les localisations
   * GET /api/locations
   */
    async getLocations() {
        try {
            const response = await api.get('/api/locations');
            return response.data;
        } catch (error) {
            console.error('Erreur récupération localisations:', error);
            throw error;
        }
    },

    // Méthodes utilitaires pour les niveaux spécifiques
    async getHighRiskJobs() {
        return this.getJobsByRiskLevel('high');
    },

    async getMediumRiskJobs() {
        return this.getJobsByRiskLevel('medium');
    },

    async getLowRiskJobs() {
        return this.getJobsByRiskLevel('low');
    }
};

export { apiService };