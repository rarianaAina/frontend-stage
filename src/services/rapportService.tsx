import { api } from '../lib/api';

export interface RapportRequest {
  dateDebut: string;
  dateFin: string;
  typeRapport: string;
}

export interface RapportResponse {
  statistiques: {
    totalDemandes: number;
    demandesCreees: number;
    demandesResolues: number;
    tauxResolution: number;
    tempsMoyenReponse: number;
    evolutionMensuelle: Record<string, number>;
  };
  donneesGraphique: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string | string[];
      borderColor?: string;
      backgroundColors?: string[];
    }>;
  };
  performancesConsultants?: Array<{
    consultantId: number;
    consultantNom: string;
    ticketsEnCours: number;
    ticketsClotures: number;
    tauxResolution: number;
  }>;
  satisfaction?: {
    repartition: Record<string, number>;
    moyenne: number;
    totalAvis: number;
  };
}

// Données par défaut en cas d'erreur API
const defaultChartData = {
  labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
  datasets: [
    {
      label: 'Demandes créées',
      data: [0, 0, 0, 0],
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
    },
    {
      label: 'Demandes résolues',
      data: [0, 0, 0, 0],
      backgroundColor: 'rgba(16, 185, 129, 0.7)',
    }
  ]
};

const defaultStats = {
  totalDemandes: 0,
  demandesCreees: 0,
  demandesResolues: 0,
  tauxResolution: 0,
  tempsMoyenReponse: 0,
  evolutionMensuelle: {}
};

export const rapportService = {
  async genererRapport(request: RapportRequest): Promise<RapportResponse> {
    try {
      const response = await api.post('/rapports/generer', request);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error);
      
      // Retourner des données par défaut en cas d'erreur
      return {
        statistiques: defaultStats,
        donneesGraphique: defaultChartData,
        performancesConsultants: [],
        satisfaction: {
          repartition: {},
          moyenne: 0,
          totalAvis: 0
        }
      };
    }
  },

  async exporterPDF(request: RapportRequest): Promise<Blob> {
    try {
      const response = await api.post('/rapports/export/pdf', request, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      throw error;
    }
  },

  async exporterExcel(request: RapportRequest): Promise<Blob> {
    try {
      const response = await api.post('/rapports/export/excel', request, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'export Excel:', error);
      throw error;
    }
  }
};