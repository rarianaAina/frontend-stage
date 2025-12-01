import { useState } from 'react';
import { solutionService, ReponseSolution, StatistiquesReponse } from '../../services/solutionService';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

export const useSolutionReponse = () => {
  const { t } = useAppTranslation(['common', 'solution']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fonction pour récupérer le userId depuis le localStorage
// Fonction pour récupérer le userId depuis le localStorage
const getCurrentUserId = (): number => {
  const userId = localStorage.getItem('userId');
  console.log('UserID récupéré:', userId);
  
  if (userId) {
    try {
      // Si c'est stocké directement comme nombre
      const id = parseInt(userId);
      if (!isNaN(id)) {
        return id;
      }
    } catch (e) {
      console.error('Erreur parsing user ID:', e);
    }
  }
  throw new Error('Utilisateur non connecté');
};

  const creerReponse = async (data: {
    solutionId: number;
    estValide: boolean;
    commentaire?: string;
    canalReponse?: string;
  }): Promise<ReponseSolution | null> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const utilisateurId = getCurrentUserId();
      const reponse = await solutionService.creerReponse({
        ...data,
        utilisateurId
      });
      setSuccess(data.estValide ? t('solution:solutionValidated') : t('solution:solutionRejected'));
      return reponse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('common:errorOccurred');
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const validerSolution = async (solutionId: number): Promise<ReponseSolution | null> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const utilisateurId = getCurrentUserId();
      const reponse = await solutionService.creerReponse({
        solutionId,
        estValide: true,
        utilisateurId
      });
      setSuccess(t('solution:solutionValidated'));
      return reponse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('common:errorOccurred');
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const rejeterSolution = async (solutionId: number, commentaire: string): Promise<ReponseSolution | null> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const utilisateurId = getCurrentUserId();
      const reponse = await solutionService.creerReponse({
        solutionId,
        estValide: false,
        commentaire,
        utilisateurId
      });
      setSuccess(t('solution:solutionRejected'));
      return reponse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('common:errorOccurred');
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const cloturerTicket = async (solutionId: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await solutionService.cloturerTicket(solutionId);
      setSuccess(t('solution:ticketClosed'));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('common:errorOccurred');
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getReponsesParSolution = async (solutionId: number): Promise<ReponseSolution[]> => {
    try {
      return await solutionService.getReponsesParSolution(solutionId);
    } catch (err) {
      console.error('Erreur récupération réponses:', err);
      return [];
    }
  };

  const getStatistiquesSolution = async (solutionId: number): Promise<StatistiquesReponse | null> => {
    try {
      return await solutionService.getStatistiquesSolution(solutionId);
    } catch (err) {
      console.error('Erreur récupération statistiques:', err);
      return null;
    }
  };

  const getDerniereReponse = async (solutionId: number): Promise<ReponseSolution | null> => {
    try {
      return await solutionService.getDerniereReponse(solutionId);
    } catch (err) {
      console.error('Erreur récupération dernière réponse:', err);
      return null;
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    isLoading,
    error,
    success,
    creerReponse,
    validerSolution,
    rejeterSolution,
    cloturerTicket,
    getReponsesParSolution,
    getStatistiquesSolution,
    getDerniereReponse,
    clearMessages,
  };
};