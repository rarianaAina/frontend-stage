export type NotificationPreferencesType = {
  email: boolean;
  whatsapp: boolean;
  sms: boolean;
};

interface NotificationPreferencesProps {
  preferences: NotificationPreferencesType;
  onPreferencesChange: (preferences: NotificationPreferencesType) => void;
}

export const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({
  preferences,
  onPreferencesChange
}) => {
  const handleCheckboxChange = (key: keyof NotificationPreferencesType) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onPreferencesChange({
        ...preferences,
        [key]: e.target.checked
      });
    };

  return (
    <div>
      <h3 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '600' }}>
        Préférences de notification
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={preferences.email}
            onChange={handleCheckboxChange('email')}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '16px' }}>Notifications par email</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={preferences.whatsapp}
            onChange={handleCheckboxChange('whatsapp')}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '16px' }}>Notifications par WhatsApp</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={preferences.sms}
            onChange={handleCheckboxChange('sms')}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '16px' }}>Notifications par SMS</span>
        </label>
      </div>
    </div>
  );
};