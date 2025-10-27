// components/utilisateurs/TableauUtilisateurs.tsx
import { Utilisateur } from '../../types/utilisateur';

interface Props {
  utilisateurs: Utilisateur[];
  onVoirDetails: (utilisateur: Utilisateur) => void;
}

export default function TableauUtilisateurs({ utilisateurs, onVoirDetails }: Props) {
  
  const getEtatDisplay = (actif: boolean) => actif ? 'Actif' : 'Inactif';
  
  const getSocieteDisplay = (companyId?: number) => {
    // Mapping des companyId vers les noms de société
    const societes: { [key: number]: string } = {
      896: 'OPTIMADA',
      // Ajouter d'autres mappings selon vos besoins
    };
    return companyId ? societes[companyId] || `Société ${companyId}` : 'Non définie';
  };

  const getPosteDisplay = (idExterneCrm?: string) => {
    // Logique pour déterminer le poste basée sur idExterneCrm ou autres champs
    return idExterneCrm ? 'Consultant' : 'Client';
  };

  const getAnciennete = (dateCreation: string) => {
    const creation = new Date(dateCreation);
    const now = new Date();
    const diffYears = now.getFullYear() - creation.getFullYear();
    return `${diffYears} an${diffYears > 1 ? 's' : ''}`;
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '15px', overflow: 'hidden' }}>
      <thead>
        <tr style={{ background: '#f8fafc' }}>
          <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Nom</th>
          <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Prénom</th>
          <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Identifiant</th>
          <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Email</th>
          <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Société</th>
          <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Poste</th>
          <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>État</th>
          <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {utilisateurs.map((user) => (
          <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
            <td style={{ padding: '15px' }}>{user.nom}</td>
            <td style={{ padding: '15px' }}>{user.prenom}</td>
            <td style={{ padding: '15px' }}>{user.identifiant}</td>
            <td style={{ padding: '15px' }}>{user.email}</td>
            <td style={{ padding: '15px' }}>{getSocieteDisplay(user.companyId)}</td>
            <td style={{ padding: '15px' }}>{getPosteDisplay(user.idExterneCrm)}</td>
            <td style={{ padding: '15px' }}>{getEtatDisplay(user.actif)}</td>
            <td style={{ padding: '15px' }}>
              <button
                onClick={() => onVoirDetails(user)}
                style={{
                  background: '#6dd5ed',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Voir détails
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}