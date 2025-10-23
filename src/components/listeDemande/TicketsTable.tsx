import { useNavigate } from 'react-router-dom';
import { Ticket } from '../../types/ticket';
import { DescriptionAvecVoirPlus } from './DescriptionAvecVoirPlus';
import { getPrioriteText, getCouleurPriorite, getStatutText, getCouleurStatut } from '../../utils/ticketUtils';

interface TicketsTableProps {
  tickets: Ticket[];
  loading: boolean;
}

export const TicketsTable = ({ tickets, loading }: TicketsTableProps) => {
  const navigate = useNavigate();

  if (loading) {
    return <div style={{ textAlign: 'center', margin: '40px' }}>Chargement...</div>;
  }

  if (tickets.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        margin: '40px',
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}>
        Aucun ticket trouvé
      </div>
    );
  }

  return (
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
              Date de clôture <span style={{ color: '#3b82f6' }}>▼</span>
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
              <td style={{ padding: '16px' }}>{ticket.produitNom}</td>
              <td style={{ 
                padding: '16px', 
                maxWidth: '300px',
                minWidth: '200px'
              }}>
                <DescriptionAvecVoirPlus 
                  description={ticket.description} 
                  maxLength={80} 
                />
              </td>
              <td style={{ padding: '16px' }}>
                <span style={{
                  background: getCouleurPriorite(ticket.prioriteTicketId),
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  display: 'inline-block',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {getPrioriteText(ticket.prioriteTicketId)}
                </span>
              </td>
              <td style={{ padding: '16px' }}>
                <span style={{
                  background: '#e5e5e5',
                  padding: '8px 16px',
                  borderRadius: '15px',
                  display: 'inline-block'
                }}>
                  {ticket.dateCreation}
                </span>
              </td>
              <td style={{ padding: '16px' }}>
                {ticket.dateCloture ? (
                  <span style={{
                    background: '#e5e5e5',
                    padding: '8px 16px',
                    borderRadius: '15px',
                    display: 'inline-block'
                  }}>
                    {ticket.dateCloture}
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
              <td style={{ padding: '16px' }}>
                <span style={{
                  background: getCouleurStatut(ticket.etat),
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  display: 'inline-block',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {getStatutText(ticket.etat)}
                </span>
              </td>
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
  );
};