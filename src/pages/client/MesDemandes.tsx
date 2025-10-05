import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import FilterBar from '../../components/FilterBar';

type Ticket = {
  id: string;
  reference: string;
  produit: string;
  description: string;
  niveau: string;
  dateSubmission: string;
  dateResolution: string;
  etat: string;
};

export default function MesDemandes() {
  const navigate = useNavigate();
  const [etat, setEtat] = useState('');
  const [reference, setReference] = useState('');
  const [produit, setProduit] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');

  const tickets: Ticket[] = [
    {
      id: '1',
      reference: 'ABC123',
      produit: 'Test',
      description: 'Test',
      niveau: 'Bas',
      dateSubmission: '15/09/2024',
      dateResolution: '',
      etat: 'En cours'
    },
    {
      id: '2',
      reference: 'ADG253',
      produit: 'Test1',
      description: 'Test1',
      niveau: 'Moyenne',
      dateSubmission: '16/09/2024',
      dateResolution: '',
      etat: 'En cours'
    },
    {
      id: '3',
      reference: 'ZDT452',
      produit: 'Test2',
      description: 'Test2',
      niveau: 'Critique',
      dateSubmission: '17/09/2024',
      dateResolution: '20/09/2024',
      etat: 'Clôturé'
    },
    {
      id: '4',
      reference: 'Élément 4',
      produit: 'Test3',
      description: 'Test3',
      niveau: 'Urgent',
      dateSubmission: '18/09/2024',
      dateResolution: '',
      etat: 'En cours'
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="client" />

      <div style={{ padding: '40px 60px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ fontSize: '42px', color: '#17a2b8', fontWeight: 'bold' }}>
            Mes demandes
          </h1>
          <Link
            to="/nouvelle-demande"
            style={{
              background: '#6dd5ed',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Nouvelle demande
          </Link>
        </div>

        <h3 style={{
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textDecoration: 'underline'
        }}>
          Filtres:
        </h3>

        <FilterBar
          filters={[
            { label: 'Etat:', value: etat, onChange: setEtat },
            { label: 'Référence ticket:', value: reference, onChange: setReference },
            { label: 'Produit:', value: produit, onChange: setProduit },
            { label: 'Date début:', value: dateDebut, onChange: setDateDebut, type: 'date' },
            { label: 'Date fin:', value: dateFin, onChange: setDateFin, type: 'date' },
          ]}
        />

        <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: '#e5e5e5' }}>
                <th style={{ padding: '16px', textAlign: 'left' }}>
                  Référence ticket <span style={{ color: '#3b82f6' }}>▼</span>
                </th>
                <th style={{ padding: '16px', textAlign: 'left' }}>
                  Produit <span style={{ color: '#3b82f6' }}>▼</span>
                </th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>
                  Niveau <span style={{ color: '#3b82f6' }}>▼</span>
                </th>
                <th style={{ padding: '16px', textAlign: 'left' }}>
                  Date de soumission <span style={{ color: '#3b82f6' }}>▼</span>
                </th>
                <th style={{ padding: '16px', textAlign: 'left' }}>
                  Date de résolution <span style={{ color: '#3b82f6' }}>▼</span>
                </th>
                <th style={{ padding: '16px', textAlign: 'left' }}>
                  Etat <span style={{ color: '#3b82f6' }}>▼</span>
                </th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '16px' }}>{ticket.reference}</td>
                  <td style={{ padding: '16px' }}>{ticket.produit}</td>
                  <td style={{ padding: '16px' }}>{ticket.description}</td>
                  <td style={{ padding: '16px' }}>{ticket.niveau}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      background: '#e5e5e5',
                      padding: '8px 16px',
                      borderRadius: '15px',
                      display: 'inline-block'
                    }}>
                      {ticket.dateSubmission}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    {ticket.dateResolution ? (
                      <span style={{
                        background: '#e5e5e5',
                        padding: '8px 16px',
                        borderRadius: '15px',
                        display: 'inline-block'
                      }}>
                        {ticket.dateResolution}
                      </span>
                    ) : (
                      <span style={{
                        background: '#e5e5e5',
                        padding: '8px 16px',
                        borderRadius: '15px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{ fontSize: '18px' }}>📅</span>
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px' }}>{ticket.etat}</td>
                  <td style={{ padding: '16px' }}>
                    <button
                      onClick={() => navigate(`/ticket/${ticket.id}`)}
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
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '30px',
          alignItems: 'center'
        }}>
          <button style={{
            background: '#17a2b8',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px'
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
            fontSize: '18px',
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
            cursor: 'pointer',
            fontSize: '18px'
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
            cursor: 'pointer',
            fontSize: '18px'
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
            cursor: 'pointer',
            fontSize: '18px'
          }}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
