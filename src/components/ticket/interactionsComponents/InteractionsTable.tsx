import { Interaction, Solution } from '../../../services/ticketServiceCH';
import { InteractionRow } from './InteractionRow';
import { SolutionRow } from './SolutionRow'; // Nouveau composant
import { getInteractionColor } from '../utils/interactionUtils';

interface InteractionsTableProps {
  interactions: Interaction[];
  solutions?: Solution[]; // Ajout des solutions
  onNouvelleInteraction?: () => void;
}

export const InteractionsTable = ({ 
  interactions, 
  solutions = [], // Valeur par défaut
  onNouvelleInteraction 
}: InteractionsTableProps) => {
  
  // Combiner interactions et solutions pour l'affichage
  const allElements = [
    ...interactions.map(interaction => ({ 
      ...interaction, 
      type: 'interaction' 
    })),
    ...solutions.map(solution => ({ 
      ...solution, 
      type: 'solution',
      typeInteractionLibelle: 'Solution', // Forcer le type pour le badge
      dateCreation: solution.dateCreation,
      message: solution.description || solution.titre
    }))
  ].sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime());

  if (allElements.length === 0) {
    return (
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic'
      }}>
        Aucune interaction ou solution
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
              <TableHeader>Contenu</TableHeader>
              {/* <TableHeader>Zone/Statut</TableHeader> */}
              <TableHeader>PJ</TableHeader>
            </tr>
          </thead>
          <tbody>
            {allElements.map((element) => (
              element.type === 'interaction' ? (
                <InteractionRow 
                  key={`interaction-${element.id}`} 
                  interaction={element as Interaction} 
                />
              ) : (
                <SolutionRow 
                  key={`solution-${element.id}`} 
                  solution={element as Solution} 
                />
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Composant TableHeader réutilisable (inchangé)
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