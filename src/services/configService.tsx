import { api } from '../lib/api';
import { GeneralSettings,WhatsAppSettings, SmtpSettings, SLASettings, CreditSettings, BackupSettings } from '../types/config';

class ConfigService {


    // Configuration WhatsApp
  async getWhatsAppSettings(): Promise<WhatsAppSettings> {
    try {
      const response = await api.get('/configurations/whatsapp/active');
      // Le backend retourne un tableau, on prend le premier élément
      const data = response.data;
      return Array.isArray(data) ? data[0] : data;
    } catch (error) {
      console.error('Erreur ConfigService.getWhatsAppSettings:', error);
      return {
        apiBaseUrl: 'https://waba.360dialog.io/v1/messages',
        apiKey: '',
        phoneNumberId: '',
        businessAccountId: '',
        webhookUrl: '',
        webhookToken: '',
        estActif: true,
        nomConfiguration: 'Défaut',
        description: ''
      };
    }
  }

  async saveWhatsAppSettings(settings: WhatsAppSettings): Promise<boolean> {
    try {
      console.log('📤 Données WhatsApp envoyées au backend:', settings);
      const response = await api.post('/configurations/whatsapp', settings);
      console.log('✅ Réponse du backend WhatsApp:', response.data);
      return true;
    } catch (error: any) {
      console.error('❌ Erreur ConfigService.saveWhatsAppSettings:', error);
      console.error('📋 Détails de l\'erreur:', error.response?.data);
      return false;
    }
  }

  async testWhatsAppSettings(id: number): Promise<boolean> {
    try {
      await api.post(`/configurations/whatsapp/${id}/test`);
      return true;
    } catch (error: any) {
      console.error('Erreur ConfigService.testWhatsAppSettings:', error);
      throw new Error(error.response?.data?.error || 'Erreur lors du test WhatsApp');
    }
  }
  // Paramètres généraux
  async getGeneralSettings(): Promise<GeneralSettings> {
    try {
      const response = await api.get('/configurations/general');
      return response.data;
    } catch (error) {
      console.error('Erreur ConfigService.getGeneralSettings:', error);
      return {
        companyName: 'OPTIMADA',
        defaultLanguage: 'fr',
        timezone: 'UTC+3'
      };
    }
  }

  async saveGeneralSettings(settings: GeneralSettings): Promise<boolean> {
    try {
      await api.post('/configurations/general', settings);
      return true;
    } catch (error) {
      console.error('Erreur ConfigService.saveGeneralSettings:', error);
      return false;
    }
  }

  // MISE À JOUR : Configuration SMTP
  async getSmtpSettings(): Promise<SmtpSettings> {
    try {
      const response = await api.get('/configurations/email');
      return response.data;
    } catch (error) {
      console.error('Erreur ConfigService.getSmtpSettings:', error);
      return {
        host: '',
        port: 587,
        username: '',
        password: ''
      };
    }
  }

  async saveSmtpSettings(settings: SmtpSettings): Promise<boolean> {
    try {
      console.log('📤 Données envoyées au backend:', settings);
      const response = await api.post('/configurations/email', settings);
      console.log('✅ Réponse du backend:', response.data);
      return true;
    } catch (error: any) {
      console.error('❌ Erreur ConfigService.saveSmtpSettings:', error);
      console.error('📋 Détails de l\'erreur:', error.response?.data);
      return false;
    }
  }
  // NOUVEAU : Test de configuration SMTP
  async testSmtpSettings(settings: SmtpSettings): Promise<boolean> {
    try {
      await api.post('/configurations/email/test', settings);
      return true;
    } catch (error) {
      console.error('Erreur ConfigService.testSmtpSettings:', error);
      throw new Error(error.response?.data?.error || 'Erreur lors du test SMTP');
    }
  }

  // Configuration SLA
  async getSLASettings(): Promise<SLASettings> {
    try {
      const response = await api.get('/configurations/sla');
      return response.data;
    } catch (error) {
      console.error('Erreur ConfigService.getSLASettings:', error);
      return {
        urgent: 2,
        medium: 8,
        low: 24
      };
    }
  }

  async saveSLASettings(settings: SLASettings): Promise<boolean> {
    try {
      await api.post('/configurations/sla', settings);
      return true;
    } catch (error) {
      console.error('Erreur ConfigService.saveSLASettings:', error);
      return false;
    }
  }

  // Configuration crédits
  async getCreditSettings(): Promise<CreditSettings> {
    try {
      const response = await api.get('/configurations/credits');
      return response.data;
    } catch (error) {
      console.error('Erreur ConfigService.getCreditSettings:', error);
      return {
        alertThreshold: 5,
        blockOnInsufficient: true
      };
    }
  }

  async saveCreditSettings(settings: CreditSettings): Promise<boolean> {
    try {
      await api.post('/configurations/credits', settings);
      return true;
    } catch (error) {
      console.error('Erreur ConfigService.saveCreditSettings:', error);
      return false;
    }
  }

  // Configuration sauvegarde
  async getBackupSettings(): Promise<BackupSettings> {
    try {
      const response = await api.get('/configurations/backup');
      return response.data;
    } catch (error) {
      console.error('Erreur ConfigService.getBackupSettings:', error);
      return {
        frequency: 'daily'
      };
    }
  }

  async saveBackupSettings(settings: BackupSettings): Promise<boolean> {
    try {
      await api.post('/configurations/backup', settings);
      return true;
    } catch (error) {
      console.error('Erreur ConfigService.saveBackupSettings:', error);
      return false;
    }
  }

  async createBackup(): Promise<boolean> {
    try {
      await api.post('/configurations/backup/now');
      return true;
    } catch (error) {
      console.error('Erreur ConfigService.createBackup:', error);
      return false;
    }
  }

  
}

export const configService = new ConfigService();