import { api } from '../lib/api';
import { DashboardAdminData, ConsultantPerformance, StatistiquesGlobales, DureeTraitement, TicketRecent, ChartData, StatisticItem } from '../types/dashboard';

export const adminDashboardService = {
  async getDashboardData(): Promise<DashboardAdminData> {
    try {
      const response = await api.get('/dashboard/admin');
      console.log('Données brutes du dashboard admin:', response.data);
      
      return transformAdminBackendData(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des données du dashboard admin:', error);
      throw error;
    }
  },

  async getChartData(): Promise<ChartData> {
    try {
      const response = await api.get('/dashboard/admin/chart');
      return transformAdminChartData(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des données du graphique admin:', error);
      throw error;
    }
  },

  async getConsultantsPerformance(): Promise<ConsultantPerformance[]> {
    try {
      const response = await api.get('/dashboard/admin/performance-consultants');
      return transformConsultantsPerformance(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des performances des consultants:', error);
      throw error;
    }
  }
};

// Transformation des données backend admin -> frontend
const transformAdminBackendData = (backendData: any): DashboardAdminData => {
  console.log('Transformation des données admin backend:', backendData);
  
  return {
    statistiquesGlobales: transformStatistiquesGlobales(backendData.statistiquesGlobales),
    ticketsParStatut: transformToStatisticItems(backendData.ticketsParStatut),
    ticketsParPriorite: transformToStatisticItems(backendData.ticketsParPriorite),
    ticketsParProduit: transformToStatisticItems(backendData.ticketsParProduit),
    ticketsParCompany: transformToStatisticItems(backendData.ticketsParCompany),
    performancesConsultants: transformConsultantsPerformance(backendData.performancesConsultants),
    ticketsRecents: transformTicketsRecents(backendData.ticketsRecents),
    dureesMoyennes: transformDureesMoyennes(backendData.dureesMoyennes),
    chartData: transformAdminChartData(backendData.chartData || backendData)
  };
};

// Transformer les statistiques globales
const transformStatistiquesGlobales = (data: any): StatistiquesGlobales => {
  if (!data) {
    return {
      totalTickets: 0,
      ticketsOuverts: 0,
      ticketsEnCours: 0,
      ticketsClotures: 0,
      totalCompanies: 0,
      totalConsultants: 0,
      interventionsPlanifiees: 0
    };
  }
  
  return {
    totalTickets: data.totalTickets || 0,
    ticketsOuverts: data.ticketsOuverts || 0,
    ticketsEnCours: data.ticketsEnCours || 0,
    ticketsClotures: data.ticketsClotures || 0,
    totalCompanies: data.totalCompanies || 0,
    totalConsultants: data.totalConsultants || 0,
    interventionsPlanifiees: data.interventionsPlanifiees || 0
  };
};

// Transformer les performances des consultants
const transformConsultantsPerformance = (data: any): ConsultantPerformance[] => {
  if (!data || typeof data !== 'object') {
    return [];
  }
  
  // Si c'est un objet Map, convertir en tableau
  if (!Array.isArray(data)) {
    return Object.values(data).map((perf: any) => ({
      consultantId: perf.consultantId || 0,
      consultantNom: perf.consultantNom || 'Inconnu',
      ticketsEnCours: perf.ticketsEnCours || 0,
      ticketsClotures: perf.ticketsClotures || 0,
      interventionsRealisees: perf.interventionsRealisees || 0,
      tauxResolution: perf.tauxResolution || 0,
      dureeMoyenneTraitement: perf.dureeMoyenneTraitement || 0
    }));
  }
  
  return data.map((perf: any) => ({
    consultantId: perf.consultantId || 0,
    consultantNom: perf.consultantNom || 'Inconnu',
    ticketsEnCours: perf.ticketsEnCours || 0,
    ticketsClotures: perf.ticketsClotures || 0,
    interventionsRealisees: perf.interventionsRealisees || 0,
    tauxResolution: perf.tauxResolution || 0,
    dureeMoyenneTraitement: perf.dureeMoyenneTraitement || 0
  }));
};

// Transformer les tickets récents
const transformTicketsRecents = (data: any[]): TicketRecent[] => {
  if (!Array.isArray(data)) {
    return [];
  }
  
  return data.map(ticket => ({
    id: ticket.id || 0,
    reference: ticket.reference || '',
    titre: ticket.titre || '',
    statut: ticket.statut || '',
    priorite: ticket.priorite || '',
    nomCompany: ticket.nomCompany || '',
    nomProduit: ticket.nomProduit || '',
    consultantNom: ticket.consultantNom || '',
    dateCreation: ticket.dateCreation || ''
  }));
};

// Transformer les durées moyennes
const transformDureesMoyennes = (data: any): DureeTraitement => {
  if (!data) {
    return {
      moyenneHeures: 0,
      moyenneJours: 0,
      rapides: 0,
      normaux: 0,
      lents: 0
    };
  }
  
  return {
    moyenneHeures: data.moyenneHeures || 0,
    moyenneJours: data.moyenneJours || 0,
    rapides: data.rapides || 0,
    normaux: data.normaux || 0,
    lents: data.lents || 0
  };
};

// Transformer les données de graphique admin
const transformAdminChartData = (data: any): ChartData => {
  // Si le backend fournit déjà des données structurées
  if (data.labels && data.datasets) {
    return {
      labels: data.labels,
      datasets: data.datasets.map((dataset: any) => ({
        label: dataset.label || 'Données',
        data: dataset.data || [],
        borderColor: dataset.borderColor || '#000',
        backgroundColor: dataset.backgroundColor || 'rgba(0, 0, 0, 0.1)',
        tension: dataset.tension || 0.4,
        borderWidth: dataset.borderWidth || 3,
      }))
    };
  }
  
  // Données par défaut basées sur la structure backend
  const ticketsParStatut = data.ticketsParStatut || {};
  
  return {
    labels: Object.keys(ticketsParStatut),
    datasets: [
      {
        label: 'Tickets par statut',
        data: Object.values(ticketsParStatut).map(count => Number(count)),
        borderColor: '#000',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };
};

// Réutiliser cette fonction depuis votre service existant
const transformToStatisticItems = (data: any): StatisticItem[] => {
  if (!data || typeof data !== 'object') {
    console.warn('Données manquantes pour la transformation:', data);
    return [];
  }
  
  return Object.entries(data).map(([label, value]) => ({
    label,
    value: value as number
  }));
};