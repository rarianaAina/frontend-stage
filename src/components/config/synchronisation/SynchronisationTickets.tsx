import React from 'react';
import { useSynchronisation } from '../../../hooks/synchronisation/useSynchronisation';
import { SynchronisationCard } from './SynchronisationCard';

export const SynchronisationTickets: React.FC = () => {
  const {
    syncStatus,
    syncLoading,
    loadSyncStatus,
    handleStartSync,
    handleStopSync
  } = useSynchronisation('tickets');

  return (
    <SynchronisationCard
      title="Synchronisation des Tickets"
      description="Synchronisation des tickets (cases) depuis le CRM. Crée de nouveaux tickets et met à jour les statuts, priorités et dates de clôture existantes. Envoie des notifications automatiques."
      syncStatus={syncStatus}
      syncLoading={syncLoading}
      onStart={handleStartSync}
      onStop={handleStopSync}
      onRefresh={loadSyncStatus}
    />
  );
};