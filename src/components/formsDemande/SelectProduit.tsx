import { useProduits } from '../../hooks/demandes/useProduits';

interface SelectProduitProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const SelectProduit: React.FC<SelectProduitProps> = ({ 
  value, 
  onChange, 
  required = false 
}) => {
  const { produits, loading, error } = useProduits();

  return (
    <div style={{ marginBottom: '25px' }}>
      <label style={{
        display: 'block',
        marginBottom: '10px',
        fontWeight: '600',
        color: '#333'
      }}>
        *Logiciel/Application :
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 18px',
          borderRadius: '20px',
          border: 'none',
          fontSize: '16px',
          background: 'white'
        }}
        required={required}
        disabled={loading}
      >
        <option value="">
          {loading ? 'Chargement des produits...' : 'Liste déroulante des produits'}
        </option>
        
        {error ? (
          <option value="" disabled>
            Erreur de chargement
          </option>
        ) : (
          produits
            .map((produit) => (
              <option key={produit.parcId} value={produit.parcId}>
                {produit.parcName}
              </option>
            ))
        )}
      </select>
      
      {/* Messages d'état */}
      {loading && (
        <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          Chargement des produits...
        </p>
      )}
      
      {error && (
        <p style={{ fontSize: '14px', color: '#e53e3e', marginTop: '5px' }}>
          {error}
        </p>
      )}
      
      {!loading && !error && produits.length === 0 && (
        <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          Aucun produit disponible
        </p>
      )}
    </div>
  );
};