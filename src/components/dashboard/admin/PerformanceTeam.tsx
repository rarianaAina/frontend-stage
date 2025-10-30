import React from 'react';
import { DureeTraitement } from '../../../types/dashboard';

interface PerformanceTeamProps {
  data?: DureeTraitement;
}

export const PerformanceTeam: React.FC<PerformanceTeamProps> = ({ data }) => {
  return (
    <div style={{
      background: 'rgba(200, 240, 180, 0.7)',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '15px',
        textDecoration: 'underline'
      }}>
        Performance équipe :
      </h3>
      {data ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#2563eb', marginBottom: '10px' }}>
              Durée de traitement moyenne :
            </h4>
            <p><strong>{data.moyenneJours} jours</strong> ({data.moyenneHeures} heures)</p>
          </div>
          <div>
            <h4 style={{ color: '#2563eb', marginBottom: '10px' }}>Répartition des délais :</h4>
            <p>Rapides (&lt; 24h): <strong>{data.rapides}</strong></p>
            <p>Normaux (1-3 jours): <strong>{data.normaux}</strong></p>
            <p>Lents (&gt; 3 jours): <strong>{data.lents}</strong></p>
          </div>
        </div>
      ) : (
        <p>Aucune donnée disponible</p>
      )}
    </div>
  );
};