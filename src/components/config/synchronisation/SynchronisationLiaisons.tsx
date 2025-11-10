// src/components/synchronisation/SynchronisationLiaisons.tsx
import React from 'react';
import { useSynchronisation } from '../../../hooks/synchronisation/useSynchronisation';
import { SynchronisationCard } from './SynchronisationCard';

export const SynchronisationLiaisons: React.FC = () => {
  const {
    syncStatus,
    syncLoading,
    loadSyncStatus,
    handleStartSync,
    handleStopSync
  } = useSynchronisation('liaisons-solutions-tickets');

  return (
    <SynchronisationCard
      title="Synchronisation des Liaisons Solutions-Tickets"
      description="Synchronisation des associations entre solutions et tickets depuis le CRM. Crée automatiquement les liens et envoie des notifications aux clients concernés."
      syncStatus={syncStatus}
      syncLoading={syncLoading}
      onStart={handleStartSync}
      onStop={handleStopSync}
      onRefresh={loadSyncStatus}
    />
  );
};