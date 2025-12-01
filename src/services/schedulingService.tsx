import { api } from '../lib/api';
import { 
  SchedulingConfiguration, 
  SimplifiedSchedulingRequest, 
  CreateSchedulingRequest,
  SchedulingOptions,
  SchedulingStatus 
} from '../types/scheduling/scheduling';

class SchedulingService {
  // Récupère toutes les configurations
  async getConfigurations(): Promise<SchedulingConfiguration[]> {
    try {
      const response = await api.get('/admin/scheduling/configurations');
      return response.data;
    } catch (error) {
      console.error('Erreur SchedulingService.getConfigurations:', error);
      throw new Error('Erreur lors du chargement des configurations');
    }
  }

  // Récupère les options disponibles
  async getConfigurationOptions(): Promise<SchedulingOptions> {
    try {
      const response = await api.get('/admin/scheduling/configuration-options');
      return response.data;
    } catch (error) {
      console.error('Erreur SchedulingService.getConfigurationOptions:', error);
      throw new Error('Erreur lors du chargement des options');
    }
  }

  // Crée une nouvelle configuration
  async createConfiguration(request: CreateSchedulingRequest): Promise<SchedulingConfiguration> {
    try {
      const response = await api.post('/admin/scheduling/configurations', request);
      return response.data;
    } catch (error: any) {
      console.error('Erreur SchedulingService.createConfiguration:', error);
      throw new Error(error.response?.data?.error || 'Erreur lors de la création');
    }
  }

  // Met à jour une configuration
  async updateConfiguration(jobName: string, request: SimplifiedSchedulingRequest): Promise<SchedulingConfiguration> {
    try {
      const response = await api.put(`/admin/scheduling/configurations/${jobName}`, request);
      return response.data;
    } catch (error: any) {
      console.error('Erreur SchedulingService.updateConfiguration:', error);
      throw new Error(error.response?.data?.error || 'Erreur lors de la mise à jour');
    }
  }

  // Active/désactive un job
  async toggleJob(jobName: string, enabled: boolean): Promise<void> {
    try {
      await api.patch(`/admin/scheduling/configurations/${jobName}/toggle`, { enabled });
    } catch (error: any) {
      console.error('Erreur SchedulingService.toggleJob:', error);
      throw new Error(error.response?.data?.error || 'Erreur lors de la modification');
    }
  }

  // Supprime une configuration
  async deleteConfiguration(jobName: string): Promise<void> {
    try {
      await api.delete(`/admin/scheduling/configurations/${jobName}`);
    } catch (error: any) {
      console.error('Erreur SchedulingService.deleteConfiguration:', error);
      throw new Error(error.response?.data?.error || 'Erreur lors de la suppression');
    }
  }

  // Récupère le statut
  async getStatus(): Promise<SchedulingStatus> {
    try {
      const response = await api.get('/admin/scheduling/status');
      return response.data;
    } catch (error) {
      console.error('Erreur SchedulingService.getStatus:', error);
      throw new Error('Erreur lors du chargement du statut');
    }
  }

  // Teste une expression cron
  async testCronExpression(cronExpression: string): Promise<boolean> {
    try {
      const response = await api.post('/admin/scheduling/test-cron', { cronExpression });
      return response.data.valid;
    } catch (error: any) {
      console.error('Erreur SchedulingService.testCronExpression:', error);
      throw new Error(error.response?.data?.error || 'Erreur lors du test');
    }
  }

  // Recharge le cache
  async reloadCache(): Promise<void> {
    try {
      await api.post('/admin/scheduling/reload-cache');
    } catch (error: any) {
      console.error('Erreur SchedulingService.reloadCache:', error);
      throw new Error(error.response?.data?.error || 'Erreur lors du rechargement');
    }
  }
}

export const schedulingService = new SchedulingService();