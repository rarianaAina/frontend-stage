import React, { useState } from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface ChangeStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  onStatusChange: (newStatus: string, comment?: string) => void;
}

export const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({
  isOpen,
  onClose,
  currentStatus,
  onStatusChange
}) => {
  const { t } = useAppTranslation(['common', 'tickets', 'admin']);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [changing, setChanging] = useState(false);

  // Mapping des statuts basé sur vos codes
  const statusOptions = [
    { value: '1', label: t('tickets:status.new'), color: '#3b82f6' },
    { value: '2', label: t('tickets:status.inProgress'), color: '#10b981' },
    { value: '3', label: t('tickets:status.pending'), color: '#f59e0b' },
    { value: '4', label: t('tickets:status.waitingClient'), color: '#f59e0b' },
    { value: '5', label: t('tickets:status.scheduled'), color: '#8b5cf6' },
    { value: '6', label: t('tickets:status.resolved'), color: '#6b7280' },
    { value: '7', label: t('tickets:status.closed'), color: '#000000' }
  ];

  const getCurrentStatusLabel = () => {
    const current = statusOptions.find(opt => opt.value === currentStatus);
    return current ? current.label : t('common:unknown');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStatus) {
      alert(t('admin:selectStatusRequired'));
      return;
    }

    setChanging(true);
    try {
      await onStatusChange(selectedStatus, comment.trim() || undefined);
      setSelectedStatus('');
      setComment('');
    } catch (err) {
      // L'erreur est gérée dans le parent
    } finally {
      setChanging(false);
    }
  };

  const handleClose = () => {
    setSelectedStatus('');
    setComment('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content admin-modal">
        <div className="modal-header">
          <h2>🔄 {t('admin:changeStatus')}</h2>
          <button onClick={handleClose} className="modal-close-btn">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="current-status-info">
            <strong>{t('admin:currentStatus')}:</strong>
            <span 
              className="status-badge"
              style={{ 
                backgroundColor: statusOptions.find(s => s.value === currentStatus)?.color || '#6b7280',
                marginLeft: '10px'
              }}
            >
              {getCurrentStatusLabel()}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="change-status-form">
            <div className="form-group">
              <label htmlFor="status-select">
                {t('admin:newStatus')} *
              </label>
              <select
                id="status-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                required
                disabled={changing}
              >
                <option value="">-- {t('admin:chooseStatus')} --</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status-comment">
                {t('admin:statusChangeComment')} ({t('common:optional')})
              </label>
              <textarea
                id="status-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t('admin:commentPlaceholder')}
                rows={4}
                disabled={changing}
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                onClick={handleClose}
                disabled={changing}
                className="btn-secondary"
              >
                {t('common:cancel')}
              </button>
              <button
                type="submit"
                disabled={!selectedStatus || changing}
                className="btn-primary"
              >
                {changing ? t('common:updating') : t('admin:updateStatus')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};