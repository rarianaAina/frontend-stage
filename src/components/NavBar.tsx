import { Link, useNavigate } from 'react-router-dom';

type NavBarProps = {
  role: 'client' | 'consultant' | 'admin';
};

export default function NavBar({ role }: NavBarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jeton');
    localStorage.removeItem('role');
    navigate('/connexion');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      background: 'transparent',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {role === 'client' && (
          <>
            <NavButton to="/dashboard">Dashboard</NavButton>
            <NavButton to="/mes-demandes">Mes demandes</NavButton>
            <NavButton to="/nouvelle-demande">Nouvelle demande</NavButton>
            <NavButton to="/ma-societe">Ma société</NavButton>
          </>
        )}

        {role === 'consultant' && (
          <>
            <NavButton to="/consultant/tickets">Mes tickets</NavButton>
            <NavButton to="/consultant/interventions">Mes interventions</NavButton>
          </>
        )}

        {role === 'admin' && (
          <>
            <NavButton to="/admin/demandes">Demandes</NavButton>
            <NavButton to="/admin/interventions">Interventions</NavButton>
            <NavButton to="/admin/dashboard">Dashboard</NavButton>
            <NavButton to="/admin/configurations">Configurations</NavButton>
            <NavButton to="/admin/gestion-utilisateurs">Gestion utilisateurs</NavButton>
          </>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          fontSize: '32px',
          fontFamily: 'cursive',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          Portail client
        </div>
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
            fontWeight: '500'
          }}
        >
          Se déconnecter
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
        color: 'white',
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
