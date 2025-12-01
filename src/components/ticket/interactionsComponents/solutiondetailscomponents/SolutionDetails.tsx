import { Solution } from '../../../../types/solution/solution';

interface Props {
  solution: Solution;
}

export default function SolutionDetails({ solution }: Props) {
  // Fonction pour obtenir le badge du statut
  const getStatutBadge = (statut: string) => {
    const statuts: { [key: string]: { color: string; bgColor: string } } = {
      'NotPublished': { color: '#d69e2e', bgColor: '#fefcbf' },
      'Published': { color: '#38a169', bgColor: '#c6f6d5' },
      'Draft': { color: '#718096', bgColor: '#edf2f7' },
      'Approved': { color: '#38a169', bgColor: '#c6f6d5' },
      'Rejected': { color: '#e53e3e', bgColor: '#fed7d7' }
    };
    
    const style = statuts[statut] || { color: '#718096', bgColor: '#edf2f7' };
    
    return (
      <span style={{
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        color: style.color,
        backgroundColor: style.bgColor
      }}>
        {statut}
      </span>
    );
  };

  // Fonction pour obtenir le badge de l'étape
  const getEtapeBadge = (etape: string) => {
    return (
      <span style={{
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        color: '#2b6cb0',
        backgroundColor: '#bee3f8'
      }}>
        {etape}
      </span>
    );
  };

  return (
    <div>
      {/* Informations générales */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <InfoCard label="Référence" value={solution.reference} />
      </div>

      {/* Statut et Étape */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginBottom: '20px'
      }}>
        
      </div>

      {/* Détails de la solution */}
      <InfoCard 
        label="Titre" 
        value={solution.titre} 
        fullWidth 
        style={{ marginBottom: '20px' }}
      />
      
      <InfoCard 
        label="Description" 
        value={solution.description} 
        fullWidth 
        style={{ marginBottom: '20px' }}
      />

      {/* Dates */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <InfoCard 
          label="Date création" 
          value={new Date(solution.dateCreation).toLocaleDateString('fr-FR')} 
        />
        
        <InfoCard 
          label="Date mise à jour" 
          value={new Date(solution.dateMiseAJour).toLocaleDateString('fr-FR')} 
        />
      </div>

      {/* État de clôture */}
      {solution.cloture && (
        <div style={{ 
          padding: '15px',
          background: '#2d3748',
          borderRadius: '8px',
          border: '2px solid #48bb78',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <strong style={{ color: '#48bb78' }}>
            ✅ Ticket clôturé le {solution.dateCloture ? 
              new Date(solution.dateCloture).toLocaleDateString('fr-FR') : 'N/A'}
          </strong>
        </div>
      )}
    </div>
  );
}

// Component InfoCard réutilisable
const InfoCard = ({ 
  label, 
  value, 
  fullWidth = false,
  style = {}
}: { 
  label: string; 
  value: string; 
  fullWidth?: boolean;
  style?: React.CSSProperties;
}) => (
  <div style={{ 
    padding: '15px',
    background: '#4a5568',
    borderRadius: '8px',
    gridColumn: fullWidth ? '1 / -1' : 'auto',
    ...style
  }}>
    <strong style={{ display: 'block', marginBottom: '5px' }}>
      {label}:
    </strong>
    <span>{value}</span>
  </div>
);