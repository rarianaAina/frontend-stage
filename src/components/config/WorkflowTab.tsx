import React, { useState, useEffect } from 'react';
import { WorkflowConfig, WorkflowStep } from '../../types/config';
import { workflowService } from '../../services/workflowService';
import { toast } from 'react-toastify';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

export const WorkflowTab: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowConfig[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('CREATION_TICKET');
  const [availableUsers, setAvailableUsers] = useState<{ id: number; nom: string; email: string }[]>([]);
  const [notificationTypes, setNotificationTypes] = useState<{ id: number; code: string; libelle: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [localWorkflow, setLocalWorkflow] = useState<WorkflowConfig | null>(null);
  const [tempIdCounter, setTempIdCounter] = useState(-1);

  const { t } = useAppTranslation(['common', 'config']);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const workflowFromServer = workflows.find(w => w.typeNotificationCode === selectedWorkflow);
    setLocalWorkflow(workflowFromServer || {
      typeNotificationCode: selectedWorkflow,
      steps: []
    });
  }, [selectedWorkflow, workflows]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [workflowsData, usersData, typesData] = await Promise.all([
        workflowService.getWorkflows(),
        workflowService.getAvailableUsers(),
        workflowService.getNotificationTypes()
      ]);
      
      setWorkflows(workflowsData);
      setAvailableUsers(usersData);
      setNotificationTypes(typesData);
      
      const initialWorkflow = workflowsData.find(w => w.typeNotificationCode === selectedWorkflow) || {
        typeNotificationCode: selectedWorkflow,
        steps: []
      };
      setLocalWorkflow(initialWorkflow);
    } catch (error) {
      console.error(t('config:workflow.loadError') || 'Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const addStep = () => {
    if (!localWorkflow) return;

    if (availableUsers.length === 0) {
      alert(t('config:workflow.alerts.noUsers') || 'Aucun utilisateur interne disponible. Veuillez d\'abord créer des utilisateurs.');
      return;
    }

    const typeNotification = notificationTypes.find(t => t.code === selectedWorkflow);
    if (!typeNotification) {
      alert(t('config:workflow.messages.noNotificationType') || 'Type de notification non trouvé.');
      return;
    }

    const newStep: WorkflowStep = {
      id: tempIdCounter,
      ordre: localWorkflow.steps.length + 1,
      utilisateurId: availableUsers[0].id,
      typeNotificationId: typeNotification.id
    };

    setTempIdCounter(prev => prev - 1);

    const updatedWorkflow = {
      ...localWorkflow,
      steps: [...localWorkflow.steps, newStep]
    };

    setLocalWorkflow(updatedWorkflow);
  };

  const updateStep = (stepId: number, updates: Partial<WorkflowStep>) => {
    if (!localWorkflow) return;

    const updatedSteps = localWorkflow.steps.map(step =>
      step.id === stepId ? { ...step, ...updates } : step
    );

    const updatedWorkflow = { ...localWorkflow, steps: updatedSteps };
    setLocalWorkflow(updatedWorkflow);
  };

  const removeStep = (stepId: number) => {
    if (!localWorkflow) return;

    const updatedSteps = localWorkflow.steps
      .filter(step => step.id !== stepId)
      .map((step, index) => ({ ...step, ordre: index + 1 }));

    const updatedWorkflow = { ...localWorkflow, steps: updatedSteps };
    setLocalWorkflow(updatedWorkflow);
  };

  const saveWorkflow = async () => {
    if (!localWorkflow) return;

    const invalidSteps = localWorkflow.steps.filter(step => 
      step.utilisateurId === 0 || !step.utilisateurId
    );
    
    if (invalidSteps.length > 0) {
      alert(t('config:workflow.alerts.selectUser') || 'Veuillez sélectionner un utilisateur pour toutes les étapes.');
      return;
    }

    setSaving(true);
    try {
      const success = await workflowService.saveWorkflow(localWorkflow);
      if (success) {
        await loadData();
        toast.success(t('config:workflow.alerts.saveSuccess') || 'Workflow sauvegardé avec succès !');
      } else {
        alert(t('config:workflow.alerts.saveError') || 'Erreur lors de la sauvegarde du workflow');
      }
    } catch (error: any) {
      console.error(t('config:workflow.alerts.saveError') || 'Erreur lors de la sauvegarde:', error);
      alert(error.message || t('config:workflow.alerts.saveError') || 'Erreur lors de la sauvegarde du workflow');
    } finally {
      setSaving(false);
    }
  };

  const handleWorkflowTypeChange = (newType: string) => {
    setSelectedWorkflow(newType);
  };

  if (loading) {
    return <div>{t('config:workflow.loading') || 'Chargement...'}</div>;
  }

  if (!localWorkflow) {
    return <div>{t('config:workflow.error') || 'Erreur : Workflow non chargé'}</div>;
  }

  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
        {t('config:workflow.title') || 'Configuration des Workflows de Notification'}
      </h2>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          {t('config:workflow.fields.notificationType') || 'Type de notification :'}
        </label>
        <select
          value={selectedWorkflow}
          onChange={(e) => handleWorkflowTypeChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
        >
          {notificationTypes.map(type => (
            <option key={type.code} value={type.code}>
              {type.libelle}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', margin: 0, color: '#333' }}>
            {t('config:workflow.fields.workflowSteps') || 'Étapes du workflow'} ({localWorkflow.steps.length})
          </h3>
          <button
            onClick={addStep}
            disabled={availableUsers.length === 0}
            style={{
              background: availableUsers.length === 0 ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: availableUsers.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>+</span>
            <span>{t('config:workflow.buttons.addStep') || 'Ajouter une étape'}</span>
          </button>
        </div>
        
        {localWorkflow.steps.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            border: '2px dashed #e5e7eb',
            borderRadius: '10px',
            background: '#fafafa'
          }}>
            <p style={{ color: '#666', fontStyle: 'italic', margin: 0 }}>
              {t('config:workflow.messages.noSteps') || 'Aucune étape configurée pour ce workflow.<br/>Cliquez sur "Ajouter une étape" pour commencer.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {localWorkflow.steps.map((step, index) => (
              <div
                key={step.id}
                style={{
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  background: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '15px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      background: '#3b82f6',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {t('config:workflow.messages.step') || 'Étape'} {step.ordre}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => removeStep(step.id)}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>×</span>
                    <span>{t('config:workflow.buttons.delete') || 'Supprimer'}</span>
                  </button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {t('config:workflow.messages.userToNotify') || 'Utilisateur à notifier :'}
                    </label>
                    <select
                      value={step.utilisateurId}
                      onChange={(e) => updateStep(step.id, { utilisateurId: parseInt(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        background: 'white'
                      }}
                    >
                      <option value={0}>{t('config:workflow.placeholders.selectUser') || 'Sélectionnez un utilisateur'}</option>
                      {availableUsers.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.nom} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <input
                    type="hidden"
                    value={step.ordre}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        flexWrap: 'wrap',
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <button
          onClick={saveWorkflow}
          disabled={saving}
          style={{
            background: saving ? '#9ca3af' : '#10b981',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {saving ? '⏳' : '💾'}
          {saving 
            ? t('config:workflow.buttons.saving') || 'Sauvegarde en cours...'
            : t('config:workflow.buttons.save') || 'Sauvegarder le workflow'
          }
        </button>

        <button
          onClick={loadData}
          style={{
            background: '#6b7280',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          🔄 {t('config:workflow.buttons.reload') || 'Recharger'}
        </button>
      </div>

      {availableUsers.length === 0 && (
        <div style={{ 
          marginTop: '20px', 
          padding: '16px', 
          background: '#fef2f2', 
          borderRadius: '8px', 
          border: '1px solid #fecaca' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ color: '#dc2626', fontSize: '16px' }}>⚠️</span>
            <h4 style={{ margin: 0, color: '#dc2626', fontSize: '14px', fontWeight: '600' }}>
              {t('config:workflow.info.attention') || 'Attention'}
            </h4>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#dc2626', lineHeight: '1.4' }}>
            {t('config:workflow.messages.noUsersInApp') || 'Aucun utilisateur interne trouvé. Pour configurer un workflow, vous devez d\'abord créer des utilisateurs avec les rôles 2 ou 3.'}
          </p>
        </div>
      )}

      <div style={{ 
        marginTop: '20px', 
        padding: '16px', 
        background: '#f0f9ff', 
        borderRadius: '8px',
        border: '1px solid #bae6fd'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ color: '#0369a1', fontSize: '16px' }}>💡</span>
          <h4 style={{ margin: 0, color: '#0369a1', fontSize: '14px', fontWeight: '600' }}>
            {t('config:workflow.info.information') || 'Information'}
          </h4>
        </div>
        <div style={{ fontSize: '14px', color: '#0369a1', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            {t('config:workflow.messages.creatorNotification') || '• Le créateur du ticket recevra toujours une notification automatiquement'}
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            {t('config:workflow.messages.additionalNotification') || '• Ce workflow configure les notifications supplémentaires pour les utilisateurs internes'}
          </p>
          <p style={{ margin: 0 }}>
            {t('config:workflow.messages.saveInstructions') || '• Les modifications sont sauvegardées uniquement quand vous cliquez sur "Sauvegarder le workflow"'}
          </p>
        </div>
      </div>
    </div>
  );
};