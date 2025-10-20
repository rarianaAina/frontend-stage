interface ProfileActionsProps {
  onSave: () => void;
  onChangePassword: () => void;
  saving: boolean;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  onSave,
  onChangePassword,
  saving
}) => {
  const buttonBaseStyle = {
    padding: '14px 30px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
    cursor: 'pointer' as const
  };

  return (
    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
      <button
        onClick={onSave}
        disabled={saving}
        style={{
          ...buttonBaseStyle,
          background: saving ? '#9ca3af' : '#10b981',
          color: 'white',
          cursor: saving ? 'not-allowed' : 'pointer'
        }}
      >
        {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
      </button>
      <button
        onClick={onChangePassword}
        style={{
          ...buttonBaseStyle,
          background: '#ef4444',
          color: 'white'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
      >
        Changer le mot de passe
      </button>
    </div>
  );
};