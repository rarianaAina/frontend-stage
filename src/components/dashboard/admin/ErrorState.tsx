import React from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  const { t } = useAppTranslation(['common', 'errors']);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <div style={{ color: '#dc3545', marginBottom: '20px', fontSize: '18px' }}>
        {t('errors:error')}: {error}
      </div>
      <button 
        onClick={onRetry}
        style={{
          padding: '10px 20px',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {t('common:retry')}
      </button>
    </div>
  );
};