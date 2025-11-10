import React from 'react';
import { NotificationTemplate } from '../../../types/template';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface TemplateHeaderProps {
  selectedTemplate: NotificationTemplate | null;
  isEditing: boolean;
  isCreating: boolean;
  handleEdit: () => void;
  handleCancel: () => void;
  handleToggleActivation: (template: NotificationTemplate) => void;
  handleDelete: (template: NotificationTemplate) => void;
}

export const TemplateHeader: React.FC<TemplateHeaderProps> = ({
  selectedTemplate,
  isEditing,
  isCreating,
  handleEdit,
  handleCancel,
  handleToggleActivation,
  handleDelete
}) => {
  const { t } = useAppTranslation(['common', 'templates']);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '24px', color: '#333', margin: 0 }}>
        {isCreating ? t('templates:details.createTitle') : 
         isEditing ? t('templates:details.editTitle') : 
         selectedTemplate?.libelle}
      </h2>

      {selectedTemplate && !isEditing && !isCreating && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleEdit}
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ✏️ {t('common:edit')}
          </button>
          <button
            onClick={() => handleToggleActivation(selectedTemplate)}
            style={{
              background: selectedTemplate.actif ? '#ef4444' : '#10b981',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {selectedTemplate.actif ? '⏸️' : '▶️'} 
            {selectedTemplate.actif ? t('common:deactivate') : t('common:activate')}
          </button>
          <button
            onClick={() => handleDelete(selectedTemplate)}
            style={{
              background: '#dc2626',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🗑️ {t('common:delete')}
          </button>
        </div>
      )}

      {(isEditing || isCreating) && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleCancel}
            style={{
              background: '#6b7280',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ❌ {t('common:cancel')}
          </button>
        </div>
      )}
    </div>
  );
};