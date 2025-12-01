import { useState } from 'react';
import { Solution } from '../../../../types/solution/solution';
import { useAppTranslation } from '../../../../hooks/translation/useTranslation';
import { useSolutionReponse } from '../../../../hooks/solution/useSolutionReponse';
import ReponseForm from './ReponseForm';

interface Props {
  solution: Solution;
  onSolutionRepondue: () => void;
  isLoading: boolean;
  onClearMessages: () => void;
}

export default function SolutionActions({ solution, onSolutionRepondue, isLoading, onClearMessages }: Props) {
  const { t } = useAppTranslation(['common', 'solution']);
  const { validerSolution, rejeterSolution, cloturerTicket } = useSolutionReponse();
  
  const [showReponseForm, setShowReponseForm] = useState(false);
  const [actionType, setActionType] = useState<'valider' | 'rejeter' | 'cloturer' | null>(null);

  const handleValiderSolution = async () => {
    setActionType('valider');
    onClearMessages();
    
    const result = await validerSolution(solution.id);
    
    if (result) {
      // Fermer le formulaire et appeler le callback
      setShowReponseForm(false);
      setActionType(null);
      onSolutionRepondue();
    }
  };

  const handleRejeterSolution = async (commentaire: string) => {
    setActionType('rejeter');
    onClearMessages();
    
    const result = await rejeterSolution(solution.id, commentaire);
    
    if (result) {
      // Fermer le formulaire et appeler le callback
      setShowReponseForm(false);
      setActionType(null);
      onSolutionRepondue();
    }
  };

  const handleCloturerTicket = async () => {
    setActionType('cloturer');
    onClearMessages();
    
    const success = await cloturerTicket(solution.id);
    
    if (success) {
      setActionType(null);
      onSolutionRepondue();
    }
  };

  const handleRepondre = (type: 'valider' | 'rejeter' | 'cloturer') => {
    setActionType(type);
    
    if (type === 'valider') {
      handleValiderSolution();
    } else if (type === 'cloturer') {
      handleCloturerTicket();
    } else {
      setShowReponseForm(true);
    }
  };

  const handleCancelReponse = () => {
    setShowReponseForm(false);
    setActionType(null);
    onClearMessages();
  };

  const handleSubmitReponse = (commentaire: string) => {
    handleRejeterSolution(commentaire);
  };

  // Ne pas afficher les actions si le ticket est clôturé
  if (solution.cloture) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px',
        background: '#2d3748',
        borderRadius: '8px',
        marginTop: '20px',
        border: '2px solid #48bb78'
      }}>
        <strong style={{ color: '#48bb78' }}>
          ✅ Ticket clôturé
        </strong>
        {solution.dateCloture && (
          <div style={{ fontSize: '14px', color: '#a0aec0', marginTop: '5px' }}>
            Le {new Date(solution.dateCloture).toLocaleDateString('fr-FR')}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
      {/* Formulaire de réponse pour solution KO */}
      {showReponseForm && (
        <ReponseForm
          onSubmit={handleSubmitReponse}
          onCancel={handleCancelReponse}
          isLoading={isLoading && actionType === 'rejeter'}
        />
      )}

      {/* Boutons d'action - Afficher seulement si pas de formulaire ouvert */}
      {!showReponseForm && (
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center',
          paddingTop: '20px',
          borderTop: '1px solid #4a5568',
          flexWrap: 'wrap'
        }}>
          <ActionButton
            type="valider"
            onClick={() => handleRepondre('valider')}
            isLoading={isLoading && actionType === 'valider'}
            label={t('solution:solutionOK')}
          />
          
          <ActionButton
            type="rejeter"
            onClick={() => handleRepondre('rejeter')}
            isLoading={isLoading && actionType === 'rejeter'}
            label={t('solution:solutionKO')}
          />
        </div>
      )}
    </div>
  );
}

// Component ActionButton réutilisable
const ActionButton = ({
  type,
  onClick,
  isLoading,
  label
}: {
  type: 'valider' | 'rejeter' | 'cloturer';
  onClick: () => void;
  isLoading: boolean;
  label: string;
}) => {
  const { t } = useAppTranslation(['common']);

  const getButtonStyle = () => {
    const baseStyle = {
      color: 'white',
      padding: '12px 30px',
      borderRadius: '25px',
      border: 'none',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'background-color 0.2s ease',
      opacity: isLoading ? 0.6 : 1
    };

    const styles = {
      valider: {
        background: '#48bb78',
        hover: '#38a169'
      },
      rejeter: {
        background: '#f56565',
        hover: '#e53e3e'
      },
      cloturer: {
        background: '#6b46c1',
        hover: '#553c9a'
      }
    };

    return { ...baseStyle, background: styles[type].background };
  };

  const style = getButtonStyle();

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      style={style}
      onMouseEnter={(e) => {
        if (!isLoading) {
          const styles = {
            valider: '#38a169',
            rejeter: '#e53e3e',
            cloturer: '#553c9a'
          };
          e.currentTarget.style.backgroundColor = styles[type];
        }
      }}
      onMouseLeave={(e) => {
        if (!isLoading) {
          const styles = {
            valider: '#48bb78',
            rejeter: '#f56565',
            cloturer: '#6b46c1'
          };
          e.currentTarget.style.backgroundColor = styles[type];
        }
      }}
    >
      {isLoading ? t('common:loading') : label}
    </button>
  );
};