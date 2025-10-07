import { useState } from 'react';
import NavBar from '../../components/NavBar';

export default function Profile() {
  const userName = localStorage.getItem('userName') || 'Utilisateur';
  const userEmail = localStorage.getItem('email') || '';
  const userRole = localStorage.getItem('role') || 'client';

  const [nom, setNom] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [telephone, setTelephone] = useState('+261 34 12 345 67');
  const [langue, setLangue] = useState('fr');
  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: true,
    sms: false
  });

  const handleSaveProfile = () => {
    localStorage.setItem('userName', nom);
    alert('Profil mis à jour avec succès!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role={userRole as 'client' | 'consultant' | 'admin'} />

      <div style={{ padding: '40px 60px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#17a2b8',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>
          Mon Profil
        </h1>

        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
            paddingBottom: '30px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '42px',
              color: 'white',
              fontWeight: 'bold',
              marginRight: '30px'
            }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>{userName}</h2>
              <p style={{ color: '#666', fontSize: '16px' }}>{userEmail}</p>
              <span style={{
                display: 'inline-block',
                marginTop: '8px',
                padding: '6px 16px',
                background: '#dbeafe',
                color: '#1e40af',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {userRole === 'admin' ? 'Administrateur' : userRole === 'consultant' ? 'Consultant' : 'Client'}
              </span>
            </div>
          </div>

          <h3 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '600' }}>
            Informations personnelles
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Nom complet:
              </label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
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
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Téléphone:
              </label>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
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
                Langue:
              </label>
              <select
                value={langue}
                onChange={(e) => setLangue(e.target.value)}
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
                <option value="mg">Malagasy</option>
              </select>
            </div>
          </div>

          <h3 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '600' }}>
            Préférences de notification
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
              />
              <span style={{ fontSize: '16px' }}>Notifications par email</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="checkbox"
                checked={notifications.whatsapp}
                onChange={(e) => setNotifications({ ...notifications, whatsapp: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
              />
              <span style={{ fontSize: '16px' }}>Notifications par WhatsApp</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
              />
              <span style={{ fontSize: '16px' }}>Notifications par SMS</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              onClick={handleSaveProfile}
              style={{
                background: '#10b981',
                color: 'white',
                padding: '14px 30px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Enregistrer les modifications
            </button>
            <button
              style={{
                background: '#ef4444',
                color: 'white',
                padding: '14px 30px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Changer le mot de passe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
