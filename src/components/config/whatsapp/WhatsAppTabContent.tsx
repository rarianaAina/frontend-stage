import React from 'react';
import { WhatsAppSettings } from '../../../types/config';
import { WhatsAppForm } from './WhatsappForm';
import { MessageAlert } from './MessageAlert'
import { ConfigurationGuide } from './ConfigurationGuide';
interface WhatsAppTabContentProps {
  formData: WhatsAppSettings;
  loading: boolean;
  saving: boolean;
  testing: boolean;
  message: string;
  setMessage: (message: string) => void;
  loadSettings: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleTest: () => void;
  updateField: <K extends keyof WhatsAppSettings>(field: K, value: WhatsAppSettings[K]) => void;
}

export const WhatsAppTabContent: React.FC<WhatsAppTabContentProps> = ({
  formData,
  loading,
  saving,
  testing,
  message,
  setMessage,
  loadSettings,
  handleSubmit,
  handleTest,
  updateField
}) => {
  if (loading) {
    return (
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div>Chargement de la configuration WhatsApp...</div>
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
        Configuration WhatsApp Business API
      </h2>

      {message && (
        <MessageAlert message={message} />
      )}

      <WhatsAppForm
        formData={formData}
        saving={saving}
        testing={testing}
        onFieldChange={updateField}
        onSubmit={handleSubmit}
        onTest={handleTest}
        onReload={loadSettings}
      />

      <ConfigurationGuide />
    </div>
  );
};