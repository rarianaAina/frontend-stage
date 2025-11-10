import React from 'react';
import { useSynchronisation } from '../../../hooks/synchronisation/useSynchronisation';
import { SynchronisationCard } from './SynchronisationCard';

export const SynchronisationCompanies: React.FC = () => {
  const {
    syncStatus,
    syncLoading,
    loadSyncStatus,
    handleStartSync,
    handleStopSync
  } = useSynchronisation('companies');

  return (
    <SynchronisationCard
      title="Synchronisation des Companies"
      description="La synchronisation manuelle permet de forcer la mise à jour des companies depuis le CRM. Une seule synchronisation peut être exécutée à la fois."
      syncStatus={syncStatus}
      syncLoading={syncLoading}
      onStart={handleStartSync}
      onStop={handleStopSync}
      onRefresh={loadSyncStatus}
    />
  );
};