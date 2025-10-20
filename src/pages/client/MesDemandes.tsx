import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import FilterBar from '../../components/FilterBar';
import { api } from '../../lib/api';

type Ticket = {
  id: string;
  reference: string;
  produit: string;
  description: string;
  prioriteTicketId: string;
  dateCreation: string;
  dateCloture: string;
  etat: string;
};

type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};

// Mapping des priorités
const PRIORITE_MAPPING: { [key: string]: string } = {
  '0': 'Basse',
  '1': 'Moyenne',
  '2': 'Haute',
  '3': 'Urgente',
  'low': 'Basse',
  'medium': 'Moyenne',
  'high': 'Haute',
  'urgent': 'Urgente'
};

// Fonction utilitaire pour obtenir le texte de priorité
const getPrioriteText = (prioriteId: string): string => {
  return PRIORITE_MAPPING[prioriteId] || prioriteId;
};

// Composant pour gérer l'affichage de la description avec "Voir plus"
const DescriptionAvecVoirPlus = ({ description, maxLength = 100 }: { description: string; maxLength?: number }) => {
  const [voirPlus, setVoirPlus] = useState(false);
  
  if (!description) {
    return <span>-</span>;
  }

  const descriptionTronquee = description.length > maxLength 
    ? description.substring(0, maxLength) + '...' 
    : description;

  return (
    <div>
      <span style={{ 
        display: 'block',
        lineHeight: '1.4',
        wordBreak: 'break-word'
      }}>
        {voirPlus ? description : descriptionTronquee}
      </span>
      {description.length > maxLength && (
        <button
          onClick={() => setVoirPlus(!voirPlus)}
          style={{
            background: 'none',
            border: 'none',
            color: '#17a2b8',
            cursor: 'pointer',
            fontSize: '14px',
            padding: '4px 0',
            textDecoration: 'underline',
            fontWeight: '500'
          }}
        >
          {voirPlus ? 'Voir moins' : 'Voir plus'}
        </button>
      )}
    </div>
  );
};

export default function MesDemandes() {
  const navigate = useNavigate();
  const [etat, setEtat] = useState('');
  const [reference, setReference] = useState('');
  const [produit, setProduit] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États pour la pagination
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10 // Taille de page par défaut
  });

  // Charger les tickets avec pagination
  const loadTickets = (page: number = 0, size: number = pagination.pageSize) => {
    const utilisateurId = localStorage.getItem('userId');
    console.log('Chargement des tickets - userId:', utilisateurId, 'page:', page, 'size:', size);
    
    if (!utilisateurId) return;

    setLoading(true);
    api.get(`/tickets/utilisateur/${utilisateurId}/page/${page}/size/${size}`)
      .then((res) => {
        setTickets(res.data);
        
        // Mettre à jour les informations de pagination
        // Note: Vous devrez peut-être adapter selon la structure de réponse de votre API
        // Si votre API renvoie des métadonnées de pagination, utilisez-les ici
        setPagination(prev => ({
          ...prev,
          currentPage: page,
          pageSize: size,
          // Ces valeurs devraient venir de votre API
          // totalPages: res.data.totalPages,
          // totalElements: res.data.totalElements
        }));
        
        console.log(`Chargé ${res.data.length} tickets pour la page ${page}`);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des tickets:', err);
        setTickets([]);
      })
      .finally(() => setLoading(false));
  };

  // Chargement initial
  useEffect(() => {
    loadTickets(0);
  }, []);

  // Gestionnaires de pagination
  const goToPage = (page: number) => {
    if (page >= 0 && page < pagination.totalPages) {
      loadTickets(page);
    }
  };

  const nextPage = () => {
    if (pagination.currentPage < pagination.totalPages - 1) {
      goToPage(pagination.currentPage + 1);
    }
  };

  const prevPage = () => {
    if (pagination.currentPage > 0) {
      goToPage(pagination.currentPage - 1);
    }
  };

  // Changer la taille de la page
  const changePageSize = (newSize: number) => {
    loadTickets(0, newSize);
  };

  // Générer les boutons de pagination
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(0, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages - 1, startPage + maxVisiblePages - 1);
    
    // Ajuster si on est près de la fin
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    // Bouton précédent
    buttons.push(
      <button
        key="prev"
        onClick={prevPage}
        disabled={pagination.currentPage === 0}
        style={{
          background: pagination.currentPage === 0 ? '#ccc' : '#17a2b8',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          cursor: pagination.currentPage === 0 ? 'not-allowed' : 'pointer',
          fontSize: '18px'
        }}
      >
        &lt;
      </button>
    );

    // Boutons de pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          style={{
            background: i === pagination.currentPage ? '#17a2b8' : '#a0e7f0',
            color: i === pagination.currentPage ? 'white' : 'black',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: i === pagination.currentPage ? 'bold' : 'normal'
          }}
        >
          {i + 1}
        </button>
      );
    }

    // Bouton suivant
    buttons.push(
      <button
        key="next"
        onClick={nextPage}
        disabled={pagination.currentPage >= pagination.totalPages - 1}
        style={{
          background: pagination.currentPage >= pagination.totalPages - 1 ? '#ccc' : '#17a2b8',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          cursor: pagination.currentPage >= pagination.totalPages - 1 ? 'not-allowed' : 'pointer',
          fontSize: '18px'
        }}
      >
        &gt;
      </button>
    );

    return buttons;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="client" />

      <div style={{ padding: '40px 60px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ fontSize: '42px', color: '#17a2b8', fontWeight: 'bold' }}>
            Mes demandes
          </h1>
          <Link
            to="/nouvelle-demande"
            style={{
              background: '#6dd5ed',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Nouvelle demande
          </Link>
        </div>

        <h3 style={{
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textDecoration: 'underline'
        }}>
          Filtres:
        </h3>

        <FilterBar
          filters={[
            { label: 'Etat:', value: etat, onChange: setEtat },
            { label: 'Référence ticket:', value: reference, onChange: setReference },
            { label: 'Produit:', value: produit, onChange: setProduit },
            { label: 'Date début:', value: dateDebut, onChange: setDateDebut, type: 'date' },
            { label: 'Date fin:', value: dateFin, onChange: setDateFin, type: 'date' },
          ]}
        />

        {/* Sélecteur de taille de page */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '10px'
        }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>
            Éléments par page:
          </label>
          <select
            value={pagination.pageSize}
            onChange={(e) => changePageSize(Number(e.target.value))}
            style={{
              padding: '5px 10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', margin: '40px' }}>Chargement...</div>
        ) : (
          <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr style={{ background: '#e5e5e5' }}>
                  <th style={{ padding: '16px', textAlign: 'left' }}>
                    Référence ticket <span style={{ color: '#3b82f6' }}>▼</span>
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>
                    Produit <span style={{ color: '#3b82f6' }}>▼</span>
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Description</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>
                    Niveau <span style={{ color: '#3b82f6' }}>▼</span>
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>
                    Date de soumission <span style={{ color: '#3b82f6' }}>▼</span>
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>
                    Date de clôture <span style={{ color: '#3b82f6' }}>▼</span>
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>
                    Etat <span style={{ color: '#3b82f6' }}>▼</span>
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '16px' }}>{ticket.reference}</td>
                    <td style={{ padding: '16px' }}>{ticket.produit}</td>
                    <td style={{ 
                      padding: '16px', 
                      maxWidth: '300px',
                      minWidth: '200px'
                    }}>
                      <DescriptionAvecVoirPlus 
                        description={ticket.description} 
                        maxLength={80} 
                      />
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        background: getCouleurPriorite(ticket.prioriteTicketId),
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        display: 'inline-block',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {getPrioriteText(ticket.prioriteTicketId)}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        background: '#e5e5e5',
                        padding: '8px 16px',
                        borderRadius: '15px',
                        display: 'inline-block'
                      }}>
                        {ticket.dateCreation}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      {ticket.dateCloture ? (
                        <span style={{
                          background: '#e5e5e5',
                          padding: '8px 16px',
                          borderRadius: '15px',
                          display: 'inline-block'
                        }}>
                          {ticket.dateCloture}
                        </span>
                      ) : (
                        <span style={{
                          background: '#e5e5e5',
                          padding: '8px 16px',
                          borderRadius: '15px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{ fontSize: '18px' }}>📅</span>
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px' }}>{ticket.etat}</td>
                    <td style={{ padding: '16px' }}>
                      <button
                        onClick={() => navigate(`/ticket/${ticket.id}`)}
                        style={{
                          background: '#6dd5ed',
                          color: 'white',
                          padding: '8px 20px',
                          borderRadius: '20px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '30px',
          alignItems: 'center'
        }}>
          {renderPaginationButtons()}
        </div>

        {/* Informations de pagination */}
        <div style={{
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '14px',
          color: '#666'
        }}>
          Page {pagination.currentPage + 1} sur {pagination.totalPages || 1} 
          {pagination.totalElements > 0 && ` - ${pagination.totalElements} éléments au total`}
        </div>
      </div>
    </div>
  );
}

// Fonction pour obtenir la couleur en fonction de la priorité
function getCouleurPriorite(prioriteId: string): string {
  const priorite = getPrioriteText(prioriteId).toLowerCase();
  
  switch (priorite) {
    case 'basse':
      return '#10b981'; // Vert
    case 'moyenne':
      return '#f59e0b'; // Orange
    case 'haute':
      return '#ef4444'; // Rouge
    case 'urgente':
      return '#dc2626'; // Rouge foncé
    default:
      return '#6b7280'; // Gris par défaut
  }
}