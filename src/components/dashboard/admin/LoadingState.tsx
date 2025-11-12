import React from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface LoadingStateProps {
  messageKey?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  messageKey = "dashboard:loadingAdminDashboard" 
}) => {
  const { t } = useAppTranslation(['common', 'dashboard']);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '18px', color: '#17a2b8' }}>
        {t(messageKey)}
      </div>
    </div>
  );
};