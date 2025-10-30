import React from 'react';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  height: string;
  background?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ 
  title, 
  children, 
  height, 
  background = 'white' 
}) => {
  return (
    <div style={{ 
      background, 
      padding: '20px', 
      borderRadius: '15px', 
      height,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '20px', 
        color: background === 'white' ? '#333' : 'white' 
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
};