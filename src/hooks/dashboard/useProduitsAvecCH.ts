import { useMemo } from 'react';
import { CreditHoraire } from '../../types/dashboard';

interface Produit {
  parcId: string;
  parcName: string;
  dateObtention?: string;
  userId?: number;
  userFullName?: string;
}

interface ProduitAvecCH extends Produit {
  chRestant?: number;
}

export const useProduitsAvecCH = (
  produits: Produit[], 
  credits: { [key: string]: CreditHoraire[] }
): ProduitAvecCH[] => {
  return useMemo(() => {
    return produits.map(produit => {
      const creditsDuProduit = credits[produit.parcId] || [];
      
      const chRestant = creditsDuProduit.reduce((total, credit) => {
        return total + (credit.remaining || 0);
      }, 0);

      return {
        ...produit,
        chRestant: chRestant > 0 ? chRestant : undefined
      };
    });
  }, [produits, credits]);
};