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

  // DEBUG: Afficher la structure des données reçues
  console.log('=== DASHBOARD CHARTS DEBUG ===');
  console.log('Données chartData:', data.chartData);
  console.log('Labels axe X:', data.chartData.labels);
  console.log('Datasets:', data.chartData.datasets);

  // Fonction pour traduire les statuts dans les labels de l'axe X
  const translateStatusLabel = (label: string): string => {
    console.log(`Traduction du label axe X: "${label}"`);
    
    // Traduire les statuts courants
    const statusTranslations: Record<string, string> = {
      'Ouvert': t('common:statusTicket.Ouvert'),
      'En cours': t('common:statusTicket.En cours'),
      'Clôturé': t('common:statusTicket.Clôturé'),
      'Cloturé': t('common:statusTicket.Cloturé'), // Variante
      'En attente': t('common:statusTicket.En attente'),
      'Planifié': t('common:statusTicket.Planifié'),
      'Résolu': t('common:statusTicket.Résolu'),
      'ouvert': t('common:statusTicket.ouvert'),
      'en cours': t('common:statusTicket.en cours'),
      'clôturé': t('common:statusTicket.clôturé'),
      'cloturé': t('common:statusTicket.cloturé'), // Variante
      'en attente': t('common:statusTicket.en attente'),
      'planifié': t('common:statusTicket.planifié'),
      'résolu': t('common:statusTicket.résolu')
    };
    
    if (statusTranslations[label]) {
      const translated = statusTranslations[label];
      console.log(`Label traduit: "${label}" -> "${translated}"`);
      return translated;
    }
    
    console.log(`Label non traduit: "${label}"`);
    return label;
  };

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

  // Données pour le graphique linéaire (évolution temporelle) - AVEC TRADUCTION DES LABELS AXE X
  const translatedLineData = {
    ...data.chartData,
    datasets: data.chartData.datasets.map(dataset => ({
      ...dataset,
      // Traduire les labels des datasets si nécessaire
      label: dataset.label ? t(`dashboard:${dataset.label}`, { defaultValue: dataset.label }) : dataset.label
    })),
    labels: data.chartData.labels?.map(label => {
      // TRADUIRE LES STATUTS DANS LES LABELS DE L'AXE X
      if (typeof label === 'string') {
        return translateStatusLabel(label);
      }
      return label;
    }) || []
  };

  // DEBUG: Afficher les données finales
  console.log('=== DONNÉES FINALES POUR GRAPHIQUE LINÉAIRE ===');
  console.log('Labels axe X traduits:', translatedLineData.labels);
  console.log('Datasets traduits:', translatedLineData.datasets);

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
          data={translatedLineData} 
          options={{
            maintainAspectRatio: false,
            plugins: { 
              legend: { 
                display: true
              } 
            },
            scales: {
              x: {
                // Options pour l'axe X qui contient les statuts
                ticks: {
                  // Optionnel: personnaliser l'affichage des ticks
                }
              },
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

