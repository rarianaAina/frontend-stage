import { useState, useRef, useEffect } from 'react';
import { PJData } from '../../services/ticketServiceCH';
import Modal from '../Modal';

interface PJModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  onAjouterPJ: (data: PJData) => void;
}

export const PJModal = ({ isOpen, onClose, reference, onAjouterPJ }: PJModalProps) => {
  const [data, setData] = useState<PJData>({ 
    fichier: null, 
    commentaires: '', 
    utilisateurId: 0 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Récupérer l'utilisateurId depuis le localStorage au montage du composant
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('🔍 userId depuis localStorage:', userId);
    
    if (userId) {
      const utilisateurId = parseInt(userId, 10);
      if (!isNaN(utilisateurId)) {
        setData(prevData => ({
          ...prevData,
          utilisateurId: utilisateurId
        }));
        console.log('✅ utilisateurId défini:', utilisateurId);
      } else {
        console.error('❌ userId non numérique:', userId);
      }
    } else {
      console.warn('⚠️ Aucun userId trouvé dans localStorage');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData(prevData => ({
        ...prevData,
        fichier: e.target.files![0]
      }));
    }
  };

  const handleCommentairesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(prevData => ({
      ...prevData,
      commentaires: e.target.value
    }));
  };

  const handleSubmit = () => {
    // Validation
    if (!data.fichier) {
      alert('Veuillez sélectionner un fichier');
      return;
    }

    if (!data.utilisateurId || data.utilisateurId === 0) {
      alert('Erreur: Utilisateur non identifié. Veuillez rafraîchir la page.');
      return;
    }

    console.log('📤 Envoi PJ avec données:', {
      fichier: data.fichier.name,
      commentaires: data.commentaires,
      utilisateurId: data.utilisateurId
    });

    onAjouterPJ(data);
    onClose();
    setData({ fichier: null, commentaires: '', utilisateurId: data.utilisateurId });
  };

  const handleReset = () => {
    setData(prevData => ({ 
      fichier: null, 
      commentaires: '', 
      utilisateurId: prevData.utilisateurId 
    }));
    onClose();
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
          onChange={handleCommentairesChange}
        />
      </div>

      {/* Debug info */}
      {/* <div style={{ 
        marginBottom: '10px', 
        padding: '10px', 
        background: '#f8f9fa', 
        borderRadius: '5px',
        fontSize: '12px',
        border: '1px solid #dee2e6'
      }}>
        <strong>Debug:</strong> utilisateurId = {data.utilisateurId} 
        {data.utilisateurId === 0 && ' ⚠️ (ID non défini)'}
      </div> */}

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button className="btn-primary" onClick={handleSubmit}>Valider</button>
        <button className="btn-warning" onClick={handleReset}>Annuler</button>
      </div>
    </Modal>
  );
};