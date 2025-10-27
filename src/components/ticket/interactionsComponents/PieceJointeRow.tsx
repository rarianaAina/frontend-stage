import { PieceJointe } from '../../../services/ticketServiceCH';

interface PieceJointeRowProps {
  pieceJointe: PieceJointe;
}

export const PieceJointeRow = ({ pieceJointe }: PieceJointeRowProps) => {
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `/api/pieces-jointes/${pieceJointe.nomFichier}`;
    link.download = pieceJointe.nomFichier;
    link.click();
  };

  return (
    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
      <TableCell>
        {new Date(pieceJointe.date).toLocaleDateString('fr-FR')}
      </TableCell>
      <TableCell>
        <a 
          href={`/api/pieces-jointes/${pieceJointe.nomFichier}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#17a2b8',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '500'
          }}
        >
          <span style={{ fontSize: '16px' }}>📎</span>
          {pieceJointe.nomFichier}
        </a>
      </TableCell>
      <TableCell center>
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
          onClick={handleDownload}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#138496';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#17a2b8';
          }}
        >
          Télécharger
        </button>
      </TableCell>
    </tr>
  );
};

// Composant TableCell réutilisable
const TableCell = ({ 
  children, 
  center = false 
}: { 
  children: React.ReactNode;
  center?: boolean;
}) => (
  <td style={{ 
    padding: '12px',
    fontSize: '14px',
    color: '#666',
    textAlign: center ? 'center' : 'left'
  }}>
    {children}
  </td>
);