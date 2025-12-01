import React from 'react';

type FilterBarProps = {
  filters: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options?: { value: string; label: string }[];
    type?: 'text' | 'select' | 'date';
    placeholder?: string;
  }[];
};

export default function FilterBar({ filters }: FilterBarProps) {
  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    }}>
      <h3 style={{
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textDecoration: 'underline',
        color: '#333'
      }}>
        Filtres
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        gap: '20px',
        alignItems: 'end'
      }}>
        {filters.map((filter, index) => (
          <div key={index} style={{ minWidth: '0' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>
              {filter.label}
            </label>
            
            {filter.type === 'select' && filter.options ? (
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '20px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6dd5ed'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              >
                <option value="">Tous</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : filter.type === 'date' ? (
              <input
                type="date"
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '20px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6dd5ed'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            ) : (
              <input
                type={filter.type || 'text'}
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                placeholder={filter.placeholder || `Rechercher...`}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '20px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6dd5ed'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}