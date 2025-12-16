import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface InputFichiersProps {
  onChange: (fichiers: FileList | null) => void;
  label?: string;
  description?: string;
}

export const InputFichiers: React.FC<InputFichiersProps> = ({ 
  onChange,
  label,
  description 
}) => {
  const { t } = useAppTranslation(['common', 'newRequest']);

  return (
    <div style={{ marginBottom: '25px' }}>
      <label style={{
        display: 'block',
        marginBottom: '10px',
        fontWeight: '600',
        color: '#333'
      }}>
        {label || t('newRequest:files.label') || 'Pièces jointes'}
      </label>
      <input
        type="file"
        multiple
        onChange={(e) => onChange(e.target.files)}
        style={{
          width: '100%',
          padding: '12px 18px',
          borderRadius: '20px',
          border: 'none',
          fontSize: '14px',
          background: 'white'
        }}
      />
      <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
        {description || t('newRequest:files.description') || '(PDF, DOCX, JPEG - 20 Mo max)'}
      </p>
    </div>
  );
};