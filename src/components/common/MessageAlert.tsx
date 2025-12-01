import React from 'react';

interface MessageAlertProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onDismiss?: () => void;
}

export const MessageAlert: React.FC<MessageAlertProps> = ({ 
  message, 
  type, 
  onDismiss 
}) => {
  if (!message) return null;

  const styles = {
    success: {
      color: '#28a745',
      backgroundColor: 'rgba(40, 167, 69, 0.1)',
      border: '1px solid #28a745'
    },
    error: {
      color: '#dc3545',
      backgroundColor: 'rgba(220, 53, 69, 0.1)',
      border: '1px solid #dc3545'
    },
    warning: {
      color: '#ffc107',
      backgroundColor: 'rgba(255, 193, 7, 0.1)',
      border: '1px solid #ffc107'
    },
    info: {
      color: '#17a2b8',
      backgroundColor: 'rgba(23, 162, 184, 0.1)',
      border: '1px solid #17a2b8'
    }
  };

  return (
    <div style={{
      ...styles[type],
      padding: '10px 20px',
      borderRadius: '10px',
      marginBottom: '20px',
      textAlign: 'center',
      position: 'relative'
    }}>
      {message}
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: 'inherit'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};