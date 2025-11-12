import React from 'react';
import { useSynchronisationStatus } from '../../../hooks/dashboard/admin/useSynchronisationStatuts';
import { SyncStatusCard } from './SyncStatusCard';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

export const SynchronisationStatus: React.FC = () => {
  const { statuts, loading, error, refetch } = useSynchronisationStatus();
  const { t } = useAppTranslation(['common', 'dashboard', 'sync']);

  if (loading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '25px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LoadingSpinner size="small" />
          <span style={{ color: '#6b7280' }}>
            {t('sync:loadingSyncStatus')}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '25px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px',
        border: '1px solid #fecaca'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ color: '#dc2626', margin: '0 0 5px 0' }}>
              {t('sync:loadingError')}
            </h3>
            <p style={{ color: '#6b7280', margin: 0 }}>{error}</p>
          </div>
          <button
            onClick={refetch}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {t('common:retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '30px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#1f2937',
          margin: 0
        }}>
          📊 {t('sync:crmSyncStatus')}
        </h2>
        <button
          onClick={refetch}
          style={{
            background: 'transparent',
            border: '1px solid #d1d5db',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          🔄 {t('sync:refresh')}
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '15px'
      }}>
        {Object.entries(statuts).map(([key, statut]) => (
          <SyncStatusCard 
            key={key}
            type={key as keyof typeof statuts}
            statut={statut}
          />
        ))}
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{ 
          fontSize: '12px', 
          color: '#64748b', 
          margin: 0,
          textAlign: 'center'
        }}>
          💡 {t('sync:scheduledSyncInfo')}
        </p>
      </div>
    </div>
  );
};