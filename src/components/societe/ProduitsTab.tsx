import React from 'react';
import { useProduits } from '../../hooks/demandes/useProduits';

interface Produit {
  parcName: string;
  parcId: string;
  dateObtention?: string;
  chRestant?: number;
}

const ProduitsTab: React.FC = () => {
  const { produits: produitsReels, loading, error } = useProduits();

  // Données factices (à supprimer une fois que les données réelles fonctionnent)
  const produitsFactices: Produit[] = [
    { parcName: 'ABC123', parcId: '40', dateObtention: '09/09/2020' },
    { parcName: 'DEF456', parcId: '20', dateObtention: '09/09/2020' },
  ];

  // Utiliser les produits réels s'ils sont disponibles, sinon les produits factices
  const produitsAAfficher = produitsReels.length > 0 ? produitsReels : produitsFactices;

  return (
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
      
      {/* État de chargement */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Chargement des produits...
        </div>
      )}
      
      {/* Message d'erreur */}
      {error && (
        <div style={{ 
          color: 'red', 
          textAlign: 'center', 
          padding: '20px',
          background: '#ffe6e6',
          borderRadius: '8px',
          margin: '10px'
        }}>
          {error}
        </div>
      )}
      
      {/* Tableau des produits */}
      {!loading && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '18px' }}>Nom</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '18px' }}>Date d'obtention</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '18px' }}>CH Restant</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '18px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produitsAAfficher.length > 0 ? (
              produitsAAfficher.map((produit, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{produit.parcName}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: '#e5e5e5',
                      padding: '8px 16px',
                      borderRadius: '15px',
                      display: 'inline-block'
                    }}>
                      {produit.dateObtention || 'N/A'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>{produit.parcId}</td>
                  <td style={{ padding: '12px' }}>
                    <button style={{
                      background: '#6dd5ed',
                      color: 'white',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}>
                      Faire une demande
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                  Aucun produit trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProduitsTab;