import React from 'react';
import { SchedulingConfiguration } from '../../../types/scheduling/scheduling';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface SchedulingListProps {
  configurations: SchedulingConfiguration[];
  selectedConfig: SchedulingConfiguration | null;
  onSelectConfig: (config: SchedulingConfiguration) => void;
  onCreateNew: () => void;
}

export const SchedulingList: React.FC<SchedulingListProps> = ({
  configurations,
  selectedConfig,
  onSelectConfig,
  onCreateNew
}) => {
  const { t } = useAppTranslation(['scheduling', 'common']);

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', color: '#333', margin: 0 }}>
          {t('scheduling:list.title')}
        </h3>
        <button
          onClick={onCreateNew}
          style={{
            background: '#10b981',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          + {t('scheduling:list.new')}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {configurations.map(config => (
          <SchedulingListItem
            key={config.id}
            config={config}
            isSelected={selectedConfig?.id === config.id}
            onSelect={() => onSelectConfig(config)}
          />
        ))}

        {configurations.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            color: '#6b7280', 
            padding: '20px',
            fontStyle: 'italic'
          }}>
            {t('scheduling:list.empty')}
          </div>
        )}
      </div>
    </div>
  );
};

const SchedulingListItem: React.FC<{
  config: SchedulingConfiguration;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ config, isSelected, onSelect }) => (
  <div
    onClick={onSelect}
    style={{
      padding: '12px',
      borderRadius: '8px',
      border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
      background: isSelected ? '#f0f9ff' : 'white',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontWeight: '600', 
          color: config.enabled ? '#333' : '#9ca3af',
          textDecoration: config.enabled ? 'none' : 'line-through'
        }}>
          {config.jobName}
        </div>
        <div style={{ 
          fontSize: '12px', 
          color: '#6b7280'
        }}>
          {config.displayName}
        </div>
        <div style={{ fontSize: '12px', color: '#9ca3af' }}>
          {config.jobDescription}
        </div>
      </div>
      <div style={{ 
        width: '8px', 
        height: '8px', 
        borderRadius: '50%',
        background: config.enabled ? '#10b981' : '#ef4444',
        marginLeft: '8px'
      }} />
    </div>
  </div>
);