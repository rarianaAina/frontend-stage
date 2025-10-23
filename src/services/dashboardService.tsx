import { api } from '../lib/api';
import { DashboardStats, StatisticItem, CreditHoraire, ChartData } from '../types/dashboard';

export const dashboardService = {
  async getDashboardData(userId: string): Promise<DashboardStats> {
    try {
      const response = await api.get(`/dashboard/client/${userId}`);
      console.log('Données brutes du backend:', response.data);
      
      // Transformer les données du backend vers le format frontend
      return transformBackendData(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des données du dashboard:', error);
      throw error;
    }
  },

  async getChartData(userId: string, period: string = '6months'): Promise<any> {
    try {
      const response = await api.get(`/dashboard/client/${userId}/chart?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des données du graphique:', error);
      throw error;
    }
  },

  async getCreditsHoraires(companyId: string): Promise<CreditHoraire[]> {
    try {
      const response = await api.get(`/api/credits-horaires/company/${companyId}`);
      console.log('Données brutes des crédits horaires:', response.data);
      return transformCreditsHoraires(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des crédits horaires:', error);
      throw error;
    }
  },

  async getCreditsHorairesParProduit(companyId: string, produitId: string): Promise<CreditHoraire[]> {
    try {
      const response = await api.get(`/creditsHoraires/company/${companyId}/produit/${produitId}`);
      console.log('Données brutes des crédits horaires par produit:', response.data);
      return transformCreditsHoraires(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des crédits horaires par produit:', error);
      throw error;
    }
  },

  async getCreditsHorairesActifs(companyId: string): Promise<CreditHoraire[]> {
    try {
      const response = await api.get(`/api/credits-horaires/company/${companyId}/actifs`);
      console.log('Données brutes des crédits horaires actifs:', response.data);
      return transformCreditsHoraires(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des crédits horaires actifs:', error);
      throw error;
    }
  },

  async getCreditsHorairesActifsParProduit(companyId: string, produitId: string): Promise<CreditHoraire[]> {
    try {
      const response = await api.get(`/api/credits-horaires/company/${companyId}/produit/${produitId}/actifs`);
      console.log('Données brutes des crédits horaires actifs par produit:', response.data);
      return transformCreditsHoraires(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des crédits horaires actifs par produit:', error);
      throw error;
    }
  },

  async getHeuresRestantesPourProduit(companyId: string, produitId: string): Promise<number> {
    try {
      const response = await api.get(`/api/credits-horaires/company/${companyId}/produit/${produitId}/heures-restantes`);
      console.log('Heures restantes pour le produit:', response.data);
      return response.data.heuresRestantes || 0;
    } catch (error) {
      console.error('Erreur lors du chargement des heures restantes:', error);
      return 0;
    }
  },

  async getHeuresRestantesTotal(companyId: string): Promise<number> {
    try {
      const response = await api.get(`/api/credits-horaires/company/${companyId}/heures-restantes-total`);
      console.log('Heures restantes totales:', response.data);
      return response.data.heuresRestantesTotal || 0;
    } catch (error) {
      console.error('Erreur lors du chargement des heures restantes totales:', error);
      return 0;
    }
  },

  async consommerHeures(companyId: string, produitId: string, heures: number): Promise<any> {
    try {
      const response = await api.post(`/api/credits-horaires/company/${companyId}/produit/${produitId}/consommer`, {
        heures: heures
      });
      console.log('Heures consommées avec succès:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la consommation d\'heures:', error);
      throw error;
    }
  }
};

// Fonction de transformation des données backend -> frontend
const transformBackendData = (backendData: any): DashboardStats => {
  console.log('Transformation des données backend:', backendData);
  
  return {
    repartitionStatut: transformToStatisticItems(backendData.ticketsParStatut),
    dureeTraitement: transformDureeTraitement(backendData.dureesMoyennes),
    repartitionProduit: transformToStatisticItems(backendData.ticketsParProduit),
    creditsHoraires: transformCreditsHoraires(backendData.creditsHoraires),
    chartData: transformChartData(backendData)
  };
};

// Transformer Map<string, number> en StatisticItem[]
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

// Transformer les durées de traitement
const transformDureeTraitement = (dureesMoyennes: any): StatisticItem[] => {
  if (!dureesMoyennes) {
    return [
      { label: 'Temps moyen de résolution', value: '0 jours' },
      { label: 'Tickets en retard', value: '0 / 0', color: '#10b981' }
    ];
  }
  
  return [
    {
      label: 'Temps moyen de résolution',
      value: `${dureesMoyennes.moyenneJours || 0} jours`
    },
    {
      label: 'Tickets rapides (<24h)',
      value: dureesMoyennes.rapides || 0
    },
    {
      label: 'Tickets normaux (1-3 jours)',
      value: dureesMoyennes.normaux || 0
    },
    {
      label: 'Tickets lents (>3 jours)',
      value: dureesMoyennes.lents || 0
    }
  ];
};

// Transformer les crédits horaires - NOUVELLE VERSION
const transformCreditsHoraires = (creditsBackend: any[]): CreditHoraire[] => {
  if (!creditsBackend || !Array.isArray(creditsBackend)) {
    console.warn('Crédits horaires manquants ou invalides:', creditsBackend);
    return [];
  }
  
  return creditsBackend.map(credit => ({
    id: credit.id,
    product: credit.nomProduit || 'Non spécifié',
    produitId: credit.produitId,
    company: credit.nomCompany || '',
    periodeDebut: credit.periodeDebut,
    periodeFin: credit.periodeFin,
    initial: credit.heuresAllouees || 0,
    used: credit.heuresConsommees || 0,
    remaining: credit.heuresRestantes || 0,
    pourcentageUtilisation: credit.pourcentageUtilisation || 0,
    actif: credit.actif || false,
    expire: credit.expire || false
  }));
};

// Transformer les données du graphique
const transformChartData = (data: any): ChartData => {
  // Si le backend fournit déjà des données de graphique
  if (data.chartData) {
    return data.chartData;
  }
  
  // Sinon, créer des données par défaut basées sur les tickets
  const ticketsParStatut = data.ticketsParStatut || {};
  const totalTickets = Object.values(ticketsParStatut).reduce((sum: number, count: any) => sum + Number(count), 0);
  
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