import { useState, useCallback, useEffect } from 'react';
import { rapportService, RapportRequest, RapportResponse } from '../../services/rapportService';

// Fonction pour obtenir les dates du mois en cours
const getCurrentMonthDates = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return {
    dateDebut: firstDay.toISOString().split('T')[0],
    dateFin: lastDay.toISOString().split('T')[0]
  };
};

export const useRapports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rapport, setRapport] = useState<RapportResponse | null>(null);
  const [defaultData, setDefaultData] = useState<RapportResponse | null>(null);

  // Charger les données du mois en cours au montage
  useEffect(() => {
    const loadDefaultData = async () => {
      const currentMonth = getCurrentMonthDates();
      const request: RapportRequest = {
        ...currentMonth,
        typeRapport: 'activite'
      };
      
      try {
        setLoading(true);
        const data = await rapportService.genererRapport(request);
        setDefaultData(data);
        setRapport(data); // Afficher les données du mois par défaut
      } catch (err) {
        console.error('Erreur chargement données du mois:', err);
        // En cas d'erreur, on garde les données par défaut vides
      } finally {
        setLoading(false);
      }
    };

    loadDefaultData();
  }, []);

  const genererRapport = useCallback(async (request: RapportRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await rapportService.genererRapport(request);
      setRapport(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const exporterPDF = useCallback(async (request: RapportRequest) => {
    try {
      const blob = await rapportService.exporterPDF(request);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport-${request.typeRapport}-${request.dateDebut}-${request.dateFin}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'export PDF';
      setError(message);
      throw err;
    }
  }, []);

  const exporterExcel = useCallback(async (request: RapportRequest) => {
    try {
      const blob = await rapportService.exporterExcel(request);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport-${request.typeRapport}-${request.dateDebut}-${request.dateFin}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'export Excel';
      setError(message);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetToDefault = useCallback(() => {
    setRapport(defaultData);
  }, [defaultData]);

  return {
    loading,
    error,
    rapport,
    defaultData,
    genererRapport,
    exporterPDF,
    exporterExcel,
    clearError,
    resetToDefault
  };
};