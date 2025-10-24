import { useMemo } from 'react';
import { CreditHoraire } from '../../types/dashboard';

interface Produit {
  parcId: string;
  parcName: string;
}

interface CreditResume {
  product: string;
  initial: number;
  used: number;
  remaining: number;
}

export const useCreditsResumes = (
  produits: Produit[], 
  credits: { [key: string]: CreditHoraire[] }
): CreditResume[] => {
  return useMemo(() => {
    return produits.map(produit => {
      const creditsDuProduit = credits[produit.parcId] || [];
      
      const totalInitial = creditsDuProduit.reduce((sum, credit) => sum + credit.initial, 0);
      const totalUsed = creditsDuProduit.reduce((sum, credit) => sum + credit.used, 0);
      const totalRemaining = creditsDuProduit.reduce((sum, credit) => sum + credit.remaining, 0);
      
      return {
        product: produit.parcName,
        initial: totalInitial,
        used: totalUsed,
        remaining: totalRemaining
      };
    });
  }, [produits, credits]);
};