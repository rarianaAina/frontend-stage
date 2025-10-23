import { useState, useEffect } from 'react';
import { Ticket, ticketService } from '../../services/ticketService';

export const useTicketDetails = (ticketId: string) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTicketDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await ticketService.getTicketDetails(ticketId);
        setTicket(data);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de charger les détails du ticket');
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      loadTicketDetails();
    }
  }, [ticketId]);

  return { ticket, loading, error };
};