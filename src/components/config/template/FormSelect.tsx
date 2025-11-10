import React from 'react';

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = React.memo(({ // ✅ Ajoutez React.memo
  label,
  value,
  onChange,
  options,
  required = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
        {label}:
      </label>
      <select
        value={value}
        onChange={handleChange}
        required={required}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          border: '1px solid #ddd',
          fontSize: '16px'
        }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});