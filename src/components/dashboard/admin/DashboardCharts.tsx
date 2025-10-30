import React from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { DashboardAdminData } from '../../../types/dashboard';
import { ChartContainer } from './ChartContainer';

interface DashboardChartsProps {
  data: DashboardAdminData;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  // Données pour le graphique de répartition par statut
  const statusData = {
    labels: data.ticketsParStatut.map(item => item.label),
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
        label: 'Tickets Clos',
        data: data.performancesConsultants.map(perf => perf.ticketsClotures),
        backgroundColor: '#3a9fc7',
      },
      {
        label: 'Tickets En Cours',
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
      <ChartContainer title="Répartition par statut" height="300px">
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
      <ChartContainer title="Évolution des tickets" height="300px" background="#17a2b8">
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
      <ChartContainer title="Performance consultants" height="300px">
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