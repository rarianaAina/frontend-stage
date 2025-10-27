import { Interaction } from '../../../services/ticketServiceCH';
import { InteractionRow } from './InteractionRow';
import { getInteractionColor } from '../utils/interactionUtils';

interface InteractionsTableProps {
  interactions: Interaction[];
  onNouvelleInteraction?: () => void;
}

export const InteractionsTable = ({ 
  interactions, 
  onNouvelleInteraction 
}: InteractionsTableProps) => {
  
  if (interactions.length === 0) {
    return (
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic'
      }}>
        Aucune interaction
      </div>
    );
  }

  return (
    <div>
      <div style={{
        background: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <TableHeader>Type</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Commentaires</TableHeader>
              <TableHeader>PJ</TableHeader>
            </tr>
          </thead>
          <tbody>
            {interactions.map((interaction) => (
              <InteractionRow 
                key={interaction.id} 
                interaction={interaction} 
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Bouton Nouvelle Interaction
      {onNouvelleInteraction && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onNouvelleInteraction}
            style={{
              background: '#17a2b8',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#138496';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#17a2b8';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '18px' }}>+</span>
            Nouvelle Interaction
          </button>
        </div>
      )} */}
    </div>
  );
};

// Composant TableHeader réutilisable
const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th style={{ 
    padding: '12px', 
    textAlign: 'left', 
    borderBottom: '1px solid #dee2e6',
    fontSize: '14px',
    fontWeight: '600'
  }}>
    {children}
  </th>
);