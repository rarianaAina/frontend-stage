import { useState, useEffect, useCallback } from 'react';
import { Solution } from '../../types/solution/solution';
import { RelanceAutoService } from '../../services/relanceAutoService';

interface UseRelanceAutoProps {
  solutions: Solution[];
  utilisateurId: number;
  intervalleMinutes?: number; 
}

export const useRelanceAuto = ({
  solutions,
  utilisateurId,
  intervalleMinutes = 60
}: UseRelanceAutoProps) => {
  const [derniereVerification, setDerniereVerification] = useState<Date | null>(null);
  const [enCours, setEnCours] = useState(false);

  const verifierRelances = useCallback(async () => {
    if (enCours || solutions.length === 0) return;

    setEnCours(true);
    try {
      await RelanceAutoService.verifierRelancesAutomatiques(solutions, utilisateurId);
      setDerniereVerification(new Date());
    } catch (error) {
      console.error('Erreur lors de la vérification automatique des relances:', error);
    } finally {
      setEnCours(false);
    }
  }, [solutions, utilisateurId, enCours]);

  // Vérification périodique
  useEffect(() => {
    const intervalleMs = intervalleMinutes * 60 * 1000;
    
    // Vérification immédiate au chargement
    verifierRelances();

    // Vérification périodique
    const intervalId = setInterval(verifierRelances, intervalleMs);

    return () => clearInterval(intervalId);
  }, [verifierRelances, intervalleMinutes]);

  // Vérification supplémentaire quand les solutions changent
  useEffect(() => {
    if (solutions.length > 0) {
      verifierRelances();
    }
  }, [solutions, verifierRelances]);

  return {
    derniereVerification,
    enCours,
    verifierRelancesManuellement: verifierRelances
  };
};