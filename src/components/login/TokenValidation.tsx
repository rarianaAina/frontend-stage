import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppTranslation } from '../../hooks/translation/useTranslation';
import { AuthLayout } from '../common/AuthLayout';

interface TokenValidationProps {
  type: 'loading' | 'invalid';
  message?: string;
}

export const TokenValidation: React.FC<TokenValidationProps> = ({ type, message }) => {
  const { t } = useAppTranslation(['auth', 'common']);
  const navigate = useNavigate();

  if (type === 'loading') {
    return (
      <AuthLayout showLogo={false}>
        <div style={{ fontSize: '18px', color: '#666', textAlign: 'center' }}>
          {t('auth:validatingToken')}
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout showLogo={false}>
      <h2 style={{ color: '#dc3545', marginBottom: '20px', textAlign: 'center' }}>
        {t('auth:invalidResetTokenTitle')}
      </h2>
      <p style={{ color: '#666', marginBottom: '30px', textAlign: 'center' }}>
        {message || t('auth:invalidResetToken')}
      </p>
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {t('auth:backToLogin')}
        </button>
      </div>
    </AuthLayout>
  );
};