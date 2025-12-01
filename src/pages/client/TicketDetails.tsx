import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import { useTicketDetails } from '../../hooks/ticket/useTicketDetails';
import { 
  ticketService, 
  RelanceData, 
  PJData, 
  ClotureData, 
  AutreDateData, 
  interactionService, 
  InteractionCreateDTO,
   
} from '../../services/ticketServiceCH';
import { Solution } from '../../types/solution/solution'
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
  const [solutions, setSolutions] = useState<Solution[]>([]); // État pour les solutions
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Récupérer l'utilisateur connecté
  const getCurrentUserId = (): number => {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : 1;
  };

  // Charger les interactions, pièces jointes et solutions séparément
  useEffect(() => {
    const fetchAdditionalDetails = async () => {
      if (!ticket?.id) return;
      
      try {
        setLoadingDetails(true);
        
        // Chargement en parallèle pour meilleures performances
        const [interactionsData, piecesJointesData, solutionsData] = await Promise.all([
          ticketService.getInteractions(ticket.id.toString()),
          ticketService.getPiecesJointes(ticket.id.toString()),
          ticketService.getSolutions(ticket.id.toString()) // Nouvel appel
        ]);
        
        setInteractions(interactionsData);
        setPiecesJointes(piecesJointesData);
        setSolutions(solutionsData);
        
      } catch (err) {
        console.error('Erreur chargement détails supplémentaires:', err);
        toast.error('Erreur lors du chargement des détails');
      } finally {
        setLoadingDetails(false);
      }
    };

    if (ticket) {
      fetchAdditionalDetails();
    }
  }, [ticket]);

  // Handler pour la relance via interaction
  const handleRelancer = async (interactionData: InteractionCreateDTO) => {
    try {
      await ticketService.creerInteraction(interactionData);

      // Recharger les interactions pour afficher la nouvelle relance
      const nouvellesInteractions = await ticketService.getInteractions(ticket!.id.toString());
      setInteractions(nouvellesInteractions);
      
      setShowRelanceModal(false);
      toast.success('Interaction créée avec succès !');
    } catch (err) {
      console.error('Erreur lors de la relance:', err);
      toast.error('Erreur lors de la relance');
    }
  };

  const handleAjouterPJ = async (data: PJData) => {
    try {
      await ticketService.ajouterPieceJointe(ticket!.id.toString(), data);
      
      // Recharger les pièces jointes
      const nouvellesPiecesJointes = await ticketService.getPiecesJointes(ticket!.id.toString());
      setPiecesJointes(nouvellesPiecesJointes);
      
      setShowPJModal(false);
      toast.success('📎 Pièce jointe ajoutée avec succès !');
      
    } catch (err) {
      console.error('Erreur lors de l\'ajout de PJ:', err);
      toast.error('Erreur lors de l\'ajout de la pièce jointe');
    }
  };

  const handleNouvelleInteraction = async (data: any) => {
    try {
      const utilisateurId = getCurrentUserId();
      
      if (!utilisateurId) {
        toast.error('Utilisateur non identifié');
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
      toast.success('Interaction créée avec succès !');
    } catch (err) {
      console.error('Erreur lors de la création de l\'interaction:', err);
      toast.error('Erreur lors de la création de l\'interaction');
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

  // Fonction pour recharger toutes les données
  const rechargerDonnees = async () => {
    if (!ticket?.id) return;
    
    try {
      setLoadingDetails(true);
      const [nouvellesInteractions, nouvellesPiecesJointes, nouvellesSolutions] = await Promise.all([
        ticketService.getInteractions(ticket.id.toString()),
        ticketService.getPiecesJointes(ticket.id.toString()),
        ticketService.getSolutions(ticket.id.toString())
      ]);
      
      setInteractions(nouvellesInteractions);
      setPiecesJointes(nouvellesPiecesJointes);
      setSolutions(nouvellesSolutions);
    } catch (err) {
      console.error('Erreur rechargement données:', err);
      toast.error('Erreur lors du rechargement des données');
    } finally {
      setLoadingDetails(false);
    }
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
        {/* En-tête avec bouton retour et rafraîchissement */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
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

          <button
            onClick={rechargerDonnees}
            disabled={loadingDetails}
            style={{
              background: loadingDetails ? '#ccc' : '#28a745',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              cursor: loadingDetails ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!loadingDetails) {
                e.currentTarget.style.background = '#218838';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loadingDetails) {
                e.currentTarget.style.background = '#28a745';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            🔄 {loadingDetails ? 'Chargement...' : 'Rafraîchir'}
          </button>
        </div>

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

        {/* Section statistiques rapides */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <StatCard 
            title="Interactions" 
            value={interactions.length} 
            color="#17a2b8" 
            icon="💬"
          />
          <StatCard 
            title="Solutions" 
            value={solutions.length} 
            color="#28a745" 
            icon="✅"
          />
          <StatCard 
            title="Pièces jointes" 
            value={piecesJointes.length} 
            color="#fd7e14" 
            icon="📎"
          />
        </div>

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
              Chargement des interactions, solutions et pièces jointes...
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Cette opération peut prendre quelques secondes
            </div>
          </div>
        ) : (
          <InteractionsPJ
            interactions={interactions}
            piecesJointes={piecesJointes}
            solutions={solutions} // Passage des solutions au composant
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

      <NouvelleInteractionModal
        isOpen={showNouvelleInteractionModal}
        onClose={() => setShowNouvelleInteractionModal(false)}
        reference={ticket.reference}
        onCreerInteraction={handleNouvelleInteraction}
      />
    </div>
  );
}

// Composant StatCard pour les statistiques
const StatCard = ({ title, value, color, icon }: { 
  title: string; 
  value: number; 
  color: string; 
  icon: string; 
}) => (
  <div style={{
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderLeft: `4px solid ${color}`
  }}>
    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
    <div style={{ 
      fontSize: '28px', 
      fontWeight: 'bold', 
      color: color,
      marginBottom: '5px'
    }}>
      {value}
    </div>
    <div style={{ 
      fontSize: '14px', 
      color: '#666',
      fontWeight: '500'
    }}>
      {title}
    </div>
  </div>
);