import React, { useState, useEffect } from 'react';
import { SchedulingConfiguration, SimplifiedSchedulingRequest, CreateSchedulingRequest, SchedulingOptions } from '../../../types/scheduling/scheduling';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface SchedulingFormProps {
  config: SchedulingConfiguration | null;
  options: SchedulingOptions | null;
  isEditing: boolean;
  isCreating: boolean;
  saving: boolean;
  onSubmit: (data: SimplifiedSchedulingRequest | CreateSchedulingRequest) => void;
  onCancel: () => void;
}

export const SchedulingForm: React.FC<SchedulingFormProps> = ({
  config,
  options,
  isEditing,
  isCreating,
  saving,
  onSubmit,
  onCancel
}) => {
  const { t } = useAppTranslation(['scheduling', 'common']);
  
  // Définir des valeurs par défaut pour les options si elles sont null
  const defaultOptions: SchedulingOptions = {
    frequencies: [
      { value: 'HOURLY', label: 'Toutes les heures', cron: '0 0 * * * *' },
      { value: 'DAILY', label: 'Tous les jours', cron: '0 0 3 * * *' },
      { value: 'WEEKLY', label: 'Toutes les semaines', cron: '0 0 3 * * 1' },
      { value: 'MONTHLY', label: 'Tous les mois', cron: '0 0 3 1 * *' },
      { value: 'EVERY_30_MIN', label: 'Toutes les 30 minutes', cron: '0 */30 * * * *' },
      { value: 'EVERY_2_HOURS', label: 'Toutes les 2 heures', cron: '0 0 */2 * * *' },
      { value: 'EVERY_6_HOURS', label: 'Toutes les 6 heures', cron: '0 0 */6 * * *' },
      { value: 'CUSTOM', label: 'Personnalisé', cron: '' }
    ],
    hours: Array.from({ length: 24 }, (_, i) => ({ 
      value: i.toString(), 
      label: `${i.toString().padStart(2, '0')}h` 
    })),
    minutes: [
      { value: '0', label: '00' },
      { value: '15', label: '15' },
      { value: '30', label: '30' },
      { value: '45', label: '45' }
    ],
    daysOfWeek: [
      { value: '1', label: 'Lundi' },
      { value: '2', label: 'Mardi' },
      { value: '3', label: 'Mercredi' },
      { value: '4', label: 'Jeudi' },
      { value: '5', label: 'Vendredi' },
      { value: '6', label: 'Samedi' },
      { value: '7', label: 'Dimanche' }
    ],
    daysOfMonth: Array.from({ length: 31 }, (_, i) => ({ 
      value: (i + 1).toString(), 
      label: (i + 1).toString() 
    }))
  };

  // Utiliser les options fournies ou les valeurs par défaut
  const effectiveOptions = options || defaultOptions;

  const [formData, setFormData] = useState<CreateSchedulingRequest>({
    jobName: '',
    jobDescription: '',
    frequency: 'DAILY',
    hour: '3',
    minute: '0',
    dayOfWeek: '1',
    dayOfMonth: '1',
    customCron: '',
    enabled: true,
    modifiedBy: 'admin'
  });

  useEffect(() => {
    if (config && isEditing) {
      const params = config.scheduleParams || {};
      setFormData(prev => ({
        ...prev,
        jobName: config.jobName,
        jobDescription: config.jobDescription || '',
        frequency: params.frequency || 'DAILY',
        hour: params.hour || '3',
        minute: params.minute || '0',
        dayOfWeek: params.dayOfWeek || '1',
        dayOfMonth: params.dayOfMonth || '1',
        customCron: params.customCron || '',
        enabled: config.enabled
      }));
    }
  }, [config, isEditing]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (isCreating && !formData.jobName.trim()) {
      alert(t('scheduling:form.errors.jobNameRequired'));
      return;
    }

    if (formData.frequency === 'CUSTOM' && !formData.customCron?.trim()) {
      alert(t('scheduling:form.errors.customCronRequired'));
      return;
    }

    onSubmit(formData);
  };

  // Rendu conditionnel basé sur la fréquence sélectionnée
  const renderScheduleFields = () => {
    switch (formData.frequency) {
      case 'DAILY':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
                {t('scheduling:form.hour')}
              </label>
              <select
                value={formData.hour}
                onChange={(e) => handleChange('hour', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {effectiveOptions.hours.map(hour => (
                  <option key={hour.value} value={hour.value}>
                    {hour.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
                {t('scheduling:form.minute')}
              </label>
              <select
                value={formData.minute}
                onChange={(e) => handleChange('minute', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {effectiveOptions.minutes.map(minute => (
                  <option key={minute.value} value={minute.value}>
                    {minute.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'WEEKLY':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
                {t('scheduling:form.dayOfWeek')}
              </label>
              <select
                value={formData.dayOfWeek}
                onChange={(e) => handleChange('dayOfWeek', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {effectiveOptions.daysOfWeek.map(day => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
                {t('scheduling:form.hour')}
              </label>
              <select
                value={formData.hour}
                onChange={(e) => handleChange('hour', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {effectiveOptions.hours.map(hour => (
                  <option key={hour.value} value={hour.value}>
                    {hour.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
                {t('scheduling:form.minute')}
              </label>
              <select
                value={formData.minute}
                onChange={(e) => handleChange('minute', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {effectiveOptions.minutes.map(minute => (
                  <option key={minute.value} value={minute.value}>
                    {minute.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'MONTHLY':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
                {t('scheduling:form.dayOfMonth')}
              </label>
              <select
                value={formData.dayOfMonth}
                onChange={(e) => handleChange('dayOfMonth', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {effectiveOptions.daysOfMonth.map(day => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
                {t('scheduling:form.hour')}
              </label>
              <select
                value={formData.hour}
                onChange={(e) => handleChange('hour', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {effectiveOptions.hours.map(hour => (
                  <option key={hour.value} value={hour.value}>
                    {hour.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
                {t('scheduling:form.minute')}
              </label>
              <select
                value={formData.minute}
                onChange={(e) => handleChange('minute', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {effectiveOptions.minutes.map(minute => (
                  <option key={minute.value} value={minute.value}>
                    {minute.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'CUSTOM':
        return (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
              {t('scheduling:form.customCron')} *
            </label>
            <input
              type="text"
              value={formData.customCron}
              onChange={(e) => handleChange('customCron', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}
              placeholder="0 0 3 * * *"
            />
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              {t('scheduling:form.cronHelp')}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
      <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '20px' }}>
        {isCreating ? t('scheduling:form.createTitle') : t('scheduling:form.editTitle')}
      </h3>

      {/* Nom du job (seulement en création) */}
      {isCreating && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
            {t('scheduling:form.jobName')} *
          </label>
          <input
            type="text"
            value={formData.jobName}
            onChange={(e) => handleChange('jobName', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
            placeholder={t('scheduling:form.jobNamePlaceholder')}
          />
        </div>
      )}

      {/* Description */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
          {t('scheduling:form.jobDescription')}
        </label>
        <input
          type="text"
          value={formData.jobDescription}
          onChange={(e) => handleChange('jobDescription', e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
          placeholder={t('scheduling:form.jobDescriptionPlaceholder')}
        />
      </div>

      {/* Fréquence */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', color: '#374151' }}>
          {t('scheduling:form.frequency')} *
        </label>
        <select
          value={formData.frequency}
          onChange={(e) => handleChange('frequency', e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            background: 'white'
          }}
        >
          {effectiveOptions.frequencies.map(freq => (
            <option key={freq.value} value={freq.value}>
              {freq.label}
            </option>
          ))}
        </select>
      </div>

      {/* Paramètres selon la fréquence */}
      {renderScheduleFields()}

      {/* Statut activé/désactivé */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            style={{ width: '16px', height: '16px' }}
          />
          <span style={{ fontWeight: '500', color: '#374151' }}>
            {t('scheduling:form.enabled')}
          </span>
        </label>
      </div>

      {/* Boutons d'action */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          style={{
            background: '#6b7280',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            opacity: saving ? 0.6 : 1
          }}
        >
          {t('common:cancel')}
        </button>
        <button
          type="submit"
          disabled={saving}
          style={{
            background: '#10b981',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            opacity: saving ? 0.6 : 1
          }}
        >
          {saving ? '⏳' : '💾'} {saving ? t('common:saving') : t('common:save')}
        </button>
      </div>
    </form>
  );
};