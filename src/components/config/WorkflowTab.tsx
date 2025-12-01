import React, { useState, useEffect } from 'react';
import { WorkflowConfig, WorkflowStep } from '../../types/config';
import { workflowService } from '../../services/workflowService';
import { toast } from 'react-toastify';

export const WorkflowTab: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowConfig[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('CREATION_TICKET');
  const [availableUsers, setAvailableUsers] = useState<{ id: number; nom: string; email: string }[]>([]);
  const [notificationTypes, setNotificationTypes] = useState<{ id: number; code: string; libelle: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [localWorkflow, setLocalWorkflow] = useState<WorkflowConfig | null>(null);
  

  const [tempIdCounter, setTempIdCounter] = useState(-1);

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
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const addStep = () => {
    if (!localWorkflow) return;

    // Vérifier qu'un utilisateur est disponible
    if (availableUsers.length === 0) {
      alert('Aucun utilisateur interne disponible. Veuillez d\'abord créer des utilisateurs.');
      return;
    }

    // Vérifier qu'un type de notification est trouvé
    const typeNotification = notificationTypes.find(t => t.code === selectedWorkflow);
    if (!typeNotification) {
      alert('Type de notification non trouvé.');
      return;
    }

    const newStep: WorkflowStep = {
      id: tempIdCounter, // ID temporaire négatif
      ordre: localWorkflow.steps.length + 1,
      utilisateurId: availableUsers[0].id,
      typeNotificationId: typeNotification.id
    };

    // Décrémenter le compteur d'IDs temporaires
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

  const moveStepUp = (index: number) => {
    if (!localWorkflow || index === 0) return;

    const updatedSteps = [...localWorkflow.steps];
    // Échanger les étapes
    [updatedSteps[index], updatedSteps[index - 1]] = [updatedSteps[index - 1], updatedSteps[index]];
    // Mettre à jour les ordres
    const reorderedSteps = updatedSteps.map((step, i) => ({ ...step, ordre: i + 1 }));

    setLocalWorkflow({ ...localWorkflow, steps: reorderedSteps });
  };

  const moveStepDown = (index: number) => {
    if (!localWorkflow || index === localWorkflow.steps.length - 1) return;

    const updatedSteps = [...localWorkflow.steps];
    // Échanger les étapes
    [updatedSteps[index], updatedSteps[index + 1]] = [updatedSteps[index + 1], updatedSteps[index]];
    // Mettre à jour les ordres
    const reorderedSteps = updatedSteps.map((step, i) => ({ ...step, ordre: i + 1 }));

    setLocalWorkflow({ ...localWorkflow, steps: reorderedSteps });
  };

  const saveWorkflow = async () => {
      if (!localWorkflow) return;

      // Validation des données - PERMETTRE LES WORKFLOWS SANS ÉTAPES
      const invalidSteps = localWorkflow.steps.filter(step => 
          step.utilisateurId === 0 || !step.utilisateurId
      );
      
      if (invalidSteps.length > 0) {
          alert('Veuillez sélectionner un utilisateur pour toutes les étapes.');
          return;
      }

      setSaving(true);
      try {
          const success = await workflowService.saveWorkflow(localWorkflow);
          if (success) {
              // Recharger les données fraîches du serveur
              await loadData();
              toast.success('Workflow sauvegardé avec succès !');
          } else {
              alert('Erreur lors de la sauvegarde du workflow');
          }
      } catch (error: any) {
          console.error('Erreur lors de la sauvegarde:', error);
          alert(error.message || 'Erreur lors de la sauvegarde du workflow');
      } finally {
          setSaving(false);
      }
  };

  const handleWorkflowTypeChange = (newType: string) => {
    setSelectedWorkflow(newType);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!localWorkflow) {
    return <div>Erreur: Workflow non chargé</div>;
  }

  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
        Configuration des Workflows de Notification
      </h2>

      {/* Section de sélection du type de notification */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          Type de notification:
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

      {/* Section des étapes du workflow */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', margin: 0, color: '#333' }}>
            Étapes du workflow ({localWorkflow.steps.length})
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
            <span>Ajouter une étape</span>
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
              Aucune étape configurée pour ce workflow.<br/>
              Cliquez sur "Ajouter une étape" pour commencer.
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
                {/* En-tête de l'étape avec contrôles */}
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
                        Étape {step.ordre}
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
                    <span>Supprimer</span>
                  </button>
                </div>
                
                {/* Contenu de l'étape */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Utilisateur à notifier:
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
                      <option value={0}>Sélectionnez un utilisateur</option>
                      {availableUsers.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.nom} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Input ordre caché mais présent pour la logique */}
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

      {/* Section des actions */}
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
        {saving ? ' Sauvegarde en cours...' : ' Sauvegarder le workflow'}
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
          🔄 Recharger
        </button>
      </div>

      {/* Messages d'information */}
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
              Attention
            </h4>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#dc2626', lineHeight: '1.4' }}>
            Aucun utilisateur interne trouvé. Pour configurer un workflow, vous devez d'abord créer des utilisateurs avec les rôles 2 ou 3.
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
            Information
          </h4>
        </div>
        <div style={{ fontSize: '14px', color: '#0369a1', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            • Le créateur du ticket recevra toujours une notification automatiquement
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            • Ce workflow configure les notifications supplémentaires pour les utilisateurs internes
          </p>
          <p style={{ margin: 0 }}>
            • Les modifications sont sauvegardées uniquement quand vous cliquez sur "Sauvegarder le workflow"
          </p>
        </div>
      </div>
    </div>
  );
};