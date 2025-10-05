import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Modal from '../../components/Modal';

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRelanceModal, setShowRelanceModal] = useState(false);
  const [showPJModal, setShowPJModal] = useState(false);
  const [showClotureModal, setShowClotureModal] = useState(false);
  const [showAutreDateModal, setShowAutreDateModal] = useState(false);
  const [showValiderModal, setShowValiderModal] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="client" />

      <div style={{ padding: '40px 60px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: '#17a2b8',
            color: 'white',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            marginBottom: '20px'
          }}
        >
          ←
        </button>

        <h2 style={{
          fontSize: '32px',
          color: '#17a2b8',
          marginBottom: '30px',
          textDecoration: 'underline'
        }}>
          Détails du ticket : + référence : ABC123
        </h2>

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
              <strong style={{ color: '#17a2b8' }}>Référence :</strong> ABC123
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#17a2b8' }}>Statut :</strong> En cours
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#17a2b8' }}>Date de soumission :</strong> 15/09/2024
            </div>
            <div>
              <strong style={{ color: '#17a2b8' }}>Produit :</strong> Test
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
              <button onClick={() => setShowRelanceModal(true)} className="btn-warning">
                Relancer
              </button>
              <button onClick={() => setShowPJModal(true)} style={{
                background: '#c8f7dc',
                color: 'black'
              }}>
                Rajouter PJ
              </button>
              <button style={{ background: '#ffd700', color: 'black' }}>
                Renvoyer une fiche
              </button>
              <button onClick={() => setShowClotureModal(true)} className="btn-primary">
                Clôturer ticket
              </button>
            </div>
          </div>
        </div>

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
            <tr>
              <td>Test</td>
              <td>
                <span style={{
                  background: '#e5e5e5',
                  padding: '8px 16px',
                  borderRadius: '15px',
                  display: 'inline-block'
                }}>
                  15/09/2025
                </span>
              </td>
              <td>Sur site</td>
              <td>En attente de confirmation date intervention</td>
              <td>
                <button onClick={() => setShowValiderModal(true)} className="btn-primary" style={{ marginRight: '10px' }}>
                  Valider
                </button>
                <button onClick={() => setShowAutreDateModal(true)} className="btn-warning">
                  Autre date
                </button>
              </td>
            </tr>
            <tr>
              <td>Test</td>
              <td>
                <span style={{
                  background: '#e5e5e5',
                  padding: '8px 16px',
                  borderRadius: '15px',
                  display: 'inline-block'
                }}>
                  15/09/2025
                </span>
              </td>
              <td>Sur site</td>
              <td>En attente de confirmation clôture</td>
              <td>
                <button className="btn-primary">Clôturer</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px'
        }}>
          <div>
            <h3 style={{
              textAlign: 'center',
              fontSize: '24px',
              color: '#17a2b8',
              marginBottom: '20px'
            }}>
              Interactions
            </h3>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Commentaires</th>
                  <th>PJ</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Relance</td>
                  <td>15/09/2025</td>
                  <td>C'est pour une relance</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Reponse</td>
                  <td>15/09/2025</td>
                  <td>Veuillez suivre les étapes en PJ</td>
                  <td>IMAGE.JPG</td>
                  <td>
                    <button className="btn-primary">Répondre</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 style={{
              textAlign: 'center',
              fontSize: '24px',
              color: '#17a2b8',
              marginBottom: '20px'
            }}>
              Pièces jointes
            </h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>PJ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15/09/2025</td>
                  <td>IMAGE.JPG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={showRelanceModal} onClose={() => setShowRelanceModal(false)} title="Relancer un ticket">
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Référence :</label>
          <input type="text" value="ABC123" disabled style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Niveau :</label>
          <select style={{ width: '100%' }}>
            <option>Urgent</option>
            <option>Critique</option>
          </select>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Commentaires :</label>
          <textarea style={{ width: '100%', minHeight: '100px' }} />
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button className="btn-primary">Valider</button>
          <button className="btn-warning" onClick={() => setShowRelanceModal(false)}>Annuler</button>
        </div>
      </Modal>

      <Modal isOpen={showPJModal} onClose={() => setShowPJModal(false)} title="Rajouter une PJ">
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Référence :</label>
          <input type="text" value="ABC123" disabled style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Pièces jointes</label>
          <button style={{
            width: '100%',
            background: 'white',
            color: '#333',
            padding: '12px',
            borderRadius: '20px',
            border: '1px solid #ddd'
          }}>
            Parcourir ...
          </button>
          <p style={{ fontSize: '12px', color: 'white', marginTop: '5px', textAlign: 'center' }}>
            (PDF, DOCX, JPEG - 20 Mo max)
          </p>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Commentaires :</label>
          <textarea style={{ width: '100%', minHeight: '100px' }} />
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button className="btn-primary">Valider</button>
          <button className="btn-warning" onClick={() => setShowPJModal(false)}>Annuler</button>
        </div>
      </Modal>

      <Modal isOpen={showClotureModal} onClose={() => setShowClotureModal(false)} title="Clôturer un ticket">
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Référence :</label>
          <input type="text" value="ABC123" disabled style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Statut :</label>
          <input type="text" value="Clôturé" disabled style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Pièces jointes :</label>
          <button style={{
            width: '100%',
            background: 'white',
            color: '#333',
            padding: '12px',
            borderRadius: '20px',
            border: '1px solid #ddd'
          }}>
            Parcourir ...
          </button>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Solutions :</label>
          <textarea style={{ width: '100%', minHeight: '120px' }} />
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button className="btn-primary">Valider</button>
          <button className="btn-warning" onClick={() => setShowClotureModal(false)}>Annuler</button>
        </div>
      </Modal>

      <Modal isOpen={showAutreDateModal} onClose={() => setShowAutreDateModal(false)} title="Autre date d'intervention">
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Référence :</label>
          <input type="text" value="ABC123" disabled style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Statut :</label>
          <input type="text" disabled style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Nouvelle date :</label>
          <input type="date" style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Commentaires :</label>
          <textarea style={{ width: '100%', minHeight: '100px' }} />
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button className="btn-primary">Valider</button>
          <button className="btn-warning" onClick={() => setShowAutreDateModal(false)}>Annuler</button>
        </div>
      </Modal>

      <Modal isOpen={showValiderModal} onClose={() => setShowValiderModal(false)} title="Valider une intervention">
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Référence :</label>
          <input type="text" value="ABC123" disabled style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Statut :</label>
          <input type="text" disabled style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Date :</label>
          <input type="date" disabled style={{ width: '100%' }} />
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button className="btn-primary">Valider</button>
          <button className="btn-warning" onClick={() => setShowValiderModal(false)}>Annuler</button>
        </div>
      </Modal>
    </div>
  );
}
