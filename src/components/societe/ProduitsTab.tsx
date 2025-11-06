import React from 'react';
import { useProduits } from '../../hooks/demandes/useProduits';
import { useCreditsHoraires } from '../../hooks/dashboard/useCreditsHoraires';
import { useProduitsAvecCH } from '../../hooks/dashboard/useProduitsAvecCH';
import { useNavigate } from 'react-router-dom';

interface ProduitAvecCH {
  parcName: string;
  parcId: string;
  dateObtention?: string;
  chRestant?: number;
}

const ProduitsTab: React.FC = () => {
  const navigate = useNavigate();
  const companyId = localStorage.getItem('companyId') || '';
  const { produits: produitsReels, loading: loadingProduits, error } = useProduits();
  const { credits, loading: loadingCredits } = useCreditsHoraires(produitsReels, companyId);
  const produitsAvecCH = useProduitsAvecCH(produitsReels, credits);

  // Données factices (à supprimer une fois que les données réelles fonctionnent)
  const produitsFactices: ProduitAvecCH[] = [
    { 
      parcName: 'ABC123', 
      parcId: '40', 
      dateObtention: '09/09/2020',
      chRestant: 120
    },
    { 
      parcName: 'DEF456', 
      parcId: '20', 
      dateObtention: '09/09/2020',
      chRestant: 75
    },
  ];

  // Utiliser les produits réels avec CH calculé, sinon les produits factices
  const produitsAAfficher = produitsAvecCH.length > 0 ? produitsAvecCH : produitsFactices;

  const loadingTotal = loadingProduits || loadingCredits;

  // Fonction pour formater l'affichage du CH restant
  const formaterCHRestant = (chRestant?: number) => {
    if (chRestant === undefined || chRestant === null) {
      return '0';
    }
    return `${chRestant}h`;
  };

  // Fonction pour déterminer la couleur selon le CH restant
  const getCouleurCHRestant = (chRestant?: number) => {
    if (chRestant === undefined || chRestant === null) {
      return '#e5e5e5'; // Gris par défaut
    }
    if (chRestant > 100) {
      return '#d4edda'; // Vert pour beaucoup d'heures
    } else if (chRestant > 50) {
      return '#fff3cd'; // Jaune pour moyenne quantité
    } else if (chRestant > 0) {
      return '#e7fae0ff'; // Rouge pour peu d'heures
    } else {
      return '#e5e5e5'; // Gris pour zéro heure
    }
  };

  const handleNouvelleDemande = (produit: ProduitAvecCH) => {
    // Envoyer le parcId au lieu du parcName
    navigate('/nouvelle-demande', { 
      state: { 
        produitSelectionne: produit.parcId, // CHANGEMENT ICI : envoyer parcId au lieu de parcName
        produitNom: produit.parcName // Garder le nom pour l'affichage si besoin
      }
    });
  };

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
{loadingTotal && (
  <div style={{
    textAlign: 'center',
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    borderRadius: '15px',
    margin: '20px',
    border: '1px solid #e0e0e0'
  }}>
    {/* Barre de chargement avec pourcentage */}
    <div style={{
      width: '250px',
      height: '10px',
      backgroundColor: '#e9ecef',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <div style={{
        height: '100%',
        width: '65%', /* Pourcentage de progression */
        background: 'linear-gradient(90deg, #17a2b8 0%, #20c997 100%)',
        borderRadius: '15px',
        transition: 'width 0.3s ease',
        position: 'relative'
      }}>
        {/* Animation de scintillement */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          height: '100%',
          width: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
          animation: 'shimmer 2s infinite linear'
        }}></div>
      </div>
    </div>
    
    {/* Contenu texte avec pourcentage */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }}>
      <div style={{
        fontSize: '20px',
        fontWeight: '600',
        color: '#495057',
        background: 'linear-gradient(90deg, #17a2b8, #20c997)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        // color: 'transparent'
      }}>
        Chargement en cours
      </div>
      
      {/* Pourcentage */}
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#17a2b8',
        fontFamily: 'Arial, sans-serif'
      }}>
        65%
      </div>
      
      <div style={{
        fontSize: '14px',
        color: '#6c757d'
      }}>
        Récupération des produits et crédits horaires...
      </div>
    </div>

    {/* Styles d'animation */}
    <style>
      {`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}
    </style>
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
      {!loadingTotal && (
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
                      {produit.dateObtention 
                        ? new Date(produit.dateObtention).toLocaleDateString('fr-FR') 
                        : 'N/A'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: getCouleurCHRestant(produit.chRestant),
                      padding: '8px 16px',
                      borderRadius: '15px',
                      display: 'inline-block',
                      fontWeight: 'bold',
                      color: produit.chRestant && produit.chRestant < 5 ? '#721c24' : '#155724'
                    }}>
                      {formaterCHRestant(produit.chRestant)}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      style={{
                        background: '#6dd5ed',
                        color: 'white',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#4fa3c7'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#6dd5ed'}
                      onClick={() => handleNouvelleDemande(produit)} // Ajouter l'événement onClick
                    >
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