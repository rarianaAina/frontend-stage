import { api } from '../lib/api';

export interface NotificationTemplate {
  id: number;
  code: string;
  libelle: string;
  canal: string;
  sujet: string;
  contenuHtml: string;
  actif: boolean;
  dateCreation: string;
  dateMiseAJour: string;
}

export interface TemplateTestRequest {
  variables: {
    [key: string]: any;
  };
}

class TemplateService {
  
  // Récupérer tous les templates actifs
  async getAllTemplates(): Promise<NotificationTemplate[]> {
    try {
      const response = await api.get('/notification-templates');
      return response.data;
    } catch (error) {
      console.error('Erreur TemplateService.getAllTemplates:', error);
      return [];
    }
  }

  // Récupérer un template par son code
  async getTemplateByCode(code: string): Promise<NotificationTemplate | null> {
    try {
      const response = await api.get(`/notification-templates/${code}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log(`Template avec le code ${code} non trouvé`);
        return null;
      }
      console.error('Erreur TemplateService.getTemplateByCode:', error);
      return null;
    }
  }

  // Récupérer un template par son ID
  async getTemplateById(id: number): Promise<NotificationTemplate | null> {
    try {
      const response = await api.get(`/notification-templates/id/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log(`Template avec l'ID ${id} non trouvé`);
        return null;
      }
      console.error('Erreur TemplateService.getTemplateById:', error);
      return null;
    }
  }

  // Créer un nouveau template
  async createTemplate(template: Omit<NotificationTemplate, 'id' | 'dateCreation' | 'dateMiseAJour'>): Promise<NotificationTemplate | null> {
    try {
      console.log('📤 Création du template:', template);
      const response = await api.post('/notification-templates', template);
      console.log('✅ Template créé avec succès:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur TemplateService.createTemplate:', error);
      console.error('📋 Détails de l\'erreur:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Erreur lors de la création du template');
    }
  }

  // Mettre à jour un template existant
  async updateTemplate(id: number, template: Partial<NotificationTemplate>): Promise<NotificationTemplate | null> {
    try {
      console.log('📤 Mise à jour du template ID:', id, template);
      const response = await api.put(`/notification-templates/${id}`, template);
      console.log('✅ Template mis à jour avec succès:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur TemplateService.updateTemplate:', error);
      console.error('📋 Détails de l\'erreur:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du template');
    }
  }

  // Activer/Désactiver un template
  async toggleTemplateActivation(id: number): Promise<NotificationTemplate | null> {
    try {
      console.log('🔄 Activation/Désactivation du template ID:', id);
      const response = await api.patch(`/notification-templates/${id}/toggle-activation`);
      console.log('✅ Statut du template modifié avec succès:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur TemplateService.toggleTemplateActivation:', error);
      console.error('📋 Détails de l\'erreur:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Erreur lors de la modification du statut');
    }
  }

  // Supprimer un template
  async deleteTemplate(id: number): Promise<boolean> {
    try {
      console.log('🗑️ Suppression du template ID:', id);
      await api.delete(`/notification-templates/${id}`);
      console.log('✅ Template supprimé avec succès');
      return true;
    } catch (error: any) {
      console.error('❌ Erreur TemplateService.deleteTemplate:', error);
      console.error('📋 Détails de l\'erreur:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression du template');
    }
  }

  // Tester un template avec des variables
  async testTemplate(code: string, variables: { [key: string]: any }): Promise<string> {
    try {
      console.log('🧪 Test du template:', code, variables);
      const request: TemplateTestRequest = { variables };
      const response = await api.post(`/notification-templates/${code}/test`, request);
      console.log('✅ Test du template réussi');
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur TemplateService.testTemplate:', error);
      console.error('📋 Détails de l\'erreur:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Erreur lors du test du template');
    }
  }

  // Récupérer les templates par canal
  async getTemplatesByCanal(canal: string): Promise<NotificationTemplate[]> {
    try {
      const response = await api.get(`/notification-templates/canal/${canal}`);
      return response.data;
    } catch (error) {
      console.error('Erreur TemplateService.getTemplatesByCanal:', error);
      return [];
    }
  }

  // Dupliquer un template
  async duplicateTemplate(id: number, newCode: string): Promise<NotificationTemplate | null> {
    try {
      console.log('📋 Duplication du template ID:', id, 'avec le nouveau code:', newCode);
      const response = await api.post(`/notification-templates/${id}/duplicate`, { newCode });
      console.log('✅ Template dupliqué avec succès:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur TemplateService.duplicateTemplate:', error);
      console.error('📋 Détails de l\'erreur:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Erreur lors de la duplication du template');
    }
  }

  // Variables prédéfinies pour les tests
  getDefaultTestVariables(templateCode: string): { [key: string]: any } {
    const defaultVariables: { [key: string]: any } = {
      reference: 'TICKET-2024-001',
      titre: 'Problème de connexion',
      utilisateur: 'Jean Dupont',
      ancienStatut: 'En attente',
      nouveauStatut: 'En cours',
      code: '123456',
      dateIntervention: '15/11/2024 à 14:30'
    };

    // Variables spécifiques par type de template
    const templateSpecificVars: { [key: string]: { [key: string]: any } } = {
      'CREATION_TICKET': {
        reference: 'TICKET-2024-001',
        titre: 'Problème de connexion internet',
        utilisateur: 'Marie Martin'
      },
      'MODIFICATION_STATUT_TICKET': {
        reference: 'TICKET-2024-001',
        ancienStatut: 'En attente',
        nouveauStatut: 'En cours de traitement',
        utilisateur: 'Pierre Durand'
      },
      'AJOUT_SOLUTION': {
        reference: 'TICKET-2024-001',
        titre: 'Solution pour le problème de connexion',
        utilisateur: 'Sophie Laurent'
      },
      'CLOTURE_TICKET': {
        reference: 'TICKET-2024-001',
        titre: 'Problème de connexion résolu',
        utilisateur: 'Luc Bernard'
      },
      'CODE_VALIDATION': {
        code: '987654'
      },
      'INTERVENTION_PLANIFIEE': {
        reference: 'TICKET-2024-001',
        dateIntervention: '20/11/2024 à 10:00',
        utilisateur: 'Nathalie Petit'
      },
      'INTERVENTION_CONFIRMEE': {
        reference: 'TICKET-2024-001',
        dateIntervention: '20/11/2024 à 10:00',
        utilisateur: 'Thomas Moreau'
      }
    };

    return { ...defaultVariables, ...(templateSpecificVars[templateCode] || {}) };
  }

  // Formater le contenu HTML pour l'affichage (supprime les balises pour un aperçu texte)
  formatTemplatePreview(htmlContent: string, maxLength: number = 100): string {
    if (!htmlContent) return '';
    
    // Supprime les balises HTML
    const textContent = htmlContent.replace(/<[^>]*>/g, ' ');
    
    // Nettoie les espaces multiples
    const cleanContent = textContent.replace(/\s+/g, ' ').trim();
    
    // Tronque si nécessaire
    if (cleanContent.length <= maxLength) return cleanContent;
    
    return cleanContent.substring(0, maxLength) + '...';
  }

  // Valider les données d'un template avant envoi
  validateTemplateData(template: Partial<NotificationTemplate>): string[] {
    const errors: string[] = [];

    if (!template.code || template.code.trim().length === 0) {
      errors.push('Le code du template est obligatoire');
    }

    if (!template.libelle || template.libelle.trim().length === 0) {
      errors.push('Le libellé du template est obligatoire');
    }

    if (!template.canal || template.canal.trim().length === 0) {
      errors.push('Le canal du template est obligatoire');
    }

    if (!template.sujet || template.sujet.trim().length === 0) {
      errors.push('Le sujet du template est obligatoire');
    }

    if (!template.contenuHtml || template.contenuHtml.trim().length === 0) {
      errors.push('Le contenu HTML du template est obligatoire');
    }

    return errors;
  }
}

export const templateService = new TemplateService();