// src/components/synchronisation/SynchronisationTab.tsx
import React from 'react';
import { SynchronisationCompanies } from './SynchronisationCompanies';
import { SynchronisationCreditsHoraires } from './SynchronisationCreditsHoraires';
import { SynchronisationPersonnes } from './SynchronisationPersonnes';
import { SynchronisationProduits } from './SynchronisationProduits';
import { SynchronisationTickets } from './SynchronisationTickets';
import { SynchronisationSolutions } from './SynchronisationSolutions';
import { SynchronisationLiaisons } from './SynchronisationLiaisons';

export const SynchronisationTab: React.FC = () => {
  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
        Gestion des Synchronisations CRM
      </h2>
      
      <p style={{ 
        fontSize: '14px', 
        color: '#6b7280', 
        marginBottom: '30px',
        lineHeight: '1.5'
      }}>
        Contrôlez manuellement les synchronisations entre votre application et le CRM. 
        Chaque synchronisation peut être démarrée, arrêtée et surveillée individuellement.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <SynchronisationCompanies />
        <SynchronisationCreditsHoraires />
        <SynchronisationPersonnes />
        <SynchronisationProduits />
        <SynchronisationTickets />
        <SynchronisationSolutions />
        <SynchronisationLiaisons />
      </div>
    </div>
  );
};