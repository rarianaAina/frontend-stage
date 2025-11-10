import React from 'react';
import { WhatsAppSettings } from '../../../types/config';
import { FormField } from './FormField';
import { FormActions } from './FormActions';

interface WhatsAppFormProps {
  formData: WhatsAppSettings;
  saving: boolean;
  testing: boolean;
  onFieldChange: <K extends keyof WhatsAppSettings>(field: K, value: WhatsAppSettings[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTest: () => void;
  onReload: () => void;
}

export const WhatsAppForm: React.FC<WhatsAppFormProps> = ({
  formData,
  saving,
  testing,
  onFieldChange,
  onSubmit,
  onTest,
  onReload
}) => {
  const canTest = !testing && formData.apiKey && formData.phoneNumberId;

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <FormField
        label="Nom de la configuration:"
        type="text"
        value={formData.nomConfiguration}
        onChange={(value) => onFieldChange('nomConfiguration', value)}
        placeholder="Configuration principale"
        required
      />

      <FormField
        label="URL de l'API:"
        type="url"
        value={formData.apiBaseUrl}
        onChange={(value) => onFieldChange('apiBaseUrl', value)}
        placeholder="https://waba.360dialog.io/v1/messages"
        required
      />

      <FormField
        label="Clé API 360dialog:"
        type="password"
        value={formData.apiKey}
        onChange={(value) => onFieldChange('apiKey', value)}
        placeholder="Votre clé API secrète"
        required
        helpText="Clé API fournie par 360dialog (doit être chiffrée)"
      />

      <FormField
        label="ID du numéro de téléphone:"
        type="text"
        value={formData.phoneNumberId}
        onChange={(value) => onFieldChange('phoneNumberId', value)}
        placeholder="123456789012345"
        required
        helpText="ID du numéro WhatsApp Business configuré dans 360dialog"
      />

      <FormField
        label="ID du compte Business (optionnel):"
        type="text"
        value={formData.businessAccountId || ''}
        onChange={(value) => onFieldChange('businessAccountId', value)}
        placeholder="1234567890"
      />

      <FormField
        label="URL Webhook (optionnel):"
        type="url"
        value={formData.webhookUrl || ''}
        onChange={(value) => onFieldChange('webhookUrl', value)}
        placeholder="https://votredomaine.com/api/webhook/whatsapp"
        helpText="URL où votre application reçoit les statuts des messages"
      />

      <FormField
        label="Token Webhook (optionnel):"
        type="password"
        value={formData.webhookToken || ''}
        onChange={(value) => onFieldChange('webhookToken', value)}
        placeholder="Token de vérification webhook"
      />

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          Description (optionnel):
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => onFieldChange('description', e.target.value)}
          placeholder="Description de cette configuration..."
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

      {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="checkbox"
          id="estActif"
          checked={formData.estActif}
          onChange={(e) => onFieldChange('estActif', e.target.checked)}
          style={{ width: '18px', height: '18px' }}
        />
        <label htmlFor="estActif" style={{ fontWeight: '600', cursor: 'pointer' }}>
          Configuration active
        </label>
      </div> */}

      <FormActions
        saving={saving}
        testing={testing}
        canTest={canTest}
        onTest={onTest}
        onReload={onReload}
      />
    </form>
  );
};