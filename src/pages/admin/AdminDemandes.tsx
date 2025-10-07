import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';

export default function AdminDemandes() {
  const navigate = useNavigate();
  const [etat, setEtat] = useState('');
  const [reference, setReference] = useState('');
  const [produit, setProduit] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [societe, setSociete] = useState('');
  const [priorite, setPriorite] = useState('');

  const demandes = [
    {
      id: '1',
      reference: 'DEM-2025-001',
      societe: 'OPTIMADA',
      produit: 'Test',
      description: 'Problème de connexion base de données',
      niveau: 'Urgent',
      dateSubmission: '15/10/2025',
      etat: 'Nouveau',
      assigneTo: 'Non assigné'
    },
    {
      id: '2',
      reference: 'DEM-2025-002',
      societe: 'TechCorp',
      produit: 'Test1',
      description: 'Erreur lors de la génération de rapport',
      niveau: 'Moyenne',
      dateSubmission: '16/10/2025',
      etat: 'En attente',
      assigneTo: 'Alain RAKOTO'
    },
    {
      id: '3',
      reference: 'DEM-2025-003',
      societe: 'OPTIMADA',
      produit: 'Test2',
      description: 'Demande de nouvelle fonctionnalité',
      niveau: 'Bas',
      dateSubmission: '17/10/2025',
      etat: 'En cours',
      assigneTo: 'Andria ZILY'
    },
  ];

  const getStatusColor = (etat: string) => {
    switch (etat) {
      case 'Nouveau': return '#3b82f6';
      case 'En attente': return '#f59e0b';
      case 'En cours': return '#10b981';
      case 'Résolu': return '#6b7280';
      case 'Fermé': return '#000';
      default: return '#6b7280';
    }
  };

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case 'Urgent': return '#ef4444';
      case 'Moyenne': return '#f59e0b';
      case 'Bas': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="admin" />

      <div style={{ padding: '40px 60px' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#17a2b8',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>
          Gestion des Demandes
        </h1>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textDecoration: 'underline'
          }}>
            Filtres:
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Etat:
              </label>
              <select
                value={etat}
                onChange={(e) => setEtat(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="">Tous</option>
                <option value="Nouveau">Nouveau</option>
                <option value="En attente">En attente</option>
                <option value="En cours">En cours</option>
                <option value="Résolu">Résolu</option>
                <option value="Fermé">Fermé</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Référence:
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="DEM-2025-001"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Produit:
              </label>
              <input
                type="text"
                value={produit}
                onChange={(e) => setProduit(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Date début:
              </label>
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Date fin:
              </label>
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Société:
              </label>
              <input
                type="text"
                value={societe}
                onChange={(e) => setSociete(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Priorité:
              </label>
              <select
                value={priorite}
                onChange={(e) => setPriorite(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="">Toutes</option>
                <option value="Urgent">Urgent</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Bas">Bas</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '16px', color: '#666' }}>
            {demandes.length} demande(s) trouvée(s)
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Référence</th>
              <th>Société</th>
              <th>Produit</th>
              <th>Description</th>
              <th>Niveau</th>
              <th>Date de soumission</th>
              <th>Assigné à</th>
              <th>Etat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id}>
                <td style={{ fontWeight: '600', color: '#17a2b8' }}>
                  {demande.reference}
                </td>
                <td>{demande.societe}</td>
                <td>{demande.produit}</td>
                <td style={{ maxWidth: '200px' }}>{demande.description}</td>
                <td>
                  <span style={{
                    background: getNiveauColor(demande.niveau),
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {demande.niveau}
                  </span>
                </td>
                <td>
                  <span style={{
                    background: '#e5e5e5',
                    padding: '8px 16px',
                    borderRadius: '15px',
                    display: 'inline-block'
                  }}>
                    {demande.dateSubmission}
                  </span>
                </td>
                <td>{demande.assigneTo}</td>
                <td>
                  <span style={{
                    background: getStatusColor(demande.etat),
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {demande.etat}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/demande/${demande.id}`)}
                    style={{
                      background: '#6dd5ed',
                      color: 'white',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '30px'
        }}>
          <button style={{
            background: '#17a2b8',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer'
          }}>
            &lt;
          </button>
          <button style={{
            background: '#17a2b8',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            1
          </button>
          <button style={{
            background: '#a0e7f0',
            color: 'black',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer'
          }}>
            2
          </button>
          <button style={{
            background: '#17a2b8',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer'
          }}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
