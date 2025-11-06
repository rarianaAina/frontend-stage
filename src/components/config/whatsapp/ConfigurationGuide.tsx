import React from 'react';

export const ConfigurationGuide: React.FC = () => (
  <div style={{ marginTop: '30px', padding: '20px', background: '#f0f9ff', borderRadius: '10px' }}>
    <h4 style={{ margin: '0 0 12px 0', color: '#0369a1' }}>💡 Guide de configuration 360dialog</h4>
    <div style={{ fontSize: '14px', color: '#0369a1', lineHeight: '1.5' }}>
      <p><strong>Pour configurer WhatsApp Business API :</strong></p>
      <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
        <li>Créer un compte sur <strong>360dialog</strong></li>
        <li>Obtenir votre <strong>Clé API</strong> depuis le dashboard 360dialog</li>
        <li>Configurer un numéro WhatsApp Business</li>
        <li>Récupérer l'<strong>ID du numéro de téléphone</strong> depuis 360dialog</li>
        <li>Pour les webhooks, configurer l'URL de callback dans les paramètres 360dialog</li>
        <li>Le token webhook doit correspondre à celui configuré dans 360dialog</li>
      </ul>
    </div>
  </div>
);