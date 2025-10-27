import React from 'react';
import { DemoUser } from '../../types/auth';

const DEMO_USERS: Record<string, DemoUser> = {
  client: { email: 'client@optimada.com', password: 'client123', role: 'client' },
  consultant: { email: 'consultant@optimada.com', password: 'consultant123', role: 'consultant' },
  admin: { email: 'admin@optimada.com', password: 'admin123', role: 'admin' }
};

interface DemoCredentialsProps {
  onFillCredentials: (email: string, password: string) => void;
}

export const DemoCredentials: React.FC<DemoCredentialsProps> = ({ onFillCredentials }) => {
  const fillCredentials = (role: string): void => {
    const user = DEMO_USERS[role];
    if (user) {
      onFillCredentials(user.email, user.password);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <button 
        onClick={() => fillCredentials('consultant')}
        style={{
          background: '#28a745',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '20px',
          border: 'none',
          fontSize: '14px',
          marginRight: '10px',
          cursor: 'pointer'
        }}
      >
        Remplir Consultant
      </button>
      <button 
        onClick={() => fillCredentials('client')}
        style={{
          background: '#28a745',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '20px',
          border: 'none',
          fontSize: '14px',
          marginRight: '10px',
          cursor: 'pointer'
        }}
      >
        Remplir Client
      </button>
      <button 
        onClick={() => fillCredentials('admin')}
        style={{
          background: '#dc3545',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '20px',
          border: 'none',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        Remplir Admin
      </button>
    </div>
  );
};