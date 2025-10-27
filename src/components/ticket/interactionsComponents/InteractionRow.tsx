import { Interaction } from '../../../services/ticketServiceCH';
import { getInteractionColor } from '../utils/interactionUtils';

interface InteractionRowProps {
  interaction: Interaction;
}

export const InteractionRow = ({ interaction }: InteractionRowProps) => {
  return (
    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
      <TableCell>
        <TypeBadge type={interaction.typeInteractionLibelle} />
      </TableCell>
      <TableCell>
        {new Date(interaction.dateCreation).toLocaleDateString('fr-FR')}
      </TableCell>
      <TableCell maxWidth="200px">
        {interaction.message || '-'}
      </TableCell>
      <TableCell>
        <PieceJointeLink pieceJointe={interaction.pieceJointe} />
      </TableCell>
    </tr>
  );
};

// Composant TypeBadge réutilisable
const TypeBadge = ({ type }: { type?: string }) => (
  <span style={{
    background: getInteractionColor(type),
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  }}>
    {type || 'Non spécifié'}
  </span>
);

// Composant PieceJointeLink réutilisable
const PieceJointeLink = ({ pieceJointe }: { pieceJointe?: string }) => {
  if (!pieceJointe) return <span>-</span>;

  return (
    <a 
      href={`/api/pieces-jointes/${pieceJointe}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#17a2b8',
        textDecoration: 'none',
        fontWeight: '500'
      }}
    >
      📎 {pieceJointe}
    </a>
  );
};

// Composant TableCell réutilisable
const TableCell = ({ 
  children, 
  maxWidth 
}: { 
  children: React.ReactNode;
  maxWidth?: string;
}) => (
  <td style={{ 
    padding: '12px',
    fontSize: '14px',
    color: '#666',
    maxWidth: maxWidth,
    wordBreak: 'break-word'
  }}>
    {children}
  </td>
);