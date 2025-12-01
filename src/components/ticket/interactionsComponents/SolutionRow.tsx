import { Solution } from '../../../types/solution/solution';

interface SolutionRowProps {
  solution: Solution;
  onVoirDetails: (solution: Solution) => void;
}

export const SolutionRow = ({ solution, onVoirDetails }: SolutionRowProps) => {
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
      <TableCell>
        <button 
          className="btn-primary"
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            background: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
          onClick={() => onVoirDetails(solution)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#138496';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#17a2b8';
          }}
        >
          Détails
        </button>
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