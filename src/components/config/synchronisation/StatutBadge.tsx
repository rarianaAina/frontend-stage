import React from 'react';

interface StatusBadgeProps {
  text: string;
  color: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ text, color }) => (
  <div style={{
    padding: '8px 12px',
    backgroundColor: color + '20',
    color: color,
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600'
  }}>
    {text}
  </div>
);