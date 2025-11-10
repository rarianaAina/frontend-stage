import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAppTranslation } from '../hooks/translation/useTranslation';

type NavBarProps = {
  role: 'CLIENT' | 'CONSULTANT' | 'ADMIN';
};

export default function NavBar({ role }: NavBarProps) {
  const navigate = useNavigate();
  const { t } = useAppTranslation(['common', 'auth', 'tickets', 'admin']);

  const handleLogout = () => {
    localStorage.removeItem('jeton');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('company');
    navigate('/connexion');
  };

  const companyName = localStorage.getItem('companyName') || t('common:myCompany');

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      background: '#4ed9f1ff',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Partie gauche - Navigation */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {role === 'CLIENT' && (
          <>
            <NavButton to="/dashboard">{t('common:dashboard')}</NavButton>
            <NavButton to="/mes-demandes">{t('tickets:myTickets')}</NavButton>
            <NavButton to="/nouvelle-demande">{t('tickets:newTicket')}</NavButton>
            <NavButton to="/ma-societe">{t('common:myCompany')}</NavButton>
          </>
        )}

        {role === 'CONSULTANT' && (
          <>
            <NavButton to="/consultant/tickets">{t('tickets:tickets')}</NavButton>
            <NavButton to="/consultant/interventions">{t('admin:interventions')}</NavButton>
          </>
        )}

        {role === 'ADMIN' && (
          <>
            <NavButton to="/admin/demandes">{t('common:demandes')}</NavButton>
            <NavButton to="/admin/interventions">{t('common:interventions')}</NavButton>
            <NavButton to="/admin/dashboard">{t('common:dashboard')}</NavButton>
            <NavButton to="/admin/rapports">{t('admin:reports')}</NavButton>
            <NavButton to="/admin/configurations">{t('admin:configurations')}</NavButton>
            <NavButton to="/admin/gestion-utilisateurs">{t('admin:users')}</NavButton>
          </>
        )}
      </div>

      {/* Partie droite - Company, LanguageSwitcher, Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Nom de la compagnie */}
        <Link
          to="/profile"
          style={{
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            color: 'black',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            backdropFilter: 'blur(5px)',
            textDecoration: 'none',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {companyName}
        </Link>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Bouton Déconnexion */}
        <button
          onClick={handleLogout}
          style={{
            background: '#ef4444',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '25px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#dc2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ef4444';
          }}
        >
          {t('auth:logout')}
        </button>
      </div>
    </nav>
  );
}

function NavButton({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={{
        padding: '10px 24px',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
        borderRadius: '25px',
        color: 'black',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </Link>
  );
}