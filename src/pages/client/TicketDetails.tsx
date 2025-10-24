import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useTicketDetails } from '../../hooks/ticket/useTicketDetails';
import { ticketService, RelanceData, PJData, ClotureData, AutreDateData } from '../../services/ticketServiceCH';
import { TicketHeader } from '../../components/ticket/TicketHeader';
import { DemandesIntervention } from '../../components/ticket/DemandesIntervention';
import { InteractionsPJ } from '../../components/ticket/InteractionsPJ';
import { RelanceModal } from '../../components/modals/RelanceModal';
import { PJModal } from '../../components/modals/PJModal';

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ticket, loading, error } = useTicketDetails(id || '');
  
  const [showRelanceModal, setShowRelanceModal] = useState(false);
  const [showPJModal, setShowPJModal] = useState(false);
  const [showClotureModal, setShowClotureModal] = useState(false);
  const [showAutreDateModal, setShowAutreDateModal] = useState(false);
  const [showValiderModal, setShowValiderModal] = useState(false);
  
  const [selectedDemandeId, setSelectedDemandeId] = useState<number | null>(null);

  // Handlers pour les actions
  const handleRelancer = async (data: RelanceData) => {
    try {
      await ticketService.relancerTicket(ticket!.id.toString(), data);
      window.location.reload();
    } catch (err) {
      console.error('Erreur lors de la relance:', err);
      alert('Erreur lors de la relance');
    }
  };

  const handleAjouterPJ = async (data: PJData) => {
    try {
      await ticketService.ajouterPieceJointe(ticket!.id.toString(), data);
      window.location.reload();
    } catch (err) {
      console.error('Erreur lors de l\'ajout de PJ:', err);
      alert('Erreur lors de l\'ajout de la pièce jointe');
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

  if (loading) return <div>Chargement...</div>;
  if (error || !ticket) return <div>Erreur: {error}</div>;

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
            marginBottom: '20px'
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
          dateSoumission={ticket.dateSoumission}
          produit={ticket.produit}
          onRelancer={() => setShowRelanceModal(true)}
          onAjouterPJ={() => setShowPJModal(true)}
          onCloturer={() => setShowClotureModal(true)}
        />

        {/* <DemandesIntervention
          demandes={ticket.demandesIntervention}
          onValider={handleValider}
          onAutreDate={handleAutreDate}
        /> */}

        {/* <InteractionsPJ
          interactions={ticket.interactions}
          piecesJointes={ticket.piecesJointes}
        /> */}
      </div>

      <RelanceModal
        isOpen={showRelanceModal}
        onClose={() => setShowRelanceModal(false)}
        reference={ticket.reference}
        onRelancer={handleRelancer}
      />

      <PJModal
        isOpen={showPJModal}
        onClose={() => setShowPJModal(false)}
        reference={ticket.reference}
        onAjouterPJ={handleAjouterPJ}
      />

      {/* Ajouter les autres modales ici... */}
    </div>
  );
}