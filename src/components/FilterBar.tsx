type FilterBarProps = {
  filters: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options?: { value: string; label: string }[];
    type?: 'text' | 'select' | 'date';
  }[];
};

export default function FilterBar({ filters }: FilterBarProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${filters.length}, 1fr)`,
      gap: '20px',
      marginBottom: '30px',
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      {filters.map((filter, index) => (
        <div key={index}>
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
                fontSize: '14px'
              }}
            >
              <option value="">Tous</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={filter.type || 'text'}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '20px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
