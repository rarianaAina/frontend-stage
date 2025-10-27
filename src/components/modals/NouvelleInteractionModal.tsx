import { useState, useEffect } from 'react';

interface NouvelleInteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  onCreerInteraction: (data: {
    message: string;
    typeInteractionId: number;
    canalInteractionId: number;
  }) => void;
}

// Types d'interaction prédéfinis
const TYPES_INTERACTION = [
  { id: 1, libelle: 'Question', code: 'QUESTION' },
  { id: 2, libelle: 'Information', code: 'INFORMATION' },
  { id: 3, libelle: 'Relance', code: 'RELANCE' },
  { id: 4, libelle: 'Urgence', code: 'URGENCE' },
];

// Canaux d'interaction prédéfinis
const CANAUX_INTERACTION = [
  { id: 1, libelle: 'Portail client', code: 'PORTAL_CLIENT' },
  { id: 2, libelle: 'Email', code: 'EMAIL' },
  { id: 3, libelle: 'Téléphone', code: 'TELEPHONE' },
];

export const NouvelleInteractionModal = ({
  isOpen,
  onClose,
  reference,
  onCreerInteraction,
}: NouvelleInteractionModalProps) => {
  const [message, setMessage] = useState('');
  const [typeInteractionId, setTypeInteractionId] = useState<number>(1); // Question par défaut
  const [canalInteractionId, setCanalInteractionId] = useState<number>(1); // Portail client par défaut
  const [loading, setLoading] = useState(false);

  // Réinitialiser le formulaire quand la modal s'ouvre/ferme
  useEffect(() => {
    if (isOpen) {
      setMessage('');
      setTypeInteractionId(1);
      setCanalInteractionId(1);
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      alert('Veuillez saisir un message');
      return;
    }

    setLoading(true);
    
    try {
      await onCreerInteraction({
        message: message.trim(),
        typeInteractionId,
        canalInteractionId,
      });
      
      // Le parent gère la fermeture et le rechargement
    } catch (error) {
      console.error('Erreur dans la modal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          disabled={loading}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: loading ? 'not-allowed' : 'pointer',
            color: '#666',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = '#f0f0f0';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
          }}
        >
          ×
        </button>

        <h2 style={{
          textAlign: 'center',
          color: '#17a2b8',
          marginBottom: '10px',
          fontSize: '24px'
        }}>
          Nouvelle Interaction
        </h2>

        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '14px'
        }}>
          Ticket : <strong>{reference}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          {/* Type d'interaction */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>
              Type d'interaction *
            </label>
            <select
              value={typeInteractionId}
              onChange={(e) => setTypeInteractionId(Number(e.target.value))}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '2px solid #e0e0e0',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {TYPES_INTERACTION.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.libelle}
                </option>
              ))}
            </select>
          </div>

          {/* Canal d'interaction */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>
              Canal *
            </label>
            <select
              value={canalInteractionId}
              onChange={(e) => setCanalInteractionId(Number(e.target.value))}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '2px solid #e0e0e0',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {CANAUX_INTERACTION.map((canal) => (
                <option key={canal.id} value={canal.id}>
                  {canal.libelle}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>
              Message *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              placeholder="Saisissez votre message ici..."
              rows={6}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: '2px solid #e0e0e0',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: '120px',
                backgroundColor: loading ? '#f8f9fa' : 'white',
                cursor: loading ? 'not-allowed' : 'text'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#17a2b8';
                e.target.style.boxShadow = '0 0 0 3px rgba(23, 162, 184, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '5px',
              textAlign: 'right'
            }}>
              {message.length} caractères
            </div>
          </div>

          {/* Boutons d'action */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              style={{
                padding: '12px 24px',
                borderRadius: '25px',
                border: '2px solid #6c757d',
                background: 'white',
                color: '#6c757d',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#6c757d';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#6c757d';
                }
              }}
            >
              Annuler
            </button>
            
            <button
              type="submit"
              disabled={loading || !message.trim()}
              style={{
                padding: '12px 30px',
                borderRadius: '25px',
                border: 'none',
                background: loading || !message.trim() ? '#a0d2e0' : '#17a2b8',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading || !message.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (!loading && message.trim()) {
                  e.currentTarget.style.background = '#138496';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && message.trim()) {
                  e.currentTarget.style.background = '#17a2b8';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Création...
                </>
              ) : (
                <>
                  <span style={{ fontSize: '16px' }}>+</span>
                  Créer l'interaction
                </>
              )}
            </button>
          </div>
        </form>

        {/* Style pour l'animation de chargement */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};