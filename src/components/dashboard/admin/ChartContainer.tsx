import React from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface ChartContainerProps {
  titleKey: string;
  children: React.ReactNode;
  height: string;
  background?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ 
  titleKey, 
  children, 
  height, 
  background = 'white' 
}) => {
  const { t } = useAppTranslation(['common', 'dashboard']);

  return (
    <div style={{ 
      background, 
      padding: '20px', 
      borderRadius: '15px', 
      height,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '20px', 
        color: background === 'white' ? '#333' : 'white' 
      }}>
        {t(`dashboard:${titleKey}`)}
      </h3>
      {children}
    </div>
  );
};