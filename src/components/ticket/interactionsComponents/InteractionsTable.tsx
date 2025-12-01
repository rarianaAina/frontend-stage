import { useState } from 'react';
import { Interaction } from '../../../services/ticketServiceCH';
import { InteractionRow } from './InteractionRow';
import { SolutionRow } from './SolutionRow';
import { getInteractionColor } from '../utils/interactionUtils';
import { Solution } from '../../../types/solution/solution';
import ModalDetailsSolution from './ModalDetailsSolution'; // Import du modal

interface InteractionsTableProps {
  interactions: Interaction[];
  solutions?: Solution[];
  onNouvelleInteraction?: () => void;
}

export const InteractionsTable = ({ 
  interactions, 
  solutions = [],
  onNouvelleInteraction 
}: InteractionsTableProps) => {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  
  // Fonction pour ouvrir le modal
  const handleVoirDetailsSolution = (solution: Solution) => {
    setSelectedSolution(solution);
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setSelectedSolution(null);
  };

  // Combiner interactions et solutions pour l'affichage
  const allElements = [
    ...interactions.map(interaction => ({ 
      ...interaction, 
      type: 'interaction' 
    })),
    ...solutions.map(solution => ({ 
      ...solution, 
      type: 'solution',
      typeInteractionLibelle: 'Solution',
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
      {/* Modal pour les détails de la solution */}
      {selectedSolution && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#2d3748',
            padding: '30px',
            borderRadius: '15px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: 'white', margin: 0 }}>Détails de la solution</h3>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
            <ModalDetailsSolution 
              solution={selectedSolution} 
              onClose={handleCloseModal} 
            />
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button
                onClick={handleCloseModal}
                style={{
                  background: '#6dd5ed',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tableau des interactions et solutions */}
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
              <TableHeader>PJ</TableHeader>
              <TableHeader>Actions</TableHeader>
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
                  onVoirDetails={handleVoirDetailsSolution} // Passez la fonction
                />
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Composant TableHeader (inchangé)
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