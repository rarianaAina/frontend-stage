import React from 'react';
import { useSynchronisationStatus } from '../../../hooks/dashboard/admin/useSynchronisationStatuts';
import { SyncStatusCard } from './SyncStatusCard';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';
import '../../../styles/admin/configurations/Synchronisations.css';

export const SynchronisationStatus: React.FC = () => {
  const { statuts, loading, error, refetch } = useSynchronisationStatus();
  const { t } = useAppTranslation(['common', 'sync']);

  if (loading) {
    return (
      <div className="sync-loading-container">
        <div className="sync-loading-content">
          <LoadingSpinner size="small" />
          <span className="sync-loading-text">
            {t('sync:loading') || 'Chargement des statuts de synchronisation...'}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sync-error-container">
        <div className="sync-error-content">
          <div>
            <h3 className="sync-error-title">
              {t('sync:error.title') || 'Erreur de chargement'}
            </h3>
            <p className="sync-error-message">{error}</p>
          </div>
          <button
            onClick={refetch}
            className="sync-retry-button"
          >
            {t('sync:error.retryButton') || 'Réessayer'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sync-status-container">
      <div className="sync-header">
        <h2 className="sync-title">
          📊 {t('sync:title') || 'État des Synchronisations CRM'}
        </h2>
        <button
          onClick={refetch}
          className="sync-refresh-button"
        >
          🔄 {t('sync:refreshButton') || 'Actualiser'}
        </button>
      </div>

      <div className="sync-grid">
        {Object.entries(statuts).map(([key, statut]) => (
          <SyncStatusCard 
            key={key}
            type={key as keyof typeof statuts}
            statut={statut}
          />
        ))}
      </div>

      <div className="sync-footer">
        <p className="sync-footer-text">
          💡 {t('sync:footer.note') || 'Les synchronisations planifiées s\'exécutent automatiquement selon la configuration cron'}
        </p>
      </div>
    </div>
  );
};