import React from 'react';
import { TicketFiltres } from '../../../services/adminTicketService';

interface FiltresTicketsProps {
  filtres: TicketFiltres;
  onFiltresChange: (filtres: TicketFiltres) => void;
}

export const FiltresTickets: React.FC<FiltresTicketsProps> = ({ 
  filtres, 
  onFiltresChange 
}) => {
  const handleChange = (key: keyof TicketFiltres, value: string) => {
    onFiltresChange({
      ...filtres,
      [key]: value || undefined
    });
  };

  const handleReset = () => {
    onFiltresChange({
      page: 0,
      size: 10
    });
  };

  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      marginBottom: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          textDecoration: 'underline',
          margin: 0
        }}>
          Filtres:
        </h3>
        <button
          onClick={handleReset}
          style={{
            background: '#6c757d',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Réinitialiser
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            État:
          </label>
          <select
            value={filtres.etat || ''}
            onChange={(e) => handleChange('etat', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              backgroundColor: 'white'
            }}
          >
            <option value="">Tous les états</option>
            <option value="1">Nouveau</option>
            <option value="2">En cours</option>
            <option value="3">En attente</option>
            <option value="4">En attente client</option>
            <option value="5">Planifié</option>
            <option value="6">Résolu</option>
            <option value="7">Clôturé</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Référence:
          </label>
          <input
            type="text"
            value={filtres.reference || ''}
            onChange={(e) => handleChange('reference', e.target.value)}
            placeholder="Rechercher par référence"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Produit:
          </label>
          <input
            type="text"
            value={filtres.produit || ''}
            onChange={(e) => handleChange('produit', e.target.value)}
            placeholder="Rechercher par produit"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Date début:
          </label>
          <input
            type="date"
            value={filtres.dateDebut || ''}
            onChange={(e) => handleChange('dateDebut', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Date fin:
          </label>
          <input
            type="date"
            value={filtres.dateFin || ''}
            onChange={(e) => handleChange('dateFin', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Société:
          </label>
          <input
            type="text"
            value={filtres.societe || ''}
            onChange={(e) => handleChange('societe', e.target.value)}
            placeholder="Rechercher par société"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Priorité:
          </label>
          <select
            value={filtres.priorite || ''}
            onChange={(e) => handleChange('priorite', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              backgroundColor: 'white'
            }}
          >
            <option value="">Toutes les priorités</option>
            <option value="1">Basse</option>
            <option value="2">Normale</option>
            <option value="3">Haute</option>
            <option value="4">Urgente</option>
          </select>
        </div>
      </div>
    </div>
  );
};