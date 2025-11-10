// SolutionRow.tsx
import { Solution } from '../../../services/ticketServiceCH';

interface SolutionRowProps {
  solution: Solution;
}

export const SolutionRow = ({ solution }: SolutionRowProps) => {
  return (
    <tr style={{ 
      borderBottom: '1px solid #f0f0f0',
      background: '#f8f9fa' // Fond légèrement différent pour les solutions
    }}>
      <TableCell>
        <TypeBadge type="Solution" />
      </TableCell>
      <TableCell>
        {new Date(solution.dateCreation).toLocaleDateString('fr-FR')}
      </TableCell>
      <TableCell maxWidth="300px">
        <div>
          {/* <div style={{ fontWeight: '600', marginBottom: '4px' }}>
            {solution.titre}
          </div> */}
          <div style={{ fontSize: '13px', color: '#666' }}>
            {solution.description}
          </div>
        </div>
      </TableCell>
      <TableCell>
        {/* Les solutions n'ont pas de PJ pour l'instant */}
        <span style={{ color: '#999' }}>-</span>
      </TableCell>
    </tr>
  );
};

// Composants réutilisables depuis InteractionRow
const TypeBadge = ({ type }: { type: string }) => (
  <span style={{
    background: getSolutionColor(type),
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  }}>
    {type}
  </span>
);

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

// Fonction pour la couleur des solutions
const getSolutionColor = (type: string) => {
  if (type === 'Solution') return '#28a745'; // Vert pour les solutions
  return '#6c757d'; // Gris par défaut
};