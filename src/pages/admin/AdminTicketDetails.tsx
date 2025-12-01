import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import { useAdminTicketDetails } from '../../hooks/ticket/admin/useAdminTicketDetails';
import { adminTicketService } from '../../services/adminTicketService';
import { TicketHeaderAdmin } from '../../components/ticket/admin/TicketHeaderAdmin';
import { InteractionsAdmin } from '../../components/ticket/admin/InteractionsAdmin';
import { TicketInfoAdmin } from '../../components/ticket/admin/TicketInfoAdmin';
import { AssignAgentModal } from '../../components/modals/ticket/AssignAgentModal';
import { ChangeStatusModal } from '../../components/modals/ticket/ChangeStatusModal';
import { AddInternalNoteModal } from '../../components/modals/ticket/AddInternalNoteModal';
import { toast } from 'react-toastify';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

import '../../styles/AdminTicketDetails.css';

export default function AdminTicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useAppTranslation(['common', 'tickets', 'admin']);
  
  const { ticket, loading, error, refetch } = useAdminTicketDetails(id || '');
  
  const [showAssignAgentModal, setShowAssignAgentModal] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [showInternalNoteModal, setShowInternalNoteModal] = useState(false);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [piecesJointes, setPiecesJointes] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Charger les données supplémentaires UNIQUEMENT quand le ticket est chargé
  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (!ticket?.id) return;
      
      try {
        setLoadingDetails(true);
        
        const [interactionsData, piecesJointesData, solutionsData, agentsData] = await Promise.all([
          adminTicketService.getInteractions(ticket.id.toString()),
          adminTicketService.getPiecesJointes(ticket.id.toString()),
          adminTicketService.getSolutions(ticket.id.toString()),
          adminTicketService.getAvailableAgents()
        ]);
        
        setInteractions(interactionsData);
        setPiecesJointes(piecesJointesData);
        setSolutions(solutionsData);
        setAgents(agentsData);
        
      } catch (err) {
        console.error('Erreur chargement données admin:', err);
        toast.error(t('common:errors.loadingError'));
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchAdditionalData();
  }, [ticket?.id]); // ✅ Dépendance sur ticket.id seulement

  // Handler pour assigner un agent
  const handleAssignAgent = async (agentId: number) => {
    try {
      await adminTicketService.assignAgent(parseInt(ticket!.id), agentId);
      await refetch(); // Recharge les données du ticket
      setShowAssignAgentModal(false);
      toast.success(t('admin:agentAssignedSuccess'));
    } catch (err) {
      console.error('Erreur assignation agent:', err);
      toast.error(t('common:errors.actionFailed'));
    }
  };

  // Handler pour changer le statut
  const handleChangeStatus = async (newStatus: string, comment?: string) => {
    try {
      await adminTicketService.updateStatus(parseInt(ticket!.id), newStatus, comment);
      await refetch(); // Recharge les données du ticket
      setShowChangeStatusModal(false);
      toast.success(t('admin:statusUpdatedSuccess'));
    } catch (err) {
      console.error('Erreur changement statut:', err);
      toast.error(t('common:errors.actionFailed'));
    }
  };

  // Handler pour ajouter une note interne
  const handleAddInternalNote = async (note: string) => {
    try {
      await adminTicketService.addInternalNote(parseInt(ticket!.id), note);
      // Recharger seulement les interactions
      const nouvellesInteractions = await adminTicketService.getInteractions(ticket!.id.toString());
      setInteractions(nouvellesInteractions);
      setShowInternalNoteModal(false);
      toast.success(t('admin:internalNoteAdded'));
    } catch (err) {
      console.error('Erreur ajout note interne:', err);
      toast.error(t('common:errors.actionFailed'));
    }
  };

  // Recharger toutes les données
  const handleRefresh = async () => {
    try {
      setLoadingDetails(true);
      await refetch(); // Recharge le ticket principal
      
      if (ticket?.id) {
        const [interactionsData, piecesJointesData, solutionsData] = await Promise.all([
          adminTicketService.getInteractions(ticket.id.toString()),
          adminTicketService.getPiecesJointes(ticket.id.toString()),
          adminTicketService.getSolutions(ticket.id.toString())
        ]);
        setInteractions(interactionsData);
        setPiecesJointes(piecesJointesData);
        setSolutions(solutionsData);
      }
      toast.success(t('common:dataRefreshed'));
    } catch (err) {
      console.error('Erreur rafraîchissement:', err);
      toast.error(t('common:errors.refreshFailed'));
    } finally {
      setLoadingDetails(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-content">
          <div className="loading-spinner"></div>
          <div>{t('tickets:loadingTicketDetails')}</div>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="admin-error-container">
        <div className="admin-error-content">
          <div className="error-icon">⚠️</div>
          <div className="error-message">
            {error || t('tickets:ticketNotFound')}
          </div>
          <button 
            onClick={() => navigate('/admin/demandes')}
            className="back-button"
          >
            {t('common:backToList')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-ticket-details-container">
      <NavBar role="ADMIN" />

      <div className="admin-ticket-details-content">
        {/* En-tête avec navigation */}
        <div className="admin-ticket-header-nav">
          <button
            onClick={() => navigate('/admin/demandes')}
            className="back-button"
          >
            ← {t('common:backToList')}
          </button>
          
          <div className="header-actions">
            <button
              onClick={handleRefresh}
              disabled={loadingDetails}
              className="refresh-button"
            >
              🔄 {loadingDetails ? t('common:loading') : t('common:refresh')}
            </button>
          </div>
        </div>

        <h1 className="admin-ticket-title">
          {t('admin:ticketDetails')} : {ticket.reference}
        </h1>

        {/* En-tête du ticket avec actions admin */}
        <TicketHeaderAdmin
          ticket={ticket}
          onAssignAgent={() => setShowAssignAgentModal(true)}
          onChangeStatus={() => setShowChangeStatusModal(true)}
          onAddInternalNote={() => setShowInternalNoteModal(true)}
          onRefresh={handleRefresh}
        />

        {/* Informations détaillées du ticket */}
        <TicketInfoAdmin ticket={ticket} />

        {/* Interactions et historique */}
        <InteractionsAdmin
          interactions={interactions}
          piecesJointes={piecesJointes}
          solutions={solutions}
          ticketId={parseInt(ticket.id)}
          onRefresh={handleRefresh}
          loading={loadingDetails}
        />
      </div>

      {/* Modales admin */}
      <AssignAgentModal
        isOpen={showAssignAgentModal}
        onClose={() => setShowAssignAgentModal(false)}
        agents={agents}
        onAssign={handleAssignAgent}
        currentAgent={ticket.agentAssigné}
      />

      <ChangeStatusModal
        isOpen={showChangeStatusModal}
        onClose={() => setShowChangeStatusModal(false)}
        currentStatus={ticket.etat || ''}
        onStatusChange={handleChangeStatus}
      />

      <AddInternalNoteModal
        isOpen={showInternalNoteModal}
        onClose={() => setShowInternalNoteModal(false)}
        onAddNote={handleAddInternalNote}
        ticketReference={ticket.reference}
      />
    </div>
  );
}