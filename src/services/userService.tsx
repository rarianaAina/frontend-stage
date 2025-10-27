// services/userService.ts
import { api } from '../lib/api';
import type { Utilisateur, NouvelUtilisateur, UtilisateurPageReponse } from '../types/utilisateur';

export type UserData = {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  whatsappNumero: string;
  actif: boolean;
};

export type PasswordData = {
  nouveauMotDePasse: string;
};

export const userService = {
  // Obtenir les données de l'utilisateur connecté
  async getCurrentUser(userId: string): Promise<UserData> {
    const response = await api.get(`/utilisateurs/${userId}`);
    return response.data;
  },

  // Mettre à jour le profil
  async updateProfile(userId: string, profileData: Partial<UserData>): Promise<UserData> {
    const response = await api.put(`/utilisateurs/${userId}`, profileData);
    return response.data;
  },

  // Changer le mot de passe
  async changePassword(userId: string, passwordData: PasswordData): Promise<void> {
    await api.post(`/utilisateurs/${userId}/mot-de-passe`, passwordData);
  },

  // NOUVELLES MÉTHODES POUR LA GESTION DES UTILISATEURS
  async getUtilisateurs(): Promise<Utilisateur[]> {
    const response = await api.get('/utilisateurs');
    return response.data;
  },

  async searchUtilisateurs(filters: {
    page?: number;
    size?: number;
    recherche?: string;
    actif?: string;
    dateDebut?: string;
    dateFin?: string;
  }): Promise<UtilisateurPageReponse> {
    const params = new URLSearchParams();
    
    // Paramètres obligatoires avec valeurs par défaut
    params.append('page', (filters.page || 0).toString());
    params.append('size', (filters.size || 20).toString());
    
    // Paramètres optionnels
    if (filters.recherche) params.append('recherche', filters.recherche);
    if (filters.actif) params.append('actif', filters.actif);
    if (filters.dateDebut) params.append('dateDebut', filters.dateDebut);
    if (filters.dateFin) params.append('dateFin', filters.dateFin);
    
    const response = await api.get(`/utilisateurs/recherche?${params}`);
    return response.data;
  },

  async createUser(userData: NouvelUtilisateur): Promise<Utilisateur> {
    // Utilisation de l'endpoint GET /create avec paramètres d'URL
    const params = new URLSearchParams();
    params.append('identifiant', userData.identifiant);
    params.append('nom', userData.nom);
    params.append('prenom', userData.prenom);
    params.append('email', userData.email);
    params.append('motDePasse', userData.motDePasse);
    
    const response = await api.get(`/utilisateurs/create?${params}`);
    return response.data;
  },

  async getUserById(id: number): Promise<Utilisateur> {
    const response = await api.get(`/utilisateurs/${id}`);
    return response.data;
  },

  async updateUser(id: number, userData: Partial<Utilisateur>): Promise<Utilisateur> {
    const response = await api.put(`/utilisateurs/${id}`, userData);
    return response.data;
  },

  async changeUserPassword(id: number, password: string): Promise<void> {
    await api.post(`/utilisateurs/${id}/mot-de-passe`, {
      motDePasse: password
    });
  }
};