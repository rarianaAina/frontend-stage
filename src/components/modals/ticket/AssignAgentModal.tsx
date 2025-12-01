import React, { useState } from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface AssignAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: any[];
  onAssign: (agentId: number) => void;
  currentAgent?: string;
}

export const AssignAgentModal: React.FC<AssignAgentModalProps> = ({
  isOpen,
  onClose,
  agents,
  onAssign,
  currentAgent
}) => {
  const { t } = useAppTranslation(['common', 'admin']);
  const [selectedAgent, setSelectedAgent] = useState<number | ''>('');
  const [assigning, setAssigning] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAgent) {
      alert(t('admin:selectAgentRequired'));
      return;
    }

    setAssigning(true);
    try {
      await onAssign(Number(selectedAgent));
      setSelectedAgent('');
    } catch (err) {
      // L'erreur est gérée dans le parent
    } finally {
      setAssigning(false);
    }
  };

  const handleClose = () => {
    setSelectedAgent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content admin-modal">
        <div className="modal-header">
          <h2>👤 {t('admin:assignAgent')}</h2>
          <button onClick={handleClose} className="modal-close-btn">
            ×
          </button>
        </div>

        <div className="modal-body">
          {currentAgent && (
            <div className="current-assignment">
              <strong>{t('admin:currentlyAssigned')}:</strong> {currentAgent}
            </div>
          )}

          <form onSubmit={handleSubmit} className="assign-agent-form">
            <div className="form-group">
              <label htmlFor="agent-select">
                {t('admin:selectAgent')} *
              </label>
              <select
                id="agent-select"
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value ? Number(e.target.value) : '')}
                required
                disabled={assigning}
              >
                <option value="">-- {t('admin:chooseAgent')} --</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.prenom} {agent.nom} - {agent.specialite || t('admin:noSpecialty')}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                onClick={handleClose}
                disabled={assigning}
                className="btn-secondary"
              >
                {t('common:cancel')}
              </button>
              <button
                type="submit"
                disabled={!selectedAgent || assigning}
                className="btn-primary"
              >
                {assigning ? t('common:assigning') : t('admin:assignAgent')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};