import { useState } from 'react';
import NavBar from '../../components/NavBar';

export default function Configurations() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Général' },
    { id: 'email', label: 'Email' },
    { id: 'notification', label: 'Notifications' },
    { id: 'sla', label: 'SLA' },
    { id: 'credits', label: 'Crédits' },
    { id: 'backup', label: 'Sauvegarde' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="ADMIN" />

      <div style={{ padding: '40px 60px' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#17a2b8',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>
          Configurations
        </h1>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#17a2b8' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#666',
                padding: '12px 30px',
                border: 'none',
                borderRadius: '10px 10px 0 0',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: activeTab === tab.id ? '600' : '400',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'general' && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
              Paramètres généraux
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Nom de l'entreprise:
                </label>
                <input
                  type="text"
                  defaultValue="OPTIMADA"
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
                Enregistrer
              </button>
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
              Configuration Email
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Serveur SMTP:
                </label>
                <input
                  type="text"
                  placeholder="smtp.example.com"
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
                  Port:
                </label>
                <input
                  type="number"
                  defaultValue="587"
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
                  Email expéditeur:
                </label>
                <input
                  type="email"
                  placeholder="noreply@optimada.com"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #ddd',
                    fontSize: '16px'
                  }}
                />
              </div>
              <button
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
                Enregistrer
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notification' && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
              Paramètres de notification
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                'Nouvelle demande créée',
                'Demande assignée à un consultant',
                'Changement de statut',
                'Intervention planifiée',
                'Intervention terminée',
                'Message ajouté au ticket'
              ].map((notif, idx) => (
                <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
                  <span style={{ fontSize: '16px' }}>{notif}</span>
                </label>
              ))}
              <button
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
                Enregistrer
              </button>
            </div>
          </div>
        )}

        {activeTab === 'sla' && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
              Configuration SLA
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>
                  Temps de réponse (en heures)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Urgent:</label>
                    <input
                      type="number"
                      defaultValue="2"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid #ddd'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Moyenne:</label>
                    <input
                      type="number"
                      defaultValue="8"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid #ddd'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Bas:</label>
                    <input
                      type="number"
                      defaultValue="24"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid #ddd'
                      }}
                    />
                  </div>
                </div>
              </div>
              <button
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
                Enregistrer
              </button>
            </div>
          </div>
        )}

        {activeTab === 'credits' && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
              Gestion des crédits horaires
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Alerte crédit restant (en heures):
                </label>
                <input
                  type="number"
                  defaultValue="5"
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
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
                  <span style={{ fontSize: '16px' }}>
                    Bloquer les nouvelles interventions si crédit insuffisant
                  </span>
                </label>
              </div>
              <button
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
                Enregistrer
              </button>
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
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
                  Dernière sauvegarde: 17/10/2025 à 02:00
                </p>
                <button
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    padding: '12px 30px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Créer une sauvegarde maintenant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
