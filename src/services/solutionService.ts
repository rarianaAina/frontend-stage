import { Solution } from '../types/solution/solution';
import { api } from '../lib/api';

export interface SolutionReponseData {
  solutionId: number;
  estValide: boolean;
  commentaire?: string;
  canalReponse?: string;
  utilisateurId?: number;
}

export interface ReponseSolution {
  id: number;
  solutionId: number;
  estValide: boolean;
  commentaire?: string;
  dateReponse: string;
  creeParId: number;
  creeParNom: string;
  canalReponse: string;
}

export interface StatistiquesReponse {
  solutionId: number;
  totalReponses: number;
  reponsesValides: number;
  reponsesRejetees: number;
  tauxValidation: number;
}

export const solutionService = {
  // API pour créer une réponse (remplace valider/rejeter)
  async creerReponse(data: SolutionReponseData): Promise<ReponseSolution> {
    try {
      const response = await api.post(`/solutions/${data.solutionId}/reponses`, {
        estValide: data.estValide,
        commentaire: data.commentaire,
        utilisateurId: data.utilisateurId,
      });

      if (response.status !== 200) {
        throw new Error('Erreur lors de la création de la réponse');
      }

      return response.data;
    } catch (error) {
      console.error('Erreur création réponse:', error);
      throw new Error('Erreur lors de la création de la réponse');
    }
  },

  // API pour valider une solution (OK) - Maintenant utilisant creerReponse
  async validerSolution(solutionId: number): Promise<ReponseSolution> {
    return this.creerReponse({
      solutionId,
      estValide: true,
      utilisateurId: undefined
    });
  },

  // API pour rejeter une solution (KO) - Maintenant utilisant creerReponse
  async rejeterSolution(data: SolutionReponseData): Promise<ReponseSolution> {
    return this.creerReponse({
      solutionId: data.solutionId,
      estValide: false,
      commentaire: data.commentaire,
      utilisateurId: data.utilisateurId
    });
  },

  // API pour clôturer le ticket (conservée si logique séparée)
  async cloturerTicket(solutionId: number): Promise<void> {
    try {
      const response = await api.post(`/solutions/${solutionId}/cloturer`);
      
      if (response.status !== 200) {
        throw new Error('Erreur lors de la clôture du ticket');
      }
    } catch (error) {
      console.error('Erreur clôture ticket:', error);
      throw new Error('Erreur lors de la clôture du ticket');
    }
  },

  // NOUVEAU : Récupérer toutes les réponses d'une solution
  async getReponsesParSolution(solutionId: number): Promise<ReponseSolution[]> {
    try {
      const response = await api.get(`/solutions/${solutionId}/reponses`);
      
      if (response.status !== 200) {
        throw new Error('Erreur lors de la récupération des réponses');
      }

      return response.data;
    } catch (error) {
      console.error('Erreur récupération réponses:', error);
      throw new Error('Erreur lors de la récupération des réponses');
    }
  },

  // NOUVEAU : Récupérer les statistiques des réponses
  async getStatistiquesSolution(solutionId: number): Promise<StatistiquesReponse> {
    try {
      const response = await api.get(`/solutions/${solutionId}/reponses/statistiques`);
      
      if (response.status !== 200) {
        throw new Error('Erreur lors de la récupération des statistiques');
      }

      return response.data;
    } catch (error) {
      console.error('Erreur récupération statistiques:', error);
      throw new Error('Erreur lors de la récupération des statistiques');
    }
  },

  // NOUVEAU : Récupérer la dernière réponse d'une solution
  async getDerniereReponse(solutionId: number): Promise<ReponseSolution | null> {
    try {
      const response = await api.get(`/solutions/${solutionId}/reponses/derniere`);
      
      if (response.status === 404) {
        return null;
      }

      if (response.status !== 200) {
        throw new Error('Erreur lors de la récupération de la dernière réponse');
      }

      return response.data;
    } catch (error) {
      console.error('Erreur récupération dernière réponse:', error);
      throw new Error('Erreur lors de la récupération de la dernière réponse');
    }
  }
};