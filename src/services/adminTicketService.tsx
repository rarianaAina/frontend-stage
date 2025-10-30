import { api } from '../lib/api';

export type Ticket = {
  id: string;
  reference: string;
  titre?: string;
  description: string;
  dateCreation: string;
  dateCloture?: string;
  produitId?: number;
  produitNom?: string;
  prioriteTicketId: string;
  statutTicketId?: number;
  etat?: string;
  typeTicketId?: number;
  companyId?: number;
  clientId?: number;
  affecteAUtilisateurId?: number;
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

export const adminTicketService = {
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
  }
};