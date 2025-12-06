import axios from 'axios';

// Configuration de base - À ADAPTER selon votre environnement
const API_BASE_URL = ''; // proxy dans vite.config.js redirige vers le backend

// Créer une instance axios avec configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 secondes timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Service API centralisé
export const apiService = {
    /**
     * Vérifie que l'API fonctionne
     * GET /api/health
     */
    checkHealth: async () => {
        try {
            const response = await api.get('/api/health');
            return response.data;
        } catch (error) {
            console.error('Erreur API health:', error);
            throw error;
        }
    },

    /**
     * Récupère toutes les offres (50 offres)
     * GET /api/offers
     */
    getAllOffers: async () => {
        try {
            const response = await api.get('/api/offers');
            return response.data;
        } catch (error) {
            console.error('Erreur récupération offres:', error);
            throw error;
        }
    },

    /**
     * Récupère les offres pour un métier spécifique
     * GET /api/offers/{job}
     * Ex: /api/offers/chauffeur
     */
    getOffersByJob: async (job) => {
        try {
            const response = await api.get(`/api/offers/${job}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur récupération offres pour ${job}:`, error);
            throw error;
        }
    },

    /**
     * Récupère les recommandations pour un métier
     * GET /api/recommendations/{job}
     * Ex: /api/recommendations/chauffeur
     */
    getRecommendations: async (job) => {
        try {
            const response = await api.get(`/api/recommendations/${job}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur récupération recommandations pour ${job}:`, error);
            throw error;
        }
    },

    /**
     * Analyse complète des risques
     * GET /api/risk-analysis
     */
    getRiskAnalysis: async () => {
        try {
            const response = await api.get('/api/risk-analysis');
            return response.data;
        } catch (error) {
            console.error('Erreur analyse risque:', error);
            throw error;
        }
    },

    /**
     * Recherche avancée avec filtres
     * GET /api/search?q=chauffeur&risk=Élevé&sector=Automobile
     */
    search: async (query, filters = {}) => {
        try {
            const params = {
                q: query,
                ...filters
            };
            const response = await api.get('/api/search', { params });
            return response.data;
        } catch (error) {
            console.error('Erreur recherche:', error);
            throw error;
        }
    },

    /**
     * Exemple parfait pour la démo
     * GET /api/demo
     */
    getDemo: async () => {
        try {
            const response = await api.get('/api/demo');
            return response.data;
        } catch (error) {
            console.error('Erreur démo:', error);
            throw error;
        }
    },

    /**
     * Statistiques globales
     * GET /api/statistics
     */
    getStatistics: async () => {
        try {
            const response = await api.get('/api/statistics');
            return response.data;
        } catch (error) {
            console.error('Erreur statistiques:', error);
            throw error;
        }
    },
};

export default apiService;