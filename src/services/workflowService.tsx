import { api } from '../lib/api';
import { WorkflowConfig, WorkflowStep } from '../types/config';

class WorkflowService {
    async getWorkflows(): Promise<WorkflowConfig[]> {
    try {
      const response = await api.get('/workflow/configurations');
      return response.data;
    } catch (error) {
      console.error('Erreur WorkflowService.getWorkflows:', error);
      throw new Error('Impossible de charger les workflows');
    }
  }

    async getWorkflowByType(typeNotificationCode: string): Promise<WorkflowConfig | null> {
    try {
      const response = await api.get(`/workflow/configurations/${typeNotificationCode}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          typeNotificationCode,
          steps: []
        };
      }
      console.error('Erreur WorkflowService.getWorkflowByType:', error);
      throw new Error('Impossible de charger le workflow');
    }
  }

    async saveWorkflow(config: WorkflowConfig): Promise<boolean> {
    try {
      // Nettoyer les données : pour les nouvelles étapes (IDs négatifs), envoyer sans ID
      const cleanedConfig = {
        typeNotificationCode: config.typeNotificationCode,
        steps: config.steps.map(step => ({
          // Si l'ID est temporaire (négatif), ne pas l'envoyer
          ...(step.id > 0 && { id: step.id }),
          ordre: step.ordre,
          utilisateurId: step.utilisateurId,
          typeNotificationId: step.typeNotificationId
        }))
      };

      console.log('Données envoyées au backend:', cleanedConfig);

      const response = await api.post('/workflow/configurations', cleanedConfig);
      return response.status === 200;
    } catch (error: any) {
      console.error('Erreur WorkflowService.saveWorkflow:', error);
      
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      
      throw new Error('Erreur lors de la sauvegarde du workflow');
    }
  }

  async updateWorkflowStep(step: WorkflowStep): Promise<boolean> {
    try {
      const response = await api.put(`/workflow/steps/${step.id}`, step);
      return response.status === 200;
    } catch (error) {
      console.error('Erreur WorkflowService.updateWorkflowStep:', error);
      return false;
    }
  }

  async deleteWorkflowStep(stepId: number): Promise<boolean> {
    try {
      const response = await api.delete(`/workflow/steps/${stepId}`);
      return response.status === 200;
    } catch (error) {
      console.error('Erreur WorkflowService.deleteWorkflowStep:', error);
      return false;
    }
  }

  async getAvailableUsers(): Promise<{ id: number; nom: string; email: string }[]> {
    try {
      const response = await api.get('/workflow/utilisateurs/internes');
      return response.data;
    } catch (error) {
      console.error('Erreur WorkflowService.getAvailableUsers:', error);
      return [];
    }
  }

  async getNotificationTypes(): Promise<{ id: number; code: string; libelle: string }[]> {
    try {
      const response = await api.get('/workflow/type-notifications');
      return response.data;
    } catch (error) {
      console.error('Erreur WorkflowService.getNotificationTypes:', error);
      return [];
    }
  }
}

export const workflowService = new WorkflowService();