import { useState, useEffect } from 'react';
import { ticketService, TypeTicket } from '../../services/ticketService';

export const useTypes = () => {
  const [types, setTypes] = useState<TypeTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const chargerTypes = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await ticketService.getTypes();
        setTypes(data);
      } catch (err) {
        console.error('Erreur lors du chargement des types:', err);
        setError('Erreur lors du chargement des types');
      } finally {
        setLoading(false);
      }
    };

    chargerTypes();
  }, []);

  return { types, loading, error };
};