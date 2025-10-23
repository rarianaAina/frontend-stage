import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import FilterBar from '../../components/FilterBar';
import { TicketsTable } from '../../components/listeDemande/TicketsTable';
import { Pagination } from '../../components/listeDemande/Pagination';
import { useTickets } from '../../hooks/ticket/useTicket';

export default function MesDemandes() {
  const [etat, setEtat] = useState('');
  const [reference, setReference] = useState('');
  const [produit, setProduit] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');

  const {
    tickets,
    loading,
    pagination,
    goToPage,
    changePageSize
  } = useTickets({
    etat,
    reference,
    produit,
    dateDebut,
    dateFin
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="CLIENT" />
      
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

        <Pagination
          pagination={pagination}
          onPageChange={goToPage}
          onPageSizeChange={changePageSize}
        />

        <TicketsTable tickets={tickets} loading={loading} />
      </div>
    </div>
  );
}