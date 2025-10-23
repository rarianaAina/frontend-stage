import { StatisticItem } from '../../types/dashboard';

interface StatisticsCardProps {
  title: string;
  statistics?: StatisticItem[]; // Rendre optionnel
  onStatisticClick?: (statistic: StatisticItem) => void;
}

export const StatisticsCard = ({ 
  title, 
  statistics, 
  onStatisticClick 
}: StatisticsCardProps) => {
  // Garde contre les données undefined/null
  if (!statistics || !Array.isArray(statistics)) {
    return (
      <div style={{
        background: 'rgba(200, 240, 180, 0.7)',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textDecoration: 'underline'
        }}>
          {title}
        </h3>
        <div style={{ color: '#666', fontStyle: 'italic' }}>
          Aucune donnée disponible
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(200, 240, 180, 0.7)',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      marginBottom: '30px'
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textDecoration: 'underline'
      }}>
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {statistics.map((statistic, index) => (
          <li 
            key={index}
            onClick={() => onStatisticClick?.(statistic)}
            style={{ 
              marginBottom: '12px', 
              color: '#2563eb', 
              textDecoration: 'underline', 
              cursor: onStatisticClick ? 'pointer' : 'default',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{statistic.label} :</span>
            <span style={{ 
              fontWeight: 'bold',
              color: statistic.color || '#2563eb'
            }}>
              {statistic.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};