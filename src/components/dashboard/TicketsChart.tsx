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
  chartData?: ChartData; // Rendre optionnel
  title?: string;
  height?: number;
}

export const TicketsChart = ({ 
  chartData, 
  title = 'Tickets par mois',
  height = 350 
}: TicketsChartProps) => {
  // Données par défaut si chartData est undefined
  const defaultChartData: ChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Tickets',
        data: [0, 0, 0, 0, 0, 0],
        borderColor: '#000',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const dataToUse = chartData || defaultChartData;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
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