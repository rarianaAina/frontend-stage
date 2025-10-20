// services/ticketService.ts
import { api } from '../lib/api';

export type Produit = {
  id: number;
  libelle: string;
  description?: string;
  actif: boolean;
};

export type PrioriteTicket = {
  id: number;
  code: string;
  libelle: string;
};

export type NouvelleDemandeData = {
  raison: string;
  logiciel: string;
  description: string;
  niveau: string;
  fichiers?: FileList | null;
};

export const ticketService = {
  // Récupérer les produits actifs
  async getProduitsActifs(): Promise<Produit[]> {
    try {
      const response = await api.get('/produits/actifs');
      return response.data;
    } catch (error) {
      // Fallback vers l'endpoint général
      const response = await api.get('/produits');
      return response.data;
    }
  },

  // Récupérer les priorités
  async getPriorites(): Promise<PrioriteTicket[]> {
    const response = await api.get('/prioriteTickets');
    return response.data;
  },

  // Soumettre une nouvelle demande
  async soumettreDemande(data: NouvelleDemandeData): Promise<void> {
    const formData = new FormData();
    formData.append('raison', data.raison);
    formData.append('logiciel', data.logiciel);
    formData.append('description', data.description);
    formData.append('niveau', data.niveau);

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