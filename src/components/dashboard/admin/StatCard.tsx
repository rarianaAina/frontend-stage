import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '15px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color, margin: '0 0 10px 0', fontSize: '14px' }}>{title}</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#333' }}>
        {value}
      </p>
    </div>
  );
};