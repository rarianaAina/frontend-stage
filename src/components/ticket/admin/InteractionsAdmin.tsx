import React, { useState } from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';
import { adminTicketService } from '../../../services/adminTicketService';
import { toast } from 'react-toastify';

interface InteractionsAdminProps {
  interactions: any[];
  piecesJointes: any[];
  solutions: any[];
  ticketId: number;
  onRefresh: () => void;
  loading?: boolean;
}

export const InteractionsAdmin: React.FC<InteractionsAdminProps> = ({
  interactions,
  piecesJointes,
  solutions,
  ticketId,
  onRefresh,
  loading = false
}) => {
  const { t } = useAppTranslation(['common', 'tickets', 'admin']);
  const [activeTab, setActiveTab] = useState<'interactions' | 'attachments' | 'solutions'>('interactions');
  const [expandedInteraction, setExpandedInteraction] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return t('common:invalidDate');
    }
  };

  const getInteractionTypeIcon = (type: string) => {
    switch (type) {
      case 'EMAIL': return '📧';
      case 'PHONE': return '📞';
      case 'INTERNAL_NOTE': return '📝';
      case 'SYSTEM': return '⚙️';
      default: return '💬';
    }
  };

  const getInteractionTypeLabel = (type: string) => {
    switch (type) {
      case 'EMAIL': return t('admin:interactionTypes.email');
      case 'PHONE': return t('admin:interactionTypes.phone');
      case 'INTERNAL_NOTE': return t('admin:interactionTypes.internalNote');
      case 'SYSTEM': return t('admin:interactionTypes.system');
      default: return type;
    }
  };

  // const handleDeleteInteraction = async (interactionId: number) => {
  //   if (!window.confirm(t('admin:confirmDeleteInteraction'))) {
  //     return;
  //   }

  //   try {
  //     await adminTicketService.deleteInteraction(interactionId);
  //     toast.success(t('admin:interactionDeleted'));
  //     onRefresh();
  //   } catch (err) {
  //     console.error('Erreur suppression interaction:', err);
  //     toast.error(t('common:errors.actionFailed'));
  //   }
  // };

  const toggleInteractionExpand = (interactionId: number) => {
    setExpandedInteraction(expandedInteraction === interactionId ? null : interactionId);
  };

  if (loading) {
    return (
      <div className="interactions-admin-loading">
        <div className="loading-spinner"></div>
        <div>{t('common:loading')}</div>
      </div>
    );
  }

  return (
    <div className="interactions-admin">
      <h3 className="section-title">{t('admin:activityHistory')}</h3>
      
      {/* Navigation par onglets */}
      <div className="interactions-tabs">
        <button
          className={`tab-button ${activeTab === 'interactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('interactions')}
        >
          💬 {t('tickets:interactions')} ({interactions.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'attachments' ? 'active' : ''}`}
          onClick={() => setActiveTab('attachments')}
        >
          📎 {t('tickets:attachments')} ({piecesJointes.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'solutions' ? 'active' : ''}`}
          onClick={() => setActiveTab('solutions')}
        >
          ✅ {t('tickets:solutions')} ({solutions.length})
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="tab-content">
        {activeTab === 'interactions' && (
          <div className="interactions-list">
            {interactions.length === 0 ? (
              <div className="no-data-message">
                {t('admin:noInteractions')}
              </div>
            ) : (
              interactions.map((interaction) => (
                <div key={interaction.id} className="interaction-item">
                  <div className="interaction-header">
                    <div className="interaction-type">
                      <span className="type-icon">
                        {getInteractionTypeIcon(interaction.typeInteraction)}
                      </span>
                      <span className="type-label">
                        {getInteractionTypeLabel(interaction.typeInteraction)}
                      </span>
                    </div>
                    <div className="interaction-meta">
                      <span className="interaction-author">
                        {interaction.auteurNom || t('common:unknown')}
                      </span>
                      <span className="interaction-date">
                        {formatDate(interaction.dateCreation)}
                      </span>
                    </div>
                    {/* <div className="interaction-actions">
                      {interaction.typeInteraction !== 'SYSTEM' && (
                        <button
                          onClick={() => handleDeleteInteraction(interaction.id)}
                          className="delete-interaction-btn"
                          title={t('common:delete')}
                        >
                          🗑️
                        </button>
                      )}
                    </div> */}
                  </div>
                  
                  <div className="interaction-content">
                    {interaction.message && (
                      <div 
                        className={`interaction-message ${expandedInteraction === interaction.id ? 'expanded' : ''}`}
                        onClick={() => toggleInteractionExpand(interaction.id)}
                      >
                        {interaction.message.length > 200 && !expandedInteraction ? (
                          <>
                            {interaction.message.substring(0, 200)}...
                            <span className="show-more">({t('common:showMore')})</span>
                          </>
                        ) : (
                          interaction.message
                        )}
                      </div>
                    )}
                    
                    {interaction.visibleClient && (
                      <span className="visibility-badge visible-client">
                        👁️ {t('admin:visibleToClient')}
                      </span>
                    )}
                    
                    {interaction.typeInteraction === 'INTERNAL_NOTE' && (
                      <span className="visibility-badge internal-note">
                        🔒 {t('admin:internalNote')}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'attachments' && (
          <div className="attachments-list">
            {piecesJointes.length === 0 ? (
              <div className="no-data-message">
                {t('admin:noAttachments')}
              </div>
            ) : (
              piecesJointes.map((pj) => (
                <div key={pj.id} className="attachment-item">
                  <div className="attachment-icon">📎</div>
                  <div className="attachment-info">
                    <div className="attachment-name">{pj.nomFichier}</div>
                    <div className="attachment-meta">
                      {pj.taille && <span>{Math.round(pj.taille / 1024)} KB</span>}
                      {pj.dateUpload && <span>{formatDate(pj.dateUpload)}</span>}
                    </div>
                  </div>
                  <div className="attachment-actions">
                    <button
                      onClick={() => window.open(pj.url, '_blank')}
                      className="download-attachment-btn"
                      title={t('common:download')}
                    >
                      ⬇️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'solutions' && (
          <div className="solutions-list">
            {solutions.length === 0 ? (
              <div className="no-data-message">
                {t('admin:noSolutions')}
              </div>
            ) : (
              solutions.map((solution) => (
                <div key={solution.id} className="solution-item">
                  <div className="solution-header">
                    <span className="solution-title">{solution.titre}</span>
                    <span className="solution-date">
                      {formatDate(solution.dateCreation)}
                    </span>
                  </div>
                  <div className="solution-content">
                    {solution.description}
                  </div>
                  {solution.resolutionTime && (
                    <div className="solution-meta">
                      <span className="resolution-time">
                        ⏱️ {t('admin:resolutionTime')}: {solution.resolutionTime} min
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};