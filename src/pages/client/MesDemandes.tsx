import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import FilterBar from '../../components/common/FilterBar';
import { TicketsTable } from '../../components/demande/listeDemande/TicketsTable';
import { Pagination } from '../../components/demande/listeDemande/Pagination';
import { useTickets } from '../../hooks/ticket/useTicket';
import { useProduits } from '../../hooks/demandes/useProduits';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

export default function MesDemandes() {
  const [etat, setEtat] = useState('');
  const [reference, setReference] = useState('');
  const [produitId, setProduitId] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const { t } = useAppTranslation(['common', 'requests']);
  
  const { produits, loading: produitsLoading, error: produitsError } = useProduits();

  // Options pour le filtre produit
  const produitOptions = produits.map(produit => ({
    value: produit.parcId,
    label: produit.parcName
  }));

  // Options pour le filtre état (adaptez selon vos statuts)
  const etatOptions = [
    { value: '1', label: t('requests:status.open') || 'Ouvert' },
    { value: '2', label: t('requests:status.inProgress') || 'En cours' },
    { value: '3', label: t('requests:status.pending') || 'En attente' },
    { value: '6', label: t('requests:status.resolved') || 'Résolu' },
    { value: '7', label: t('requests:status.closed') || 'Clôturé' }
  ];

  const {
    tickets,
    loading: ticketsLoading,
    pagination,
    goToPage,
    changePageSize
  } = useTickets({
    etat,
    reference,
    produit: produitId,
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
            {t('requests:myRequests')}
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
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#4fa8c5'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#6dd5ed'}
          >
            {t('requests:newRequest')}
          </Link>
        </div>

        {/* Message d'erreur pour les produits */}
        {produitsError && (
          <div style={{
            background: '#ffeaa7',
            padding: '10px 15px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid #fdcb6e'
          }}>
            ⚠️ {produitsError}
          </div>
        )}

        <FilterBar
          filters={[
            { 
              label: t('requests:filters.status'), 
              value: etat, 
              onChange: setEtat,
              type: 'select',
              options: etatOptions
            },
            { 
              label: t('requests:filters.ticketReference'), 
              value: reference, 
              onChange: setReference,
              placeholder: t('requests:filters.referencePlaceholder') || 'Référence...'
            },
            { 
              label: t('requests:filters.product'), 
              value: produitId, 
              onChange: setProduitId,
              type: 'select',
              options: produitOptions,
              placeholder: produitsLoading ? 'Chargement...' : 'Sélectionner un produit'
            },
            { 
              label: t('requests:filters.startDate'), 
              value: dateDebut, 
              onChange: setDateDebut, 
              type: 'date' 
            },
            { 
              label: t('requests:filters.endDate'), 
              value: dateFin, 
              onChange: setDateFin, 
              type: 'date' 
            },
          ]}
        />

        <Pagination
          pagination={pagination}
          onPageChange={goToPage}
          onPageSizeChange={changePageSize}
        />

        <TicketsTable 
          tickets={tickets} 
          loading={ticketsLoading || produitsLoading} 
        />
      </div>
    </div>
  );
}