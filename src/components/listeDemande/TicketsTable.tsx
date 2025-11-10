import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Ticket } from '../../types/ticket';
import { DescriptionAvecVoirPlus } from './DescriptionAvecVoirPlus';
import { getPrioriteText, getCouleurPriorite, getStatutText, getCouleurStatut } from '../../utils/ticketUtils';

interface TicketsTableProps {
  tickets: Ticket[];
  loading: boolean;
}

type SortField = 'reference' | 'produitNom' | 'prioriteTicketId' | 'dateCreation' | 'dateCloture' | 'etat';
type SortDirection = 'asc' | 'desc';

export const TicketsTable = ({ tickets, loading }: TicketsTableProps) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('dateCreation');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedTickets = useMemo(() => {
    const sorted = [...tickets];
    
    sorted.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Gestion des valeurs nulles ou undefined
      if (aValue == null) aValue = '';
      if (bValue == null) bValue = '';

      // Tri spécifique pour les priorités (numérique)
      if (sortField === 'prioriteTicketId') {
        aValue = a.prioriteTicketId;
        bValue = b.prioriteTicketId;
      }

      // Tri spécifique pour les dates
      if (sortField === 'dateCreation' || sortField === 'dateCloture') {
        aValue = aValue ? new Date(aValue).getTime() : 0;
        bValue = bValue ? new Date(bValue).getTime() : 0;
      }

      // Tri spécifique pour les états (texte)
      if (sortField === 'etat') {
        aValue = getStatutText(aValue);
        bValue = getStatutText(bValue);
      }

      // Comparaison
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [tickets, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Inverser la direction si même champ
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Nouveau champ, direction par défaut
      setSortField(field);
      setSortDirection('asc');
    }
  };

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
            <th 
              style={{ padding: '8px 12px', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => handleSort('reference')}
            >
              Référence ticket
            </th>
            <th 
              style={{ padding: '8px 12px', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => handleSort('produitNom')}
            >
              Produit
            </th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>Description</th>
            <th 
              style={{ padding: '8px 12px', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => handleSort('prioriteTicketId')}
            >
              Niveau
            </th>
            <th 
              style={{ padding: '8px 12px', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => handleSort('dateCreation')}
            >
              Date de soumission
            </th>
            <th 
              style={{ padding: '8px 12px', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => handleSort('dateCloture')}
            >
              Date de clôture
            </th>
            <th 
              style={{ padding: '8px 12px', textAlign: 'left', cursor: 'pointer' }}
              onClick={() => handleSort('etat')}
            >
              Etat
            </th>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTickets.map((ticket) => (
            <tr key={ticket.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px 12px' }}>{ticket.reference}</td>
              <td style={{ padding: '8px 12px' }}>{ticket.produitNom}</td>
              <td style={{ 
                padding: '8px 12px', 
                maxWidth: '300px',
                minWidth: '200px'
              }}>
                <DescriptionAvecVoirPlus 
                  description={ticket.description} 
                  maxLength={80} 
                />
              </td>
              <td style={{ padding: '8px 12px' }}>
                <span style={{
                  background: getCouleurPriorite(ticket.prioriteTicketId),
                  color: 'white',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  display: 'inline-block',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {getPrioriteText(ticket.prioriteTicketId)}
                </span>
              </td>
              <td style={{ padding: '8px 12px' }}>
                <span style={{
                  background: '#e5e5e5',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  display: 'inline-block',
                  fontSize: '14px'
                }}>
                  {ticket.dateCreation}
                </span>
              </td>
              <td style={{ padding: '8px 12px' }}>
                {ticket.dateCloture ? (
                  <span style={{
                    background: '#e5e5e5',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    display: 'inline-block',
                    fontSize: '14px'
                  }}>
                    {ticket.dateCloture}
                  </span>
                ) : (
                  <span style={{
                    background: '#e5e5e5',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '14px'
                  }}>
                    <span style={{ fontSize: '14px' }}>📅</span>
                  </span>
                )}
              </td>
              <td style={{ padding: '8px 12px' }}>
                <span style={{
                  background: getCouleurStatut(ticket.etat),
                  color: 'white',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  display: 'inline-block',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {getStatutText(ticket.etat)}
                </span>
              </td>
              <td style={{ padding: '8px 12px' }}>
                <button
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                  style={{
                    background: '#6dd5ed',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
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