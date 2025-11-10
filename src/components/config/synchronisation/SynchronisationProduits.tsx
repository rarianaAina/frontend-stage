import React from 'react';
import { useSynchronisation } from '../../../hooks/synchronisation/useSynchronisation';
import { SynchronisationCard } from './SynchronisationCard';

export const SynchronisationProduits: React.FC = () => {
  const {
    syncStatus,
    syncLoading,
    loadSyncStatus,
    handleStartSync,
    handleStopSync
  } = useSynchronisation('produits');

  return (
    <SynchronisationCard
      title="Synchronisation des Produits"
      description="Synchronisation des produits PARC et des associations company-PARC depuis le CRM. Met à jour le catalogue de produits et leurs relations avec les companies."
      syncStatus={syncStatus}
      syncLoading={syncLoading}
      onStart={handleStartSync}
      onStop={handleStopSync}
      onRefresh={loadSyncStatus}
    />
  );
};