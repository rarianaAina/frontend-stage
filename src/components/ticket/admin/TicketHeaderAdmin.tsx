import React from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface TicketHeaderAdminProps {
  ticket: any;
  onAssignAgent: () => void;
  onChangeStatus: () => void;
  onAddInternalNote: () => void;
  onRefresh: () => void;
}

export const TicketHeaderAdmin: React.FC<TicketHeaderAdminProps> = ({
  ticket,
  onAssignAgent,
  onChangeStatus,
  onAddInternalNote,
  onRefresh
}) => {
  const { t, i18n } = useAppTranslation(['common', 'tickets', 'admin']);

  const getStatusColor = (statutTicketId: string) => {
    switch (statutTicketId) {
      case '1': return '#3b82f6'; // Nouveau
      case '2': return '#10b981'; // En cours
      case '3': return '#f59e0b'; // En attente
      case '4': return '#f59e0b'; // En attente client
      case '5': return '#8b5cf6'; // Planifié
      case '6': return '#6b7280'; // Résolu
      case '7': return '#000000'; // Fermé
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (prioriteTicketId: string) => {
    switch (prioriteTicketId) {
      case '4': return '#ef4444'; // Urgent
      case '3': return '#f59e0b'; // Élevée
      case '2': return '#3b82f6'; // Normale
      case '1': return '#10b981'; // Faible
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (statutTicketId: string): string => {
    switch (statutTicketId) {
      case '1': return t('tickets:status.new');
      case '2': return t('tickets:status.inProgress');
      case '3': return t('tickets:status.pending');
      case '4': return t('tickets:status.waitingClient');
      case '5': return t('tickets:status.scheduled');
      case '6': return t('tickets:status.resolved');
      case '7': return t('tickets:status.closed');
      default: return statutTicketId || t('common:unknown');
    }
  };

  const getPriorityLabel = (prioriteTicketId: string): string => {
    // Solution temporaire avec fallback
    let translation;
    
    switch (prioriteTicketId) {
      case '1': 
        translation = t('tickets:priority.low', { defaultValue: 'Low' });
        break;
      case '2': 
        translation = t('tickets:priority.normal', { defaultValue: 'Normal' });
        break;
      case '3': 
        translation = t('tickets:priority.high', { defaultValue: 'High' });
        break;
      case '4': 
        translation = t('tickets:priority.urgent', { defaultValue: 'Urgent' });
        break;
      default: 
        translation = t('common:unknown');
    }
    
    // Si la traduction retourne la clé, utiliser les valeurs par défaut
    if (translation.includes('priority.')) {
      const fallback: { [key: string]: string } = {
        '1': 'Low',
        '2': 'Normal', 
        '3': 'High',
        '4': 'Urgent'
      };
      return fallback[prioriteTicketId] || t('common:unknown');
    }
    
    return translation;
  };

  return (
    <div className="ticket-header-admin">
      <div className="header-main-info">
        <div className="ticket-reference">
          <h2>{ticket.reference}</h2>
          <span className="creation-date">
            {t('tickets:creationDate')} {new Date(ticket.dateCreation).toLocaleDateString()}
          </span>
        </div>
        
        <div className="status-priority-badges">
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(String(ticket.statutTicketId)) }}
          >
            {getStatusLabel(String(ticket.statutTicketId))}
          </span>
          <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(String(ticket.prioriteTicketId)) }}
          >
            {getPriorityLabel(String(ticket.prioriteTicketId))}
          </span>
        </div>
      </div>

      {/* <div className="header-actions-admin">
        <button 
          onClick={onAssignAgent}
          className="action-button assign-agent-btn"
          title={t('admin:assignAgent')}
        >
          👤 {t('admin:assignAgent')}
        </button>
        
        <button 
          onClick={onChangeStatus}
          className="action-button change-status-btn"
          title={t('admin:changeStatus')}
        >
          🔄 {t('admin:changeStatus')}
        </button>
        
        <button 
          onClick={onAddInternalNote}
          className="action-button internal-note-btn"
          title={t('admin:addInternalNote')}
        >
          📝 {t('admin:addInternalNote')}
        </button>
        
        <button 
          onClick={onRefresh}
          className="action-button refresh-btn"
          title={t('common:refresh')}
        >
          🔄
        </button>
      </div> */}

      {/* Informations rapides */}
      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-label">{t('tickets:company')}:</span>
          <span className="stat-value">{ticket.companyName}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">{t('tickets:assignedAgent')}:</span>
          <span className="stat-value">{ticket.affecteAUtilisateurNom || t('common:notAssigned')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">{t('tickets:product')}:</span>
          <span className="stat-value">{ticket.produitNom}</span>
        </div>
      </div>
    </div>
  );
};