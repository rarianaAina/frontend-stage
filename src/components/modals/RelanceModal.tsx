import { useState, useEffect } from 'react';
import { RelanceData, ticketService, interactionService } from '../../services/ticketServiceCH';
import Modal from '../Modal';

interface RelanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: number;
  onRelancer: (data: RelanceData) => void;
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
  const [typeRelanceId, setTypeRelanceId] = useState<number | null>(null);
  const [canalInterneId, setCanalInterneId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Charger les IDs au montage du composant
  useEffect(() => {
    const loadIds = async () => {
      try {
        setLoading(true);
        // const [typeId, canalId] = await Promise.all([
        //   interactionService.getTypeRelanceId(),
        //   interactionService.getCanalInterneId()
        // ]);
        setTypeRelanceId(3);
        setCanalInterneId(1);
      } catch (error) {
        console.error('Erreur lors du chargement des IDs:', error);
        alert('Erreur de configuration des types d\'interaction');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      loadIds();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!typeRelanceId || !canalInterneId) {
      alert('Configuration des interactions non chargée');
      return;
    }

    try {
      setLoading(true);
      
      // Créer le message de relance
      const message = `Relance ${data.niveau}: ${data.commentaires}`;
      
      // Créer l'interaction
      await ticketService.creerInteraction({
        ticketId: ticketId,
        message: message,
        typeInteractionId: typeRelanceId,
        canalInteractionId: canalInterneId,
        auteurUtilisateurId: utilisateurId,
        visibleClient: false // La relance n'est généralement pas visible au client
      });

      // Appeler la callback parent
      onRelancer(data);
      onClose();
      setData({ niveau: 'Urgent', commentaires: '' });
      
    } catch (error) {
      console.error('Erreur lors de la relance:', error);
      alert('Erreur lors de la création de la relance');
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
        <input type="text" value={ticketId} disabled style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          Niveau :
        </label>
        <select 
          style={{ width: '100%' }}
          value={data.niveau}
          onChange={(e) => setData({...data, niveau: e.target.value})}
          disabled={loading}
        >
          <option>Réponse</option>
          <option>Relance</option>
        </select>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          Commentaires :
        </label>
        <textarea 
          style={{ width: '100%', minHeight: '100px' }} 
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
          disabled={loading || !typeRelanceId || !canalInterneId}
        >
          {loading ? 'Création...' : 'Valider'}
        </button>
        <button 
          className="btn-warning" 
          onClick={onClose}
          disabled={loading}
        >
          Annuler
        </button>
      </div>
    </Modal>
  );
};