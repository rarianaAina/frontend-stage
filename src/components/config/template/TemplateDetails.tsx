import React from 'react';
import { NotificationTemplate } from '../../../types/template';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface TemplateDetailsProps {
  selectedTemplate: NotificationTemplate;
  testing: boolean;
  testResult: string;
  handleTestTemplate: () => void;
  loadTemplates: () => void;
}

export const TemplateDetails: React.FC<TemplateDetailsProps> = ({
  selectedTemplate,
  testing,
  testResult,
  handleTestTemplate,
  loadTemplates
}) => {
  const { t } = useAppTranslation(['common', 'templates']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <DetailField 
          label={t('templates:details.code')} 
          value={selectedTemplate.code}
          monospace
        />
        <DetailField 
          label={t('templates:details.canal')} 
          value={selectedTemplate.canal}
        />
      </div>

      <DetailField 
        label={t('templates:details.sujet')} 
        value={selectedTemplate.sujet}
      />

      <DetailField 
        label={t('templates:details.contenuHtml')} 
        value={selectedTemplate.contenuHtml}
        isHtml
        scrollable
      />

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button
          onClick={handleTestTemplate}
          disabled={testing}
          style={{
            background: testing ? '#9ca3af' : '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            cursor: testing ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {testing ? '⏳' : '🧪'}
          {testing ? `${t('common:loading')}...` : t('templates:details.test')}
        </button>

        <button
          onClick={loadTemplates}
          style={{
            background: '#6b7280',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          🔄 {t('common:reload')}
        </button>
      </div>

      {/* Résultat du test */}
      {testResult && (
        <DetailField 
          label={t('templates:details.testResult')} 
          value={testResult}
          isHtml
          scrollable
          maxHeight="200px"
        />
      )}
    </div>
  );
};

// Composant réutilisable pour afficher un champ de détail
const DetailField: React.FC<{
  label: string;
  value: string;
  monospace?: boolean;
  isHtml?: boolean;
  scrollable?: boolean;
  maxHeight?: string;
}> = ({ label, value, monospace = false, isHtml = false, scrollable = false, maxHeight = '300px' }) => (
  <div>
    <strong>{label}:</strong>
    <div style={{ 
      background: isHtml ? '#f8f9fa' : '#f3f4f6', 
      padding: '12px', 
      borderRadius: '6px',
      marginTop: '4px',
      border: isHtml ? '1px solid #e9ecef' : 'none',
      maxHeight: scrollable ? maxHeight : 'none',
      overflow: scrollable ? 'auto' : 'visible',
      fontFamily: monospace ? 'monospace' : 'inherit',
      fontSize: isHtml ? '14px' : 'inherit',
      whiteSpace: isHtml ? 'pre-wrap' : 'normal'
    }}>
      {isHtml ? (
        <div dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        value
      )}
    </div>
  </div>
);