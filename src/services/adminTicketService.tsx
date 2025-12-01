import { api } from '../lib/api';

// Types existants
export type Ticket = {
  id: string;
  reference: string;
  titre?: string;
  description: string;
  dateCreation: string;
  dateCloture?: string;
  produitId?: number;
  produitNom?: string;
  prioriteTicketId: number;
  statutTicketId?: number;
  etat?: string;
  typeTicketId?: number;
  companyId?: number;
  companyName: string;
  clientId?: number;
  affecteAUtilisateurId?: number;
  affecteAUtilisateurNom: string;
  // Ajouts pour les détails complets
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  agentAssigné?: string;
  categorieNom?: string;
  prioriteNom?: string;
  source?: string;
  dateModification?: string;
};

export type TicketFiltres = {
  etat?: string;
  reference?: string;
  produit?: string;
  dateDebut?: string;
  dateFin?: string;
  societe?: string;
  priorite?: string;
  page?: number;
  size?: number;
};

export type TicketReponse = {
  content: Ticket[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
};

export type TicketApiReponse = {
  tickets: Ticket[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};

// Nouveaux types pour les fonctionnalités admin
export type Agent = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  specialite?: string;
  statut: string;
};

export type Interaction = {
  id: number;
  typeInteraction: string;
  typeInteractionLibelle: string;
  dateCreation: string;
  message: string;
  auteurNom?: string;
  visibleClient?: boolean;
  pieceJointe?: string;
};

export type PieceJointe = {
  id: number;
  nomFichier: string;
  url: string;
  taille?: number;
  dateUpload?: string;
};

export type Solution = {
  id: number;
  titre: string;
  description: string;
  dateCreation: string;
  resolutionTime?: number;
};

export const adminTicketService = {
  // Méthodes existantes
  async getTickets(filtres: TicketFiltres = {}): Promise<TicketReponse> {
    try {
      const params = new URLSearchParams();
      
      if (filtres.etat) params.append('etat', filtres.etat);
      if (filtres.reference) params.append('reference', filtres.reference);
      if (filtres.produit) params.append('produit', filtres.produit);
      if (filtres.dateDebut) params.append('dateDebut', filtres.dateDebut);
      if (filtres.dateFin) params.append('dateFin', filtres.dateFin);
      if (filtres.societe) params.append('societe', filtres.societe);
      if (filtres.priorite) params.append('priorite', filtres.priorite);
      if (filtres.page !== undefined) params.append('page', filtres.page.toString());
      if (filtres.size !== undefined) params.append('size', filtres.size.toString());
      
      const response = await api.get<TicketApiReponse>(`/tickets/admin?${params.toString()}`);
      
      console.log('API Response structure:', response.data);
      console.log('Applied filters:', filtres);
      
      const apiData = response.data;
      
      return {
        content: apiData.tickets || [],
        totalElements: apiData.totalElements || 0,
        totalPages: apiData.totalPages || 0,
        size: apiData.pageSize || (filtres.size || 10),
        number: apiData.currentPage || (filtres.page || 0)
      };
      
    } catch (error) {
      console.error('Erreur lors de la récupération des tickets:', error);
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 10,
        number: 0
      };
    }
  },

  async getTicket(id: string): Promise<Ticket> {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
  },

  async changerStatut(id: string, statutId: number, utilisateurId: number): Promise<Ticket> {
    const response = await api.put(`/tickets/${id}/statut`, {
      statutId,
      utilisateurId
    });
    return response.data;
  },

  async assignerTicket(id: string, consultantId: number): Promise<Ticket> {
    const response = await api.put(`/tickets/${id}/assigner`, { consultantId });
    return response.data;
  },

  async getTicketsParCompany(companyId: number): Promise<Ticket[]> {
    const response = await api.get(`/tickets/company/${companyId}`);
    return response.data;
  },

  async getTicketsParConsultant(consultantId: number): Promise<Ticket[]> {
    const response = await api.get(`/tickets/consultant/${consultantId}`);
    return response.data;
  },

  // NOUVELLES MÉTHODES POUR LA GESTION ADMIN AVANCÉE

  // Récupérer les détails complets d'un ticket (version admin)
  async getTicketDetails(ticketId: string): Promise<Ticket> {
    try {
      const response = await api.get(`/tickets/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération détails ticket admin:', error);
      // Fallback sur l'endpoint normal si l'endpoint admin n'existe pas
      const response = await api.get(`/tickets/${ticketId}`);
      return response.data;
    }
  },

  // Récupérer les interactions d'un ticket
  async getInteractions(ticketId: string): Promise<Interaction[]> {
    try {
      const response = await api.get(`/interactions/ticket/${ticketId}`);
      console.log('Interactions admin:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération interactions admin:', error);
      return [];
    }
  },

  // Récupérer les pièces jointes d'un ticket
  async getPiecesJointes(ticketId: string): Promise<PieceJointe[]> {
    try {
      const response = await api.get(`/pieces-jointes/ticket/${ticketId}`);
      console.log('Pièces jointes admin:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération pièces jointes admin:', error);
      return [];
    }
  },

  // Récupérer les solutions d'un ticket
  async getSolutions(ticketId: string): Promise<Solution[]> {
    try {
      const response = await api.get(`/solutions/ticket/${ticketId}`);
      console.log('Solutions admin:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur récupération solutions admin:', error);
      return [];
    }
  },

  // Récupérer les agents disponibles
  async getAvailableAgents(): Promise<Agent[]> {
    try {
      const response = await api.get('/workflow/utilisateurs/internes');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération agents disponibles:', error);
      // Retourner des données mockées pour le développement
      return [
        { id: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@example.com', specialite: 'Support Technique', statut: 'ACTIF' },
        { id: 2, nom: 'Martin', prenom: 'Marie', email: 'marie.martin@example.com', specialite: 'Développement', statut: 'ACTIF' },
        { id: 3, nom: 'Bernard', prenom: 'Pierre', email: 'pierre.bernard@example.com', specialite: 'Réseau', statut: 'ACTIF' }
      ];
    }
  },

  // Assigner un agent à un ticket
  async assignAgent(ticketId: number, agentId: number): Promise<void> {
    try {
      await api.put(`/tickets/${ticketId}/assigner`, { 
        consultantId: agentId 
      });
    } catch (error) {
      console.error('Erreur assignation agent:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'un ticket (version admin)
  async updateStatus(ticketId: number, newStatus: string, comment?: string): Promise<void> {
    try {
      const utilisateurId = localStorage.getItem('userId');
      await api.put(`/tickets/${ticketId}/statut`, {
        statutId: parseInt(newStatus),
        utilisateurId: utilisateurId ? parseInt(utilisateurId) : 1,
        commentaire: comment
      });
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
      throw error;
    }
  },

  // Ajouter une note interne
  async addInternalNote(ticketId: number, note: string): Promise<void> {
    try {
      const utilisateurId = localStorage.getItem('userId');
      const interactionData = {
        ticketId: ticketId,
        message: note,
        typeInteractionId: 4, // ID pour note interne
        canalInteractionId: 1, // ID pour canal interne
        auteurUtilisateurId: utilisateurId ? parseInt(utilisateurId) : 1,
        visibleClient: false
      };
      
      await api.post('/interactions', interactionData);
    } catch (error) {
      console.error('Erreur ajout note interne:', error);
      throw error;
    }
  },

  // Supprimer une interaction
  async deleteInteraction(interactionId: number): Promise<void> {
    try {
      await api.delete(`/interactions/${interactionId}`);
    } catch (error) {
      console.error('Erreur suppression interaction:', error);
      throw error;
    }
  },

  // Créer une interaction (version admin)
  async createInteraction(interactionData: any): Promise<void> {
    try {
      await api.post('/interactions', interactionData);
    } catch (error) {
      console.error('Erreur création interaction admin:', error);
      throw error;
    }
  }
};