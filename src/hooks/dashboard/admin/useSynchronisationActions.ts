import { useState } from 'react';
import { synchronisationService } from '../../../services/synchronisationService';

export const useSynchronisationActions = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const demarrerSync = async (entite: string) => {
    setLoading(entite);
    setError(null);
    
    try {
      // Vérifier d'abord si on peut démarrer
      const verification = await synchronisationService.verifierPeutDemarrer(entite);
      
      if (!verification.peutDemarrer) {
        throw new Error(verification.erreur || `Impossible de démarrer la synchronisation`);
      }

      // Démarrer la synchronisation
      const result = await synchronisationService.demarrerSync(entite);
      
      if (result.status !== 'DEMARREE' && result.status !== 'DEMARREES') {
        throw new Error(result.message);
      }
      
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(null);
    }
  };

  const arreterSync = async (entite: string) => {
    setLoading(entite);
    setError(null);
    
    try {
      const result = await synchronisationService.arreterSync(entite);
      
      if (result.status !== 'ARRET_DEMANDE' && result.status !== 'ARRETEE') {
        throw new Error(result.message);
      }
      
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(null);
    }
  };

  return {
    loading,
    error,
    demarrerSync,
    arreterSync,
    clearError: () => setError(null)
  };
};