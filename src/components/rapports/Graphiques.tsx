import { Bar, Doughnut } from 'react-chartjs-2';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

interface GraphiqueData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor?: string;
    backgroundColors?: string[];
  }>;
}

interface GraphiquesProps {
  activityData: GraphiqueData;
  satisfactionData: GraphiqueData;
  consultantPerformanceData: GraphiqueData;
}

export const Graphiques = ({ 
  activityData, 
  satisfactionData, 
  consultantPerformanceData 
}: GraphiquesProps) => {
  const { t } = useAppTranslation(['common', 'reports']);
  
  // Vérifier si les données sont vides (valeurs à 0)
  const hasActivityData = activityData.datasets.some(dataset => 
    dataset.data.some(value => value > 0)
  );
  
  const hasSatisfactionData = satisfactionData.datasets.some(dataset =>
    dataset.data.some(value => value > 0)
  );
  
  const hasPerformanceData = consultantPerformanceData.datasets.some(dataset =>
    dataset.data.some(value => value > 0)
  );

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
            {t('reports:activityEvolution')}
          </h3>
          {hasActivityData ? (
            <Bar
              data={activityData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2
              }}
            />
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              {t('reports:noActivityData')}
            </div>
          )}
        </div>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
            {t('reports:customerSatisfaction')}
          </h3>
          {hasSatisfactionData ? (
            <Doughnut
              data={satisfactionData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              {t('reports:noSatisfactionData')}
            </div>
          )}
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
          {t('reports:consultantPerformance')}
        </h3>
        {hasPerformanceData ? (
          <Bar
            data={consultantPerformanceData}
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 2
            }}
          />
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: '#6b7280',
            fontStyle: 'italic'
          }}>
            {t('reports:noPerformanceData')}
          </div>
        )}
      </div>
    </>
  );
};