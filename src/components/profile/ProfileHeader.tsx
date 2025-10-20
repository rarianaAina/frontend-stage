interface ProfileHeaderProps {
  userName: string;
  userEmail: string;
  userRole: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  userName, 
  userEmail, 
  userRole 
}) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'consultant': return 'Consultant';
      default: return 'Client';
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '30px',
      borderBottom: '2px solid #e5e7eb'
    }}>
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '42px',
        color: 'white',
        fontWeight: 'bold',
        marginRight: '30px'
      }}>
        {userName.charAt(0).toUpperCase()}
      </div>
      <div>
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>{userName}</h2>
        <p style={{ color: '#666', fontSize: '16px' }}>{userEmail}</p>
        <span style={{
          display: 'inline-block',
          marginTop: '8px',
          padding: '6px 16px',
          background: '#dbeafe',
          color: '#1e40af',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {getRoleLabel(userRole)}
        </span>
      </div>
    </div>
  );
};