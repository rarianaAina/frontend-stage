import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import FilterBar from '../../components/FilterBar';

export default function ConsultantTickets() {
  const navigate = useNavigate();
  const [etat, setEtat] = useState('');
  const [reference, setReference] = useState('');
  const [produit, setProduit] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [societe, setSociete] = useState('');
  const [consultant, setConsultant] = useState('');

  const tickets = [
    {
      id: '1',
      societe: 'OPTIMADA',
      affecteeA: 'Alain RAKOTO',
      produit: 'Test',
      description: 'Test',
      niveau: 'Bas',
      dateSubmission: '15/09/2025',
      etat: 'En cours'
    },
    {
      id: '2',
      societe: 'OPTIMADA',
      affecteeA: 'Andria ZILY',
      produit: 'Test1',
      description: 'Test1',
      niveau: 'Moyenne',
      dateSubmission: '16/09/2025',
      etat: 'Résolu'
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="consultant" />

      <div style={{ padding: '40px 60px' }}>
        <h1 style={{ fontSize: '42px', color: '#17a2b8', marginBottom: '30px', fontWeight: 'bold' }}>
          Mes tickets
        </h1>

        <h3 style={{
          textAlign: 'center',
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
          marginBottom: '30px',
          background: 'white',
          padding: '30px',
          borderRadius: '15px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Etat:</label>
            <input
              type="text"
              value={etat}
              onChange={(e) => setEtat(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Référence ticket:</label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Produit:</label>
            <input
              type="text"
              value={produit}
              onChange={(e) => setProduit(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Date début:</label>
            <input
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Date fin:</label>
            <input
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Société:</label>
            <input
              type="text"
              value={societe}
              onChange={(e) => setSociete(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Consultant:</label>
            <input
              type="text"
              value={consultant}
              onChange={(e) => setConsultant(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Société <span style={{ color: '#3b82f6' }}>▼</span></th>
              <th>Affectée à <span style={{ color: '#3b82f6' }}>▼</span></th>
              <th>Produit <span style={{ color: '#3b82f6' }}>▼</span></th>
              <th>Description</th>
              <th>Niveau</th>
              <th>Date de soumission <span style={{ color: '#3b82f6' }}>▼</span></th>
              <th>Etat <span style={{ color: '#3b82f6' }}>▼</span></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.societe}</td>
                <td>{ticket.affecteeA}</td>
                <td>{ticket.produit}</td>
                <td>{ticket.description}</td>
                <td>{ticket.niveau}</td>
                <td>
                  <span style={{
                    background: '#e5e5e5',
                    padding: '8px 16px',
                    borderRadius: '15px',
                    display: 'inline-block'
                  }}>
                    {ticket.dateSubmission}
                  </span>
                </td>
                <td>{ticket.etat}</td>
                <td>
                  <button
                    onClick={() => navigate(`/consultant/ticket/${ticket.id}`)}
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
            background: '#a0e7f0',
            color: 'black',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer'
          }}>
            3
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
