import { useState, useEffect } from 'react';
import { WhatsAppSettings } from '../../../../types/config';
import { configService } from '../../../../services/configService';

export const useWhatsAppConfig = () => {
  const [formData, setFormData] = useState<WhatsAppSettings>({
    apiBaseUrl: 'https://waba.360dialog.io/v1/messages',
    apiKey: '',
    phoneNumberId: '',
    businessAccountId: '',
    webhookUrl: '',
    webhookToken: '',
    estActif: true,
    nomConfiguration: 'Défaut',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await configService.getWhatsAppSettings();
      console.log('Données reçues:', settings);
      setFormData(settings);
    } catch (error) {
      console.error('Erreur chargement paramètres WhatsApp:', error);
      setMessage('❌ Erreur lors du chargement des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const success = await configService.saveWhatsAppSettings(formData);
      if (success) {
        setMessage('✅ Configuration WhatsApp sauvegardée avec succès!');
        await loadSettings(); // Recharger pour obtenir l'ID
      } else {
        setMessage('❌ Erreur lors de la sauvegarde');
      }
    } catch (error: any) {
      console.error('Erreur sauvegarde paramètres WhatsApp:', error);
      setMessage('❌ Erreur lors de la sauvegarde: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setMessage('');
    
    try {
      if (!formData.id) {
        setMessage('❌ Veuillez d\'abord sauvegarder la configuration avant de tester');
        return;
      }
      
      await configService.testWhatsAppSettings(formData.id);
      setMessage('✅ Test réussi! Configuration WhatsApp validée.');
    } catch (error: any) {
      console.error('Erreur test WhatsApp:', error);
      setMessage('❌ Échec du test: ' + error.message);
    } finally {
      setTesting(false);
    }
  };

  const updateField = <K extends keyof WhatsAppSettings>(
    field: K, 
    value: WhatsAppSettings[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      apiBaseUrl: 'https://waba.360dialog.io/v1/messages',
      apiKey: '',
      phoneNumberId: '',
      businessAccountId: '',
      webhookUrl: '',
      webhookToken: '',
      estActif: true,
      nomConfiguration: 'Défaut',
      description: ''
    });
  };

  return {
    formData,
    loading,
    saving,
    testing,
    message,
    setMessage,
    loadSettings,
    handleSubmit,
    handleTest,
    updateField,
    resetForm
  };
};