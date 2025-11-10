// src/hooks/useSynchronisation.ts
import { useState, useEffect, useCallback } from 'react';
import { synchronisationService } from '../../services/synchronisationService';

type SyncStatus = 'INACTIVE' | 'EN_COURS' | 'ARRET_DEMANDE';

interface UseSynchronisationReturn {
  syncStatus: SyncStatus;
  syncLoading: boolean;
  loadSyncStatus: () => Promise<void>;
  handleStartSync: () => Promise<void>;
  handleStopSync: () => Promise<void>;
}

export const useSynchronisation = (type: string): UseSynchronisationReturn => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('INACTIVE');
  const [syncLoading, setSyncLoading] = useState(false);

  const loadSyncStatus = useCallback(async () => {
    try {
      const status = await synchronisationService.getStatutSync(type);
      setSyncStatus(status.statut);
    } catch (error) {
      console.error(`Erreur chargement statut synchronisation ${type}:`, error);
    }
  }, [type]);

  const handleStartSync = useCallback(async () => {
    setSyncLoading(true);
    try {
      let result;
      
      switch (type) {
        case 'companies':
          result = await synchronisationService.demarrerSyncCompanies();
          break;
        case 'credits-horaires':
          result = await synchronisationService.demarrerSyncCreditsHoraires();
          break;
        case 'personnes':
          result = await synchronisationService.demarrerSyncPersonnes();
          break;
        case 'produits':
          result = await synchronisationService.demarrerSyncProduits();
          break;
        case 'tickets':
          result = await synchronisationService.demarrerSyncTickets();
          break;
        case 'solutions':
          result = await synchronisationService.demarrerSyncSolutions();
          break;
        case 'liaisons-solutions-tickets':
          result = await synchronisationService.demarrerSyncLiaisonsSolutionsTickets();
          break;
        default:
          throw new Error(`Type de synchronisation non supporté: ${type}`);
      }

      if (result.status === 'DEMARREE' || result.status === 'DEMARREES') {
        setSyncStatus('EN_COURS');
        alert('Synchronisation démarrée avec succès!');
      } else {
        alert(result.message || 'Erreur lors du démarrage de la synchronisation');
      }
    } catch (error: any) {
      console.error(`Erreur démarrage synchronisation ${type}:`, error);
      alert(error.response?.data?.message || 'Erreur lors du démarrage de la synchronisation');
    } finally {
      setSyncLoading(false);
    }
  }, [type]);

  const handleStopSync = useCallback(async () => {
    setSyncLoading(true);
    try {
      let result;
      
      switch (type) {
        case 'companies':
          result = await synchronisationService.arreterSyncCompanies();
          break;
        case 'credits-horaires':
          result = await synchronisationService.arreterSyncCreditsHoraires();
          break;
        case 'personnes':
          result = await synchronisationService.arreterSyncPersonnes();
          break;
        case 'produits':
          result = await synchronisationService.arreterSyncProduits();
          break;
        case 'tickets':
          result = await synchronisationService.arreterSyncTickets();
          break;
        case 'solutions':
          result = await synchronisationService.arreterSyncSolutions();
          break;
        case 'liaisons-solutions-tickets':
          result = await synchronisationService.arreterSyncLiaisonsSolutionsTickets();
          break;
        default:
          throw new Error(`Type de synchronisation non supporté: ${type}`);
      }

      if (result.status === 'ARRETEE' || result.status === 'ARRET_DEMANDE') {
        setSyncStatus('ARRET_DEMANDE');
        alert('Demande d\'arrêt envoyée!');
        
        // Vérifier périodiquement le statut jusqu'à l'arrêt complet
        const checkStatus = setInterval(async () => {
          try {
            const currentStatus = await synchronisationService.getStatutSync(type);
            setSyncStatus(currentStatus.statut);
            if (currentStatus.statut === 'INACTIVE') {
              clearInterval(checkStatus);
              setSyncLoading(false);
            }
          } catch (error) {
            console.error('Erreur vérification statut:', error);
            clearInterval(checkStatus);
            setSyncLoading(false);
          }
        }, 2000);
        
      } else {
        alert(result.message || 'Erreur lors de l\'arrêt de la synchronisation');
        setSyncLoading(false);
      }
    } catch (error: any) {
      console.error(`Erreur arrêt synchronisation ${type}:`, error);
      alert(error.response?.data?.message || 'Erreur lors de l\'arrêt de la synchronisation');
      setSyncLoading(false);
    }
  }, [type]);

  // Charger le statut au montage
  useEffect(() => {
    loadSyncStatus();
  }, [loadSyncStatus]);

  // Polling pour mettre à jour le statut si synchronisation en cours
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (syncStatus === 'EN_COURS') {
      interval = setInterval(() => {
        loadSyncStatus();
      }, 5000); // Vérifier toutes les 5 secondes
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [syncStatus, loadSyncStatus]);

  return {
    syncStatus,
    syncLoading,
    loadSyncStatus,
    handleStartSync,
    handleStopSync
  };
};