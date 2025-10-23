import { useState, useRef } from 'react';
import { PJData } from '../../services/ticketService';
import Modal from '../Modal';

interface PJModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  onAjouterPJ: (data: PJData) => void;
}

export const PJModal = ({ isOpen, onClose, reference, onAjouterPJ }: PJModalProps) => {
  const [data, setData] = useState<PJData>({ fichier: null, commentaires: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData({...data, fichier: e.target.files[0]});
    }
  };

  const handleSubmit = () => {
    if (!data.fichier) {
      alert('Veuillez sélectionner un fichier');
      return;
    }
    onAjouterPJ(data);
    onClose();
    setData({ fichier: null, commentaires: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rajouter une PJ">
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Référence :</label>
        <input type="text" value={reference} disabled style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Pièces jointes</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept=".pdf,.docx,.jpg,.jpeg,.png"
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: '100%',
            background: 'white',
            color: '#333',
            padding: '12px',
            borderRadius: '20px',
            border: '1px solid #ddd'
          }}
        >
          {data.fichier ? data.fichier.name : 'Parcourir ...'}
        </button>
        <p style={{ fontSize: '12px', color: 'white', marginTop: '5px', textAlign: 'center' }}>
          (PDF, DOCX, JPEG - 20 Mo max)
        </p>
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