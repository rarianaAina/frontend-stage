import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useTicketDetails } from '../../hooks/ticket/useTicketDetails';
import { ticketService, RelanceData, PJData, ClotureData, AutreDateData, interactionService, InteractionCreateDTO } from '../../services/ticketServiceCH';
import { TicketHeader } from '../../components/ticket/TicketHeader';
import { DemandesIntervention } from '../../components/ticket/DemandesIntervention';
import { InteractionsPJ } from '../../components/ticket/InteractionsPJ';
import { RelanceModal } from '../../components/modals/RelanceModal';
import { PJModal } from '../../components/modals/PJModal';
import { NouvelleInteractionModal } from '../../components/modals/NouvelleInteractionModal';
import { toast } from 'react-toastify';

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ticket, loading, error } = useTicketDetails(id || '');
  
  const [showRelanceModal, setShowRelanceModal] = useState(false);
  const [showPJModal, setShowPJModal] = useState(false);
  const [showClotureModal, setShowClotureModal] = useState(false);
  const [showAutreDateModal, setShowAutreDateModal] = useState(false);
  const [showValiderModal, setShowValiderModal] = useState(false);
  const [showNouvelleInteractionModal, setShowNouvelleInteractionModal] = useState(false);
  
  const [selectedDemandeId, setSelectedDemandeId] = useState<number | null>(null);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [piecesJointes, setPiecesJointes] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Récupérer l'utilisateur connecté
  const getCurrentUserId = (): number => {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : 1;
  };

  // Charger les interactions et pièces jointes séparément
  useEffect(() => {
    const fetchAdditionalDetails = async () => {
      if (!ticket?.id) return;
      
      try {
        setLoadingDetails(true);
        
        const interactionsData = await ticketService.getInteractions(ticket.id.toString());
        setInteractions(interactionsData);
        
        const piecesJointesData = await ticketService.getPiecesJointes(ticket.id.toString());
        setPiecesJointes(piecesJointesData);
        
      } catch (err) {
        console.error('Erreur chargement détails supplémentaires:', err);
      } finally {
        setLoadingDetails(false);
      }
    };

    if (ticket) {
      fetchAdditionalDetails();
    }
  }, [ticket]);

  // Handler pour la relance via interaction - CORRIGÉ
  const handleRelancer = async (interactionData: InteractionCreateDTO) => {
    try {
      // UN SEUL APPEL maintenant
      await ticketService.creerInteraction(interactionData);

      // Recharger les interactions pour afficher la nouvelle relance
      const nouvellesInteractions = await ticketService.getInteractions(ticket!.id.toString());
      setInteractions(nouvellesInteractions);
      
      setShowRelanceModal(false);
      //alert(`Interaction créée avec succès !`);
      toast.success('✅ Interaction créée avec succès !');
    } catch (err) {
      console.error('Erreur lors de la relance:', err);
      alert('Erreur lors de la relance');
    }
  };

  const handleAjouterPJ = async (data: PJData) => {
    try {
      await ticketService.ajouterPieceJointe(ticket!.id.toString(), data);
      
      // Recharger les pièces jointes
      const nouvellesPiecesJointes = await ticketService.getPiecesJointes(ticket!.id.toString());
      setPiecesJointes(nouvellesPiecesJointes);
      
      setShowPJModal(false);
      alert('Pièce jointe ajoutée avec succès !');
      
    } catch (err) {
      console.error('Erreur lors de l\'ajout de PJ:', err);
      alert('Erreur lors de l\'ajout de la pièce jointe');
    }
  };

  const handleNouvelleInteraction = async (data: any) => {
    try {
      const utilisateurId = getCurrentUserId();
      
      if (!utilisateurId) {
        alert('Utilisateur non identifié');
        return;
      }

      const interactionData: InteractionCreateDTO = {
        ticketId: ticket!.id,
        message: data.message,
        typeInteractionId: data.typeInteractionId,
        canalInteractionId: data.canalInteractionId,
        auteurUtilisateurId: utilisateurId,
        visibleClient: data.visibleClient || true
      };

      await ticketService.creerInteraction(interactionData);
      
      // Recharger les interactions
      const nouvellesInteractions = await ticketService.getInteractions(ticket!.id.toString());
      setInteractions(nouvellesInteractions);
      
      setShowNouvelleInteractionModal(false);
      //alert('Interaction créée avec succès!');
      toast.success('✅ Interaction créée avec succès !');
    } catch (err) {
      console.error('Erreur lors de la création de l\'interaction:', err);
      alert('Erreur lors de la création de l\'interaction');
    }
  };

  const handleValider = (demandeId: number) => {
    setSelectedDemandeId(demandeId);
    setShowValiderModal(true);
  };

  const handleAutreDate = (demandeId: number) => {
    setSelectedDemandeId(demandeId);
    setShowAutreDateModal(true);
  };

  const handleOuvrirNouvelleInteraction = () => {
    setShowNouvelleInteractionModal(true);
  };

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '18px', color: '#17a2b8', marginBottom: '10px' }}>
          Chargement des détails du ticket...
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Veuillez patienter
        </div>
      </div>
    </div>
  );

  if (error || !ticket) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '18px', color: '#ef4444', marginBottom: '10px' }}>
          Erreur
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
          {error || 'Ticket non trouvé'}
        </div>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: '#17a2b8',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Retour
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="CLIENT" />

      <div style={{ padding: '40px 60px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: '#17a2b8',
            color: 'white',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            marginBottom: '20px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#138496';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#17a2b8';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ←
        </button>

        <h2 style={{
          fontSize: '32px',
          color: '#17a2b8',
          marginBottom: '30px',
          textDecoration: 'underline'
        }}>
          Détails du ticket : {ticket.reference}
        </h2>

        <TicketHeader
          reference={ticket.reference}
          statut={ticket.statut}
          dateCreation={ticket.dateCreation}
          produit={ticket.produitNom}
          onRelancer={() => setShowRelanceModal(true)}
          onAjouterPJ={() => setShowPJModal(true)}
          onCloturer={() => setShowClotureModal(true)}
        />

        {/* <DemandesIntervention
          demandes={ticket.demandesIntervention}
          onValider={handleValider}
          onAutreDate={handleAutreDate}
        /> */}

        {loadingDetails ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            background: 'white',
            borderRadius: '10px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '16px', color: '#17a2b8', marginBottom: '10px' }}>
              Chargement des interactions et pièces jointes...
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Cette opération peut prendre quelques secondes
            </div>
          </div>
        ) : (
          <InteractionsPJ
            interactions={interactions}
            piecesJointes={piecesJointes}
            onNouvelleInteraction={handleOuvrirNouvelleInteraction}
          />
        )}
      </div>

      {/* Modales */}
      <RelanceModal
        isOpen={showRelanceModal}
        onClose={() => setShowRelanceModal(false)}
        ticketId={ticket.id}
        onRelancer={handleRelancer}
        utilisateurId={getCurrentUserId()}
      />

      <PJModal
        isOpen={showPJModal}
        onClose={() => setShowPJModal(false)}
        reference={ticket.reference}
        onAjouterPJ={handleAjouterPJ}
      />

      {/* <NouvelleInteractionModal
        isOpen={showNouvelleInteractionModal}
        onClose={() => setShowNouvelleInteractionModal(false)}
        reference={ticket.reference}
        onCreerInteraction={handleNouvelleInteraction}
      /> */}
    </div>
  );
}