import { useState, useEffect } from 'react';
import NavBar from '../../components/common/NavBar';
import { useRapports } from '../../hooks/rapports/useRapports';
import { RapportForm } from '../../components/rapports/RapportForm';
import { StatistiquesCards } from '../../components/rapports/StatistiquesCards';
import { Graphiques } from '../../components/rapports/Graphiques';
import { RapportRequest } from '../../services/rapportService';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

// Fonction pour formater les statistiques pour l'affichage
const formatStats = (statistiques: any, t: any) => {
  return [
    { 
      label: t('reports:totalRequests'), 
      value: statistiques?.totalDemandes?.toString() || '0', 
      trend: '+0%', 
      color: '#3b82f6' 
    },
    { 
      label: t('reports:resolutionRate'), 
      value: `${statistiques?.tauxResolution?.toFixed(1) || 0}%`, 
      trend: '+0%', 
      color: '#10b981' 
    },
    { 
      label: t('reports:averageResponseTime'), 
      value: `${statistiques?.tempsMoyenReponse?.toFixed(1) || 0}h`, 
      trend: '-0%', 
      color: '#f59e0b' 
    },
    { 
      label: t('reports:resolvedRequests'), 
      value: statistiques?.demandesResolues?.toString() || '0', 
      trend: '+0%', 
      color: '#8b5cf6' 
    }
  ];
};

// Fonction pour obtenir les dates du mois en cours par défaut
const getCurrentMonthDates = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return {
    dateDebut: firstDay.toISOString().split('T')[0],
    dateFin: lastDay.toISOString().split('T')[0]
  };
};

export default function Rapports() {
  const { t } = useAppTranslation(['common', 'reports']);
  const currentMonth = getCurrentMonthDates();
  
  const [formData, setFormData] = useState<RapportRequest>({
    dateDebut: currentMonth.dateDebut,
    dateFin: currentMonth.dateFin,
    typeRapport: 'activite'
  });

  const { loading, error, rapport, genererRapport, exporterPDF, exporterExcel, resetToDefault } = useRapports();

  const handleFormChange = (field: keyof RapportRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenererRapport = async () => {
    try {
      await genererRapport(formData);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleReset = () => {
    resetToDefault();
    setFormData({
      dateDebut: currentMonth.dateDebut,
      dateFin: currentMonth.dateFin,
      typeRapport: 'activite'
    });
  };

  const handleExportPDF = async () => {
    try {
      await exporterPDF(formData);
    } catch (err) {
      console.error('Erreur export PDF:', err);
    }
  };

  const handleExportExcel = async () => {
    try {
      await exporterExcel(formData);
    } catch (err) {
      console.error('Erreur export Excel:', err);
    }
  };

  // Utiliser les données de l'API ou des données vides par défaut
  const activityData = rapport?.donneesGraphique || {
    labels: [t('reports:loading')],
    datasets: [
      {
        label: t('reports:requestsCreated'),
        data: [0],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: t('reports:requestsResolved'),
        data: [0],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      }
    ]
  };

  const satisfactionData = rapport?.satisfaction ? {
    labels: Object.keys(rapport.satisfaction.repartition),
    datasets: [{
      data: Object.values(rapport.satisfaction.repartition),
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(107, 114, 128, 0.8)'
      ]
    }]
  } : {
    labels: [
      t('reports:verySatisfied'),
      t('reports:satisfied'),
      t('reports:neutral'),
      t('reports:unsatisfied'),
      t('reports:veryUnsatisfied')
    ],
    datasets: [{
      data: [0, 0, 0, 0, 0],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(107, 114, 128, 0.8)'
      ]
    }]
  };

  const consultantPerformanceData = rapport?.performancesConsultants ? {
    labels: rapport.performancesConsultants.map(c => c.consultantNom),
    datasets: [{
      label: t('reports:ticketsResolved'),
      data: rapport.performancesConsultants.map(c => c.ticketsClotures),
      backgroundColor: [
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)',
        'rgba(139, 92, 246, 0.7)'
      ]
    }]
  } : {
    labels: [t('reports:loading')],
    datasets: [{
      label: t('reports:ticketsResolved'),
      data: [0],
      backgroundColor: ['rgba(59, 130, 246, 0.7)']
    }]
  };

  const stats = formatStats(rapport?.statistiques, t);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="ADMIN" />

      <div style={{ padding: '40px 60px' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#17a2b8',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>
          {t('reports:reportsAndStatistics')}
        </h1>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <RapportForm
          formData={formData}
          onFormChange={handleFormChange}
          onGenererRapport={handleGenererRapport}
          loading={loading}
        />

        {/* Bouton reset */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={handleReset}
            style={{
              background: '#6b7280',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            📅 {t('reports:showCurrentMonth')}
          </button>
        </div>

        <StatistiquesCards stats={stats} />

        <Graphiques
          activityData={activityData}
          satisfactionData={satisfactionData}
          consultantPerformanceData={consultantPerformanceData}
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
          <button
            onClick={handleExportPDF}
            disabled={!rapport}
            style={{
              background: !rapport ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '10px',
              border: 'none',
              cursor: !rapport ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              opacity: !rapport ? 0.6 : 1
            }}
          >
            {t('reports:exportPDF')}
          </button>
          <button
            onClick={handleExportExcel}
            disabled={!rapport}
            style={{
              background: !rapport ? '#9ca3af' : '#10b981',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '10px',
              border: 'none',
              cursor: !rapport ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              opacity: !rapport ? 0.6 : 1
            }}
          >
            {t('reports:exportExcel')}
          </button>
        </div>
      </div>
    </div>
  );
}