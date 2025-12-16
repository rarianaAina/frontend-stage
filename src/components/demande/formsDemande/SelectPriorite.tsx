import { usePriorites } from '../../../hooks/demandes/usePriorites';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface SelectPrioriteProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  label?: string;
  placeholder?: string;
}

export const SelectPriorite: React.FC<SelectPrioriteProps> = ({ 
  value, 
  onChange, 
  required = false,
  label,
  placeholder
}) => {
  const { priorites, loading, error } = usePriorites();
  const { t } = useAppTranslation(['common', 'newRequest']);

  console.log('Données des priorités :', priorites);

  return (
    <div style={{ marginBottom: '25px' }}>
      <label style={{
        display: 'block',
        marginBottom: '10px',
        fontWeight: '600',
        color: '#333'
      }}>
        {label || t('newRequest:priority.label') || 'Niveau de priorité :'}
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
            : (placeholder || t('newRequest:priority.placeholder') || 'Sélectionnez la priorité')}
        </option>
        {error ? (
          <option value="" disabled>
            {t('common:loadingError') || 'Erreur de chargement'}
          </option>
        ) : (
          priorites.map((priorite) => (
            <option key={priorite.id} value={priorite.id}>
              {priorite.libelle}
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