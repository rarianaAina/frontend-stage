import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { AuthResult, VerificationResult } from '../../types/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(email, password);
      
      if (response.success && response.data) {
        authService.storeUserData(response.data);
        return {
          success: true,
          user: response.data,
          requiresVerification: true
        };
      }
      
      return { success: false, error: 'Échec de la connexion' };
    } catch (error: any) {
      const message = error.response?.status === 401 
        ? 'Email ou mot de passe incorrect'
        : 'Erreur de connexion au serveur';
      
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (code: string): Promise<VerificationResult> => {
  setLoading(true);
  setError('');

  try {
    const response = await authService.verifyCode(code);
    
    console.log('Code verification response:', response);
    
    if (response.valid) {
      authService.markUserAsVerified();
      
      // ✅ Vérifiez avec la bonne clé
      console.log('User verified, checking stored data:');
      console.log('jeton:', localStorage.getItem('jeton')); // <-- 'jeton' ici
      console.log('verified:', localStorage.getItem('verified'));
      console.log('userId:', localStorage.getItem('userId'));
      console.log('role:', localStorage.getItem('role'));
      
      const role = authService.getUserRole();
      console.log('User role:', role);
      
      // Redirection avec timeout pour éviter les conflits
      setTimeout(() => {
        console.log('Executing navigation...');
        redirectByRole(role);
      }, 100);
      
      return { success: true };
    } else {
      setError('Code de vérification incorrect');
      return { success: false, error: 'Code invalide' };
    }
  } catch (error: any) {
    console.error('Error during code verification:', error);
    setError('Erreur lors de la vérification du code');
    return { success: false, error: 'Erreur serveur' };
  } finally {
    setLoading(false);
  }
};

  const regenerateCode = async (): Promise<VerificationResult> => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.regenerateCode();
      
      if (response.valid) {
        setError('');
        return { success: true };
      } else {
        setError('Erreur lors de la régénération du code');
        return { success: false, error: 'Erreur de régénération' };
      }
    } catch (error: any) {
      setError('Erreur lors de la régénération du code');
      return { success: false, error: 'Erreur serveur' };
    } finally {
      setLoading(false);
    }
  };

  const redirectByRole = (role: string): void => {
    console.log('Redirecting user with role:', role);
    
    const routes: { [key: string]: string } = {
      'ADMIN': '/admin/dashboard',
      'CONSULTANT': '/consultant/tickets',
      'CLIENT': '/dashboard',
      'admin': '/admin/dashboard',
      'consultant': '/consultant/tickets', 
      'client': '/dashboard'
    };
    
    const route = routes[role] || '/dashboard';
    console.log('Navigating to:', route);
    
    window.location.href = route;
  };

  const logout = (): void => {
    authService.logout();
    navigate('/login');
  };

  const clearError = (): void => {
    setError('');
  };

  return {
    login,
    verifyCode,
    regenerateCode,
    logout,
    loading,
    error,
    clearError,
    setError
  };
};