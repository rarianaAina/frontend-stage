import React, { useState, useEffect } from 'react';
import { NotificationTemplate } from '../../../types/template';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface TemplateFormProps {
  initialData?: Partial<NotificationTemplate>;
  isCreating: boolean;
  saving: boolean;
  onSubmit: (formData: Partial<NotificationTemplate>) => Promise<void>;
  onCancel: () => void;
}

export const TemplateForm: React.FC<TemplateFormProps> = ({
  initialData,
  isCreating,
  saving,
  onSubmit,
  onCancel
}) => {
  const { t } = useAppTranslation(['common', 'templates']);

  // ✅ État local COMPLETEMENT indépendant
  const [formData, setFormData] = useState<Partial<NotificationTemplate>>({
    code: '',
    libelle: '',
    canal: 'EMAIL',
    sujet: '',
    contenuHtml: '',
    actif: true,
    ...initialData
  });

  // ✅ Réinitialise seulement quand initialData change vraiment
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData?.code, initialData?.libelle, initialData?.canal, initialData?.sujet, initialData?.contenuHtml, initialData?.actif]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: keyof NotificationTemplate) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : e.target.value;
      
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Code */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('templates:form.code')}:
          </label>
          <input
            type="text"
            value={formData.code || ''}
            onChange={handleChange('code')}
            placeholder="CREATION_TICKET"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px',
              fontFamily: 'monospace',
              backgroundColor: !isCreating ? '#f3f4f6' : 'white'
            }}
            required
            disabled={!isCreating}
          />
        </div>

        {/* Canal */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('templates:form.canal')}:
          </label>
          <select
            value={formData.canal || 'EMAIL'}
            onChange={handleChange('canal')}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
            required
          >
            <option value="EMAIL">Email</option>
            <option value="SMS">SMS</option>
            <option value="WHATSAPP">WhatsApp</option>
          </select>
        </div>
      </div>

      {/* Libellé */}
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          {t('templates:form.libelle')}:
        </label>
        <input
          type="text"
          value={formData.libelle || ''}
          onChange={handleChange('libelle')}
          placeholder={t('templates:form.libellePlaceholder')}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
          required
        />
      </div>

      {/* Sujet */}
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          {t('templates:form.sujet')}:
        </label>
        <input
          type="text"
          value={formData.sujet || ''}
          onChange={handleChange('sujet')}
          placeholder={t('templates:form.sujetPlaceholder')}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
          required
        />
      </div>

      {/* Contenu HTML */}
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          {t('templates:form.contenuHtml')}:
        </label>
        <textarea
          value={formData.contenuHtml || ''}
          onChange={handleChange('contenuHtml')}
          placeholder={t('templates:form.contenuHtmlPlaceholder')}
          rows={12}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            fontSize: '16px',
            resize: 'vertical',
            fontFamily: 'monospace'
          }}
          required
        />
        <small style={{ color: '#666', fontSize: '14px', marginTop: '5px', display: 'block' }}>
          {t('templates:form.variablesHelp')}
        </small>
      </div>

      {isCreating && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            id="actif"
            checked={formData.actif || false}
            onChange={handleChange('actif')}
            style={{ width: '18px', height: '18px' }}
          />
          <label htmlFor="actif" style={{ fontWeight: '600', cursor: 'pointer' }}>
            {t('templates:form.active')}
          </label>
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            background: saving ? '#9ca3af' : '#10b981',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {saving ? '⏳' : '💾'}
          {saving ? `${t('common:loading')}...` : t('common:save')}
        </button>

        <button
          type="button"
          onClick={onCancel}
          style={{
            background: '#6b7280',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          ❌ {t('common:cancel')}
        </button>
      </div>
    </form>
  );
};