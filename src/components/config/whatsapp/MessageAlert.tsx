import React from 'react';

interface MessageAlertProps {
  message: string;
}

export const MessageAlert: React.FC<MessageAlertProps> = ({ message }) => (
  <div style={{
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    background: message.includes('✅') ? '#d1fae5' : '#fee2e2',
    color: message.includes('✅') ? '#065f46' : '#991b1b',
    border: `1px solid ${message.includes('✅') ? '#a7f3d0' : '#fecaca'}`
  }}>
    {message}
  </div>
);