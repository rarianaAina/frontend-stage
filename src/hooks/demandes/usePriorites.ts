import { useState, useEffect } from 'react';
import { ticketService, PrioriteTicket } from '../../services/ticketService';

export const usePriorites = () => {
  const [priorites, setPriorites] = useState<PrioriteTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const chargerPriorites = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await ticketService.getPriorites();
        setPriorites(data);
      } catch (err) {
        console.error('Erreur lors du chargement des priorités:', err);
        setError('Erreur lors du chargement des priorités');
      } finally {
        setLoading(false);
      }
    };

    chargerPriorites();
  }, []);

  return { priorites, loading, error };
};