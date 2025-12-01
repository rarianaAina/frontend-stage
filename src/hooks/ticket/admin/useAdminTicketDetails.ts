import { useState, useEffect } from 'react';
import { adminTicketService, Ticket } from '../../../services/adminTicketService';

export const useAdminTicketDetails = (ticketId: string) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTicket = async () => {
    if (!ticketId) {
      setError('ID du ticket manquant');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const ticketData = await adminTicketService.getTicketDetails(ticketId);
      console.log('Ticket datas :', ticketData);
      setTicket(ticketData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement du ticket');
      console.error('Error fetching ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]); // ✅ Seulement ticketId dans les dépendances

  return { ticket, loading, error, refetch: fetchTicket };
};