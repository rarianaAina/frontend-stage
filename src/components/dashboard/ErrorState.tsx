interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      margin: '40px',
      background: 'white',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ color: '#ef4444', marginBottom: '20px' }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: '#17a2b8',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Réessayer
        </button>
      )}
    </div>
  );
};