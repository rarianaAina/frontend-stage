import React from 'react';
import { useContactsWithDetails } from '../../hooks/contacts/useContactWithDetails';

interface Contact {
  userId: number;
  userFullName: string;
  email?: string;
  telephone?: string;
  parcName?: string;
  parcId?: number;
}

const ContactsTab: React.FC = () => {
  const { contacts, loading, error } = useContactsWithDetails();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div>Chargement des contacts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
        <div>Erreur: {error}</div>
      </div>
    );
  }

  return (
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
      
      {contacts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Aucun contact trouvé pour votre entreprise.</p>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '18px' }}>Nom</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '18px' }}>Adresse email</th>
              {/* <th style={{ padding: '12px', textAlign: 'left', fontSize: '18px' }}>Téléphone</th> */}
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, idx) => (
              <tr key={contact.userId} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{contact.userFullName}</td>
                <td style={{ padding: '12px' }}>{contact.email || 'Non renseigné'}</td>
                {/* <td style={{ padding: '12px' }}>{contact.telephone || 'Non renseigné'}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactsTab;