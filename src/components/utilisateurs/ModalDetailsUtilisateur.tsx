import { Utilisateur } from '../../types/utilisateur';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

interface Props {
  utilisateur: Utilisateur | null;
  onClose: () => void;
}

export default function ModalDetailsUtilisateur({ utilisateur, onClose }: Props) {
  const { t } = useAppTranslation(['common', 'users']);

  if (!utilisateur) return null;

  return (
    <div style={{ color: 'white' }}>
      <div style={{ marginBottom: '15px' }}>
        <strong>{t('users:lastName')}:</strong> {utilisateur.nom}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>{t('users:firstName')}:</strong> {utilisateur.prenom}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>{t('users:position')}:</strong> {utilisateur.poste}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>{t('users:company')}:</strong> {utilisateur.societe}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>{t('users:creationDate')}:</strong> {utilisateur.dateCreation}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>{t('users:email')}:</strong> {utilisateur.email}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>{t('common:status')}:</strong> {utilisateur.etat}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>{t('users:seniority')}:</strong> {utilisateur.anciennete}
      </div>
      {utilisateur.telephone && (
        <div style={{ marginBottom: '15px' }}>
          <strong>{t('users:phone')}:</strong> {utilisateur.telephone}
        </div>
      )}
    </div>
  );
}