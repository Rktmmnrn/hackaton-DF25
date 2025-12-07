# 🛡️ Safe AI Job Analyzer

> **Protégez les emplois malgaches face à l'automatisation par l'IA**

[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)](https://getbootstrap.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

<div align="center">
  <img src="public/screenshot-dashboard.png" alt="Dashboard Screenshot" width="800"/>
  <p><em>Dashboard d'analyse des risques IA</em></p>
</div>

## 🎯 **Le Problème**

À Madagascar, **30% des métiers traditionnels** risquent l'automatisation d'ici 5 ans, mais aucun outil local n'existe pour :
- 🔍 **Identifier** les métiers à risque
- 🎯 **Proposer** des alternatives concrètes
- 🛡️ **Préparer** les travailleurs avant qu'il ne soit trop tard

## ✨ **Notre Solution**

**Job Analyzer** analyse en temps réel les offres d'emploi d'Asako.mg pour :
- 📊 **Évaluer** le risque d'automatisation (score 1-10)
- 🔄 **Recommander** des métiers similaires à moindre risque
- 🎓 **Guider** les travailleurs vers la reconversion

### **Exemple Concret**
Métier analysé : "MECANICIEN CONDUCTEUR"
→ Score IA : 9/10 ⚠️ RISQUE ÉLEVÉ
→ Alternative : "Coordinateur logistique"
→ Nouveau score : 1/10 ✅ RISQUE FAIBLE
→ Formation : 3 mois maximum

## 🚀 **Fonctionnalités**

### **🔍 Analyse Intelligente**
- **Score IA** : Évaluation 1-10 basée sur 5 critères techniques
- **Niveaux de risque** : Faible (1-3), Moyen (4-6), Élevé (7-10)
- **Données réelles** : 50 offres Asako.mg analysées en temps réel

### **📊 Dashboard Avancé**
- **Graphiques interactifs** : Répartition par risque et secteur
- **Statistiques globales** : Métriques en temps réel
- **Filtres intelligents** : Par secteur, localisation, niveau de risque

### **🔄 Recommandations**
- **Alternatives concrètes** : Métiers similaires à risque réduit
- **Conseils de transition** : Parcours de formation personnalisés
- **Exemples d'offres** : Opportunités disponibles immédiatement

### **📱 Expérience Utilisateur**
- **Recherche intuitive** : Synonymes automatiques ("chauffeur" → "conducteur")
- **Analyse en 1 clic** : Modal détaillée avec toutes les informations
- **Design responsive** : Optimisé pour mobile et desktop

## 🏗️ **Architecture Technique**
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Frontend │ │ API │ │ Données │
│ React 18 │◄──►│ FastAPI │◄──►│ Asako.mg │
│ Bootstrap 5 │ │ Express │ │ 50 offres │
│ Recharts │ │ CORS enabled │ │ JSON format │
└─────────────────┘ └─────────────────┘ └─────────────────┘

### **Stack Technologique**
- **Frontend** : React, Bootstrap, Recharts, Axios, React Router
- **Backend** : FastAPI/Express, Python/Node.js
- **Données** : 50 offres JSON d'Asako.mg
- **Déploiement** : Localhost pour hackathon (prêt pour production)

## 🛠️ **Installation & Démarrage**

### **Prérequis**
- Node.js 18+ et npm/yarn
- Python 3.11+ (pour le backend FastAPI)
- Navigateur moderne (Chrome, Firefox, Edge)

### **1. Cloner le dépôt**
```bash
git clone https://github.com/votre-username/safe-ai-job-analyzer.git
cd safe-ai-job-analyzer
```

### Structure du projet
```bash
Front-End

src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── SearchBar.jsx
│   ├── LoadingError.jsx
│   ├── StatisticsSection.jsx
│   ├── StatisticsCards.jsx
│   ├── JobOffersSection.jsx
│   ├── DemoModal.jsx
│   ├── EmptyState.jsx
│   ├── DashboardSidebar.jsx
│   ├── RiskBarChart.jsx
│   ├── SectorPieChart.jsx
│   ├── JobsByRiskTable.jsx
│   ├── SectorFilter.jsx
│   ├── RecommendationsModal.jsx
│   └── ...
├── pages/
│   ├── HomePage.jsx
│   └── DashboardPage.jsx
├── services/
│   └── api.js
├── App.jsx
├── App.css
└── index.js
```