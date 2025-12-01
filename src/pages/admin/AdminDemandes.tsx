import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import { useAdminTickets } from '../../hooks/ticket/useAdminTicket';
import { TicketFiltres } from '../../services/adminTicketService';
import { FiltresTickets } from '../../components/ticket/admin/FiltresTickets';
import { Pagination } from '../../components/ticket/admin/Pagination';
import { LoadingState } from '../../components/dashboard/LoadingState';
import { ErrorState } from '../../components/dashboard/ErrorState';
import { useDebounce } from '../../hooks/ticket/admin/useDebounce';
import { useAppTranslation } from '../../hooks/translation/useTranslation';
import '../../styles/AdminDemandes.css';

export default function AdminDemandes() {
  const navigate = useNavigate();
  const { t } = useAppTranslation(['common', 'tickets', 'admin']);
  
  const [filtres, setFiltres] = useState<TicketFiltres>({
    page: 0,
    size: 10
  });

  // Utilisez le debounce pour les filtres avec un délai de 500ms
  const debouncedFiltres = useDebounce(filtres, 500);

  const { tickets, loading, error, pagination, refetch, changerPage } = useAdminTickets(debouncedFiltres);

  const getStatusLabel = (etat: string): string => {
    switch (etat) {
      case '1': return t('tickets:status.new');
      case '2': return t('tickets:status.inProgress');
      case '3': return t('tickets:status.pending');
      case '4': return t('tickets:status.waitingClient');
      case '5': return t('tickets:status.scheduled');
      case '6': return t('tickets:status.resolved');
      case '7': return t('tickets:status.closed');
      default: return etat || t('common:unknown');
    }
  };

  const getPrioriteLabel = (prioriteTicketId: string): string => {
    switch (prioriteTicketId) {
      case '1': return t('tickets:priority.low');
      case '2': return t('tickets:priority.normal');
      case '3': return t('tickets:priority.high');
      case '4': return t('tickets:priority.urgent');
      default: return t('common:unknown');
    }
  };

  const getStatusColor = (etat: string) => {
    switch (etat) {
      case '1': return '#3b82f6';
      case '2': return '#10b981';
      case '3': return '#f59e0b';
      case '4': return '#f59e0b';
      case '5': return '#8b5cf6';
      case '6': return '#6b7280';
      case '7': return '#000000';
      default: return '#6b7280';
    }
  };

  const getNiveauColor = (prioriteTicketId: string) => {
    switch (prioriteTicketId) {
      case '4': return '#ef4444';
      case '3': return '#f59e0b';
      case '2': return '#3b82f6';
      case '1': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      // Utiliser la locale basée sur la langue actuelle
      const locale = t('common:locale') || 'fr-FR';
      return new Date(dateString).toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return t('common:invalidDate');
    }
  };

  const handleFiltresChange = (nouveauxFiltres: TicketFiltres) => {
    setFiltres(prev => ({
      ...nouveauxFiltres,
      page: nouveauxFiltres.page !== undefined ? nouveauxFiltres.page : 0
    }));
  };

  if (loading) {
    return <LoadingState message={t('tickets:loadingRequests')} />;
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
          {t('admin:demandesManagement')}
        </h1>

        {/* Filtres */}
        <FiltresTickets 
          filtres={filtres} 
          onFiltresChange={handleFiltresChange} 
        />

        {/* Indicateur de recherche en cours */}
        {loading && (
          <div className="loading-indicator">
            {t('tickets:searching')}
          </div>
        )}

        {/* Résultats */}
        <div className="results-info">
          <div className="results-count">
            {pagination.totalElements} {t('tickets:requestsFound')}
          </div>
          <div className="page-info">
            {t('common:page')} {pagination.number + 1} {t('common:of')} {pagination.totalPages}
          </div>
        </div>

        {/* Tableau des demandes */}
        <div className="tickets-table-container">
          <div style={{ overflowX: 'auto' }}>
            <table className="tickets-table">
              <thead>
                <tr className="table-header">
                  <th>{t('tickets:reference')}</th>
                  <th>{t('tickets:company')}</th>
                  <th>{t('tickets:product')}</th>
                  <th>{t('tickets:description')}</th>
                  <th>{t('tickets:priority.label')}</th>
                  <th>{t('tickets:creationDate')}</th>
                  <th>{t('tickets:status.label')}</th>
                  <th>{t('common:actions')}</th>
                </tr>
              </thead>
              <tbody>
                {ticketsToDisplay.length > 0 ? (
                  ticketsToDisplay.map((ticket) => (
                    <tr key={ticket.id} className="table-row">
                      <td className="table-cell reference-cell">
                        {ticket.reference || t('common:notAvailable')}
                      </td>
                      <td className="table-cell title-cell">
                        {ticket.companyName || t('tickets:companyNotDefined')}
                      </td>
                      <td className="table-cell" style={{ whiteSpace: 'nowrap' }}>
                        {ticket.produitNom || t('tickets:productNotSpecified')}
                      </td>
                      <td className="table-cell description-cell">
                        {ticket.description 
                          ? (ticket.description.length > 100 
                              ? `${ticket.description.substring(0, 100)}...` 
                              : ticket.description)
                          : t('tickets:noDescription')
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
                          {ticket.dateCreation ? formatDate(ticket.dateCreation) : t('common:notAvailable')}
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
                          onClick={() => navigate(`/admin/ticket/${ticket.id}`)}
                          className="details-button"
                        >
                          {t('common:details')}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="no-results">
                      {t('tickets:noRequestsFound')}
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