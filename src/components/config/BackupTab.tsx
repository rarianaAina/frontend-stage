import React, { useState, useEffect } from 'react';
import { BackupSettings } from '../../types/config';
import { configService } from '../../services/configService';

export const BackupTab: React.FC = () => {
  const [settings, setSettings] = useState<BackupSettings>({ frequency: 'daily' });
  const [loading, setLoading] = useState(true);
  const [backupCreating, setBackupCreating] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const backupSettings = await configService.getBackupSettings();
      setSettings(backupSettings);
    } catch (error) {
      console.error('Erreur chargement paramètres sauvegarde:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const success = await configService.saveBackupSettings(settings);
      if (success) {
        alert('Paramètres de sauvegarde sauvegardés avec succès!');
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur sauvegarde paramètres sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleCreateBackup = async () => {
    setBackupCreating(true);
    try {
      const success = await configService.createBackup();
      if (success) {
        alert('Sauvegarde créée avec succès!');
      } else {
        alert('Erreur lors de la création de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur création sauvegarde:', error);
      alert('Erreur lors de la création de la sauvegarde');
    } finally {
      setBackupCreating(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
        Sauvegarde et restauration
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Fréquence de sauvegarde automatique:
          </label>
          <select
            value={settings.frequency}
            onChange={(e) => setSettings({ ...settings, frequency: e.target.value as 'daily' | 'weekly' | 'monthly' })}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          >
            <option value="daily">Quotidienne</option>
            <option value="weekly">Hebdomadaire</option>
            <option value="monthly">Mensuelle</option>
          </select>
        </div>
        <div>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            Dernière sauvegarde: {settings.lastBackup || '17/10/2025 à 02:00'}
          </p>
          <button
            onClick={handleCreateBackup}
            disabled={backupCreating}
            style={{
              background: backupCreating ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '10px',
              border: 'none',
              cursor: backupCreating ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            {backupCreating ? 'Création...' : 'Créer une sauvegarde maintenant'}
          </button>
        </div>
        <button
          onClick={handleSave}
          style={{
            background: '#10b981',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            alignSelf: 'flex-start'
          }}
        >
          Enregistrer les paramètres
        </button>
      </div>
    </div>
  );
};