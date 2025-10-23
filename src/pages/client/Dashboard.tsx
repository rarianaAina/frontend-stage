import NavBar from '../../components/NavBar';
import { useDashboard } from '../../hooks/dashboard/useDashboard';
import { StatisticsCard } from '../../components/dashboard/StatisticsCard';
import { TicketsChart } from '../../components/dashboard/TicketsChart';
import { CreditsTable } from '../../components/dashboard/CreditsTable';
import { LoadingState } from '../../components/dashboard/LoadingState';
import { ErrorState } from '../../components/dashboard/ErrorState';

export default function Dashboard() {
  const { dashboardData, loading, error, refetch } = useDashboard();

  const handleStatisticClick = (statistic: any) => {
    // Navigation ou filtre basé sur la statistique cliquée
    console.log('Statistique cliquée:', statistic);
    // Exemple: navigation vers la page des tickets avec filtre
    // navigate(`/mes-demandes?filter=${statistic.label}`);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
      }}>
        <NavBar role="CLIENT" />
        <div style={{ padding: '40px 60px' }}>
          <LoadingState message="Chargement de votre tableau de bord..." />
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
            message="Aucune donnée disponible" 
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
              title="Répartition par statut :"
              statistics={dashboardData.repartitionStatut}
              onStatisticClick={handleStatisticClick}
            />

            <StatisticsCard
              title="Durée de traitement :"
              statistics={dashboardData.dureeTraitement}
            />

            <StatisticsCard
              title="Répartition par produit :"
              statistics={dashboardData.repartitionProduit}
              onStatisticClick={handleStatisticClick}
            />
          </div>

          {/* Colonne de droite - Graphique et crédits */}
          <div>
            <TicketsChart 
              chartData={dashboardData.chartData}
              title="Évolution des tickets"
              height={400}
            />

            <CreditsTable 
              credits={dashboardData.creditsHoraires}
            />
          </div>
        </div>
      </div>
    </div>
  );
}