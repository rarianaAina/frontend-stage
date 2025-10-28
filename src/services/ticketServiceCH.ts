import { api } from '../lib/api';

export interface Ticket {
  id: number;
  reference: string;
  statut: string;
  dateCreation: string;
  produitNom: string;
  produitId: string;
  demandesIntervention: DemandeIntervention[];
}

export interface DemandeIntervention {
  id: number;
  description: string;
  dateIntervention: string;
  lieu: string;
  etat: string;
}

export interface InteractionCreateDTO {
  ticketId: number;
  message: string;
  typeInteractionId: number;
  canalInteractionId: number;
  auteurUtilisateurId: number;
  visibleClient?: boolean;
  interventionId?: number;
}

export interface Interaction {
  id: number;
  typeInteractionLibelle: string;
  dateCreation: string;
  message: string;
  pieceJointe?: string;
}

export interface PieceJointe {
  id: number;
  date: string;
  nomFichier: string;
}

export interface RelanceData {
  niveau: string;
  commentaires: string;
}

export interface PJData {
  fichier: File | null;
  commentaires: string;
}

export interface ClotureData {
  solutions: string;
  fichier: File | null;
}

export interface AutreDateData {
  nouvelleDate: string;
  commentaires: string;
}

// Service pour les types et canaux d'interaction
export const interactionService = {
  async getTypesInteraction() {
    const response = await api.get('/types-interaction');
    return response.data;
  },

  async getCanauxInteraction() {
    const response = await api.get('/canaux-interaction');
    return response.data;
  },
};

export const ticketService = {
  async getTicketDetails(ticketId: string): Promise<Ticket> {
    const response = await api.get(`/tickets/${ticketId}`);
    console.log('Détails ticket:', response.data);
    return response.data;
  },

  async getInteractions(ticketId: string): Promise<Interaction[]> {
    try {
      const response = await api.get(`/interactions/ticket/${ticketId}`);
      console.log('Interactions:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération interactions:', error);
      return [];
    }
  },

  async creerInteraction(data: InteractionCreateDTO) {
    console.log('Création interaction avec données:', data);
    const response = await api.post('/interactions', data);
    return response.data;
  },
  
  async getPiecesJointes(ticketId: string): Promise<PieceJointe[]> {
    try {
      const response = await api.get(`/pieces-jointes/ticket/${ticketId}`);
      console.log('Pièces jointes:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération pièces jointes:', error);
      return [];
    }
  },

  async relancerTicket(ticketId: string, data: RelanceData) {
    const response = await api.post(`/tickets/${ticketId}/relancer`, data);
    return response.data;
  },

  async ajouterPieceJointe(ticketId: string, data: PJData) {
    const formData = new FormData();
    if (data.fichier) formData.append('fichier', data.fichier);
    formData.append('commentaires', data.commentaires);
    
    const response = await api.post(`/tickets/${ticketId}/pieces-jointes`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async cloturerTicket(ticketId: string, data: ClotureData) {
    const formData = new FormData();
    formData.append('solutions', data.solutions);
    if (data.fichier) formData.append('fichier', data.fichier);
    
    const response = await api.post(`/tickets/${ticketId}/cloturer`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async proposerAutreDate(ticketId: string, demandeId: string, data: AutreDateData) {
    const response = await api.post(`/tickets/${ticketId}/demandes/${demandeId}/autre-date`, data);
    return response.data;
  },

  async validerIntervention(ticketId: string, demandeId: string) {
    const response = await api.post(`/tickets/${ticketId}/demandes/${demandeId}/valider`);
    return response.data;
  },
};