import React from 'react';
import { useScheduling } from '../../../hooks/scheduling/useScheduling';
import { SchedulingList } from './SchedulingList';
import { SchedulingHeader } from './SchedulingHeader';
import { SchedulingForm } from './SchedulingForm';
import { SchedulingDetails } from './SchedulingDetails';
import { SchedulingStatus } from './SchedulingStatus';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

export const SchedulingManager: React.FC = () => {
  const { t } = useAppTranslation(['scheduling', 'common']);
  const {
    configurations,
    selectedConfig,
    options,
    status,
    loading,
    saving,
    message,
    isEditing,
    isCreating,
    setMessage,
    handleSelectConfig,
    handleCreateNew,
    handleEdit,
    handleCancel,
    handleSubmit,
    handleDelete,
    handleToggleActivation,
    handleReloadCache
  } = useScheduling();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: '#6b7280'
      }}>
        {t('common:loading')}...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* En-tête */}
      <SchedulingHeader
        selectedConfig={selectedConfig}
        isEditing={isEditing}
        isCreating={isCreating}
        status={status}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onReloadCache={handleReloadCache}
      />

      {/* Message */}
      {message && (
        <div style={{
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          background: message.includes('❌') ? '#fef2f2' : '#f0fdf4',
          color: message.includes('❌') ? '#dc2626' : '#16a34a',
          border: `1px solid ${message.includes('❌') ? '#fecaca' : '#bbf7d0'}`
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '20px' }}>
        {/* Liste des configurations */}
        <SchedulingList
          configurations={configurations}
          selectedConfig={selectedConfig}
          onSelectConfig={handleSelectConfig}
          onCreateNew={handleCreateNew}
        />

        {/* Détails/Formulaire */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          minHeight: '500px'
        }}>
          {isCreating || isEditing ? (
            <SchedulingForm
              config={selectedConfig}
              options={options}
              isEditing={isEditing}
              isCreating={isCreating}
              saving={saving}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : selectedConfig ? (
            <SchedulingDetails
              config={selectedConfig}
              onEdit={handleEdit}
              onToggleActivation={handleToggleActivation}
              onDelete={handleDelete}
            />
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: '#6b7280', 
              padding: '40px',
              fontStyle: 'italic'
            }}>
              {t('scheduling:selectOrCreate')}
            </div>
          )}
        </div>
      </div>

      {/* Statut global */}
      {status && <SchedulingStatus status={status} />}
    </div>
  );
};