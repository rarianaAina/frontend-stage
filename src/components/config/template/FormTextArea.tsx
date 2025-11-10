import React from 'react';

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  helpText?: string;
  monospace?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = React.memo(({ // ✅ Ajoutez React.memo
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  helpText,
  monospace = false
}) => {
  // ✅ Gestion locale de la valeur
  const [localValue, setLocalValue] = React.useState(value);

  // ✅ Synchronise la valeur locale avec la valeur parent
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
        {label}:
      </label>
      <textarea
        value={localValue} // ✅ Utilisez la valeur locale
        onChange={handleChange} // ✅ Utilisez le gestionnaire local
        placeholder={placeholder}
        rows={rows}
        required={required}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          border: '1px solid #ddd',
          fontSize: '16px',
          resize: 'vertical',
          fontFamily: monospace ? 'monospace' : 'inherit'
        }}
      />
      {helpText && (
        <small style={{ color: '#666', fontSize: '14px', marginTop: '5px', display: 'block' }}>
          {helpText}
        </small>
      )}
    </div>
  );
});