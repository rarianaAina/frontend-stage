import React from 'react';
import { StatistiquesGlobales } from '../../../types/dashboard';
import { StatCard } from './StatCard';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface GlobalStatsProps {
  data: StatistiquesGlobales;
}

export const GlobalStats: React.FC<GlobalStatsProps> = ({ data }) => {
  const { t } = useAppTranslation(['common', 'dashboard']);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    }}>
      <StatCard 
        titleKey="dashboard:totalTickets" 
        value={data.totalTickets}
        color="#17a2b8"
      />
      <StatCard 
        titleKey="dashboard:openTickets" 
        value={data.ticketsOuverts}
        color="#28a745"
      />
      <StatCard 
        titleKey="dashboard:inProgress" 
        value={data.ticketsEnCours}
        color="#ffc107"
      />
      <StatCard 
        titleKey="dashboard:closed" 
        value={data.ticketsClotures}
        color="#dc3545"
      />
      <StatCard 
        titleKey="dashboard:companies" 
        value={data.totalCompanies}
        color="#6f42c1"
      />
      <StatCard 
        titleKey="dashboard:consultants" 
        value={data.totalConsultants}
        color="#221f1dff"
      />
      <StatCard 
        titleKey="dashboard:scheduledInterventions" 
        value={data.interventionsPlanifiees}
        color="#20c997"
      />
    </div>
  );
};