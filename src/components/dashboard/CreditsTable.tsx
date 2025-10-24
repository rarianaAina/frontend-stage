// components/dashboard/CreditsTable.tsx
import { useCreditsHoraires } from '../../hooks/dashboard/useCreditsHoraires';
import { useCreditsResumes } from '../../hooks/dashboard/useCreditsResumes';
import { useProduits } from '../../hooks/demandes/useProduits';

export const CreditsTable = () => {
  const companyId = localStorage.getItem('companyId') || '';
  const { produits, loading: loadingProduits } = useProduits();
  const { credits, loading: loadingCredits } = useCreditsHoraires(produits, companyId);
  const creditsResumes = useCreditsResumes(produits, credits);

  const loading = loadingProduits || loadingCredits;

  if (loading) {
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
                color: credit.remaining < 5 ? '#dc3545' : '#28a745'
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