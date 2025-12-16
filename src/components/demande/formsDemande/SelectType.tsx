import { useTypes } from '../../../hooks/demandes/useTypes';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface SelectTypeProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  label?: string;
  placeholder?: string;
}

export const SelectType: React.FC<SelectTypeProps> = ({ 
  value, 
  onChange, 
  required = false,
  label,
  placeholder
}) => {
  const { types, loading, error } = useTypes();
  const { t } = useAppTranslation(['common', 'newRequest']);

  console.log('Données des types :', types);
  
  return (
    <div style={{ marginBottom: '25px' }}>
      <label style={{
        display: 'block',
        marginBottom: '10px',
        fontWeight: '600',
        color: '#333'
      }}>
        {label || t('newRequest:type.label') || 'Type de demande :'}
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
          {loading 
            ? (t('common:loading') || 'Chargement...')
            : (placeholder || t('newRequest:type.placeholder') || 'Sélectionnez le type')}
        </option>
        {error ? (
          <option value="" disabled>
            {t('common:loadingError') || 'Erreur de chargement'}
          </option>
        ) : (
          types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.libelle}
            </option>
          ))
        )}
      </select>
      {loading && (
        <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          {t('common:loading') || 'Chargement...'}
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