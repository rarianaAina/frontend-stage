import { api } from '../lib/api';

export interface Ticket {
  id: number;
  reference: string;
  statut: string;
  dateSoumission: string;
  produit: string;
  produitId: number;
  demandesIntervention: DemandeIntervention[];
  interactions: Interaction[];
  piecesJointes: PieceJointe[];
}

export interface DemandeIntervention {
  id: number;
  description: string;
  dateIntervention: string;
  lieu: string;
  etat: string;
}

export interface Interaction {
  id: number;
  type: string;
  date: string;
  commentaires: string;
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

export const ticketService = {
  async getTicketDetails(ticketId: string): Promise<Ticket> {
    const response = await api.get(`/api/tickets/${ticketId}`);
    return response.data;
  },

  async relancerTicket(ticketId: string, data: RelanceData) {
    const response = await api.post(`/api/tickets/${ticketId}/relancer`, data);
    return response.data;
  },

  async ajouterPieceJointe(ticketId: string, data: PJData) {
    const formData = new FormData();
    if (data.fichier) formData.append('fichier', data.fichier);
    formData.append('commentaires', data.commentaires);
    
    const response = await api.post(`/api/tickets/${ticketId}/pieces-jointes`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async cloturerTicket(ticketId: string, data: ClotureData) {
    const formData = new FormData();
    formData.append('solutions', data.solutions);
    if (data.fichier) formData.append('fichier', data.fichier);
    
    const response = await api.post(`/api/tickets/${ticketId}/cloturer`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async proposerAutreDate(ticketId: string, demandeId: string, data: AutreDateData) {
    const response = await api.post(`/api/tickets/${ticketId}/demandes/${demandeId}/autre-date`, data);
    return response.data;
  },

  async validerIntervention(ticketId: string, demandeId: string) {
    const response = await api.post(`/api/tickets/${ticketId}/demandes/${demandeId}/valider`);
    return response.data;
  }
};