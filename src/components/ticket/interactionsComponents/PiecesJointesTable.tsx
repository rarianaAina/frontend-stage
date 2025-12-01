import { PieceJointe } from '../../../services/ticketServiceCH';
import { PieceJointeRow } from './PieceJointeRow';

interface PiecesJointesTableProps {
  piecesJointes: PieceJointe[];
}

export const PiecesJointesTable = ({ piecesJointes }: PiecesJointesTableProps) => {
  
  if (piecesJointes.length === 0) {
    return (
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic'
      }}>
        Aucune pièce jointe
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <TableHeader>Date</TableHeader>
            <TableHeader>Commentaires</TableHeader>
            <TableHeader>Fichier</TableHeader>
            <TableHeader center>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {piecesJointes.map((pj) => (
            <PieceJointeRow key={pj.id} pieceJointe={pj} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Composant TableHeader amélioré
const TableHeader = ({ 
  children, 
  center = false 
}: { 
  children: React.ReactNode;
  center?: boolean;
}) => (
  <th style={{ 
    padding: '12px', 
    textAlign: center ? 'center' : 'left', 
    borderBottom: '1px solid #dee2e6',
    fontSize: '14px',
    fontWeight: '600'
  }}>
    {children}
  </th>
);