import { useState, useEffect } from 'react';
import { userService, UserData } from '../../services/userService';

export const useUserProfile = () => {
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState<UserData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    whatsappNumero: '',
    actif: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadUserData = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const user = await userService.getCurrentUser(userId);
      
      setUserData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        telephone: user.telephone || '',
        whatsappNumero: user.whatsappNumero || '',
        actif: user.actif
      });
      
      // Mettre à jour le localStorage avec les données fraîches
      const fullName = `${user.prenom || ''} ${user.nom || ''}`.trim();
      localStorage.setItem('userName', fullName || 'Utilisateur');
      localStorage.setItem('email', user.email || '');
      
    } catch (error) {
      console.error('Erreur lors du chargement des données utilisateur:', error);
      throw new Error('Erreur lors du chargement des données du profil');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updateData: Partial<UserData>) => {
    if (!userId) throw new Error('Utilisateur non identifié');

    try {
      setSaving(true);
      const updatedUser = await userService.updateProfile(userId, updateData);
      
      // Mettre à jour le localStorage avec les nouvelles données
      const fullName = `${updatedUser.prenom || ''} ${updatedUser.nom || ''}`.trim();
      localStorage.setItem('userName', fullName || 'Utilisateur');
      localStorage.setItem('email', updatedUser.email || '');
      
      return updatedUser;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw new Error('Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (newPassword: string, confirmPassword: string) => {
    if (!userId) throw new Error('Utilisateur non identifié');

    if (newPassword !== confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas');
    }
    
    if (newPassword.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }

    await userService.changePassword(userId, {
      nouveauMotDePasse: newPassword
    });
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return {
    userData,
    setUserData,
    loading,
    saving,
    loadUserData,
    updateProfile,
    changePassword
  };
};