import React from 'react';
import { useSynchronisation } from '../../../hooks/synchronisation/useSynchronisation';
import { SynchronisationCard } from './SynchronisationCard';

export const SynchronisationPersonnes: React.FC = () => {
  const {
    syncStatus,
    syncLoading,
    loadSyncStatus,
    handleStartSync,
    handleStopSync
  } = useSynchronisation('personnes');

  return (
    <SynchronisationCard
      title="Synchronisation des Personnes"
      description="Synchronisation des utilisateurs et contacts depuis le CRM. Crée automatiquement les comptes utilisateurs avec des identifiants et mots de passe temporaires."
      syncStatus={syncStatus}
      syncLoading={syncLoading}
      onStart={handleStartSync}
      onStop={handleStopSync}
      onRefresh={loadSyncStatus}
    />
  );
};