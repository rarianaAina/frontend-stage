import { ReponseSolution } from '../../../../services/solutionService';

interface Props {
  reponse: ReponseSolution;
}

export default function ReponseItem({ reponse }: Props) {
  return (
    <div style={{
      padding: '15px',
      background: '#2d3748',
      borderRadius: '8px',
      marginBottom: '10px',
      borderLeft: `4px solid ${reponse.estValide ? '#48bb78' : '#f56565'}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'white',
            backgroundColor: reponse.estValide ? '#48bb78' : '#f56565'
          }}>
            {reponse.estValide ? '✅ Solution OK' : '❌ Solution KO'}
          </span>
          <span style={{ fontSize: '12px', color: '#a0aec0' }}>
            Par {reponse.creeParNom}
          </span>
        </div>
        <span style={{ fontSize: '12px', color: '#a0aec0' }}>
          {new Date(reponse.dateReponse).toLocaleDateString('fr-FR')} à{' '}
          {new Date(reponse.dateReponse).toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
      
      {reponse.commentaire && (
        <div style={{ 
          marginTop: '8px',
          padding: '10px',
          background: '#4a5568',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#e2e8f0'
        }}>
          {reponse.commentaire}
        </div>
      )}
    </div>
  );
}