// components/Layout.tsx
import React from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Récupérer le rôle depuis le localStorage
  const getCurrentRole = () => {
    const role = localStorage.getItem('role');
    if (role === 'client') return 'CLIENT';
    if (role === 'consultant') return 'CONSULTANT';
    if (role === 'admin') return 'ADMINISTRATEUR';
    return 'CLIENT'; // valeur par défaut
  };

  const currentRole = getCurrentRole();

  return (
    <div>
      <NavBar role={currentRole} />
      <main style={{ 
        marginTop: '80px', // Ajustez cette valeur selon la hauteur réelle de votre navbar
        minHeight: 'calc(100vh - 80px)', // Prend toute la hauteur restante
        padding: '20px'
      }}>
        {children}
      </main>
    </div>
  );
}