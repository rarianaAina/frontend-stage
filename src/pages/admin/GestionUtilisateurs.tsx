import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Modal from '../../components/Modal';

export default function GestionUtilisateurs() {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [nomFilter, setNomFilter] = useState('');
  const [prenomFilter, setPrenomFilter] = useState('');
  const [societeFilter, setSocieteFilter] = useState('');
  const [posteFilter, setPosteFilter] = useState('');
  const [etatFilter, setEtatFilter] = useState('');

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [poste, setPoste] = useState('');
  const [societe, setSociete] = useState('');
  const [dateCreation, setDateCreation] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const utilisateurs = [
    {
      id: 1,
      nom: 'RAKOTO',
      prenom: 'Alain',
      email: 'rakoto@optimada.mg',
      societe: 'OPTIMADA',
      poste: 'Consultant',
      etat: 'Actif',
      dateCreation: '01/01/2020',
      anciennete: '4 ans'
    },
    {
      id: 2,
      nom: 'ANDRIA',
      prenom: 'David',
      email: 'andri@hotmail.com',
      societe: 'ABCD',
      poste: 'Client',
      etat: 'Actif',
      dateCreation: '15/03/2021',
      anciennete: '3 ans'
    },
  ];

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCreateModal(false);
  };

  const handleShowDetails = (user: any) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="ADMIN" />

      <div style={{ padding: '40px 60px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ fontSize: '42px', color: '#17a2b8', fontWeight: 'bold' }}>
            Liste des utilisateurs
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              background: '#6dd5ed',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Nouvel utilisateur
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
          marginBottom: '30px',
          background: 'white',
          padding: '30px',
          borderRadius: '15px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Nom</label>
            <input
              type="text"
              value={nomFilter}
              onChange={(e) => setNomFilter(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Prénom(s)</label>
            <input
              type="text"
              value={prenomFilter}
              onChange={(e) => setPrenomFilter(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Société</label>
            <input
              type="text"
              value={societeFilter}
              onChange={(e) => setSocieteFilter(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Poste</label>
            <input
              type="text"
              value={posteFilter}
              onChange={(e) => setPosteFilter(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Etat</label>
            <input
              type="text"
              value={etatFilter}
              onChange={(e) => setEtatFilter(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Nom <span style={{ color: '#3b82f6' }}>▼</span></th>
              <th>Prénom</th>
              <th>Adresse email</th>
              <th>Société <span style={{ color: '#3b82f6' }}>▼</span></th>
              <th>Poste <span style={{ color: '#3b82f6' }}>▼</span></th>
              <th>Etat <span style={{ color: '#3b82f6' }}>▼</span></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map((user) => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.societe}</td>
                <td>{user.poste}</td>
                <td>{user.etat}</td>
                <td>
                  <button
                    onClick={() => handleShowDetails(user)}
                    style={{
                      background: '#6dd5ed',
                      color: 'white',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Créer un utilisateur">
        <form onSubmit={handleCreateUser}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Nom :</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Prénom(s) :</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Poste :</label>
            <input
              type="text"
              value={poste}
              onChange={(e) => setPoste(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Société :</label>
            <input
              type="text"
              value={societe}
              onChange={(e) => setSociete(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Date de création :</label>
            <input
              type="date"
              value={dateCreation}
              onChange={(e) => setDateCreation(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Adresse email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
              required
            />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>*Numéro de téléphone :</label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none' }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              background: '#10b981',
              color: 'white',
              padding: '12px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Enregistrer
          </button>
        </form>
      </Modal>

      <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} title="Détails de l'utilisateur">
        {selectedUser && (
          <div style={{ color: 'white' }}>
            <div style={{ marginBottom: '15px' }}>
              <strong>Nom :</strong> {selectedUser.nom}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Prénom(s) :</strong> {selectedUser.prenom}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Poste :</strong> {selectedUser.poste}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Société :</strong> {selectedUser.societe}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Date de création :</strong> {selectedUser.dateCreation}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Adresse email :</strong> {selectedUser.email}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Etat :</strong> {selectedUser.etat}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Ancienneté :</strong> {selectedUser.anciennete}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
