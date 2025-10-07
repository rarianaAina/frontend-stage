import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';

export default function ConsultantInterventions() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');

  const interventions = [
    {
      id: '1',
      reference: 'INT-2025-001',
      client: 'OPTIMADA',
      produit: 'Test',
      type: 'Sur site',
      dateDebut: '20/10/2025',
      dateFin: '22/10/2025',
      statut: 'Planifiée',
      duree: '16h',
      description: 'Installation et configuration du système'
    },
    {
      id: '2',
      reference: 'INT-2025-005',
      client: 'TechCorp',
      produit: 'Test1',
      type: 'À distance',
      dateDebut: '18/10/2025',
      dateFin: '18/10/2025',
      statut: 'En cours',
      duree: '4h',
      description: 'Support technique urgent'
    },
    {
      id: '3',
      reference: 'INT-2025-003',
      client: 'OPTIMADA',
      produit: 'Test2',
      type: 'Sur site',
      dateDebut: '15/10/2025',
      dateFin: '16/10/2025',
      statut: 'Terminée',
      duree: '12h',
      description: 'Formation des utilisateurs'
    },
  ];

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Planifiée': return '#3b82f6';
      case 'En cours': return '#f59e0b';
      case 'Terminée': return '#10b981';
      case 'Annulée': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="consultant" />

      <div style={{ padding: '40px 60px' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#17a2b8',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>
          Mes Interventions
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
                Statut:
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="">Toutes</option>
                <option value="Planifiée">Planifiée</option>
                <option value="En cours">En cours</option>
                <option value="Terminée">Terminée</option>
                <option value="Annulée">Annulée</option>
              </select>
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
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '16px', color: '#666' }}>
            {interventions.length} intervention(s) trouvée(s)
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Référence</th>
              <th>Client</th>
              <th>Produit</th>
              <th>Type</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Durée</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interventions.map((intervention) => (
              <tr key={intervention.id}>
                <td style={{ fontWeight: '600', color: '#17a2b8' }}>
                  {intervention.reference}
                </td>
                <td>{intervention.client}</td>
                <td>{intervention.produit}</td>
                <td>
                  <span style={{
                    background: intervention.type === 'Sur site' ? '#fef3c7' : '#dbeafe',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '13px'
                  }}>
                    {intervention.type}
                  </span>
                </td>
                <td>{intervention.dateDebut}</td>
                <td>{intervention.dateFin}</td>
                <td>{intervention.duree}</td>
                <td>
                  <span style={{
                    background: getStatusColor(intervention.statut),
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {intervention.statut}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/consultant/intervention/${intervention.id}`)}
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
