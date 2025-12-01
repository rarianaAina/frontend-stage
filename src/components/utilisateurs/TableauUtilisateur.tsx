import { useState } from 'react';
import { Utilisateur } from '../../types/utilisateur';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

interface Props {
  utilisateurs: Utilisateur[];
  onVoirDetails: (utilisateur: Utilisateur) => void;
}

type SortField = 'nom' | 'prenom' | 'email' | 'companyName' | 'poste' | 'actif';
type SortDirection = 'ASC' | 'DESC' | null;

export default function TableauUtilisateurs({ utilisateurs, onVoirDetails }: Props) {
  const { t } = useAppTranslation(['common', 'users']);
  const [sortField, setSortField] = useState<SortField>('nom');
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');

  const getEtatDisplay = (actif: boolean) => actif ? t('common:active') : t('common:inactive');
  
  const getSocieteDisplay = (companyName?: string) => {
    return companyName || t('users:notDefined');
  };

  const getPosteDisplay = (idExterneCrm?: string) => {
    return idExterneCrm ? t('users:client') : t('users:consultant');
  };

  const getAnciennete = (dateCreation: string) => {
    const creation = new Date(dateCreation);
    const now = new Date();
    const diffYears = now.getFullYear() - creation.getFullYear();
    return `${diffYears} ${t('users:year', { count: diffYears })}`;
  };

  // Fonction de gestion du tri
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Si on clique sur la même colonne, on alterne la direction
      setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
    } else {
      // Si on clique sur une nouvelle colonne, on trie par défaut en ASC
      setSortField(field);
      setSortDirection('ASC');
    }
  };

  // Fonction de tri des utilisateurs
  const sortedUtilisateurs = [...utilisateurs].sort((a, b) => {
    if (sortDirection === null) return 0;

    let aValue: any;
    let bValue: any;

    switch (sortField) {
      case 'nom':
        aValue = a.nom?.toLowerCase() || '';
        bValue = b.nom?.toLowerCase() || '';
        break;
      case 'prenom':
        aValue = a.prenom?.toLowerCase() || '';
        bValue = b.prenom?.toLowerCase() || '';
        break;
      case 'email':
        aValue = a.email?.toLowerCase() || '';
        bValue = b.email?.toLowerCase() || '';
        break;
      case 'companyName':
        aValue = getSocieteDisplay(a.companyName).toLowerCase();
        bValue = getSocieteDisplay(b.companyName).toLowerCase();
        break;
      case 'poste':
        aValue = getPosteDisplay(a.idExterneCrm).toLowerCase();
        bValue = getPosteDisplay(b.idExterneCrm).toLowerCase();
        break;
      case 'actif':
        aValue = a.actif;
        bValue = b.actif;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'ASC' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'ASC' ? 1 : -1;
    return 0;
  });

  // Composant pour l'indicateur de tri
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span style={{ marginLeft: '5px', opacity: 0.3 }}>↓</span>;
    }

    return (
      <span style={{ marginLeft: '5px' }}>
        {sortDirection === 'ASC' ? '↑' : '↓'}
      </span>
    );
  };

  // Style pour les en-têtes cliquables
  const headerStyle: React.CSSProperties = {
    padding: '15px',
    textAlign: 'left',
    borderBottom: '2px solid #e2e8f0',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    background: '#f8fafc',
    transition: 'background-color 0.2s ease'
  };

  const headerHoverStyle: React.CSSProperties = {
    backgroundColor: '#e2e8f0'
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '15px', overflow: 'hidden' }}>
      <thead>
        <tr>
          <th 
            style={headerStyle}
            onClick={() => handleSort('nom')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = headerHoverStyle.backgroundColor!;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = headerStyle.background!;
            }}
          >
            {t('users:lastName')}
            <SortIndicator field="nom" />
          </th>
          <th 
            style={headerStyle}
            onClick={() => handleSort('prenom')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = headerHoverStyle.backgroundColor!;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = headerStyle.background!;
            }}
          >
            {t('users:firstName')}
            <SortIndicator field="prenom" />
          </th>
          <th 
            style={headerStyle}
            onClick={() => handleSort('email')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = headerHoverStyle.backgroundColor!;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = headerStyle.background!;
            }}
          >
            {t('users:email')}
            <SortIndicator field="email" />
          </th>
          <th 
            style={headerStyle}
            onClick={() => handleSort('companyName')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = headerHoverStyle.backgroundColor!;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = headerStyle.background!;
            }}
          >
            {t('users:company')}
            <SortIndicator field="companyName" />
          </th>
          <th 
            style={headerStyle}
            onClick={() => handleSort('poste')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = headerHoverStyle.backgroundColor!;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = headerStyle.background!;
            }}
          >
            {t('users:position')}
            <SortIndicator field="poste" />
          </th>
          <th 
            style={headerStyle}
            onClick={() => handleSort('actif')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = headerHoverStyle.backgroundColor!;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = headerStyle.background!;
            }}
          >
            {t('common:status')}
            <SortIndicator field="actif" />
          </th>
          <th style={{ 
            padding: '15px', 
            textAlign: 'left', 
            borderBottom: '2px solid #e2e8f0',
            background: '#f8fafc'
          }}>
            {t('common:actions')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUtilisateurs.map((user) => (
          <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
            <td style={{ padding: '15px' }}>{user.nom}</td>
            <td style={{ padding: '15px' }}>{user.prenom}</td>
            <td style={{ padding: '15px' }}>{user.email}</td>
            <td style={{ padding: '15px' }}>{getSocieteDisplay(user.companyName)}</td>
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
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4db8d8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6dd5ed';
                }}
              >
                {t('users:viewDetails')}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}