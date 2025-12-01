import { useState, useEffect } from 'react';
import { 
  SchedulingConfiguration, 
  SimplifiedSchedulingRequest, 
  CreateSchedulingRequest,
  SchedulingOptions,
  SchedulingStatus 
} from '../../types/scheduling/scheduling';
import { schedulingService } from '../../services/schedulingService';

export const useScheduling = () => {
  const [configurations, setConfigurations] = useState<SchedulingConfiguration[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<SchedulingConfiguration | null>(null);
  const [options, setOptions] = useState<SchedulingOptions | null>(null);
  const [status, setStatus] = useState<SchedulingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [configs, configOptions, currentStatus] = await Promise.all([
        schedulingService.getConfigurations(),
        schedulingService.getConfigurationOptions(),
        schedulingService.getStatus()
      ]);
      setConfigurations(configs);
      setOptions(configOptions);
      setStatus(currentStatus);
      setMessage('');
    } catch (error: any) {
      console.error('Erreur chargement des données:', error);
      setMessage('❌ Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConfig = (config: SchedulingConfiguration) => {
    setSelectedConfig(config);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setSelectedConfig(null);
    setIsEditing(false);
    setIsCreating(true);
  };

  const handleEdit = () => {
    if (selectedConfig) {
      setIsEditing(true);
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleSubmit = async (formData: CreateSchedulingRequest | SimplifiedSchedulingRequest) => {
    setSaving(true);
    setMessage('');

    try {
      if (isCreating) {
        await schedulingService.createConfiguration(formData as CreateSchedulingRequest);
        setMessage('✅ Configuration créée avec succès!');
      } else if (isEditing && selectedConfig) {
        await schedulingService.updateConfiguration(selectedConfig.jobName, formData as SimplifiedSchedulingRequest);
        setMessage('✅ Configuration mise à jour avec succès!');
      }
      
      await loadData();
      setIsEditing(false);
      setIsCreating(false);
    } catch (error: any) {
      console.error('Erreur sauvegarde configuration:', error);
      setMessage('❌ Erreur lors de la sauvegarde: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (config: SchedulingConfiguration) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la configuration "${config.jobName}" ?`)) {
      return;
    }

    try {
      await schedulingService.deleteConfiguration(config.jobName);
      setMessage('✅ Configuration supprimée avec succès!');
      if (selectedConfig?.id === config.id) {
        setSelectedConfig(null);
        setIsEditing(false);
        setIsCreating(false);
      }
      await loadData();
    } catch (error: any) {
      console.error('Erreur suppression configuration:', error);
      setMessage('❌ Erreur lors de la suppression: ' + error.message);
    }
  };

  const handleToggleActivation = async (config: SchedulingConfiguration) => {
    try {
      await schedulingService.toggleJob(config.jobName, !config.enabled);
      setMessage(`✅ Configuration ${!config.enabled ? 'activée' : 'désactivée'} avec succès!`);
      await loadData();
    } catch (error: any) {
      console.error('Erreur activation/désactivation:', error);
      setMessage('❌ Erreur lors de la modification: ' + error.message);
    }
  };

  const handleReloadCache = async () => {
    try {
      await schedulingService.reloadCache();
      setMessage('✅ Cache rechargé avec succès!');
      await loadData();
    } catch (error: any) {
      console.error('Erreur rechargement cache:', error);
      setMessage('❌ Erreur lors du rechargement: ' + error.message);
    }
  };

  return {
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
    setSelectedConfig,
    loadData,
    handleSelectConfig,
    handleCreateNew,
    handleEdit,
    handleCancel,
    handleSubmit,
    handleDelete,
    handleToggleActivation,
    handleReloadCache
  };
};