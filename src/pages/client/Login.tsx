import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuth';
import { useVerificationCode } from '../../hooks/auth/useVerificationCode';
import { LoginForm } from '../../components/login/loginForm';
import { ForgotPassword } from '../../components/login/ForgotPassword';
import { VerificationForm } from '../../components/login/VerificationForm';
import { HeroSection } from '../../components/login/HeroSection';
import { LoginResponse } from '../../types/auth';
import { useAppTranslation } from '../../hooks/translation/useTranslation';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [currentView, setCurrentView] = useState<'login' | 'verification' | 'forgot-password'>('login');
  const [currentUser, setCurrentUser] = useState<LoginResponse | null>(null);

  const { login, verifyCode, regenerateCode, loading, error, setError } = useAuth();
  const { code, updateCode, resetCode, getCodeString } = useVerificationCode();
  const { t } = useAppTranslation(['auth', 'common']);

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

  const handleVerify = async (): Promise<void> => {
    const codeString = getCodeString();
    
    if (codeString.length === 4) {
      const result = await verifyCode(codeString);
      
      if (!result.success) {
        resetCode();
        document.getElementById('code-0')?.focus();
      }
    } else {
      setError(t('auth:completeCodeError'));
    }
  };

  const handleRegenerateCode = async (): Promise<void> => {
    const result = await regenerateCode();
    if (result.success) {
      console.log(t('auth:codeRegenerated'));
    } else {
      setError(result.error || t('auth:regenerateError'));
    }
  };

  const handleBackToLogin = (): void => {
    setCurrentView('login');
    setError('');
    resetCode();
    setCurrentUser(null);
  };

  const handleShowForgotPassword = (): void => {
    setCurrentView('forgot-password');
    setError('');
  };


  // Dans Login.tsx - ajoutez cette fonction
  const handleForgotPassword = async (email: string): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8086/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la demande de réinitialisation');
      }
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      // Succès - le message est déjà géré dans le composant ForgotPassword
      return;
      
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

  if (currentView === 'verification') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
        padding: '20px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10
        }}>
          <LanguageSwitcher />
        </div>

        <VerificationForm
          code={code}
          onCodeChange={updateCode}
          error={error}
          onVerify={handleVerify}
          onRegenerateCode={handleRegenerateCode}
          onBack={handleBackToLogin}
          loading={loading}
        />
      </div>
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
        padding: '20px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10
        }}>
          <LanguageSwitcher />
        </div>

        <ForgotPassword
          email={email}
          setEmail={setEmail}
          onBackToLogin={handleBackToLogin}
          onSendResetLink={handleForgotPassword}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
      padding: '40px 80px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 10
      }}>
        <LanguageSwitcher />
      </div>

      <HeroSection />
      
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        onLogin={handleLogin}
        loading={loading}
        onFillCredentials={handleFillCredentials}
        onShowForgotPassword={handleShowForgotPassword}
      />
    </div>
  );
};

export default Login;