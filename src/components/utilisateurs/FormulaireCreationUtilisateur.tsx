// components/utilisateurs/FormulaireCreationUtilisateur.tsx
import { useState } from 'react';
import { NouvelUtilisateur } from '../../types/utilisateur';

interface Props {
  onSubmit: (utilisateur: NouvelUtilisateur) => void;
  onCancel: () => void;
}

export default function FormulaireCreationUtilisateur({ onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<NouvelUtilisateur>({
    identifiant: '',
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    companyId: 896,
    actif: 1,
    idExterneCrm: '12345'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (champ: keyof NouvelUtilisateur, valeur: string) => {
    setFormData(prev => ({
      ...prev,
      [champ]: valeur
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Identifiant :</label>
        <input
          type="text"
          value={formData.identifiant}
          onChange={(e) => handleChange('identifiant', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
          required
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Nom :</label>
        <input
          type="text"
          value={formData.nom}
          onChange={(e) => handleChange('nom', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
          required
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Prénom(s) :</label>
        <input
          type="text"
          value={formData.prenom}
          onChange={(e) => handleChange('prenom', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
          required
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Email :</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
          required
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Mot de passe :</label>
        <input
          type="password"
          value={formData.motDePasse}
          onChange={(e) => handleChange('motDePasse', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
          required
        />
      </div>
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Téléphone :</label>
        <input
          type="tel"
          value={formData.telephone}
          onChange={(e) => handleChange('telephone', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
          required
        />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            background: '#6b7280',
            color: 'white',
            padding: '12px',
            borderRadius: '25px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          Annuler
        </button>
        <button
          type="submit"
          style={{
            flex: 1,
            background: '#10b981',
            color: 'white',
            padding: '12px',
            borderRadius: '25px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          Créer l'utilisateur
        </button>
      </div>
    </form>
  );
}