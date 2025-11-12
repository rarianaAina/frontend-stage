import React from 'react';
import { DureeTraitement } from '../../../types/dashboard';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface PerformanceTeamProps {
  data?: DureeTraitement;
}

export const PerformanceTeam: React.FC<PerformanceTeamProps> = ({ data }) => {
  const { t } = useAppTranslation(['common', 'dashboard']);

  return (
    <div style={{
      background: 'rgba(200, 240, 180, 0.7)',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '15px',
        textDecoration: 'underline'
      }}>
        {t('dashboard:teamPerformance')}
      </h3>
      {data ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#2563eb', marginBottom: '10px' }}>
              {t('dashboard:averageProcessingTime')}
            </h4>
            <p>
              <strong>{data.moyenneJours} {t('dashboard:days')}</strong> 
              ({data.moyenneHeures} {t('dashboard:hours')})
            </p>
          </div>
          <div>
            <h4 style={{ color: '#2563eb', marginBottom: '10px' }}>
              {t('dashboard:delaysDistribution')}
            </h4>
            <p>{t('dashboard:fast')} (&lt; 24h): <strong>{data.rapides}</strong></p>
            <p>{t('dashboard:normal')} (1-3 {t('dashboard:days')}): <strong>{data.normaux}</strong></p>
            <p>{t('dashboard:slow')} (&gt; 3 {t('dashboard:days')}): <strong>{data.lents}</strong></p>
          </div>
        </div>
      ) : (
        <p>{t('dashboard:noDataAvailable')}</p>
      )}
    </div>
  );
};