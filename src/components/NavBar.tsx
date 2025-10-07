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
      zIndex: 10,
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
            <NavButton to="/admin/rapports">Rapports</NavButton>
            <NavButton to="/admin/configurations">Configurations</NavButton>
            <NavButton to="/admin/gestion-utilisateurs">Gestion utilisateurs</NavButton>
          </>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          fontSize: '20px',
          fontFamily: 'cursive',
          color: 'black',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          Portail client
        </div>
        <Link
          to="/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {(localStorage.getItem('userName') || 'U').charAt(0).toUpperCase()}
        </Link>
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
        color: 'black', // Changer ici pour le texte en noir
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
