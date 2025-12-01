import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData } from '../../types/dashboard';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TicketsChartProps {
  chartData?: ChartData;
  title?: string;
  height?: number;
}

export const TicketsChart = ({ 
  chartData, 
  title,
  height = 350 
}: TicketsChartProps) => {
  const { t } = useAppTranslation(['dashboard']);

  const defaultChartData: ChartData = {
    labels: [
      t('common:months.jan'), t('common:months.feb'), t('common:months.mar'),
      t('common:months.apr'), t('common:months.may'), t('common:months.jun')
    ],
    datasets: [
      {
        label: t('dashboard:tickets'),
        data: [0, 0, 0, 0, 0, 0],
        borderColor: '#000',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const dataToUse = chartData || defaultChartData;
  const chartTitle = title || t('dashboard:ticketsEvolution');

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 18,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{
      background: '#17a2b8',
      padding: '25px',
      borderRadius: '20px',
      marginBottom: '30px',
      height: `${height}px`
    }}>
      <Line data={dataToUse} options={chartOptions} />
    </div>
  );
};