import { useState, useEffect } from 'react';
import { adminDashboardService } from '../../../services/adminDashboardService';
import { DashboardAdminData } from '../../../types/dashboard';

export const useAdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardAdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminDashboardService.getDashboardData();
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    dashboardData,
    loading,
    error,
    refetch: fetchDashboardData
  };
};