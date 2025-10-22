import { api } from '../lib/api';

export type Produit = {
  parcId: number;
  parcName: string;
  compName: string;
};

export type PrioriteTicket = {
  id: number;
  code: string;
  libelle: string;
};

export type TypeTicket = {
  id: number;
  code: string;
  libelle: string;
};

export type NouvelleDemandeData = {
  raison: string;
  logiciel: string;
  description: string;
  company: string;
  utilisateur: string;
  niveau: string;
  type: string;
  fichiers?: FileList | null;
};

export const ticketService = {
  // Récupérer les produits actifs
  async getProduitsActifs(): Promise<Produit[]> {
    try {
      const response = await api.get('/produits/actifs');
      console.log(response);
      return response.data;
    } catch (error) {
      // Fallback vers l'endpoint général
      const response = await api.get('/produits');
      return response.data;
    }
  },

  async getProduitsParCompany(companyId: string): Promise<Produit[]> {
    const response = await api.get(`/produits/parcs/company/${companyId}`);
    console.log(response);
    return response.data;
  },
  // Récupérer les priorités
  async getPriorites(): Promise<PrioriteTicket[]> {
    const response = await api.get('/prioriteTickets');
    return response.data;
  },

  // Récupérer les types
  async getTypes(): Promise<TypeTicket[]> {
    const response = await api.get('/typeTickets');
    return response.data;
  },

  // Soumettre une nouvelle demande
  async soumettreDemande(data: NouvelleDemandeData): Promise<void> {
    const formData = new FormData();
    formData.append('raison', data.raison);
    formData.append('produitId', data.logiciel);
    formData.append('description', data.description);
    formData.append('prioriteTicketId', data.niveau);
    formData.append('typeTicketId', data.type);
    formData.append('companyId', data.company);
    formData.append('clientId', data.utilisateur);

    if (data.fichiers) {
      Array.from(data.fichiers).forEach(file => {
        formData.append('fichiers', file);
      });
    }

    await api.post('/tickets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};