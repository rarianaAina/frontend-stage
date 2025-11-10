// src/pages/admin/AdminDashboard.tsx
import React from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Tooltip, 
  Legend 
} from 'chart.js';
import NavBar from '../../components/NavBar';
import { useAdminDashboard } from '../../hooks/dashboard/admin/useAdminDashboard';
import { LoadingState } from '../../components/dashboard/admin/LoadingState';
import { ErrorState } from '../../components/dashboard/admin/ErrorState';
import { GlobalStats } from '../../components/dashboard/admin/GlobalStats';
import { DashboardCharts } from '../../components/dashboard/admin/DashboardCharts';
import { PerformanceTeam } from '../../components/dashboard/admin/PerformanceTeam';
import { RecentTickets } from '../../components/dashboard/admin/RecentTickets';
import { SynchronisationStatus } from '../../components/dashboard/admin/SynchronisationStatuts';

// Enregistrement des composants Chart.js
ChartJS.register(
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Tooltip, 
  Legend
);

export default function AdminDashboard() {
  const { dashboardData, loading, error, refetch } = useAdminDashboard();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!dashboardData) {
    return <ErrorState error="Aucune donnée disponible" onRetry={refetch} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="ADMIN" />

      <div style={{ padding: '40px 60px' }}>

        {/* Statistiques globales */}
        <GlobalStats data={dashboardData.statistiquesGlobales} />

        {/* Graphiques principaux */}
        <DashboardCharts data={dashboardData} />

        {/* Performance équipe et tickets récents */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          <PerformanceTeam data={dashboardData.dureesMoyennes} />
          <RecentTickets tickets={dashboardData.ticketsRecents} />

        </div>
                {/* Statuts des synchronisations */}
        <SynchronisationStatus />

      </div>

      {/* Styles CSS pour les animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
}