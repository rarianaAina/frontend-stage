// components/utilisateurs/ModalDetailsUtilisateur.tsx
import { Utilisateur } from '../../types/utilisateur';

interface Props {
  utilisateur: Utilisateur | null;
  onClose: () => void;
}

export default function ModalDetailsUtilisateur({ utilisateur, onClose }: Props) {
  if (!utilisateur) return null;

  return (
    <div style={{ color: 'white' }}>
      <div style={{ marginBottom: '15px' }}>
        <strong>Nom :</strong> {utilisateur.nom}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Prénom(s) :</strong> {utilisateur.prenom}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Poste :</strong> {utilisateur.poste}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Société :</strong> {utilisateur.societe}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Date de création :</strong> {utilisateur.dateCreation}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Adresse email :</strong> {utilisateur.email}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Etat :</strong> {utilisateur.etat}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Ancienneté :</strong> {utilisateur.anciennete}
      </div>
      {utilisateur.telephone && (
        <div style={{ marginBottom: '15px' }}>
          <strong>Téléphone :</strong> {utilisateur.telephone}
        </div>
      )}
    </div>
  );
}