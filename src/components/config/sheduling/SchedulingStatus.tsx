import React from 'react';
import { SchedulingStatus as SchedulingStatusType } from '../../../types/scheduling/scheduling';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface SchedulingStatusProps {
  status: SchedulingStatusType;
}

export const SchedulingStatus: React.FC<SchedulingStatusProps> = ({ status }) => {
  const { t } = useAppTranslation(['scheduling']);

  const formatLastChecked = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const getJobStatusColor = (enabled: boolean) => {
    return enabled ? '#10b981' : '#6b7280';
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginTop: '20px'
    }}>
      <h3 style={{ fontSize: '18px', color: '#333', margin: '0 0 16px 0' }}>
        {t('scheduling:status.title')}
      </h3>

      {/* Statistiques globales */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ 
          background: '#f0f9ff', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0369a1' }}>
            {status.totalJobs}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {t('scheduling:status.totalJobs')}
          </div>
        </div>
        
        <div style={{ 
          background: '#f0fdf4', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>
            {status.activeJobs}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {t('scheduling:status.activeJobs')}
          </div>
        </div>
        
        <div style={{ 
          background: '#fffbeb', 
          padding: '16px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d97706' }}>
            {status.totalJobs - status.activeJobs}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            {t('scheduling:status.inactiveJobs')}
          </div>
        </div>
      </div>

      {/* Dernière vérification */}
      <div style={{ 
        padding: '12px',
        background: '#f8fafc',
        borderRadius: '6px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          {t('scheduling:status.lastChecked')}: {formatLastChecked(status.lastChecked)}
        </div>
      </div>

      {/* Liste détaillée des jobs */}
      <div>
        <h4 style={{ fontSize: '16px', color: '#374151', margin: '0 0 12px 0' }}>
          {t('scheduling:status.jobsList')}
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Object.entries(status.jobs).map(([jobName, jobStatus]) => (
            <div
              key={jobName}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: '#f8fafc',
                borderRadius: '6px',
                borderLeft: `4px solid ${getJobStatusColor(jobStatus.enabled)}`
              }}
            >
              <div>
                <div style={{ fontWeight: '500', color: '#374151' }}>
                  {jobName}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6b7280',
                  fontFamily: 'monospace'
                }}>
                  {jobStatus.cronExpression}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: getJobStatusColor(jobStatus.enabled)
                  }}
                />
                <span style={{ 
                  fontSize: '12px', 
                  color: getJobStatusColor(jobStatus.enabled),
                  fontWeight: '500'
                }}>
                  {jobStatus.enabled ? t('common:active') : t('common:inactive')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};