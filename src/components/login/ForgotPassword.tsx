import React from 'react';
import { useAppTranslation } from '../../hooks/translation/useTranslation';
import { useForgotPassword } from '../../hooks/auth/useForgotPassword';
import { AuthLayout } from '../common/AuthLayout';
import { MessageAlert } from '../common/MessageAlert';

interface ForgotPasswordProps {
  email: string;
  setEmail: (email: string) => void;
  onBackToLogin: () => void;
  onSendResetLink: (email: string) => Promise<void>;
  loading?: boolean;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  email,
  setEmail,
  onBackToLogin,
  onSendResetLink,
  loading = false
}) => {
  const { t } = useAppTranslation(['auth', 'common']);
  const { message, isSending, handleSubmit, setMessage } = useForgotPassword();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(email);
  };

  return (
    <AuthLayout title="auth:forgotPassword" showLogo={true}>
      <MessageAlert 
        message={message} 
        type={message.includes('Error') ? 'error' : message ? 'success' : 'info'}
        onDismiss={() => setMessage('')}
      />

      <form onSubmit={handleFormSubmit}>
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

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={onBackToLogin}
            disabled={isSending}
            style={{
              flex: 1,
              background: '#6c757d',
              color: 'white',
              padding: '12px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isSending ? 'not-allowed' : 'pointer',
              opacity: isSending ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {t('common:back')}
          </button>

          <button
            type="submit"
            disabled={isSending}
            style={{
              flex: 1,
              background: isSending ? '#6c757d' : '#3b82f6',
              color: 'white',
              padding: '12px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isSending ? 'not-allowed' : 'pointer',
              opacity: isSending ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {isSending ? t('auth:sending') : t('auth:sendResetLink')}
          </button>
        </div>
      </form>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        fontSize: '14px', 
        color: '#666',
        lineHeight: '1.5'
      }}>
        {t('auth:resetInstructions')}
      </div>
    </AuthLayout>
  );
};