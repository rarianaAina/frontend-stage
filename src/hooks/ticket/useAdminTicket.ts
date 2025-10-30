import { useState, useEffect } from 'react';
import { adminTicketService, Ticket, TicketFiltres, TicketReponse } from '../../services/adminTicketService';

export const useAdminTickets = (filtres: TicketFiltres = {}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    size: 10,
    number: 0
  });

  const fetchTickets = async (filtres: TicketFiltres = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const defaultFiltres = {
        page: 0,
        size: 10,
        ...filtres
      };
      
      console.log('Fetching tickets with filters:', defaultFiltres);
      const response: TicketReponse = await adminTicketService.getTickets(defaultFiltres);
      console.log('Processed API Response:', response);
      
      setTickets(response.content || []);
      setPagination({
        totalElements: response.totalElements || 0,
        totalPages: response.totalPages || 0,
        size: response.size || 10,
        number: response.number || 0
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des tickets');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(filtres);
  }, [
    filtres.etat, 
    filtres.reference, 
    filtres.produit, 
    filtres.dateDebut, 
    filtres.dateFin, 
    filtres.societe, 
    filtres.priorite,
    filtres.page,
    filtres.size
  ]);

  const changerPage = (page: number) => {
    fetchTickets({ ...filtres, page });
  };

  const refetch = () => {
    fetchTickets(filtres);
  };

  return {
    tickets,
    loading,
    error,
    pagination,
    refetch,
    changerPage
  };
};