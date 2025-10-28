import { useState, useEffect } from 'react';
import { RelanceData, ticketService, interactionService, InteractionCreateDTO } from '../../services/ticketServiceCH';
import Modal from '../Modal';

interface RelanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: number;
  onRelancer: (interactionData: InteractionCreateDTO) => void;
  utilisateurId: number;
}

export const RelanceModal = ({ 
  isOpen, 
  onClose, 
  ticketId, 
  onRelancer, 
  utilisateurId 
}: RelanceModalProps) => {
  const [data, setData] = useState<RelanceData>({ niveau: 'Urgent', commentaires: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const typeInteractionId = data.niveau === 'Relance' ? 3 : 1;
      // Préparer les données complètes de l'interaction
      const interactionData: InteractionCreateDTO = {
        ticketId: ticketId,
        message: `${data.niveau}: ${data.commentaires}`,
        typeInteractionId: typeInteractionId, // Type relance
        canalInteractionId: 1, // Canal interne
        auteurUtilisateurId: utilisateurId,
        visibleClient: false // La relance n'est généralement pas visible au client
      };

      // Passer les données complètes au parent - PAS d'appel API ici
      onRelancer(interactionData);
      
      onClose();
      setData({ niveau: 'Urgent', commentaires: '' });
      
    } catch (error) {
      console.error('Erreur lors de la préparation de la relance:', error);
      alert('Erreur lors de la préparation de la relance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Relancer un ticket">
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          Ticket ID :
        </label>
        <input 
          type="text" 
          value={ticketId} 
          disabled 
          style={{ 
            width: '100%', 
            padding: '10px', 
            borderRadius: '20px', 
            border: '1px solid #ddd',
            background: '#f5f5f5'
          }} 
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          Niveau :
        </label>
        <select 
          style={{ 
            width: '100%', 
            padding: '10px', 
            borderRadius: '20px', 
            border: '1px solid #ddd' 
          }}
          value={data.niveau}
          onChange={(e) => setData({...data, niveau: e.target.value})}
          disabled={loading}
        >
          <option value="Relance">Relance</option>
          <option value="Message">Message</option>
        </select>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          Commentaires :
        </label>
        <textarea 
          style={{ 
            width: '100%', 
            minHeight: '100px', 
            padding: '10px', 
            borderRadius: '20px', 
            border: '1px solid #ddd',
            fontFamily: 'inherit'
          }} 
          value={data.commentaires}
          onChange={(e) => setData({...data, commentaires: e.target.value})}
          disabled={loading}
          placeholder="Saisissez les commentaires de relance..."
        />
      </div>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button 
          className="btn-primary" 
          onClick={handleSubmit}
          disabled={loading || !data.commentaires.trim()}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            background: loading || !data.commentaires.trim() ? '#ccc' : '#17a2b8',
            color: 'white',
            cursor: loading || !data.commentaires.trim() ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {loading ? 'Création...' : 'Valider'}
        </button>
        <button 
          className="btn-warning" 
          onClick={onClose}
          disabled={loading}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: '1px solid #ddd',
            background: 'white',
            color: '#666',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          Annuler
        </button>
      </div>
    </Modal>
  );
};