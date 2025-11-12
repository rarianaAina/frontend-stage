import { useAppTranslation } from '../../hooks/translation/useTranslation';

interface StatistiqueCard {
  label: string;
  value: string;
  trend: string;
  color: string;
}

interface StatistiquesCardsProps {
  stats: StatistiqueCard[];
}

export const StatistiquesCards = ({ stats }: StatistiquesCardsProps) => {
  const { t } = useAppTranslation(['reports']);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    }}>
      {stats.map((stat, idx) => (
        <div key={idx} style={{
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderLeft: `5px solid ${stat.color}`
        }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            {stat.label}
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
            {stat.value}
          </div>
          <div style={{
            fontSize: '14px',
            color: stat.trend.startsWith('+') || (stat.trend.startsWith('-') && !stat.label.includes('Temps')) 
              ? '#10b981' 
              : '#ef4444'
          }}>
            {stat.trend} {t('reports:thisMonth')}
          </div>
        </div>
      ))}
    </div>
  );
};