import { Link, useNavigate } from 'react-router-dom';

type NavBarProps = {
  role: 'CLIENT' | 'CONSULTANT' | 'ADMIN';
};

export default function NavBar({ role }: NavBarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jeton');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('company'); // Supprimer aussi la company
    navigate('/connexion');
  };

  // Récupérer le nom de la compagnie depuis le localStorage
  const companyName = localStorage.getItem('companyName') || 'Ma Société';

  console.log('Company Name in NavBar:', companyName);
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      background: 'transparent',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {role === 'CLIENT' && (
          <>
            <NavButton to="/dashboard">Dashboard</NavButton>
            <NavButton to="/mes-demandes">Mes demandes</NavButton>
            <NavButton to="/nouvelle-demande">Nouvelle demande</NavButton>
            <NavButton to="/ma-societe">Ma société</NavButton>
          </>
        )}

        {role === 'CONSULTANT' && (
          <>
            <NavButton to="/consultant/tickets">Mes tickets</NavButton>
            <NavButton to="/consultant/interventions">Mes interventions</NavButton>
          </>
        )}

        {role === 'ADMIN' && (
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
        {/* Affichage du nom de la compagnie */}
        {/* <div style={{
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          color: 'black',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          padding: '8px 16px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          backdropFilter: 'blur(5px)'
        }}>
          {companyName}
        </div> */}
        
        {/* <div style={{
          fontSize: '20px',
          fontFamily: 'cursive',
          color: 'black',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          Portail client
        </div> */}
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
          textDecoration: 'none'
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