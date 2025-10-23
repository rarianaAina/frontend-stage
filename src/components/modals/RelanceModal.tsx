import { useState } from 'react';
import { RelanceData } from '../../services/ticketService';
import Modal from '../Modal';

interface RelanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  onRelancer: (data: RelanceData) => void;
}

export const RelanceModal = ({ isOpen, onClose, reference, onRelancer }: RelanceModalProps) => {
  const [data, setData] = useState<RelanceData>({ niveau: 'Urgent', commentaires: '' });

  const handleSubmit = () => {
    onRelancer(data);
    onClose();
    setData({ niveau: 'Urgent', commentaires: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Relancer un ticket">
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Référence :</label>
        <input type="text" value={reference} disabled style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Niveau :</label>
        <select 
          style={{ width: '100%' }}
          value={data.niveau}
          onChange={(e) => setData({...data, niveau: e.target.value})}
        >
          <option>Urgent</option>
          <option>Critique</option>
        </select>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Commentaires :</label>
        <textarea 
          style={{ width: '100%', minHeight: '100px' }} 
          value={data.commentaires}
          onChange={(e) => setData({...data, commentaires: e.target.value})}
        />
      </div>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button className="btn-primary" onClick={handleSubmit}>Valider</button>
        <button className="btn-warning" onClick={onClose}>Annuler</button>
      </div>
    </Modal>
  );
};