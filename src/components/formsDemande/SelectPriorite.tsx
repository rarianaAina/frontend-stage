import { usePriorites } from '../../hooks/demandes/usePriorites';

interface SelectPrioriteProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const SelectPriorite: React.FC<SelectPrioriteProps> = ({ 
  value, 
  onChange, 
  required = false 
}) => {
  const { priorites, loading, error } = usePriorites();

  return (
    <div style={{ marginBottom: '25px' }}>
      <label style={{
        display: 'block',
        marginBottom: '10px',
        fontWeight: '600',
        color: '#333'
      }}>
        *Niveau de priorité :
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
      >
        <option value="">
          {loading ? 'Chargement des priorités...' : 'Sélectionnez la priorité'}
        </option>
        {error ? (
          <option value="" disabled>
            Erreur de chargement
          </option>
        ) : (
          priorites.map((priorite) => (
            <option key={priorite.id} value={priorite.code}>
              {priorite.libelle}
            </option>
          ))
        )}
      </select>
      {loading && (
        <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          Chargement des priorités...
        </p>
      )}
      {error && (
        <p style={{ fontSize: '14px', color: '#e53e3e', marginTop: '5px' }}>
          {error}
        </p>
      )}
    </div>
  );
};