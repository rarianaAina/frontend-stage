import { useState } from 'react';
import { LoginResponse } from '../../types/auth';
import { useAuth } from './useAuth';
import { authService } from '../../services/authService';

export const useLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [currentView, setCurrentView] = useState<'login' | 'verification' | 'forgot-password'>('login');
  const [currentUser, setCurrentUser] = useState<LoginResponse | null>(null);

  const { login, verifyCode, regenerateCode, loading, error, setError } = useAuth();

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setCurrentView('verification');
    
    const result = await login(email, password);
    
    if (result.success && result.requiresVerification && result.user) {
      setCurrentUser(result.user);
    } else if (!result.success) {
      setCurrentView('login');
    }
  };

  const handleVerify = async (codeString: string): Promise<void> => {
    if (codeString.length === 4) {
      const result = await verifyCode(codeString);
      
      if (!result.success) {
        // resetCode() sera géré par le composant parent
        document.getElementById('code-0')?.focus();
      }
    } else {
      setError('auth:completeCodeError');
    }
  };

  const handleRegenerateCode = async (): Promise<void> => {
    const result = await regenerateCode();
    if (!result.success) {
      setError(result.error || 'auth:regenerateError');
    }
  };

  const handleBackToLogin = (): void => {
    setCurrentView('login');
    setError('');
    setCurrentUser(null);
  };

  const handleShowForgotPassword = (): void => {
    setCurrentView('forgot-password');
    setError('');
  };

  const handleForgotPassword = async (email: string): Promise<void> => {
    try {
      await authService.forgotPassword(email);
      // Succès - le message est déjà géré dans le composant ForgotPassword
    } catch (error) {
      console.error('Erreur forgot password:', error);
      throw error;
    }
  };

  const handleFillCredentials = (email: string, password: string): void => {
    setEmail(email);
    setPassword(password);
    setError('');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    currentView,
    currentUser,
    error,
    loading,
    handleLogin,
    handleVerify,
    handleRegenerateCode,
    handleBackToLogin,
    handleShowForgotPassword,
    handleForgotPassword,
    handleFillCredentials,
    setError
  };
};