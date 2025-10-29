import React, { useState, useEffect } from 'react';
import { GeneralSettings } from '../../types/config';
import { configService } from '../../services/configService';

interface GeneralTabProps {
  onSave?: (settings: GeneralSettings) => void;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<GeneralSettings>({
    companyName: '',
    defaultLanguage: 'fr',
    timezone: 'UTC+3'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await configService.getGeneralSettings();
      setFormData(settings);
    } catch (error) {
      console.error('Erreur chargement paramètres généraux:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const success = await configService.saveGeneralSettings(formData);
      if (success) {
        onSave?.(formData);
        alert('Paramètres généraux sauvegardés avec succès!');
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur sauvegarde paramètres généraux:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div>Chargement des paramètres généraux...</div>
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
        Paramètres généraux
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Nom de l'entreprise:
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
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
            Langue par défaut:
          </label>
          <select
            value={formData.defaultLanguage}
            onChange={(e) => setFormData({ ...formData, defaultLanguage: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Fuseau horaire:
          </label>
          <select
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          >
            <option value="UTC+3">UTC+3 (Antananarivo)</option>
            <option value="UTC+1">UTC+1 (Paris)</option>
            <option value="UTC+0">UTC+0 (Londres)</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          style={{
            background: saving ? '#9ca3af' : '#10b981',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '10px',
            border: 'none',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            alignSelf: 'flex-start'
          }}
        >
          {saving ? 'Sauvegarde...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
};