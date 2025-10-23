import { DemandeIntervention } from '../../services/ticketService';

interface DemandesInterventionProps {
  demandes: DemandeIntervention[];
  onValider: (demandeId: number) => void;
  onAutreDate: (demandeId: number) => void;
}

export const DemandesIntervention = ({ demandes, onValider, onAutreDate }: DemandesInterventionProps) => {
  return (
    <div>
      <h3 style={{
        textAlign: 'center',
        fontSize: '28px',
        color: '#17a2b8',
        marginBottom: '20px'
      }}>
        Demandes d'interventions
      </h3>

      <table style={{ marginBottom: '40px' }}>
        <thead>
          <tr>
            <th>Description <span style={{ color: '#3b82f6' }}>▼</span></th>
            <th>Date d'intervention <span style={{ color: '#3b82f6' }}>▼</span></th>
            <th>Lieu <span style={{ color: '#3b82f6' }}>▼</span></th>
            <th>Etat <span style={{ color: '#3b82f6' }}>▼</span></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td>{demande.description}</td>
              <td>
                <span style={{
                  background: '#e5e5e5',
                  padding: '8px 16px',
                  borderRadius: '15px',
                  display: 'inline-block'
                }}>
                  {new Date(demande.dateIntervention).toLocaleDateString()}
                </span>
              </td>
              <td>{demande.lieu}</td>
              <td>{demande.etat}</td>
              <td>
                {demande.etat.includes('attente de confirmation date') && (
                  <>
                    <button 
                      onClick={() => onValider(demande.id)} 
                      className="btn-primary" 
                      style={{ marginRight: '10px' }}
                    >
                      Valider
                    </button>
                    <button 
                      onClick={() => onAutreDate(demande.id)} 
                      className="btn-warning"
                    >
                      Autre date
                    </button>
                  </>
                )}
                {demande.etat.includes('attente de confirmation clôture') && (
                  <button className="btn-primary">Clôturer</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};