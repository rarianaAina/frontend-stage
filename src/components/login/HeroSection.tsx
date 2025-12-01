import React from 'react';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

export const HeroSection: React.FC = () => {
  const { t } = useAppTranslation('auth');

  return (
    <div style={{
      flex: 1,
      maxWidth: '600px',
      color: 'white',
      paddingRight: '60px'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        {t('hero.title')}
      </h1>
      
      <p style={{
        fontSize: '20px',
        marginBottom: '30px',
        lineHeight: '1.6',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
      }}>
        {t('hero.description')}
      </p>
      
      <div style={{
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        {['feature2', 'feature3'].map((feature, index) => (
          <div
            key={feature}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '15px 20px',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {t(`hero.features.${feature}.title`)}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              {t(`hero.features.${feature}.description`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};