import React from 'react';
import { SyncStatusData } from '../../../hooks/dashboard/admin/useSynchronisationStatuts';

interface SyncStatusCardProps {
  type: keyof SyncStatusData;
  statut: SyncStatusData;
}

export const SyncStatusCard: React.FC<SyncStatusCardProps> = ({ type, statut }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'EN_COURS':
        return {
          color: '#f59e0b',
          bgColor: '#fffbeb',
          borderColor: '#fed7aa',
          icon: '🔄',
          label: 'En cours'
        };
      case 'ARRET_DEMANDE':
        return {
          color: '#ef4444',
          bgColor: '#fef2f2',
          borderColor: '#fecaca',
          icon: '⏹️',
          label: 'Arrêt demandé'
        };
      default:
        return {
          color: '#10b981',
          bgColor: '#f0fdf4',
          borderColor: '#bbf7d0',
          icon: '✅',
          label: 'Inactive'
        };
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      companies: '🏢',
      creditsHoraires: '⏰',
      personnes: '👥',
      produits: '📦',
      tickets: '🎫',
      solutions: '💡',
      liaisonsSolutionsTickets: '🔗'
    };
    return icons[type] || '📊';
  };

  const config = getStatusConfig(statut.statut);

  return (
    <div style={{
      background: config.bgColor,
      border: `1px solid ${config.borderColor}`,
      borderRadius: '10px',
      padding: '15px',
      transition: 'all 0.2s ease'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>{getTypeIcon(type)}</span>
          <h4 style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: 0
          }}>
            {statut.nom}
          </h4>
        </div>
        <div style={{
          background: config.color,
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {config.icon}
          {config.label}
        </div>
      </div>

      <p style={{ 
        fontSize: '12px', 
        color: '#6b7280', 
        margin: '0 0 10px 0',
        lineHeight: '1.4'
      }}>
        {statut.message}
      </p>

      {statut.derniereSync && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '11px',
          color: '#9ca3af'
        }}>
          <span>🕒</span>
          <span>Dernière sync: {statut.derniereSync}</span>
        </div>
      )}

      {statut.enCours && (
        <div style={{
          width: '100%',
          height: '3px',
          background: '#e5e7eb',
          borderRadius: '2px',
          overflow: 'hidden',
          marginTop: '8px'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: config.color,
            animation: 'pulse 2s infinite'
          }} />
        </div>
      )}
    </div>
  );
};