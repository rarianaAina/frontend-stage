import React from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { DashboardAdminData } from '../../../types/dashboard';
import { ChartContainer } from './ChartContainer';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface DashboardChartsProps {
  data: DashboardAdminData;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  const { t } = useAppTranslation(['common', 'dashboard']);

  // Données pour le graphique de répartition par statut
  const statusData = {
    labels: data.ticketsParStatut.map(item => t(`common:statusTicket.${item.label}`)),
    datasets: [{
      data: data.ticketsParStatut.map(item => item.value),
      backgroundColor: ['#6dd5ed', '#4db8d8', '#3a9fc7', '#2d8ab8', '#1f5f8b', '#164e63'],
      borderColor: ['#6dd5ed', '#4db8d8', '#3a9fc7', '#2d8ab8', '#1f5f8b', '#164e63'],
      borderWidth: 1,
    }],
  };

  // Données pour la performance des consultants (graphique en barres)
  const consultantBarData = {
    labels: data.performancesConsultants.map(perf => perf.consultantNom),
    datasets: [
      {
        label: t('dashboard:closedTickets'),
        data: data.performancesConsultants.map(perf => perf.ticketsClotures),
        backgroundColor: '#3a9fc7',
      },
      {
        label: t('dashboard:ticketsInProgress'),
        data: data.performancesConsultants.map(perf => perf.ticketsEnCours),
        backgroundColor: '#6dd5ed',
      }
    ],
  };

  // Données pour le graphique linéaire (évolution temporelle)
  const lineData = data.chartData;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '30px',
      marginBottom: '30px'
    }}>
      {/* Répartition par statut */}
      <ChartContainer titleKey="statusDistribution" height="300px">
        <Pie 
          data={statusData} 
          options={{ 
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }} 
        />
      </ChartContainer>

      {/* Évolution temporelle */}
      <ChartContainer titleKey="ticketsEvolution" height="300px" background="#17a2b8">
        <Line 
          data={lineData} 
          options={{
            maintainAspectRatio: false,
            plugins: { 
              legend: { 
                display: true 
              } 
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }} 
        />
      </ChartContainer>

      {/* Performance consultants */}
      <ChartContainer titleKey="consultantsPerformance" height="300px">
        <Bar 
          data={consultantBarData} 
          options={{ 
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }} 
        />
      </ChartContainer>
    </div>
  );
};