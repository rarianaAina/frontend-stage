import React from 'react';
import { StatistiquesGlobales } from '../../../types/dashboard';
import { StatCard } from './StatCard';

interface GlobalStatsProps {
  data: StatistiquesGlobales;
}

export const GlobalStats: React.FC<GlobalStatsProps> = ({ data }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    }}>
      <StatCard 
        title="Total Tickets" 
        value={data.totalTickets}
        color="#17a2b8"
      />
      <StatCard 
        title="Tickets Ouverts" 
        value={data.ticketsOuverts}
        color="#28a745"
      />
      <StatCard 
        title="En Cours" 
        value={data.ticketsEnCours}
        color="#ffc107"
      />
      <StatCard 
        title="Clôturés" 
        value={data.ticketsClotures}
        color="#dc3545"
      />
      <StatCard 
        title="Companies" 
        value={data.totalCompanies}
        color="#6f42c1"
      />
      <StatCard 
        title="Consultants" 
        value={data.totalConsultants}
        color="#221f1dff"
      />
      <StatCard 
        title="Interventions Planifiées" 
        value={data.interventionsPlanifiees}
        color="#20c997"
      />
    </div>
  );
};