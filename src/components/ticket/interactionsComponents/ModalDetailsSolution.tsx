import { useState, useEffect } from 'react';
import { Solution } from '../../../types/solution/solution';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';
import { useSolutionReponse } from '../../../hooks/solution/useSolutionReponse';
import SolutionDetails from './solutiondetailscomponents/SolutionDetails';
import ReponsesHistory from './solutiondetailscomponents/ReponsesHistory';
import SolutionActions from './solutiondetailscomponents/SolutionActions';
import MessageAlert from './solutiondetailscomponents/common/MessageAlert';

interface Props {
  solution: Solution | null;
  onClose: () => void;
  onSolutionRepondue?: () => void;
}

export type ModalTab = 'details' | 'reponses';

export default function ModalDetailsSolution({ solution, onClose, onSolutionRepondue }: Props) {
  const { t } = useAppTranslation(['common', 'solution']);
  const { 
    isLoading, 
    error, 
    success, 
    clearMessages 
  } = useSolutionReponse();
  
  const [activeTab, setActiveTab] = useState<ModalTab>('details');
  const [reponses, setReponses] = useState<any[]>([]);
  const [shouldRedirectToHistory, setShouldRedirectToHistory] = useState(false);

  // Effet pour nettoyer les messages quand le modal se ferme
  useEffect(() => {
    return () => {
      clearMessages();
    };
  }, []);

  // Effet pour rediriger vers l'historique après une réponse réussie
  useEffect(() => {
    if (success && shouldRedirectToHistory) {
      setActiveTab('reponses');
      setShouldRedirectToHistory(false);
    }
  }, [success, shouldRedirectToHistory]);

  if (!solution) return null;

  const handleReponsesLoaded = (reponsesData: any[]) => {
    setReponses(reponsesData);
  };

  const handleSolutionRepondue = () => {
    // Marquer qu'il faut rediriger vers l'historique
    setShouldRedirectToHistory(true);
    onSolutionRepondue?.();
  };

  const handleClearMessages = () => {
    clearMessages();
    setShouldRedirectToHistory(false);
  };

  return (
    <div style={{ 
      color: 'white', 
      width: '90vw',
      maxWidth: '550px',
      minWidth: '180px',
      //maxHeight: '1200vh',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      //zoom: 0.
    }}>
      {/* Messages d'erreur et succès */}
      <MessageAlert error={error} success={success} />

      {/* Navigation par onglets */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid #4a5568',
        marginBottom: '20px',
        flexShrink: 0
      }}>
        <TabButton
          active={activeTab === 'details'}
          onClick={() => {
            setActiveTab('details');
            handleClearMessages();
          }}
          label="Détails de la solution"
        />
        <TabButton
          active={activeTab === 'reponses'}
          onClick={() => {
            setActiveTab('reponses');
            handleClearMessages();
          }}
          label="Historique des réponses"
          badgeCount={reponses.length}
        />
      </div>

      {/* Contenu des onglets */}
      <div style={{
        minHeight: '400px',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        flex: 1
      }}>
        {activeTab === 'details' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <SolutionDetails solution={solution} />
            <SolutionActions 
              solution={solution}
              onSolutionRepondue={handleSolutionRepondue}
              isLoading={isLoading}
              onClearMessages={handleClearMessages}
            />
          </div>
        )}

        {activeTab === 'reponses' && (
          <ReponsesHistory 
            solution={solution}
            key={`${solution.id}-${reponses.length}`} // Force le re-render quand les réponses changent
            onReponsesLoaded={handleReponsesLoaded}
          />
        )}
      </div>

    </div>
  );
}

// Component TabButton séparé
const TabButton = ({ 
  active, 
  onClick, 
  label, 
  badgeCount 
}: { 
  active: boolean; 
  onClick: () => void; 
  label: string;
  badgeCount?: number;
}) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 20px',
      background: 'none',
      border: 'none',
      color: active ? '#6dd5ed' : '#a0aec0',
      borderBottom: active ? '2px solid #6dd5ed' : 'none',
      cursor: 'pointer',
      fontWeight: active ? '600' : '400',
      position: 'relative',
      transition: 'color 0.2s ease',
      whiteSpace: 'nowrap'
    }}
  >
    {label}
    {badgeCount !== undefined && badgeCount > 0 && (
      <span style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: '#6dd5ed',
        color: 'white',
        borderRadius: '50%',
        width: '16px',
        height: '16px',
        fontSize: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {badgeCount}
      </span>
    )}
  </button>
);