import NavBar from '../../components/common/NavBar';
import { useDashboard } from '../../hooks/dashboard/useDashboard';
import { StatisticsCard } from '../../components/dashboard/StatisticsCard';
import { TicketsChart } from '../../components/dashboard/TicketsChart';
import { CreditsTable } from '../../components/dashboard/CreditsTable';
import { LoadingState } from '../../components/dashboard/LoadingState';
import { ErrorState } from '../../components/dashboard/ErrorState';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

export default function Dashboard() {
  const { dashboardData, loading, error, refetch } = useDashboard();
  const { t } = useAppTranslation(['common', 'dashboard']);

  const handleStatisticClick = (statistic: any) => {
    console.log('Statistique cliquée:', statistic);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
      }}>
        <NavBar role="CLIENT" />
        <div style={{ padding: '40px 60px' }}>
          <LoadingState message={t('dashboard:loadingDashboard')} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
      }}>
        <NavBar role="CLIENT" />
        <div style={{ padding: '40px 60px' }}>
          <ErrorState message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
      }}>
        <NavBar role="CLIENT" />
        <div style={{ padding: '40px 60px' }}>
          <ErrorState 
            message={t('dashboard:noDataAvailable')} 
            onRetry={refetch} 
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="CLIENT" />

      <div style={{ padding: '40px 60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Colonne de gauche - Statistiques */}
          <div>
            <StatisticsCard
              title={t('dashboard:statusDistribution')}
              statistics={dashboardData.repartitionStatut}
              onStatisticClick={handleStatisticClick}
            />

            <StatisticsCard
              title={t('dashboard:processingTime')}
              statistics={dashboardData.dureeTraitement}
            />

            <StatisticsCard
              title={t('dashboard:productDistribution')}
              statistics={dashboardData.repartitionProduit}
              onStatisticClick={handleStatisticClick}
            />
          </div>

          {/* Colonne de droite - Graphique et crédits */}
          <div>
            <TicketsChart 
              chartData={dashboardData.chartData}
              title={t('dashboard:ticketsEvolution')}
              height={400}
            />

            <CreditsTable />
          </div>
        </div>
      </div>
    </div>
  );
}