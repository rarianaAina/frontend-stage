import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  monospace?: boolean;
}

export const FormInput: React.FC<FormInputProps> = React.memo(({ // ✅ Ajoutez React.memo
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  monospace = false
}) => {
  // ✅ Gestion locale de la valeur pour éviter les re-renders
  const [localValue, setLocalValue] = React.useState(value);

  // ✅ Synchronise la valeur locale avec la valeur parent quand elle change
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
        {label}:
      </label>
      <input
        type={type}
        value={localValue} // ✅ Utilisez la valeur locale
        onChange={handleChange} // ✅ Utilisez le gestionnaire local
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          border: '1px solid #ddd',
          fontSize: '16px',
          fontFamily: monospace ? 'monospace' : 'inherit',
          backgroundColor: disabled ? '#f3f4f6' : 'white'
        }}
      />
    </div>
  );
});