// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const token = localStorage.getItem('jeton');
  const role = localStorage.getItem('role');

  // Si pas de token, rediriger vers login
  if (!token) {
    return <Navigate to="/connexion" replace />;
  }

  // Si des rôles sont spécifiés et que l'utilisateur n'a pas le bon rôle
  if (allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) {
    // Rediriger vers le dashboard par défaut selon le rôle
    switch(role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'consultant':
        return <Navigate to="/consultant/tickets" replace />;
      case 'client':
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}