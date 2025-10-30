import React from 'react';
import { TicketRecent } from '../../../types/dashboard';

interface RecentTicketsProps {
  tickets?: TicketRecent[];
}

const getStatusColor = (statut: string) => {
  switch (statut.toLowerCase()) {
    case 'ouvert': return '#17a2b8';
    case 'en cours': return '#ffc107';
    case 'clôturé': return '#28a745';
    case 'en attente': return '#fd7e14';
    default: return '#6c757d';
  }
};

export const RecentTickets: React.FC<RecentTicketsProps> = ({ tickets }) => {
  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      maxHeight: '400px',
      overflow: 'auto'
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Tickets Récents
      </h3>
      {tickets && tickets.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Référence</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Titre</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Statut</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={index}>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{ticket.reference}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{ticket.titre}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      backgroundColor: getStatusColor(ticket.statut),
                      color: 'white'
                    }}>
                      {ticket.statut}
                    </span>
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                    {new Date(ticket.dateCreation).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#6c757d' }}>Aucun ticket récent</p>
      )}
    </div>
  );
};