import React from 'react';
import { NotificationTemplate } from '../../../types/template';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';
import { TemplateList } from './TemplateList';
import { TemplateDetails } from './TemplateDetails';
import { TemplateForm } from './TemplateForm';
import { TemplateHeader } from './TemplateHeader';

interface TemplateTabContentProps {
  templates: NotificationTemplate[];
  selectedTemplate: NotificationTemplate | null;
  loading: boolean;
  saving: boolean;
  testing: boolean;
  message: string;
  isEditing: boolean;
  isCreating: boolean;
  testResult: string;
  setMessage: (message: string) => void;
  setSelectedTemplate: (template: NotificationTemplate | null) => void;
  loadTemplates: () => void;
  handleSelectTemplate: (template: NotificationTemplate) => void;
  handleCreateNew: () => void;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSubmit: (formData: Partial<NotificationTemplate>) => Promise<void>; // ✅ Changé
  handleDelete: (template: NotificationTemplate) => void;
  handleToggleActivation: (template: NotificationTemplate) => void;
  handleTestTemplate: () => void;
}

export const TemplateTabContent: React.FC<TemplateTabContentProps> = (props) => {
  const { t, ready } = useAppTranslation(['common', 'templates']);

  if (!ready) {
    return <LoadingView message="Chargement des traductions..." />;
  }

  if (props.loading) {
    return <LoadingView message={t('common:loading')} />;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '20px',
      minHeight: '600px'
    }}>
      <TemplateList
        templates={props.templates}
        selectedTemplate={props.selectedTemplate}
        handleSelectTemplate={props.handleSelectTemplate}
        handleCreateNew={props.handleCreateNew}
      />

      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {props.message && <MessageAlert message={props.message} />}

        {!props.selectedTemplate && !props.isCreating ? (
          <NoSelectionView />
        ) : (
          <>
            <TemplateHeader
              selectedTemplate={props.selectedTemplate}
              isEditing={props.isEditing}
              isCreating={props.isCreating}
              handleEdit={props.handleEdit}
              handleCancel={props.handleCancel}
              handleToggleActivation={props.handleToggleActivation}
              handleDelete={props.handleDelete}
            />

            {(props.isEditing || props.isCreating) ? (
              <TemplateForm
                initialData={props.selectedTemplate || undefined}
                isCreating={props.isCreating}
                saving={props.saving}
                onSubmit={props.handleSubmit} // ✅ Passe directement la fonction
                onCancel={props.handleCancel}
              />
            ) : (
              props.selectedTemplate && (
                <TemplateDetails
                  selectedTemplate={props.selectedTemplate}
                  testing={props.testing}
                  testResult={props.testResult}
                  handleTestTemplate={props.handleTestTemplate}
                  loadTemplates={props.loadTemplates}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

const LoadingView: React.FC<{ message: string }> = ({ message }) => (
  <div style={{
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  }}>
    <div>{message}</div>
  </div>
);

const MessageAlert: React.FC<{ message: string }> = ({ message }) => (
  <div style={{
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    background: message.includes('✅') ? '#d1fae5' : '#fee2e2',
    color: message.includes('✅') ? '#065f46' : '#991b1b',
    border: `1px solid ${message.includes('✅') ? '#a7f3d0' : '#fecaca'}`
  }}>
    {message}
  </div>
);

const NoSelectionView: React.FC = () => {
  const { t } = useAppTranslation(['templates']);
  
  return (
    <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>
      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
        {t('templates:details.noSelection')}
      </h3>
      <p>{t('templates:details.selectOrCreate')}</p>
    </div>
  );
};