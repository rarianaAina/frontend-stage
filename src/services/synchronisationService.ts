import { api } from '../lib/api';

export interface SynchronisationResponse {
  status: string;
  message: string;
  timestamp?: string;
}

export interface StatutSynchronisationResponse {
  statut: 'INACTIVE' | 'EN_COURS' | 'ARRET_DEMANDE';
  message: string;
  timestamp?: string;
}

export interface StatutCompletSynchronisation {
  type: string;
  nom: string;
  statut: string;
  enCours: boolean;
  message: string;
}

export interface StatutsGlobaux {
  companies: StatutCompletSynchronisation;
  creditsHoraires: StatutCompletSynchronisation;
  personnes: StatutCompletSynchronisation;
  produits: StatutCompletSynchronisation;
  tickets: StatutCompletSynchronisation;
  solutions: StatutCompletSynchronisation;
  liaisonsSolutionsTickets: StatutCompletSynchronisation;
}

class SynchronisationService {
  
  // === COMPANIES ===
  async demarrerSyncCompanies(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/companies/demarrer');
      return response.data;
    } catch (error: any) {
      console.error('Erreur démarrage sync companies:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors du démarrage de la synchronisation des companies'
      };
    }
  }

  async arreterSyncCompanies(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/companies/arreter');
      return response.data;
    } catch (error: any) {
      console.error('Erreur arrêt sync companies:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors de l\'arrêt de la synchronisation des companies'
      };
    }
  }

  async getStatutSyncCompanies(): Promise<StatutSynchronisationResponse> {
    try {
      const response = await api.get('/synchronisation/companies/statut');
      return response.data;
    } catch (error: any) {
      console.error('Erreur statut sync companies:', error);
      return {
        statut: 'INACTIVE',
        message: 'Erreur lors de la récupération du statut'
      };
    }
  }

  // === CRÉDITS HORAIRES ===
  async demarrerSyncCreditsHoraires(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/credits-horaires/demarrer');
      return response.data;
    } catch (error: any) {
      console.error('Erreur démarrage sync crédits horaires:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors du démarrage de la synchronisation des crédits horaires'
      };
    }
  }

  async arreterSyncCreditsHoraires(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/credits-horaires/arreter');
      return response.data;
    } catch (error: any) {
      console.error('Erreur arrêt sync crédits horaires:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors de l\'arrêt de la synchronisation des crédits horaires'
      };
    }
  }

  async getStatutSyncCreditsHoraires(): Promise<StatutSynchronisationResponse> {
    try {
      const response = await api.get('/synchronisation/credits-horaires/statut');
      return response.data;
    } catch (error: any) {
      console.error('Erreur statut sync crédits horaires:', error);
      return {
        statut: 'INACTIVE',
        message: 'Erreur lors de la récupération du statut'
      };
    }
  }

  // === PERSONNES ===
  async demarrerSyncPersonnes(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/personnes/demarrer');
      return response.data;
    } catch (error: any) {
      console.error('Erreur démarrage sync personnes:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors du démarrage de la synchronisation des personnes'
      };
    }
  }

  async arreterSyncPersonnes(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/personnes/arreter');
      return response.data;
    } catch (error: any) {
      console.error('Erreur arrêt sync personnes:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors de l\'arrêt de la synchronisation des personnes'
      };
    }
  }

  async getStatutSyncPersonnes(): Promise<StatutSynchronisationResponse> {
    try {
      const response = await api.get('/synchronisation/personnes/statut');
      return response.data;
    } catch (error: any) {
      console.error('Erreur statut sync personnes:', error);
      return {
        statut: 'INACTIVE',
        message: 'Erreur lors de la récupération du statut'
      };
    }
  }

  // === PRODUITS ===
  async demarrerSyncProduits(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/produits/demarrer');
      return response.data;
    } catch (error: any) {
      console.error('Erreur démarrage sync produits:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors du démarrage de la synchronisation des produits'
      };
    }
  }

  async arreterSyncProduits(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/produits/arreter');
      return response.data;
    } catch (error: any) {
      console.error('Erreur arrêt sync produits:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors de l\'arrêt de la synchronisation des produits'
      };
    }
  }

  async getStatutSyncProduits(): Promise<StatutSynchronisationResponse> {
    try {
      const response = await api.get('/synchronisation/produits/statut');
      return response.data;
    } catch (error: any) {
      console.error('Erreur statut sync produits:', error);
      return {
        statut: 'INACTIVE',
        message: 'Erreur lors de la récupération du statut'
      };
    }
  }

  // === TICKETS ===
  async demarrerSyncTickets(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/tickets/demarrer');
      return response.data;
    } catch (error: any) {
      console.error('Erreur démarrage sync tickets:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors du démarrage de la synchronisation des tickets'
      };
    }
  }

  async arreterSyncTickets(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/tickets/arreter');
      return response.data;
    } catch (error: any) {
      console.error('Erreur arrêt sync tickets:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors de l\'arrêt de la synchronisation des tickets'
      };
    }
  }

  async getStatutSyncTickets(): Promise<StatutSynchronisationResponse> {
    try {
      const response = await api.get('/synchronisation/tickets/statut');
      return response.data;
    } catch (error: any) {
      console.error('Erreur statut sync tickets:', error);
      return {
        statut: 'INACTIVE',
        message: 'Erreur lors de la récupération du statut'
      };
    }
  }

  // === SOLUTIONS ===
  async demarrerSyncSolutions(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/solutions/demarrer');
      return response.data;
    } catch (error: any) {
      console.error('Erreur démarrage sync solutions:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors du démarrage de la synchronisation des solutions'
      };
    }
  }

  async arreterSyncSolutions(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/solutions/arreter');
      return response.data;
    } catch (error: any) {
      console.error('Erreur arrêt sync solutions:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors de l\'arrêt de la synchronisation des solutions'
      };
    }
  }

  async getStatutSyncSolutions(): Promise<StatutSynchronisationResponse> {
    try {
      const response = await api.get('/synchronisation/solutions/statut');
      return response.data;
    } catch (error: any) {
      console.error('Erreur statut sync solutions:', error);
      return {
        statut: 'INACTIVE',
        message: 'Erreur lors de la récupération du statut'
      };
    }
  }

  // === LIAISONS SOLUTIONS-TICKETS ===
  async demarrerSyncLiaisonsSolutionsTickets(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/liaisons-solutions-tickets/demarrer');
      return response.data;
    } catch (error: any) {
      console.error('Erreur démarrage sync liaisons solutions-tickets:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors du démarrage de la synchronisation des liaisons solutions-tickets'
      };
    }
  }

  async arreterSyncLiaisonsSolutionsTickets(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/liaisons-solutions-tickets/arreter');
      return response.data;
    } catch (error: any) {
      console.error('Erreur arrêt sync liaisons solutions-tickets:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors de l\'arrêt de la synchronisation des liaisons solutions-tickets'
      };
    }
  }

  async getStatutSyncLiaisonsSolutionsTickets(): Promise<StatutSynchronisationResponse> {
    try {
      const response = await api.get('/synchronisation/liaisons-solutions-tickets/statut');
      return response.data;
    } catch (error: any) {
      console.error('Erreur statut sync liaisons solutions-tickets:', error);
      return {
        statut: 'INACTIVE',
        message: 'Erreur lors de la récupération du statut'
      };
    }
  }

  // === SYNCHRONISATIONS GLOBALES ===
  async demarrerToutesSynchronisations(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/tout/demarrer');
      return response.data;
    } catch (error: any) {
      console.error('Erreur démarrage toutes les syncs:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors du démarrage de toutes les synchronisations'
      };
    }
  }

  async arreterToutesSynchronisations(): Promise<SynchronisationResponse> {
    try {
      const response = await api.post('/synchronisation/tout/arreter');
      return response.data;
    } catch (error: any) {
      console.error('Erreur arrêt toutes les syncs:', error);
      return {
        status: 'ERREUR',
        message: error.response?.data?.message || 'Erreur lors de l\'arrêt de toutes les synchronisations'
      };
    }
  }

  async getStatutToutesSynchronisations(): Promise<StatutsGlobaux> {
    try {
      const response = await api.get('/synchronisation/tout/statut');
      return response.data;
    } catch (error: any) {
      console.error('Erreur statut toutes les syncs:', error);
      // Retourner un objet par défaut en cas d'erreur
      return this.creerStatutsParDefaut();
    }
  }

  // === MÉTHODES UTILITAIRES ===
  
  private creerStatutsParDefaut(): StatutsGlobaux {
    const statutInactif = {
      statut: 'INACTIVE',
      enCours: false,
      message: 'Erreur de récupération du statut'
    };

    return {
      companies: { type: 'companies', nom: 'Companies', ...statutInactif },
      creditsHoraires: { type: 'credits-horaires', nom: 'Crédits horaires', ...statutInactif },
      personnes: { type: 'personnes', nom: 'Personnes', ...statutInactif },
      produits: { type: 'produits', nom: 'Produits', ...statutInactif },
      tickets: { type: 'tickets', nom: 'Tickets', ...statutInactif },
      solutions: { type: 'solutions', nom: 'Solutions', ...statutInactif },
      liaisonsSolutionsTickets: { type: 'liaisons-solutions-tickets', nom: 'Liaisons solutions-tickets', ...statutInactif }
    };
  }

  // Méthode générique pour obtenir le statut d'un type spécifique
  async getStatutSync(type: string): Promise<StatutSynchronisationResponse> {
    try {
      const response = await api.get(`/synchronisation/${type}/statut`);
      return response.data;
    } catch (error: any) {
      console.error(`Erreur statut sync ${type}:`, error);
      return {
        statut: 'INACTIVE',
        message: 'Erreur lors de la récupération du statut'
      };
    }
  }

  // Méthode pour vérifier si au moins une synchronisation est en cours
  async estAuMoinsUneSyncEnCours(): Promise<boolean> {
    try {
      const statuts = await this.getStatutToutesSynchronisations();
      return Object.values(statuts).some(statut => statut.enCours);
    } catch (error) {
      console.error('Erreur vérification sync en cours:', error);
      return false;
    }
  }
}

export const synchronisationService = new SynchronisationService();