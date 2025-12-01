import React from 'react';
import { ConsultantPerformance, DureeTraitement, StatistiquesGlobales } from '../../../types/dashboard';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface PerformanceTeamProps {
  performancesConsultants?: ConsultantPerformance[];
  dureesMoyennes?: DureeTraitement;
  statistiquesGlobales?: StatistiquesGlobales;
}

export const PerformanceTeam: React.FC<PerformanceTeamProps> = ({ 
  performancesConsultants = [], 
  dureesMoyennes,
  statistiquesGlobales 
}) => {
  const { t } = useAppTranslation(['common', 'dashboard']);

  // Calcul des moyennes générales de l'équipe
  const calculerMoyennesEquipe = () => {
    if (!performancesConsultants || performancesConsultants.length === 0) {
      return {
        moyenneTauxResolution: 0,
        moyenneDureeTraitement: 0,
        totalTicketsClotures: 0,
        totalInterventions: 0,
        totalConsultants: 0
      };
    }

    const totalTicketsClotures = performancesConsultants.reduce((sum, perf) => sum + perf.ticketsClotures, 0);
    const totalInterventions = performancesConsultants.reduce((sum, perf) => sum + perf.interventionsRealisees, 0);
    const moyenneTauxResolution = performancesConsultants.reduce((sum, perf) => sum + perf.tauxResolution, 0) / performancesConsultants.length;
    const moyenneDureeTraitement = performancesConsultants.reduce((sum, perf) => sum + perf.dureeMoyenneTraitement, 0) / performancesConsultants.length;

    return {
      moyenneTauxResolution: Math.round(moyenneTauxResolution * 100) / 100,
      moyenneDureeTraitement: Math.round(moyenneDureeTraitement * 100) / 100,
      totalTicketsClotures,
      totalInterventions,
      totalConsultants: performancesConsultants.length
    };
  };

  const moyennesEquipe = calculerMoyennesEquipe();

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
        marginBottom: '20px',
        textDecoration: 'underline'
      }}>
        {t('dashboard:teamPerformance')}
      </h3>

      {/* Statistiques de l'équipe */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <h4 style={{ color: '#2563eb', marginBottom: '10px', fontSize: '16px' }}>
            {t('dashboard:teamStats')}
          </h4>
          <p><strong>{t('dashboard:consultants')}:</strong> {moyennesEquipe.totalConsultants}</p>
          <p><strong>{t('dashboard:totalClosedTickets')}:</strong> {moyennesEquipe.totalTicketsClotures}</p>
          <p><strong>{t('dashboard:totalInterventions')}:</strong> {moyennesEquipe.totalInterventions}</p>
        </div>
        
        <div>
          <h4 style={{ color: '#2563eb', marginBottom: '10px', fontSize: '16px' }}>
            {t('dashboard:averagePerformance')}
          </h4>
          <p><strong>{t('dashboard:resolutionRate')}:</strong> {moyennesEquipe.moyenneTauxResolution}%</p>
          <p><strong>{t('dashboard:averageProcessingTime')}:</strong> {moyennesEquipe.moyenneDureeTraitement} {t('dashboard:hours')}</p>
          <p><strong>{t('dashboard:inDays')}:</strong> {Math.round(moyennesEquipe.moyenneDureeTraitement / 24 * 100) / 100} {t('dashboard:days')}</p>
        </div>
      </div>

      {/* Durées de traitement globales */}
      {dureesMoyennes && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.6)',
          padding: '15px',
          borderRadius: '10px',
          marginTop: '15px'
        }}>
          <h4 style={{ color: '#2563eb', marginBottom: '10px', fontSize: '16px' }}>
            {t('dashboard:globalProcessingTimes')}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '14px' }}>
            <div>
              <p><strong>{t('dashboard:average')}:</strong></p>
              <p>{dureesMoyennes.moyenneJours} {t('dashboard:days')}</p>
              <p>({dureesMoyennes.moyenneHeures} {t('dashboard:hours')})</p>
            </div>
            <div>
              <p><strong>{t('dashboard:fast')}:</strong> {dureesMoyennes.rapides}</p>
              <p><strong>{t('dashboard:normal')}:</strong> {dureesMoyennes.normaux}</p>
            </div>
            <div>
              <p><strong>{t('dashboard:slow')}:</strong> {dureesMoyennes.lents}</p>
            </div>
          </div>
        </div>
      )}

      {/* Indicateur de performance globale */}
      <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '8px' }}>
        <p style={{ fontSize: '14px', textAlign: 'center', margin: 0 }}>
          <strong>{t('dashboard:performanceIndicator')}: </strong>
          {moyennesEquipe.moyenneTauxResolution >= 80 ? '🚀 Excellent' : 
           moyennesEquipe.moyenneTauxResolution >= 60 ? '✅ Bon' : 
           moyennesEquipe.moyenneTauxResolution >= 40 ? '⚠️ Moyen' : '❌ À améliorer'}
        </p>
      </div>
    </div>
  );
};