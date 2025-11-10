import { Interaction, PieceJointe, Solution } from '../../services/ticketServiceCH';
import { InteractionsTable } from '../ticket/interactionsComponents/InteractionsTable';
import { PiecesJointesTable } from '../ticket/interactionsComponents/PiecesJointesTable';

interface InteractionsPJProps {
  interactions?: Interaction[];
  piecesJointes?: PieceJointe[];
  solutions?: Solution[];
  onNouvelleInteraction?: () => void;
}

export const InteractionsPJ = ({ 
  interactions = [],
  piecesJointes = [],
  solutions = [],
  onNouvelleInteraction
}: InteractionsPJProps) => {
  
  const safeInteractions = Array.isArray(interactions) ? interactions : [];
  const safePiecesJointes = Array.isArray(piecesJointes) ? piecesJointes : [];
  const safeSolutions = Array.isArray(solutions) ? solutions : [];
  
  console.log('Interactions reçues:', safeInteractions);
  console.log('Pièces jointes reçues:', safePiecesJointes);
  console.log('Solutions reçues:', safeSolutions); // Ajout du log pour les solutions

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px'
    }}>
      {/* Colonne Interactions */}
      <div>
        <h3 style={{
          textAlign: 'center',
          fontSize: '24px',
          color: '#17a2b8',
          marginBottom: '20px'
        }}>
          Interactions
        </h3>
        
        <InteractionsTable 
          interactions={safeInteractions}
          solutions={safeSolutions} // ⬅️ AJOUT IMPORTANT : passage des solutions
          onNouvelleInteraction={onNouvelleInteraction}
        />
      </div>

      {/* Colonne Pièces Jointes */}
      <div>
        <h3 style={{
          textAlign: 'center',
          fontSize: '24px',
          color: '#17a2b8',
          marginBottom: '20px'
        }}>
          Pièces jointes
        </h3>
        
        <PiecesJointesTable piecesJointes={safePiecesJointes} />
      </div>
    </div>
  );
};