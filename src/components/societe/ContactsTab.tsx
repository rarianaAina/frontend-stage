import React from 'react';

interface Contact {
  nom: string;
  email: string;
}

const ContactsTab: React.FC = () => {
  const contacts: Contact[] = [
    { nom: 'Test', email: 'test@optimada.mg' },
    { nom: 'Test2', email: 'test2@optimada.mg' },
  ];

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
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '12px', textAlign: 'left', fontSize: '18px' }}>Nom</th>
            <th style={{ padding: '12px', textAlign: 'left', fontSize: '18px' }}>Adresse email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>{contact.nom}</td>
              <td style={{ padding: '12px' }}>{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTab;