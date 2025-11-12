import React from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface StatCardProps {
  titleKey: string;
  value: number;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ titleKey, value, color }) => {
  const { t } = useAppTranslation(['common', 'dashboard']);

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
        {t(titleKey)}
      </div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color }}>
        {value}
      </div>
    </div>
  );
};