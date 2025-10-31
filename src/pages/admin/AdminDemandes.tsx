import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useAdminTickets } from '../../hooks/ticket/useAdminTicket';
import { TicketFiltres } from '../../services/adminTicketService';
import { FiltresTickets } from '../../components/ticket/admin/FiltresTickets';
import { Pagination } from '../../components/ticket/admin/Pagination';
import { LoadingState } from '../../components/dashboard/LoadingState';
import { ErrorState } from '../../components/dashboard/ErrorState';
import { useDebounce } from '../../hooks/ticket/admin/useDebounce';
import '../../styles/AdminDemandes.css';

export default function AdminDemandes() {
  const navigate = useNavigate();
  const [filtres, setFiltres] = useState<TicketFiltres>({
    page: 0,
    size: 10
  });

  // Utilisez le debounce pour les filtres avec un délai de 500ms
  const debouncedFiltres = useDebounce(filtres, 500);

  const { tickets, loading, error, pagination, refetch, changerPage } = useAdminTickets(debouncedFiltres);

  const getStatusLabel = (etat: string): string => {
    switch (etat) {
      case '1': return 'Nouveau';
      case '2': return 'En cours';
      case '3': return 'En attente';
      case '4': return 'En attente client';
      case '5': return 'Planifié';
      case '6': return 'Résolu';
      case '7': return 'Clôturé';
      default: return etat || 'Inconnu';
    }
  };

  const getPrioriteLabel = (prioriteTicketId: string): string => {
    switch (prioriteTicketId) {
      case '1': return 'Basse';
      case '2': return 'Normale';
      case '3': return 'Haute';
      case '4': return 'Urgente';
      default: return 'Inconnu';
    }
  };

  const getStatusColor = (etat: string) => {
    switch (etat) {
      case '1': return '#3b82f6'; // Nouveau - Bleu
      case '2': return '#10b981'; // En cours - Vert
      case '3': return '#f59e0b'; // En attente - Orange
      case '4': return '#f59e0b'; // En attente client - Orange
      case '5': return '#8b5cf6'; // Planifié - Violet
      case '6': return '#6b7280'; // Résolu - Gris
      case '7': return '#000000'; // Clôturé - Noir
      default: return '#6b7280'; // Inconnu - Gris
    }
  };

  const getNiveauColor = (prioriteTicketId: string) => {
    switch (prioriteTicketId) {
      case '4': return '#ef4444'; // Urgent - Rouge
      case '3': return '#f59e0b'; // Haute - Orange
      case '2': return '#3b82f6'; // Normale - Bleu
      case '1': return '#10b981'; // Basse - Vert
      default: return '#6b7280'; // Inconnu - Gris
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return 'Date invalide';
    }
  };

  const handleFiltresChange = (nouveauxFiltres: TicketFiltres) => {
    // Réinitialiser la page à 0 quand les filtres changent (sauf pour la pagination)
    setFiltres(prev => ({
      ...nouveauxFiltres,
      page: nouveauxFiltres.page !== undefined ? nouveauxFiltres.page : 0
    }));
  };

  if (loading) {
    return <LoadingState message="Chargement des demandes..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  const ticketsToDisplay = tickets || [];

  return (
    <div className="admin-demandes-container">
      <NavBar role="ADMIN" />

      <div className="admin-demandes-content">
        <h1 className="admin-demandes-title">
          Gestion des Demandes
        </h1>

        {/* Filtres */}
        <FiltresTickets 
          filtres={filtres} 
          onFiltresChange={handleFiltresChange} 
        />

        {/* Indicateur de recherche en cours */}
        {loading && (
          <div className="loading-indicator">
            Recherche en cours...
          </div>
        )}

        {/* Résultats */}
        <div className="results-info">
          <div className="results-count">
            {pagination.totalElements} demande(s) trouvée(s)
          </div>
          <div className="page-info">
            Page {pagination.number + 1} sur {pagination.totalPages}
          </div>
        </div>

        {/* Tableau des demandes */}
        <div className="tickets-table-container">
          <div style={{ overflowX: 'auto' }}>
            <table className="tickets-table">
              <thead>
                <tr className="table-header">
                  <th>Référence</th>
                  <th>Société</th>
                  <th>Produit</th>
                  <th>Description</th>
                  <th>Priorité</th>
                  <th>Date création</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ticketsToDisplay.length > 0 ? (
                  ticketsToDisplay.map((ticket) => (
                    <tr key={ticket.id} className="table-row">
                      <td className="table-cell reference-cell">
                        {ticket.reference || 'N/A'}
                      </td>
                      <td className="table-cell title-cell">
                        {ticket.companyName || 'Non définie'}
                      </td>
                      <td className="table-cell" style={{ whiteSpace: 'nowrap' }}>
                        {ticket.produitNom || 'Non spécifié'}
                      </td>
                      <td className="table-cell description-cell">
                        {ticket.description 
                          ? (ticket.description.length > 100 
                              ? `${ticket.description.substring(0, 100)}...` 
                              : ticket.description)
                          : 'Aucune description'
                        }
                      </td>
                      <td className="table-cell">
                        <span 
                          className="priority-badge"
                          style={{ background: getNiveauColor(ticket.prioriteTicketId) }}
                        >
                          {getPrioriteLabel(ticket.prioriteTicketId)}
                        </span>
                      </td>
                      <td className="table-cell">
                        <span className="date-badge">
                          {ticket.dateCreation ? formatDate(ticket.dateCreation) : 'N/A'}
                        </span>
                      </td>
                      <td className="table-cell">
                        <span 
                          className="status-badge"
                          style={{ background: getStatusColor(ticket.etat || '') }}
                        >
                          {getStatusLabel(ticket.etat || '')}
                        </span>
                      </td>
                      <td className="table-cell">
                        <button
                          onClick={() => navigate(`/admin/demande/${ticket.id}`)}
                          className="details-button"
                        >
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="no-results">
                      Aucune demande trouvée avec les critères sélectionnés
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Pagination 
            pageCourante={pagination.number}
            totalPages={pagination.totalPages}
            onPageChange={changerPage}
          />
        )}
      </div>
    </div>
  );
}