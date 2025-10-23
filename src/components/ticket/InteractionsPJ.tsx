import { Interaction, PieceJointe } from '../../services/ticketService';

interface InteractionsPJProps {
  interactions: Interaction[];
  piecesJointes: PieceJointe[];
}

export const InteractionsPJ = ({ interactions, piecesJointes }: InteractionsPJProps) => {
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
        
        {interactions.length === 0 ? (
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
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #dee2e6',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Type
                  </th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #dee2e6',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Date
                  </th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #dee2e6',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Commentaires
                  </th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #dee2e6',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    PJ
                  </th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'center', 
                    borderBottom: '1px solid #dee2e6',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {interactions.map((interaction) => (
                  <tr key={interaction.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ 
                      padding: '12px',
                      fontSize: '14px'
                    }}>
                      <span style={{
                        background: getInteractionColor(interaction.type),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {interaction.type}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '12px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      {new Date(interaction.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td style={{ 
                      padding: '12px',
                      fontSize: '14px',
                      maxWidth: '200px',
                      wordBreak: 'break-word'
                    }}>
                      {interaction.commentaires || '-'}
                    </td>
                    <td style={{ 
                      padding: '12px',
                      fontSize: '14px'
                    }}>
                      {interaction.pieceJointe ? (
                        <a 
                          href={`/api/pieces-jointes/${interaction.pieceJointe}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#17a2b8',
                            textDecoration: 'none',
                            fontWeight: '500'
                          }}
                        >
                          📎 {interaction.pieceJointe}
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td style={{ 
                      padding: '12px',
                      textAlign: 'center'
                    }}>
                      {interaction.type === 'Reponse' && (
                        <button 
                          className="btn-primary"
                          style={{
                            padding: '6px 12px',
                            fontSize: '12px'
                          }}
                        >
                          Répondre
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
        
        {piecesJointes.length === 0 ? (
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
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #dee2e6',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Date
                  </th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #dee2e6',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Fichier
                  </th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'center', 
                    borderBottom: '1px solid #dee2e6',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {piecesJointes.map((pj) => (
                  <tr key={pj.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ 
                      padding: '12px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      {new Date(pj.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td style={{ 
                      padding: '12px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      <a 
                        href={`/api/pieces-jointes/${pj.nomFichier}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#17a2b8',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <span style={{ fontSize: '16px' }}>📎</span>
                        {pj.nomFichier}
                      </a>
                    </td>
                    <td style={{ 
                      padding: '12px',
                      textAlign: 'center'
                    }}>
                      <button 
                        className="btn-primary"
                        style={{
                          padding: '6px 12px',
                          fontSize: '12px'
                        }}
                        onClick={() => {
                          // Télécharger le fichier
                          const link = document.createElement('a');
                          link.href = `/api/pieces-jointes/${pj.nomFichier}`;
                          link.download = pj.nomFichier;
                          link.click();
                        }}
                      >
                        Télécharger
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Fonction utilitaire pour les couleurs des types d'interaction
const getInteractionColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'relance':
      return '#f59e0b'; // Orange
    case 'reponse':
      return '#10b981'; // Vert
    case 'question':
      return '#3b82f6'; // Bleu
    case 'information':
      return '#8b5cf6'; // Violet
    case 'urgence':
      return '#ef4444'; // Rouge
    default:
      return '#6b7280'; // Gris
  }
};