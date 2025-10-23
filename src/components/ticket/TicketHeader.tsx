interface TicketHeaderProps {
  reference: string;
  statut: string;
  dateSoumission: string;
  produit: string;
  onRelancer: () => void;
  onAjouterPJ: () => void;
  onCloturer: () => void;
}

export const TicketHeader = ({ 
  reference, 
  statut, 
  dateSoumission, 
  produit, 
  onRelancer, 
  onAjouterPJ, 
  onCloturer 
}: TicketHeaderProps) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      marginBottom: '40px'
    }}>
      <div style={{
        background: 'rgba(200, 240, 180, 0.7)',
        padding: '30px',
        borderRadius: '20px'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#17a2b8' }}>Référence :</strong> {reference}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#17a2b8' }}>Statut :</strong> {statut}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#17a2b8' }}>Date de soumission :</strong> {new Date(dateSoumission).toLocaleDateString()}
        </div>
        <div>
          <strong style={{ color: '#17a2b8' }}>Produit :</strong> {produit}
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          textAlign: 'center',
          color: '#17a2b8',
          textDecoration: 'underline',
          marginBottom: '20px'
        }}>
          Actions supplémentaires
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px'
        }}>
          <button onClick={onRelancer} className="btn-warning">
            Relancer
          </button>
          <button onClick={onAjouterPJ} style={{
            background: '#c8f7dc',
            color: 'black'
          }}>
            Rajouter PJ
          </button>
          <button style={{ background: '#ffd700', color: 'black' }}>
            Renvoyer une fiche
          </button>
          <button onClick={onCloturer} className="btn-primary">
            Clôturer ticket
          </button>
        </div>
      </div>
    </div>
  );
};