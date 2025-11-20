import React from 'react';
import { DemoCredentials } from './DemoCredentials';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  onLogin: (e: React.FormEvent) => void;
  loading: boolean;
  onFillCredentials: (email: string, password: string) => void;
  onShowForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  error, 
  onLogin, 
  loading, 
  onFillCredentials,
  onShowForgotPassword 
}) => {
  const { t } = useAppTranslation(['auth', 'common']);

  return (
    <div style={{
      background: 'rgba(200, 200, 200, 0.9)',
      padding: '40px 50px',
      borderRadius: '30px',
      width: '450px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      position: 'relative'
    }}>

      {/* Logo Optimada au-dessus du titre */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '-20px'
      }}>
        {/* Logo PNG */}
        <img 
          src="/src/dist/img/Logo.png"
          alt="OPTIMADA"
          style={{
            width: '310px',
            height: '150px',
            marginBottom: '10px',
            borderRadius: '10px',
            objectFit: 'cover',
            border: 'none',
            overflow: 'hidden',
            display: 'block'
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            
            const fallback = document.getElementById('logo-fallback');
            if (fallback) fallback.style.display = 'flex';
          }}
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.borderRadius = '50px';
          }}
        />
        
        {/* Fallback stylisé si le logo n'est pas chargé */}
        <div 
          id="logo-fallback"
          style={{
            width: '180px',
            height: '180px',
            background: '#FFD700',
            borderRadius: '50px',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',
            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
          }}
        >
          <span style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#000'
          }}>
            O
          </span>
        </div>

        <h2 style={{
          textAlign: 'center',
          margin: 0,
          fontSize: '32px',
          color: '#333'
        }}>
          {t('auth:login')}
        </h2>
      </div>

      {error && (
        <div style={{
          color: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          padding: '10px 20px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '1px solid #dc3545',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={onLogin}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600', 
            color: '#333',
            fontSize: '14px'
          }}>
            {t('auth:email')}:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder={t('auth:emailPlaceholder')}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'none';
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600', 
            color: '#333',
            fontSize: '14px'
          }}>
            {t('auth:password')}:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder={t('auth:passwordPlaceholder')}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'none';
            }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#6c757d' : '#10b981',
            color: 'white',
            padding: '12px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '15px',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#059669';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#10b981';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          {loading ? t('auth:signingIn') : t('auth:signIn')}
        </button>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onShowForgotPassword();
            }}
            style={{ 
              color: '#666', 
              fontSize: '14px', 
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#666';
            }}
          >
            {t('auth:forgotPassword')}
          </a>
        </div>
      </form>
    </div>
  );
};