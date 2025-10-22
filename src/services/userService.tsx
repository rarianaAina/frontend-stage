// services/userService.ts
import { api } from '../lib/api';

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
    console.log(response);
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
  }
};