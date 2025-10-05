import { useState } from 'react';
import NavBar from '../../components/NavBar';

type Tab = 'contacts' | 'produits' | 'informations';

export default function MaSociete() {
  const [activeTab, setActiveTab] = useState<Tab>('contacts');

  const contacts = [
    { nom: 'Test', email: 'test@optimada.mg' },
    { nom: 'Test2', email: 'test2@optimada.mg' },
  ];

  const produits = [
    { nom: 'ABC123', dateObtention: '09/09/2020', chRestant: 40 },
    { nom: 'DEF456', dateObtention: '09/09/2020', chRestant: 20 },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="client" />

      <div style={{ padding: '40px 60px' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '40px'
        }}>
          <button
            onClick={() => setActiveTab('contacts')}
            style={{
              background: activeTab === 'contacts' ? '#666' : 'white',
              color: activeTab === 'contacts' ? 'white' : '#333',
              padding: '12px 40px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              minWidth: '250px'
            }}
          >
            Mes contacts
          </button>
          <button
            onClick={() => setActiveTab('produits')}
            style={{
              background: activeTab === 'produits' ? '#666' : 'white',
              color: activeTab === 'produits' ? 'white' : '#333',
              padding: '12px 40px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              minWidth: '250px'
            }}
          >
            Mes produits
          </button>
          <button
            onClick={() => setActiveTab('informations')}
            style={{
              background: activeTab === 'informations' ? '#666' : 'white',
              color: activeTab === 'informations' ? 'white' : '#333',
              padding: '12px 40px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              minWidth: '250px'
            }}
          >
            Mes informations
          </button>
        </div>

        {activeTab === 'contacts' && (
          <div>
            <h2 style={{
              textAlign: 'center',
              fontSize: '42px',
              color: '#17a2b8',
              marginBottom: '40px',
              fontWeight: 'bold'
            }}>
              Mes contacts
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Adresse email</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, idx) => (
                  <tr key={idx}>
                    <td>{contact.nom}</td>
                    <td>{contact.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'produits' && (
          <div>
            <h2 style={{
              textAlign: 'center',
              fontSize: '42px',
              color: '#17a2b8',
              marginBottom: '40px',
              fontWeight: 'bold'
            }}>
              Mes produits
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Date d'obtention</th>
                  <th>CH Restant</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {produits.map((produit, idx) => (
                  <tr key={idx}>
                    <td>{produit.nom}</td>
                    <td>
                      <span style={{
                        background: '#e5e5e5',
                        padding: '8px 16px',
                        borderRadius: '15px',
                        display: 'inline-block'
                      }}>
                        {produit.dateObtention}
                      </span>
                    </td>
                    <td>{produit.chRestant}</td>
                    <td>
                      <button style={{
                        background: '#6dd5ed',
                        color: 'white',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        cursor: 'pointer'
                      }}>
                        Faire une demande
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'informations' && (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(200, 240, 180, 0.7)',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                textAlign: 'center',
                fontSize: '32px',
                color: '#17a2b8',
                marginBottom: '30px',
                fontWeight: 'bold'
              }}>
                Mes informations
              </h2>
              <div style={{ marginBottom: '20px' }}>
                <strong>Société :</strong> OPTIMADA
              </div>
              <div style={{ marginBottom: '20px' }}>
                <strong>Anniversaire :</strong> 01/01/1990
              </div>
              <div style={{ marginBottom: '20px' }}>
                <strong>Numéro téléphone :</strong> +261 34 00 000 00
              </div>
              <div style={{ marginBottom: '20px' }}>
                <strong>Adresse email :</strong> user@optimada.mg
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
