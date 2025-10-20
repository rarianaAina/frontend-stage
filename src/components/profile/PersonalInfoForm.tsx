import { UserData } from '../../services/userService';
import { useLanguage } from '../../hooks/profile/useLanguage';

interface PersonalInfoFormProps {
  userData: UserData;
  onUserDataChange: (field: keyof UserData, value: string) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  userData,
  onUserDataChange
}) => {
  const { langue, setLangue } = useLanguage();

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: '#f9fafb'
  } as const;

  return (
    <div>
      <h3 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '600' }}>
        Informations personnelles
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Nom:
          </label>
          <input
            type="text"
            value={userData.nom}
            onChange={(e) => onUserDataChange('nom', e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Prénom:
          </label>
          <input
            type="text"
            value={userData.prenom}
            onChange={(e) => onUserDataChange('prenom', e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Email:
          </label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => onUserDataChange('email', e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Téléphone:
          </label>
          <input
            type="tel"
            value={userData.telephone}
            onChange={(e) => onUserDataChange('telephone', e.target.value)}
            placeholder="+261 34 12 345 67"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            WhatsApp:
          </label>
          <input
            type="tel"
            value={userData.whatsappNumero}
            onChange={(e) => onUserDataChange('whatsappNumero', e.target.value)}
            placeholder="+261 34 12 345 67"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Langue:
          </label>
          <select
            value={langue}
            onChange={(e) => setLangue(e.target.value as any)}
            style={inputStyle}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="mg">Malagasy</option>
          </select>
        </div>
      </div>
    </div>
  );
};