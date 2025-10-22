import React from 'react';

const InformationsTab: React.FC = () => {
  const informations = [
    { label: 'Société', value: 'OPTIMADA' },
    { label: 'Anniversaire', value: '01/01/1990' },
    { label: 'Numéro téléphone', value: '+261 34 00 000 00' },
    { label: 'Adresse email', value: 'user@optimada.mg' },
  ];

  return (
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
        
        {informations.map((info, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <strong>{info.label} :</strong> {info.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformationsTab;