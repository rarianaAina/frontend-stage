import { api } from '../lib/api';

export interface Contact {
  userId: number;
  userFullName: string;
  email?: string;
  telephone?: string;
  parcName?: string;
  parcId?: number;
}

export const contactService = {
  // Récupérer tous les interlocuteurs pour une entreprise
  async getInterlocuteursByCompany(companyId: string): Promise<Contact[]> {
    const response = await api.get(`/produits/company/${companyId}/interlocuteurs`);
    return response.data;
  },

  // Récupérer les interlocuteurs avec détails des parcs
  async getInterlocuteursWithParcs(companyId: string): Promise<Contact[]> {
    const response = await api.get(`/produits/company/${companyId}/interlocuteurs-with-parcs`);
    return response.data;
  },

  // Récupérer les interlocuteurs complets avec toutes les informations
  async getInterlocuteursComplets(companyId: string): Promise<Contact[]> {
    const response = await api.get(`/produits/company/${companyId}/interlocuteurs-complets`);
    return response.data;
  },

  // Rechercher des interlocuteurs par nom ou email
  async searchInterlocuteurs(companyId: string, searchTerm: string): Promise<Contact[]> {
    const interlocuteurs = await this.getInterlocuteursComplets(companyId);
    
    if (!searchTerm) return interlocuteurs;

    return interlocuteurs.filter(contact =>
      contact.userFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
};