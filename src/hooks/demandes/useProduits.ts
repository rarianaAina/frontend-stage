import { useState, useEffect } from 'react';
import { ticketService, Produit } from '../../services/ticketService';

export const useProduits = () => {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const chargerProduits = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await ticketService.getProduitsActifs();
        setProduits(data);
      } catch (err) {
        console.error('Erreur lors du chargement des produits:', err);
        setError('Impossible de charger la liste des produits');
      } finally {
        setLoading(false);
      }
    };

    chargerProduits();
  }, []);

  return { produits, loading, error };
};