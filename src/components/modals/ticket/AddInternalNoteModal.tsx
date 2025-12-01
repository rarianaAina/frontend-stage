import React, { useState } from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface AddInternalNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (note: string) => void;
  ticketReference: string;
}

export const AddInternalNoteModal: React.FC<AddInternalNoteModalProps> = ({
  isOpen,
  onClose,
  onAddNote,
  ticketReference
}) => {
  const { t } = useAppTranslation(['common', 'admin']);
  const [note, setNote] = useState<string>('');
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!note.trim()) {
      alert(t('admin:noteRequired'));
      return;
    }

    setAdding(true);
    try {
      await onAddNote(note.trim());
      setNote('');
    } catch (err) {
      // L'erreur est gérée dans le parent
    } finally {
      setAdding(false);
    }
  };

  const handleClose = () => {
    setNote('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content admin-modal">
        <div className="modal-header">
          <h2>📝 {t('admin:addInternalNote')}</h2>
          <button onClick={handleClose} className="modal-close-btn">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="note-context">
            <strong>{t('admin:forTicket')}:</strong> {ticketReference}
          </div>
          <div className="note-warning">
            ⚠️ {t('admin:internalNoteWarning')}
          </div>

          <form onSubmit={handleSubmit} className="add-note-form">
            <div className="form-group">
              <label htmlFor="internal-note">
                {t('admin:noteContent')} *
              </label>
              <textarea
                id="internal-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t('admin:notePlaceholder')}
                rows={6}
                required
                disabled={adding}
                className="note-textarea"
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                onClick={handleClose}
                disabled={adding}
                className="btn-secondary"
              >
                {t('common:cancel')}
              </button>
              <button
                type="submit"
                disabled={!note.trim() || adding}
                className="btn-primary"
              >
                {adding ? t('common:adding') : t('admin:addNote')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};