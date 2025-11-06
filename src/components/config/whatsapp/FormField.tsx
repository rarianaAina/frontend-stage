import React from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  helpText
}) => (
  <div>
    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      style={{
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        fontSize: '16px'
      }}
    />
    {helpText && (
      <small style={{ color: '#666', fontSize: '14px', marginTop: '5px', display: 'block' }}>
        {helpText}
      </small>
    )}
  </div>
);