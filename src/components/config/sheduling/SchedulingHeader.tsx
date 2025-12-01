import React from 'react';
import { SchedulingConfiguration, SchedulingStatus } from '../../../types/scheduling/scheduling';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface SchedulingHeaderProps {
  selectedConfig: SchedulingConfiguration | null;
  isEditing: boolean;
  isCreating: boolean;
  status: SchedulingStatus | null;
  onEdit: () => void;
  onCancel: () => void;
  onReloadCache: () => void;
}

export const SchedulingHeader: React.FC<SchedulingHeaderProps> = ({
  selectedConfig,
  isEditing,
  isCreating,
  status,
  onEdit,
  onCancel,
  onReloadCache
}) => {
  const { t } = useAppTranslation(['common', 'scheduling']);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <div>
        <h1 style={{ fontSize: '28px', color: '#333', margin: '0 0 8px 0' }}>
          {t('scheduling:title')}
        </h1>
        {status && (
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {t('scheduling:status.activeJobs', { active: status.activeJobs, total: status.totalJobs })}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          onClick={onReloadCache}
          style={{
            background: '#8b5cf6',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🔄 {t('scheduling:reloadCache')}
        </button>

        {selectedConfig && !isEditing && !isCreating && (
          <button
            onClick={onEdit}
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
        )}

        {(isEditing || isCreating) && (
          <button
            onClick={onCancel}
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
        )}
      </div>
    </div>
  );
};