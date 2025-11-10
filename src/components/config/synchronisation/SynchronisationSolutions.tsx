import React from 'react';
import { useSynchronisation } from '../../../hooks/synchronisation/useSynchronisation';
import { SynchronisationCard } from './SynchronisationCard';

export const SynchronisationSolutions: React.FC = () => {
  const {
    syncStatus,
    syncLoading,
    loadSyncStatus,
    handleStartSync,
    handleStopSync
  } = useSynchronisation('solutions');

  return (
    <SynchronisationCard
      title="Synchronisation des Solutions"
      description="Synchronisation des solutions depuis le CRM. Gère la création, mise à jour et suppression des solutions. Met à jour les statuts, étapes et dates de clôture automatiquement."
      syncStatus={syncStatus}
      syncLoading={syncLoading}
      onStart={handleStartSync}
      onStop={handleStopSync}
      onRefresh={loadSyncStatus}
    />
  );
};