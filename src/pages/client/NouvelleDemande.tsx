// pages/NouvelleDemande.tsx
import { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useNouvelleDemande } from '../../hooks/demandes/useNouvelleDemande';
import { SelectProduit } from '../../components/formsDemande/SelectProduit';
import { SelectPriorite } from '../../components/formsDemande/SelectPriorite';
import { InputFichiers } from '../../components/formsDemande/InputFichiers';


export default function NouvelleDemande() {
  const [raison, setRaison] = useState('');
  const [logiciel, setLogiciel] = useState('');
  const [description, setDescription] = useState('');
  const [niveau, setNiveau] = useState('');
  const [accepteConditions, setAccepteConditions] = useState(false);
  const [fichiers, setFichiers] = useState<FileList | null>(null);
  
  const { soumettreDemande, loading } = useNouvelleDemande();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await soumettreDemande({
        raison,
        logiciel,
        description,
        niveau,
        fichiers
      }, accepteConditions);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="client" />

      <div style={{
        padding: '40px 60px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(200, 240, 180, 0.7)',
          padding: '50px',
          borderRadius: '30px',
          maxWidth: '700px',
          width: '100%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '36px',
            color: '#17a2b8',
            marginBottom: '40px',
            fontWeight: 'bold'
          }}>
            Nouvelle demande
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Raison */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333'
              }}>
                *Raison :
              </label>
              <input
                type="text"
                value={raison}
                onChange={(e) => setRaison(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '16px'
                }}
                required
              />
            </div>

            {/* Produit */}
            <SelectProduit 
              value={logiciel}
              onChange={setLogiciel}
              required
            />

            {/* Description */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333'
              }}>
                *Description :
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '16px',
                  minHeight: '120px',
                  resize: 'vertical'
                }}
                required
              />
            </div>

            {/* Priorité */}
            <SelectPriorite 
              value={niveau}
              onChange={setNiveau}
              required
            />

            {/* Fichiers */}
            <InputFichiers onChange={setFichiers} />

            {/* Conditions */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={accepteConditions}
                  onChange={(e) => setAccepteConditions(e.target.checked)}
                  style={{
                    marginTop: '4px',
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                  required
                />
                <span style={{ fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
                  J'accepte les termes de la{' '}
                  <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                    Politique de confidentialité
                  </a>{' '}
                  et autorise que mes données personnelles soient traitées dans
                  la mesure nécessaire à mon abonnement
                </span>
              </label>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              style={{
                width: '100%',
                background: loading ? '#9ca3af' : '#10b981',
                color: 'white',
                padding: '14px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '18px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              disabled={loading}
            >
              {loading ? 'Soumission en cours...' : 'Soumettre'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}