import React from 'react';
import { useAppTranslation } from '../../hooks/translation/useTranslation';
import { ResetPasswordFormData } from '../../types/auth';

interface PasswordFormProps {
  formData: ResetPasswordFormData;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onFieldChange: (field: keyof ResetPasswordFormData, value: string) => void;
  submitText: string;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  formData,
  loading,
  onSubmit,
  onFieldChange,
  submitText
}) => {
  const { t } = useAppTranslation(['auth', 'common']);

  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: '600', 
          color: '#333',
          fontSize: '14px'
        }}>
          {t('auth:newPassword')}:
        </label>
        <input
          type="password"
          value={formData.newPassword}
          onChange={(e) => onFieldChange('newPassword', e.target.value)}
          placeholder={t('auth:newPasswordPlaceholder')}
          style={{
            width: '100%',
            padding: '12px 20px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '16px'
          }}
          required
          minLength={6}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: '600', 
          color: '#333',
          fontSize: '14px'
        }}>
          {t('auth:confirmPassword')}:
        </label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
          placeholder={t('auth:confirmPasswordPlaceholder')}
          style={{
            width: '100%',
            padding: '12px 20px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '16px'
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
          opacity: loading ? 0.7 : 1
        }}
      >
        {t(submitText)}
      </button>
    </form>
  );
};