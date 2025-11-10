import React from 'react';
import { StatusBadge } from './StatutBadge';
import { ActionButton } from './ActionButton';

interface SynchronisationCardProps {
  title: string;
  description: string;
  syncStatus: 'INACTIVE' | 'EN_COURS' | 'ARRET_DEMANDE';
  syncLoading: boolean;
  onStart: () => void;
  onStop: () => void;
  onRefresh: () => void;
}

export const SynchronisationCard: React.FC<SynchronisationCardProps> = ({
  title,
  description,
  syncStatus,
  syncLoading,
  onStart,
  onStop,
  onRefresh
}) => {
  const getSyncStatusInfo = () => {
    switch (syncStatus) {
      case 'EN_COURS':
        return { text: 'Synchronisation en cours', color: '#f59e0b' };
      case 'ARRET_DEMANDE':
        return { text: 'Arrêt en cours...', color: '#ef4444' };
      default:
        return { text: 'Aucune synchronisation', color: '#6b7280' };
    }
  };

  const statusInfo = getSyncStatusInfo();

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#f9fafb'
    }}>
      <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#374151' }}>
        {title}
      </h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
        <StatusBadge text={statusInfo.text} color={statusInfo.color} />
        
        <ActionButton
          onClick={onStart}
          disabled={syncLoading || syncStatus === 'EN_COURS'}
          variant="success"
          loading={syncLoading}
        >
          Démarrer Sync
        </ActionButton>
        
        <ActionButton
          onClick={onStop}
          disabled={syncLoading || syncStatus !== 'EN_COURS'}
          variant="danger"
          loading={syncLoading}
        >
          Arrêter Sync
        </ActionButton>
        
        <ActionButton
          onClick={onRefresh}
          disabled={syncLoading}
          variant="secondary"
          loading={syncLoading}
        >
          Actualiser
        </ActionButton>
      </div>
      
      <p style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
        {description}
      </p>
    </div>
  );
};