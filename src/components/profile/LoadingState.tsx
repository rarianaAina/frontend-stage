import NavBar from '../NavBar';

interface LoadingStateProps {
  userRole: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ userRole }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role={userRole} />
      <div style={{ 
        padding: '40px 60px', 
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        <p style={{ fontSize: '18px', color: '#666' }}>Chargement des données du profil...</p>
      </div>
    </div>
  );
};