import React from 'react';
import { SyncStatusData } from '../../../hooks/dashboard/admin/useSynchronisationStatuts';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface SyncStatusCardProps {
  type: keyof SyncStatusData;
  statut: SyncStatusData;
}

export const SyncStatusCard: React.FC<SyncStatusCardProps> = ({ type, statut }) => {
  const { t } = useAppTranslation(['common', 'sync']);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'EN_COURS':
        return {
          color: '#f59e0b',
          bgColor: '#fffbeb',
          borderColor: '#fed7aa',
          icon: '🔄',
          label: t('sync:inProgress')
        };
      case 'ARRET_DEMANDE':
        return {
          color: '#ef4444',
          bgColor: '#fef2f2',
          borderColor: '#fecaca',
          icon: '⏹️',
          label: t('sync:stopRequested')
        };
      default:
        return {
          color: '#10b981',
          bgColor: '#f0fdf4',
          borderColor: '#bbf7d0',
          icon: '✅',
          label: t('sync:inactive')
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

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      companies: t('sync:companies'),
      creditsHoraires: t('sync:timeCredits'),
      personnes: t('sync:people'),
      produits: t('sync:products'),
      tickets: t('sync:tickets'),
      solutions: t('sync:solutions'),
      liaisonsSolutionsTickets: t('sync:solutionTicketLinks')
    };
    return labels[type] || type;
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
            {getTypeLabel(type)}
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
          <span>{t('sync:lastSync')}: {statut.derniereSync}</span>
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