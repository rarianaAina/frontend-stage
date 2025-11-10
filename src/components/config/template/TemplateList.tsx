import React from 'react';
import { NotificationTemplate } from '../../../types/template';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface TemplateListProps {
  templates: NotificationTemplate[];
  selectedTemplate: NotificationTemplate | null;
  handleSelectTemplate: (template: NotificationTemplate) => void;
  handleCreateNew: () => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  selectedTemplate,
  handleSelectTemplate,
  handleCreateNew
}) => {
  const { t } = useAppTranslation(['templates']);

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', color: '#333', margin: 0 }}>
          {t('templates:list.title')}
        </h3>
        <button
          onClick={handleCreateNew}
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
          + {t('templates:list.new')}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {templates.map(template => (
          <TemplateListItem
            key={template.id}
            template={template}
            isSelected={selectedTemplate?.id === template.id}
            onSelect={() => handleSelectTemplate(template)}
          />
        ))}

        {templates.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            color: '#6b7280', 
            padding: '20px',
            fontStyle: 'italic'
          }}>
            {t('templates:list.empty')}
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour un item de la liste
const TemplateListItem: React.FC<{
  template: NotificationTemplate;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ template, isSelected, onSelect }) => (
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
          color: template.actif ? '#333' : '#9ca3af',
          textDecoration: template.actif ? 'none' : 'line-through'
        }}>
          {template.libelle}
        </div>
        <div style={{ 
          fontSize: '12px', 
          color: '#6b7280',
          fontFamily: 'monospace'
        }}>
          {template.code}
        </div>
        <div style={{ fontSize: '12px', color: '#9ca3af' }}>
          {template.canal}
        </div>
      </div>
      <div style={{ 
        width: '8px', 
        height: '8px', 
        borderRadius: '50%',
        background: template.actif ? '#10b981' : '#ef4444',
        marginLeft: '8px'
      }} />
    </div>
  </div>
);