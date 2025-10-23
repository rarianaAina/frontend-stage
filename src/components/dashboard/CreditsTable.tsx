import { useState, useEffect } from 'react';
import { CreditHoraire } from '../../types/dashboard';
import { dashboardService } from '../../services/dashboardService';
import { useProduits } from '../../hooks/demandes/useProduits';

export const CreditsTable = () => {
  const [credits, setCredits] = useState<{ [key: string]: CreditHoraire[] }>({});
  const [loading, setLoading] = useState(true);
  const { produits, loading: loadingProduits } = useProduits();
  const companyId = localStorage.getItem('companyId') || '';

  const loadCredits = async () => {
    if (!companyId || produits.length === 0) return;

    try {
      setLoading(true);
      
      // Pour chaque produit, récupérer tous les crédits
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
      console.error('Erreur lors du chargement des crédits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (produits.length > 0) {
      loadCredits();
    }
  }, [produits]);

  // Calculer les totaux par produit
  const creditsResumes = produits.map(produit => {
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

  if (loadingProduits || loading) {
    return (
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        color: '#666'
      }}>
        Chargement des crédits horaires...
      </div>
    );
  }

  if (produits.length === 0) {
    return (
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic'
      }}>
        Aucun produit disponible
      </div>
    );
  }

  return (
    <div>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '15px',
        color: '#333'
      }}>
        Crédits Horaires
      </h3>
      
      <table style={{
        width: '100%',
        background: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderCollapse: 'collapse'
      }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Produit</th>
            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Disponible</th>
            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Consommé</th>
            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Reste</th>
          </tr>
        </thead>
        <tbody>
          {creditsResumes.map((credit, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px', fontWeight: '500' }}>{credit.product}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>{credit.initial}h</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>{credit.used}h</td>
              <td style={{ 
                padding: '12px', 
                textAlign: 'center',
                fontWeight: 'bold',
                color: credit.remaining < 10 ? '#dc3545' : '#28a745'
              }}>
                {credit.remaining}h
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};