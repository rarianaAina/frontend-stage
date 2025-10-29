import React, { useState, useEffect } from 'react';
import { SmtpSettings } from '../../types/config';
import { configService } from '../../services/configService';

export const EmailTab: React.FC = () => {
  const [formData, setFormData] = useState<SmtpSettings>({
    host: '',
    port: 587,
    username: '',
    password: ''
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
      const settings = await configService.getSmtpSettings();
      setFormData(settings);
    } catch (error) {
      console.error('Erreur chargement paramètres SMTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const success = await configService.saveSmtpSettings(formData);
      if (success) {
        setMessage('✅ Configuration SMTP sauvegardée avec succès!');
      } else {
        setMessage('❌ Erreur lors de la sauvegarde');
      }
    } catch (error: any) {
      console.error('Erreur sauvegarde paramètres SMTP:', error);
      setMessage('❌ Erreur lors de la sauvegarde: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setMessage('');
    
    try {
      await configService.testSmtpSettings(formData);
      setMessage('✅ Test réussi! Email de test envoyé avec succès.');
    } catch (error: any) {
      console.error('Erreur test SMTP:', error);
      setMessage('❌ Échec du test: ' + error.message);
    } finally {
      setTesting(false);
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
        <div>Chargement de la configuration SMTP...</div>
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
        Configuration SMTP
      </h2>

      {message && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          background: message.includes('✅') ? '#d1fae5' : '#fee2e2',
          color: message.includes('✅') ? '#065f46' : '#991b1b',
          border: `1px solid ${message.includes('✅') ? '#a7f3d0' : '#fecaca'}`
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Serveur SMTP:
          </label>
          <input
            type="text"
            value={formData.host}
            onChange={(e) => setFormData({ ...formData, host: e.target.value })}
            placeholder="smtp.gmail.com"
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
            Port:
          </label>
          <input
            type="number"
            value={formData.port}
            onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) })}
            min="1"
            max="65535"
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
            Email (utilisateur):
          </label>
          <input
            type="email"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="votre@email.com"
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
            Mot de passe (App Password):
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Votre mot de passe d'application"
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
            Pour Gmail, utilisez un <strong>App Password</strong> et non votre mot de passe principal
          </small>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {saving ? '⏳' : '💾'}
            {saving ? ' Sauvegarde...' : ' Sauvegarder'}
          </button>

          <button
            type="button"
            onClick={handleTest}
            disabled={testing || !formData.host || !formData.username || !formData.password}
            style={{
              background: testing || !formData.host || !formData.username || !formData.password ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              cursor: testing || !formData.host || !formData.username || !formData.password ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {testing ? '⏳' : '🔧'}
            {testing ? ' Test en cours...' : ' Tester la configuration'}
          </button>

          <button
            type="button"
            onClick={loadSettings}
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
            🔄 Recharger
          </button>
        </div>
      </form>

      <div style={{ marginTop: '30px', padding: '20px', background: '#f0f9ff', borderRadius: '10px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#0369a1' }}>💡 Guide de configuration</h4>
        <div style={{ fontSize: '14px', color: '#0369a1', lineHeight: '1.5' }}>
          <p><strong>Pour Gmail :</strong></p>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Serveur: <code>smtp.gmail.com</code></li>
            <li>Port: <code>587</code></li>
            <li>Activer la validation en 2 étapes sur votre compte Google</li>
            <li>Générer un <strong>App Password</strong> dans les paramètres de sécurité Google</li>
            <li>Utiliser l'App Password au lieu de votre mot de passe principal</li>
          </ul>
        </div>
      </div>
    </div>
  );
};