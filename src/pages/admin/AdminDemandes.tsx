import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useAdminTickets } from '../../hooks/ticket/useAdminTicket';
import { TicketFiltres } from '../../services/adminTicketService';
import { FiltresTickets } from '../../components/ticket/admin/FiltresTickets';
import { Pagination } from '../../components/ticket/admin/Pagination';
import { LoadingState } from '../../components/dashboard/LoadingState';
import { ErrorState } from '../../components/dashboard/ErrorState';

export default function AdminDemandes() {
  const navigate = useNavigate();
  const [filtres, setFiltres] = useState<TicketFiltres>({
    page: 0,
    size: 10
  });

  const { tickets, loading, error, pagination, refetch, changerPage } = useAdminTickets(filtres);

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

  if (loading) {
    return <LoadingState message="Chargement des demandes..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  const ticketsToDisplay = tickets || [];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="ADMIN" />

      <div style={{ padding: '40px 60px' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#17a2b8',
          marginBottom: '30px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Gestion des Demandes
        </h1>

        {/* Filtres */}
        <FiltresTickets 
          filtres={filtres} 
          onFiltresChange={setFiltres} 
        />

        {/* Résultats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          background: 'white',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>
            {pagination.totalElements} demande(s) trouvée(s)
          </div>
          <div style={{ fontSize: '14px', color: '#17a2b8' }}>
            Page {pagination.number + 1} sur {pagination.totalPages}
          </div>
        </div>

        {/* Tableau des demandes */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              minWidth: '1000px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6', 
                    fontWeight: '600',
                    color: '#17a2b8'
                  }}>
                    Référence
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6', 
                    fontWeight: '600',
                    color: '#17a2b8'
                  }}>
                    Titre
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6', 
                    fontWeight: '600',
                    color: '#17a2b8'
                  }}>
                    Produit
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6', 
                    fontWeight: '600',
                    color: '#17a2b8'
                  }}>
                    Description
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6', 
                    fontWeight: '600',
                    color: '#17a2b8'
                  }}>
                    Priorité
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6', 
                    fontWeight: '600',
                    color: '#17a2b8'
                  }}>
                    Date création
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6', 
                    fontWeight: '600',
                    color: '#17a2b8'
                  }}>
                    Statut
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6', 
                    fontWeight: '600',
                    color: '#17a2b8'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {ticketsToDisplay.length > 0 ? (
                  ticketsToDisplay.map((ticket) => (
                    <tr key={ticket.id} style={{ 
                      borderBottom: '1px solid #dee2e6',
                      transition: 'background-color 0.2s'
                    }}>
                      <td style={{ 
                        padding: '16px', 
                        fontWeight: '600', 
                        color: '#17a2b8',
                        whiteSpace: 'nowrap'
                      }}>
                        {ticket.reference || 'N/A'}
                      </td>
                      <td style={{ padding: '16px', maxWidth: '200px' }}>
                        {ticket.titre || 'Sans titre'}
                      </td>
                      <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                        {ticket.produitNom || 'Non spécifié'}
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        maxWidth: '300px',
                        wordWrap: 'break-word'
                      }}>
                        {ticket.description 
                          ? (ticket.description.length > 100 
                              ? `${ticket.description.substring(0, 100)}...` 
                              : ticket.description)
                          : 'Aucune description'
                        }
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          background: getNiveauColor(ticket.prioriteTicketId),
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'inline-block',
                          minWidth: '70px',
                          textAlign: 'center'
                        }}>
                          {getPrioriteLabel(ticket.prioriteTicketId)}
                        </span>
                      </td>
                      <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                        <span style={{
                          background: '#e5e5e5',
                          padding: '8px 16px',
                          borderRadius: '15px',
                          display: 'inline-block',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}>
                          {ticket.dateCreation ? formatDate(ticket.dateCreation) : 'N/A'}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          background: getStatusColor(ticket.etat || ''),
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'inline-block',
                          minWidth: '80px',
                          textAlign: 'center'
                        }}>
                          {getStatusLabel(ticket.etat || '')}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <button
                          onClick={() => navigate(`/admin/demande/${ticket.id}`)}
                          style={{
                            background: '#6dd5ed',
                            color: 'white',
                            padding: '8px 20px',
                            borderRadius: '20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '600',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#17a2b8';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#6dd5ed';
                          }}
                        >
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} style={{ 
                      padding: '40px', 
                      textAlign: 'center', 
                      color: '#6c757d',
                      fontSize: '16px',
                      fontStyle: 'italic'
                    }}>
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