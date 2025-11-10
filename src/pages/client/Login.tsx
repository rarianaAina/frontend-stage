import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuth';
import { useVerificationCode } from '../../hooks/auth/useVerificationCode';
import { LoginForm } from '../../components/login/loginForm';
import { VerificationForm } from '../../components/login/VerificationForm';
import { HeroSection } from '../../components/login/HeroSection';
import { LoginResponse } from '../../types/auth';
import { useAppTranslation } from '../../hooks/translation/useTranslation';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<LoginResponse | null>(null);

  const { login, verifyCode, regenerateCode, loading, error, setError } = useAuth();
  const { code, updateCode, resetCode, getCodeString } = useVerificationCode();
  const { t } = useAppTranslation(['auth', 'common']);

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    // Rediriger immédiatement vers la vérification
    // sans attendre la réponse de l'API
    setShowVerification(true);
    
    const result = await login(email, password);
    
    if (result.success && result.requiresVerification && result.user) {
      setCurrentUser(result.user);
      // Le formulaire de vérification est déjà affiché à ce stade
    } else if (!result.success) {
      // Si la connexion échoue, revenir à la page de login
      setShowVerification(false);
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
      // Optionnel: Afficher un message de succès à l'utilisateur
    } else {
      setError(result.error || t('auth:regenerateError'));
    }
  };

  const handleBackToLogin = (): void => {
    setShowVerification(false);
    setError('');
    resetCode();
    setCurrentUser(null);
  };

  const handleFillCredentials = (email: string, password: string): void => {
    setEmail(email);
    setPassword(password);
    setError('');
  };

  if (showVerification) {
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
        {/* Language Switcher en haut à droite pour la page de vérification */}
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
      {/* Language Switcher en haut à droite */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 10
      }}>
        <LanguageSwitcher />
      </div>

      {/* Logo Optimada jaune à gauche */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '40px',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* <div style={{
          width: '50px',
          height: '50px',
          background: '#FFD700', // Jaune Optimada
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          fontWeight: 'bold',
          fontSize: '20px',
          boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
        }}>
          O
        </div> */}
        {/* <span style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          OPTIMADA
        </span> */}
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
      />
    </div>
  );
};

export default Login;