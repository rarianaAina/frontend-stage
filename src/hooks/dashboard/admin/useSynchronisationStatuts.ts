import { useState, useEffect, useCallback } from 'react';
import { synchronisationService } from '../../../services/synchronisationService';

export interface SyncStatusData {
  type: string;
  nom: string;
  statut: string;
  enCours: boolean;
  message: string;
  derniereSync?: string;
}

export interface SynchronisationStatus {
  companies: SyncStatusData;
  creditsHoraires: SyncStatusData;
  personnes: SyncStatusData;
  produits: SyncStatusData;
  tickets: SyncStatusData;
  solutions: SyncStatusData;
  liaisonsSolutionsTickets: SyncStatusData;
}

export const useSynchronisationStatus = () => {
  const [statuts, setStatuts] = useState<SynchronisationStatus>({} as SynchronisationStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await synchronisationService.getStatutToutesSynchronisations();
      setStatuts(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des statuts');
      console.error('Erreur fetchStatus:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger les statuts au montage
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Mettre à jour périodiquement les statuts
  useEffect(() => {
    const interval = setInterval(() => {
      // Ne recharger que si au moins une synchronisation est en cours
      if (Object.values(statuts).some(statut => statut.enCours)) {
        fetchStatus();
      }
    }, 10000); // Toutes les 10 secondes

    return () => clearInterval(interval);
  }, [statuts, fetchStatus]);

  return {
    statuts,
    loading,
    error,
    refetch: fetchStatus
  };
};