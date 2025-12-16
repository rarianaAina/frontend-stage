import React, { useState, useEffect } from 'react';
import { SmtpSettings } from '../../types/config';
import { configService } from '../../services/configService';
import { useAppTranslation } from '../../hooks/translation/useTranslation';
import '../../styles/admin/configurations/Email.css';

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
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const { t } = useAppTranslation(['common', 'config']);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await configService.getSmtpSettings();
      setFormData(settings);
    } catch (error) {
      console.error(t('config:smtp.loadError') || 'Erreur chargement paramètres SMTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setMessageType('');
    
    try {
      const success = await configService.saveSmtpSettings(formData);
      if (success) {
        setMessage(t('config:smtp.saveSuccess') || 'Configuration SMTP sauvegardée avec succès!');
        setMessageType('success');
      } else {
        setMessage(t('config:smtp.saveError') || 'Erreur lors de la sauvegarde');
        setMessageType('error');
      }
    } catch (error: any) {
      console.error(t('config:smtp.saveError') || 'Erreur sauvegarde paramètres SMTP:', error);
      setMessage(`${t('config:smtp.saveError') || 'Erreur lors de la sauvegarde'}: ${error.message}`);
      setMessageType('error');
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setMessage('');
    setMessageType('');
    
    try {
      await configService.testSmtpSettings(formData);
      setMessage(t('config:smtp.testSuccess') || 'Test réussi! Email de test envoyé avec succès.');
      setMessageType('success');
    } catch (error: any) {
      console.error(t('config:smtp.testError') || 'Erreur test SMTP:', error);
      setMessage(`${t('config:smtp.testError') || 'Échec du test'}: ${error.message}`);
      setMessageType('error');
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="email-tab-loading">
        <div>{t('config:smtp.loading') || 'Chargement de la configuration SMTP...'}</div>
      </div>
    );
  }

  const isTestDisabled = testing || !formData.host || !formData.username || !formData.password;

  return (
    <div className="email-tab-container">
      <h2 className="email-tab-title">
        {t('config:smtp.title') || 'Configuration SMTP'}
      </h2>

      {message && (
        <div className={messageType === 'success' ? 'message-success' : 'message-error'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="email-form">
        <div className="form-group">
          <label className="form-label">
            {t('config:smtp.fields.host') || 'Serveur SMTP:'}
          </label>
          <input
            type="text"
            value={formData.host}
            onChange={(e) => setFormData({ ...formData, host: e.target.value })}
            placeholder={t('config:smtp.placeholders.host') || 'smtp.gmail.com'}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            {t('config:smtp.fields.port') || 'Port:'}
          </label>
          <input
            type="number"
            value={formData.port}
            onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) })}
            min="1"
            max="65535"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            {t('config:smtp.fields.username') || 'Email (utilisateur):'}
          </label>
          <input
            type="email"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder={t('config:smtp.placeholders.username') || 'votre@email.com'}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            {t('config:smtp.fields.password') || 'Mot de passe (App Password):'}
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder={t('config:smtp.placeholders.password') || 'Votre mot de passe d\'application'}
            className="form-input"
            required
          />
          <small className="form-hint">
            {t('config:smtp.hints.password') || 'Pour Gmail, utilisez un <strong>App Password</strong> et non votre mot de passe principal'}
          </small>
        </div>

        <div className="buttons-container">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? '⏳' : '💾'}
            {saving 
              ? t('config:smtp.buttons.saving') || 'Sauvegarde...'
              : t('config:smtp.buttons.save') || 'Sauvegarder'
            }
          </button>

          <button
            type="button"
            onClick={handleTest}
            disabled={isTestDisabled}
            className="btn btn-secondary"
          >
            {testing ? '⏳' : '🔧'}
            {testing 
              ? t('config:smtp.buttons.testing') || 'Test en cours...'
              : t('config:smtp.buttons.test') || 'Tester la configuration'
            }
          </button>

          <button
            type="button"
            onClick={loadSettings}
            className="btn btn-tertiary"
          >
            🔄 {t('config:smtp.buttons.reload') || 'Recharger'}
          </button>
        </div>
      </form>

      <div className="guide-container">
        <h4 className="guide-title">
          💡 {t('config:smtp.guide.title') || 'Guide de configuration'}
        </h4>
        <div className="guide-content">
          <p><strong>{t('config:smtp.guide.gmailTitle') || 'Pour Gmail :'}</strong></p>
          <ul className="guide-list">
            <li>{t('config:smtp.guide.server') || 'Serveur:'} <code className="code-text">smtp.gmail.com</code></li>
            <li>{t('config:smtp.guide.port') || 'Port:'} <code className="code-text">587</code></li>
            <li>{t('config:smtp.guide.twoFactor') || 'Activer la validation en 2 étapes sur votre compte Google'}</li>
            <li>{t('config:smtp.guide.generatePassword') || 'Générer un <strong>App Password</strong> dans les paramètres de sécurité Google'}</li>
            <li>{t('config:smtp.guide.useAppPassword') || 'Utiliser l\'App Password au lieu de votre mot de passe principal'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};