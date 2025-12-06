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

    async getRecommendations(job) {
        const response = await api.get(`/api/recommendations/${job}`);
        return response.data;
    },

    async getDemo() {
        const response = await api.get('/api/demo');
        return response.data;
    },

    async getJobsByRiskLevel(level = 'all') {
        const response = await api.get(`/api/jobs-by-risk?level=${level}`);
        return response.data;
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