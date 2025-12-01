import { useState, useEffect, useCallback } from 'react';
import { Ticket, PaginationInfo } from '../../types/ticket';
import { api } from '../../lib/api';

interface UseTicketsProps {
  etat: string;
  reference: string;
  produit: string;
  dateDebut: string;
  dateFin: string;
}

export const useTickets = ({ etat, reference, produit, dateDebut, dateFin }: UseTicketsProps) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10
  });

  const loadTickets = useCallback((page: number = 0, size: number = pagination.pageSize) => {
    const utilisateurId = localStorage.getItem('userId');
        console.log('🚀 DONNÉES ENVOYÉES À L\'API:', {
      utilisateurId,
      page,
      size,
      filtres: {
        etat,
        reference, 
        produit,
        dateDebut,
        dateFin
      }
    });
    console.log('Chargement des tickets - userId:', utilisateurId, 'page:', page, 'size:', size);
    
    if (!utilisateurId) return;
    
    setLoading(true);
    
    const params = new URLSearchParams();
    if (etat) params.append('etat', etat);
    if (reference) params.append('reference', reference);
    if (produit) params.append('produit', produit);
    if (dateDebut) params.append('dateDebut', dateDebut);
    if (dateFin) params.append('dateFin', dateFin);
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    
        console.log('🌐 URL APPELÉE:', `/tickets/utilisateur/${utilisateurId}/page/${page}/size/${size}${queryString}`);
    api.get(`/tickets/utilisateur/${utilisateurId}/page/${page}/size/${size}${queryString}`)
      .then((res) => {
        const data = res.data;
        console.log('Réponse API brute des tickets:', data);
        setTickets(data.tickets || []);
        setPagination({
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize
        });
        console.log(`Chargé ${data.tickets?.length || 0} tickets pour la page ${page}`);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des tickets:', err);
        setTickets([]);
        setPagination(prev => ({
          ...prev,
          currentPage: page,
          totalPages: 0,
          totalElements: 0
        }));
      })
      .finally(() => setLoading(false));
  }, [etat, reference, produit, dateDebut, dateFin, pagination.pageSize]);

  useEffect(() => {
    loadTickets(0);
  }, [loadTickets]);

  const goToPage = (page: number) => {
    if (page >= 0 && page < pagination.totalPages) {
      loadTickets(page);
    }
  };

  const changePageSize = (newSize: number) => {
    loadTickets(0, newSize);
  };

  return {
    tickets,
    loading,
    pagination,
    loadTickets,
    goToPage,
    changePageSize
  };
};