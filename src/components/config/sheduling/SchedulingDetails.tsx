import React from 'react';
import { SchedulingConfiguration } from '../../../types/scheduling/scheduling';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface SchedulingDetailsProps {
  config: SchedulingConfiguration;
  onEdit: () => void;
  onToggleActivation: (config: SchedulingConfiguration) => void;
  onDelete: (config: SchedulingConfiguration) => void;
}

export const SchedulingDetails: React.FC<SchedulingDetailsProps> = ({
  config,
  onEdit,
  onToggleActivation,
  onDelete
}) => {
  const { t } = useAppTranslation(['scheduling', 'common']);

  const getStatusColor = (enabled: boolean) => {
    return enabled ? '#10b981' : '#ef4444';
  };

  const getStatusText = (enabled: boolean) => {
    return enabled ? t('common:active') : t('common:inactive');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: '#333', margin: '0 0 8px 0' }}>
            {config.jobName}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: getStatusColor(config.enabled)
              }}
            />
            <span style={{ color: getStatusColor(config.enabled), fontWeight: '500' }}>
              {getStatusText(config.enabled)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
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
          <button
            onClick={() => onToggleActivation(config)}
            style={{
              background: config.enabled ? '#ef4444' : '#10b981',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {config.enabled ? '⏸️' : '▶️'} 
            {config.enabled ? t('common:deactivate') : t('common:activate')}
          </button>
          <button
            onClick={() => onDelete(config)}
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
      </div>

      {/* Informations principales */}
      <div style={{ 
        background: '#f8fafc', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ fontSize: '16px', color: '#374151', margin: '0 0 16px 0' }}>
          {t('scheduling:details.basicInfo')}
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              {t('scheduling:details.description')}
            </div>
            <div style={{ color: '#374151', fontWeight: '500' }}>
              {config.jobDescription || t('scheduling:details.noDescription')}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              {t('scheduling:details.scheduleType')}
            </div>
            <div style={{ color: '#374151', fontWeight: '500' }}>
              {config.scheduleType}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              {t('scheduling:details.displayName')}
            </div>
            <div style={{ color: '#374151', fontWeight: '500' }}>
              {config.displayName}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              {t('scheduling:details.cronExpression')}
            </div>
            <div style={{ 
              color: '#374151', 
              fontWeight: '500',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}>
              {config.cronExpression}
            </div>
          </div>
        </div>
      </div>

      {/* Métadonnées */}
      <div style={{ 
        background: '#f8fafc', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ fontSize: '16px', color: '#374151', margin: '0 0 16px 0' }}>
          {t('scheduling:details.metadata')}
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              {t('scheduling:details.createdDate')}
            </div>
            <div style={{ color: '#374151', fontSize: '14px' }}>
              {formatDate(config.createdDate)}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              {t('scheduling:details.lastModified')}
            </div>
            <div style={{ color: '#374151', fontSize: '14px' }}>
              {formatDate(config.lastModified)}
            </div>
          </div>
          
          {config.lastModifiedBy && (
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                {t('scheduling:details.lastModifiedBy')}
              </div>
              <div style={{ color: '#374151', fontSize: '14px' }}>
                {config.lastModifiedBy}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Paramètres de planification détaillés */}
      {config.scheduleParams && (
        <div style={{ 
          background: '#f0f9ff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #bae6fd'
        }}>
          <h3 style={{ fontSize: '16px', color: '#0369a1', margin: '0 0 16px 0' }}>
            {t('scheduling:details.scheduleParams')}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            {config.scheduleParams.frequency && (
              <div>
                <div style={{ fontSize: '12px', color: '#0284c7', marginBottom: '4px' }}>
                  {t('scheduling:form.frequency')}
                </div>
                <div style={{ color: '#0369a1', fontWeight: '500' }}>
                  {config.scheduleParams.frequency}
                </div>
              </div>
            )}
            
            {config.scheduleParams.hour && (
              <div>
                <div style={{ fontSize: '12px', color: '#0284c7', marginBottom: '4px' }}>
                  {t('scheduling:form.hour')}
                </div>
                <div style={{ color: '#0369a1', fontWeight: '500' }}>
                  {config.scheduleParams.hour}h
                </div>
              </div>
            )}
            
            {config.scheduleParams.minute && (
              <div>
                <div style={{ fontSize: '12px', color: '#0284c7', marginBottom: '4px' }}>
                  {t('scheduling:form.minute')}
                </div>
                <div style={{ color: '#0369a1', fontWeight: '500' }}>
                  {config.scheduleParams.minute}min
                </div>
              </div>
            )}
            
            {config.scheduleParams.dayOfWeek && (
              <div>
                <div style={{ fontSize: '12px', color: '#0284c7', marginBottom: '4px' }}>
                  {t('scheduling:form.dayOfWeek')}
                </div>
                <div style={{ color: '#0369a1', fontWeight: '500' }}>
                  {config.scheduleParams.dayOfWeek}
                </div>
              </div>
            )}
            
            {config.scheduleParams.dayOfMonth && (
              <div>
                <div style={{ fontSize: '12px', color: '#0284c7', marginBottom: '4px' }}>
                  {t('scheduling:form.dayOfMonth')}
                </div>
                <div style={{ color: '#0369a1', fontWeight: '500' }}>
                  {config.scheduleParams.dayOfMonth}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};