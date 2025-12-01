import { useState, useEffect } from 'react';
import { useAppTranslation } from '../../../../hooks/translation/useTranslation';

interface Props {
  onSubmit: (commentaire: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function ReponseForm({ onSubmit, onCancel, isLoading }: Props) {
  const { t } = useAppTranslation(['common', 'solution']);
  const [commentaire, setCommentaire] = useState('');

  // Reset du formulaire quand il s'ouvre
  useEffect(() => {
    setCommentaire('');
  }, []);

  const handleSubmit = () => {
    if (!commentaire.trim()) {
      return;
    }
    onSubmit(commentaire);
    // Ne pas reset immédiatement, laisser le parent gérer la fermeture
  };

  const handleCancel = () => {
    setCommentaire('');
    onCancel();
  };

  return (
    <div style={{ 
      marginBottom: '20px',
      padding: '20px',
      background: '#2d3748',
      borderRadius: '8px',
      border: '1px solid #4a5568'
    }}>
      <h4 style={{ marginBottom: '15px', color: '#f56565' }}>
        {t('solution:explainIssue')}
      </h4>
      
      <textarea
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        placeholder={t('solution:commentPlaceholder')}
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #4a5568',
          background: '#1a202c',
          color: 'white',
          resize: 'vertical',
          marginBottom: '15px'
        }}
      />
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button
          onClick={handleCancel}
          disabled={isLoading}
          style={{
            background: '#718096',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1
          }}
        >
          {t('common:cancel')}
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={isLoading || !commentaire.trim()}
          style={{
            background: '#f56565',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            cursor: isLoading || !commentaire.trim() ? 'not-allowed' : 'pointer',
            opacity: isLoading || !commentaire.trim() ? 0.6 : 1
          }}
        >
          {isLoading ? t('common:loading') : t('solution:submitIssue')}
        </button>
      </div>
    </div>
  );
}