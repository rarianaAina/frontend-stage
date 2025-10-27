import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuth';
import { useVerificationCode } from '../../hooks/auth/useVerificationCode';
import { LoginForm } from '../../components/login/loginForm';
import { VerificationForm } from '../../components/login/VerificationForm';
import { HeroSection } from '../../components/login/HeroSection';
import { LoginResponse } from '../../types/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<LoginResponse | null>(null);

  const { login, verifyCode, regenerateCode, loading, error, setError } = useAuth();
  const { code, updateCode, resetCode, getCodeString } = useVerificationCode();

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    const result = await login(email, password);
    
    if (result.success && result.requiresVerification && result.user) {
      setCurrentUser(result.user);
      setShowVerification(true);
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
      setError('Veuillez saisir le code complet');
    }
  };

  const handleRegenerateCode = async (): Promise<void> => {
    const result = await regenerateCode();
    if (result.success) {
      console.log('Code régénéré avec succès');
      // Optionnel: Afficher un message de succès à l'utilisateur
    } else {
      setError(result.error || 'Erreur lors du renvoi du code');
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
        padding: '20px'
      }}>
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
      padding: '40px 80px'
    }}>
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