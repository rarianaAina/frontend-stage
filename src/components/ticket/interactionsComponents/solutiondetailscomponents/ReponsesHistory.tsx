import { useState, useEffect } from 'react';
import { Solution } from '../../../../types/solution/solution';
import { useSolutionReponse } from '../../../../hooks/solution/useSolutionReponse';
import ReponseItem from './ReponseItem';

interface Props {
  solution: Solution;
  onReponsesLoaded: (reponses: any[]) => void;
}

export default function ReponsesHistory({ solution, onReponsesLoaded }: Props) {
  const { getReponsesParSolution } = useSolutionReponse();
  const [reponses, setReponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chargerReponses();
  }, [solution.id]);

  const chargerReponses = async () => {
    setLoading(true);
    try {
      const reponsesData = await getReponsesParSolution(solution.id);
      setReponses(reponsesData);
      onReponsesLoaded(reponsesData);
    } catch (err) {
      console.error('Erreur chargement réponses:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        width: '100%'
      }}>
        <h4 style={{ margin: 0, color: '#6dd5ed' }}>
          Historique des réponses ({reponses.length})
        </h4>
        <button
          onClick={chargerReponses}
          disabled={loading}
          style={{
            background: '#4a5568',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            opacity: loading ? 0.6 : 1,
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = '#2d3748';
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = '#4a5568';
          }}
        >
          {loading ? '🔄' : '🔄 Actualiser'}
        </button>
      </div>

      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          color: '#a0aec0'
        }}>
          Chargement des réponses...
        </div>
      ) : reponses.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          background: '#2d3748',
          borderRadius: '8px',
          color: '#a0aec0'
        }}>
          Aucune réponse pour cette solution
        </div>
      ) : (
        <div style={{ 
          maxHeight: '400px', 
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '100%'
        }}>
          {reponses.map((reponse) => (
            <ReponseItem key={reponse.id} reponse={reponse} />
          ))}
        </div>
      )}
    </div>
  );
}