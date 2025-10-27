import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div style={{ flex: 1 }}>
      <div style={{
        fontSize: '120px',
        fontFamily: 'cursive',
        color: '#ffd700',
        marginBottom: '40px',
        textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
        lineHeight: 1
      }}>
        Optimada
      </div>

      <button style={{
        background: '#17a2b8',
        color: 'white',
        padding: '14px 40px',
        borderRadius: '25px',
        border: 'none',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer'
      }}>
        En savoir plus
      </button>
    </div>
  );
};