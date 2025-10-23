// hooks/dashboard/useDashboard.ts
import { useState, useEffect } from 'react';
import { DashboardStats } from '../../types/dashboard';
import { dashboardService } from '../../services/dashboardService';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        throw new Error('Utilisateur non connecté');
      }

      const data = await dashboardService.getDashboardData(userId);
      console.log('Données transformées pour le frontend:', data);
      setDashboardData(data);
    } catch (err) {
      console.error('Erreur dans useDashboard:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return {
    dashboardData,
    loading,
    error,
    refetch: loadDashboardData
  };
};