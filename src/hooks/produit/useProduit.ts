import { useState, useEffect } from 'react';
import { api } from '../../lib/api';

export interface Produit {
  id: number;
  codeProduit: string;
  description?: string;
}

export const useProduits = () => {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const companyId = localStorage.getItem("companyId");
  
  console.log('Company ID récupéré:', companyId);

  useEffect(() => {
    // Si pas de companyId, on arrête le chargement
    if (!companyId) {
      console.error('Company ID non trouvé dans le localStorage');
      setError('Company ID non trouvé');
      setLoading(false);
      return;
    }

    api.get(`/produits/parcs/company/${companyId}/with-username`)
      .then((res) => {
        console.log('Produits récupérés:', res.data);
        setProduits(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des produits:', err);
        setError('Impossible de charger les produits');
        setProduits([]);
      })
      .finally(() => setLoading(false));
  }, [companyId]); // Dépendance sur companyId

  return { produits, loading, error };
};