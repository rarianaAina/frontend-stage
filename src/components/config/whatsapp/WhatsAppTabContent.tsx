import React from 'react';
import { WhatsAppSettings } from '../../../types/config';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface WhatsAppTabContentProps {
  formData: WhatsAppSettings;
  loading: boolean;
  saving: boolean;
  testing: boolean;
  message: string;
  loadSettings: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleTest: () => void;
  updateField: <K extends keyof WhatsAppSettings>(field: K, value: WhatsAppSettings[K]) => void;
}

export const WhatsAppTabContent: React.FC<WhatsAppTabContentProps> = (props) => {
  const { t, ready } = useAppTranslation(['common', 'config']);

  // Si les traductions ne sont pas prêtes, afficher un chargement simple
  if (!ready) {
    return (
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div>Chargement des traductions...</div>
      </div>
    );
  }

  if (props.loading) {
    return (
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div>{t('common:loading')}</div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
        {t('config:whatsapp.title')}
      </h2>

      {props.message && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          background: props.message.includes('✅') ? '#d1fae5' : '#fee2e2',
          color: props.message.includes('✅') ? '#065f46' : '#991b1b',
          border: `1px solid ${props.message.includes('✅') ? '#a7f3d0' : '#fecaca'}`
        }}>
          {props.message}
        </div>
      )}

      <form onSubmit={props.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('config:whatsapp.configName')}:
          </label>
          <input
            type="text"
            value={props.formData.nomConfiguration}
            onChange={(e) => props.updateField('nomConfiguration', e.target.value)}
            placeholder={t('config:whatsapp.configName')}
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

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('config:whatsapp.apiUrl')}:
          </label>
          <input
            type="url"
            value={props.formData.apiBaseUrl}
            onChange={(e) => props.updateField('apiBaseUrl', e.target.value)}
            placeholder="https://waba.360dialog.io/v1/messages"
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

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('config:whatsapp.apiKey')}:
          </label>
          <input
            type="password"
            value={props.formData.apiKey}
            onChange={(e) => props.updateField('apiKey', e.target.value)}
            placeholder={t('config:whatsapp.apiKey')}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
            required
          />
          <small style={{ color: '#666', fontSize: '14px', marginTop: '5px', display: 'block' }}>
            {t('config:whatsapp.apiKeyHelp')}
          </small>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('config:whatsapp.phoneId')}:
          </label>
          <input
            type="text"
            value={props.formData.phoneNumberId}
            onChange={(e) => props.updateField('phoneNumberId', e.target.value)}
            placeholder="123456789012345"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
            required
          />
          <small style={{ color: '#666', fontSize: '14px', marginTop: '5px', display: 'block' }}>
            {t('config:whatsapp.phoneIdHelp')}
          </small>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('config:whatsapp.businessId')}:
          </label>
          <input
            type="text"
            value={props.formData.businessAccountId || ''}
            onChange={(e) => props.updateField('businessAccountId', e.target.value)}
            placeholder="1234567890"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('config:whatsapp.webhookUrl')}:
          </label>
          <input
            type="url"
            value={props.formData.webhookUrl || ''}
            onChange={(e) => props.updateField('webhookUrl', e.target.value)}
            placeholder="https://votredomaine.com/api/webhook/whatsapp"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
          <small style={{ color: '#666', fontSize: '14px', marginTop: '5px', display: 'block' }}>
            {t('config:whatsapp.webhookUrlHelp')}
          </small>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('config:whatsapp.webhookToken')}:
          </label>
          <input
            type="password"
            value={props.formData.webhookToken || ''}
            onChange={(e) => props.updateField('webhookToken', e.target.value)}
            placeholder={t('config:whatsapp.webhookToken')}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('config:whatsapp.description')}:
          </label>
          <textarea
            value={props.formData.description || ''}
            onChange={(e) => props.updateField('description', e.target.value)}
            placeholder={t('config:whatsapp.description')}
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            id="estActif"
            checked={props.formData.estActif}
            onChange={(e) => props.updateField('estActif', e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          <label htmlFor="estActif" style={{ fontWeight: '600', cursor: 'pointer' }}>
            {t('config:whatsapp.activeConfig')}
          </label>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={props.saving}
            style={{
              background: props.saving ? '#9ca3af' : '#10b981',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              cursor: props.saving ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {props.saving ? '⏳' : '💾'}
            {props.saving ? `${t('common:loading')}...` : t('common:save')}
          </button>

          <button
            type="button"
            onClick={props.handleTest}
            disabled={props.testing || !props.formData.apiKey || !props.formData.phoneNumberId}
            style={{
              background: props.testing || !props.formData.apiKey || !props.formData.phoneNumberId ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              cursor: props.testing || !props.formData.apiKey || !props.formData.phoneNumberId ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {props.testing ? '⏳' : '🔧'}
            {props.testing ? `${t('common:loading')}...` : t('common:test')}
          </button>

          <button
            type="button"
            onClick={props.loadSettings}
            style={{
              background: '#6b7280',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🔄 {t('common:reload')}
          </button>
        </div>
      </form>
    </div>
  );
};