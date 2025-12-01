import { useState, useEffect } from 'react';
import { NotificationTemplate } from '../../../../types/template';
import { templateService } from '../../../../services/TemplateService';

export const useTemplate = () => {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const templatesData = await templateService.getAllTemplates();
      setTemplates(templatesData);
      setMessage('');
    } catch (error) {
      console.error('Erreur chargement des templates:', error);
      setMessage('❌ Erreur lors du chargement des templates');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setIsEditing(false);
    setIsCreating(false);
    setTestResult('');
  };

  const handleCreateNew = () => {
    setSelectedTemplate(null);
    setIsEditing(false);
    setIsCreating(true);
    setTestResult('');
  };

  const handleEdit = () => {
    if (selectedTemplate) {
      setIsEditing(true);
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    setTestResult('');
  };

  // ✅ NOUVEAU : Gestion simplifiée de la soumission
  const handleSubmit = async (formData: Partial<NotificationTemplate>) => {
    setSaving(true);
    setMessage('');

    try {
      const errors = templateService.validateTemplateData(formData);
      if (errors.length > 0) {
        setMessage('❌ ' + errors.join(', '));
        return;
      }

      if (isCreating) {
        const newTemplate = await templateService.createTemplate(
          formData as Omit<NotificationTemplate, 'id' | 'dateCreation' | 'dateMiseAJour'>
        );
        if (newTemplate) {
          setMessage('✅ Template créé avec succès!');
          await loadTemplates();
          setSelectedTemplate(newTemplate);
          setIsCreating(false);
        }
      } else if (isEditing && selectedTemplate) {
        const updatedTemplate = await templateService.updateTemplate(
          selectedTemplate.id, 
          formData
        );
        if (updatedTemplate) {
          setMessage('✅ Template mis à jour avec succès!');
          await loadTemplates();
          setSelectedTemplate(updatedTemplate);
          setIsEditing(false);
        }
      }
    } catch (error: any) {
      console.error('Erreur sauvegarde template:', error);
      setMessage('❌ Erreur lors de la sauvegarde: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (template: NotificationTemplate) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le template "${template.libelle}" ?`)) {
      return;
    }

    try {
      const success = await templateService.deleteTemplate(template.id);
      if (success) {
        setMessage('✅ Template supprimé avec succès!');
        if (selectedTemplate?.id === template.id) {
          setSelectedTemplate(null);
          setIsEditing(false);
          setIsCreating(false);
        }
        await loadTemplates();
      }
    } catch (error: any) {
      console.error('Erreur suppression template:', error);
      setMessage('❌ Erreur lors de la suppression: ' + error.message);
    }
  };

  const handleToggleActivation = async (template: NotificationTemplate) => {
    try {
      const updatedTemplate = await templateService.toggleTemplateActivation(template.id);
      if (updatedTemplate) {
        setMessage(`✅ Template ${updatedTemplate.actif ? 'activé' : 'désactivé'} avec succès!`);
        if (selectedTemplate?.id === template.id) {
          setSelectedTemplate(updatedTemplate);
        }
        await loadTemplates();
      }
    } catch (error: any) {
      console.error('Erreur activation/désactivation template:', error);
      setMessage('❌ Erreur lors de la modification: ' + error.message);
    }
  };

  const handleTestTemplate = async () => {
    if (!selectedTemplate) return;

    setTesting(true);
    setTestResult('');

    try {
      const variables = templateService.getDefaultTestVariables(selectedTemplate.code);
      const result = await templateService.testTemplate(selectedTemplate.code, variables);
      setTestResult(result);
      setMessage('✅ Test du template réussi!');
    } catch (error: any) {
      console.error('Erreur test template:', error);
      setMessage('❌ Erreur lors du test: ' + error.message);
    } finally {
      setTesting(false);
    }
  };

  return {
    templates,
    selectedTemplate,
    loading,
    saving,
    testing,
    message,
    isEditing,
    isCreating,
    testResult,
    setMessage,
    setSelectedTemplate,
    loadTemplates,
    handleSelectTemplate,
    handleCreateNew,
    handleEdit,
    handleCancel,
    handleSubmit, 
    handleDelete,
    handleToggleActivation,
    handleTestTemplate
  };
};