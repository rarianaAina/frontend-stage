import { useState, useEffect } from 'react';
import { CreditHoraire } from '../../types/dashboard';
import { dashboardService } from '../../services/dashboardService';

interface Produit {
  parcId: string;
  parcName: string;
}

interface UseCreditsHorairesReturn {
  credits: { [key: string]: CreditHoraire[] };
  loading: boolean;
  error: string | null;
  loadCredits: () => Promise<void>;
}

export const useCreditsHoraires = (produits: Produit[], companyId: string): UseCreditsHorairesReturn => {
  const [credits, setCredits] = useState<{ [key: string]: CreditHoraire[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCredits = async () => {
    if (!companyId || produits.length === 0) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const creditsParProduit: { [key: string]: CreditHoraire[] } = {};
      
      for (const produit of produits) {
        try {
          const creditsDuProduit = await dashboardService.getCreditsHorairesParProduit(
            companyId, 
            produit.parcId.toString()
          );
          
          creditsParProduit[produit.parcId] = creditsDuProduit;
        } catch (err) {
          console.error(`Erreur pour le produit ${produit.parcName}:`, err);
          creditsParProduit[produit.parcId] = [];
        }
      }
      
      setCredits(creditsParProduit);
    } catch (err) {
      const errorMessage = 'Erreur lors du chargement des crédits horaires';
      console.error(errorMessage, err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (produits.length > 0) {
      loadCredits();
    }
  }, [produits, companyId]);

  return { credits, loading, error, loadCredits };
};