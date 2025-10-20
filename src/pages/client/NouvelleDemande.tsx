import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { api } from '../../lib/api';

type Produit = {
  id: number;
  libelle: string;
  description?: string;
  actif: boolean;
};

type PrioriteTicket = {
  id: number;
  code: string;
  libelle: string;
}

export default function NouvelleDemande() {
  const navigate = useNavigate();
  const [raison, setRaison] = useState('');
  const [logiciel, setLogiciel] = useState('');
  const [description, setDescription] = useState('');
  const [niveau, setNiveau] = useState('');
  const [accepteConditions, setAccepteConditions] = useState(false);
  const [fichiers, setFichiers] = useState<FileList | null>(null);
  
  // États pour les produits
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loadingProduits, setLoadingProduits] = useState(true);
  const [errorProduits, setErrorProduits] = useState('');

  // Etats pour les priorites des tickets
  const [priorites, setPriorites] = useState<PrioriteTicket[]>([]);
  const [loadingPriorites, setLoadingPriorites] = useState(true);
  const [errorPriorites, setErrorPriorites] = useState('');

  // Charger les produits au montage du composant
  useEffect(() => {
    const chargerProduits = async () => {
      try {
        setLoadingProduits(true);
        setErrorProduits('');
        
        // Utiliser l'endpoint pour les produits actifs
        const response = await api.get('/produits/actifs');
        setProduits(response.data);
        
        console.log('Produits chargés:', response.data);
      } catch (err) {
        console.error('Erreur lors du chargement des produits:', err);
        setErrorProduits('Erreur lors du chargement des produits');
        
        // En cas d'erreur, essayer avec l'endpoint général
        try {
          const responseFallback = await api.get('/produits');
          setProduits(responseFallback.data);
          setErrorProduits('');
        } catch (fallbackErr) {
          console.error('Erreur avec le fallback:', fallbackErr);
          setErrorProduits('Impossible de charger la liste des produits');
        }
      } finally {
        setLoadingProduits(false);
      }
    };

    chargerProduits();
  }, []);

  // Chargement des priorites
  useEffect(() => {
    const fetchPriorites = async () => {
      try {
        setLoadingPriorites(true);
        setErrorPriorites('');
        const response = await api.get('/prioriteTickets');
        setPriorites(response.data);
      }
      catch (err) {
        console.error('Erreur lors du chargement des priorités:', err);
        setErrorPriorites('Erreur lors du chargement des priorités');
      }
      finally {
        setLoadingPriorites(false);
      }
    };

    fetchPriorites();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepteConditions) {
      alert('Vous devez accepter les conditions');
      return;
    }
    
    // Validation supplémentaire
    if (!logiciel) {
      alert('Veuillez sélectionner un produit');
      return;
    }
    
    console.log('Données du formulaire:', {
      raison,
      logiciel,
      description,
      niveau,
      fichiers: fichiers ? fichiers.length : 0
    });
    
    // Ici vous enverriez les données à votre API
    // await api.post('/tickets', { ... });
    
    navigate('/mes-demandes');
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

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333'
              }}>
                *Logiciel/Application :
              </label>
              <select
                value={logiciel}
                onChange={(e) => setLogiciel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '16px',
                  background: 'white'
                }}
                required
                disabled={loadingProduits}
              >
                <option value="">
                  {loadingProduits ? 'Chargement des produits...' : 'Liste déroulante des produits'}
                </option>
                
                {errorProduits ? (
                  <option value="" disabled>
                    Erreur de chargement
                  </option>
                ) : (
                  produits
                    .filter(produit => produit.actif) // Double sécurité
                    .map((produit) => (
                      <option key={produit.id} value={produit.id}>
                        {produit.libelle}
                      </option>
                    ))
                )}
              </select>
              
              {/* Messages d'état */}
              {loadingProduits && (
                <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  Chargement des produits...
                </p>
              )}
              
              {errorProduits && (
                <p style={{ fontSize: '14px', color: '#e53e3e', marginTop: '5px' }}>
                  {errorProduits}
                </p>
              )}
              
              {!loadingProduits && !errorProduits && produits.length === 0 && (
                <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  Aucun produit disponible
                </p>
              )}
            </div>

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

            
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333'
              }}>
                *Niveau de priorité :
              </label>
              <select
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '16px',
                  background: 'white'
                }}
                required
              >
                <option value="">
                  {loadingPriorites ? 'Chargement des priorités...' : 'Sélectionnez la priorité'}
                </option>
                {errorPriorites ? (
                  <option value="" disabled>
                    Erreur de chargement
                  </option>
                ) : (
                  priorites.map((priorite) => (
                    <option key={priorite.id} value={priorite.code}>
                      {priorite.libelle}
                    </option>
                  ))
                )}
              </select>
              {loadingPriorites && (
                <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  Chargement des priorités...
                </p>
              )}
              {errorPriorites && (
                <p style={{ fontSize: '14px', color: '#e53e3e', marginTop: '5px' }}>
                  {errorPriorites}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '600',
                color: '#333'
              }}>
                *Pièces jointes
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => setFichiers(e.target.files)}
                style={{
                  width: '100%',
                  padding: '12px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '14px',
                  background: 'white'
                }}
              />
              <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                (PDF, DOCX, JPEG - 20 Mo max)
              </p>
            </div>

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

            <button
              type="submit"
              style={{
                width: '100%',
                background: '#10b981',
                color: 'white',
                padding: '14px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              disabled={loadingProduits}
            >
              {loadingProduits ? 'Chargement...' : 'Soumettre'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}