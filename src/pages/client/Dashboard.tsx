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
import NavBar from '../../components/NavBar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const chartData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Tickets',
        data: [18, 25, 22, 35, 27, 10],
        borderColor: '#000',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Tickets par mois',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
      },
    },
  };

  const credits = [
    { product: 'ABC', initial: 22, used: 0, remaining: 22 },
    { product: 'CDE', initial: 50, used: 45.5, remaining: 4.5 },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="client" />

      <div style={{ padding: '40px 60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'rgba(200, 240, 180, 0.7)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textDecoration: 'underline'
            }}>
              Répartition par statut :
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              <li style={{ marginBottom: '10px', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>
                Ouvert :
              </li>
              <li style={{ marginBottom: '10px', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>
                En attente d'intervention :
              </li>
              <li style={{ marginBottom: '10px', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>
                Intervention planifiée :
              </li>
              <li style={{ marginBottom: '10px', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>
                Clôturé :
              </li>
            </ul>

            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textDecoration: 'underline'
            }}>
              Durée de traitement :
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              <li style={{ marginBottom: '10px', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>
                Temps moyen de résolution :
              </li>
              <li style={{ marginBottom: '10px', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>
                Tickets en retard / nombre de ticket :
              </li>
            </ul>

            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textDecoration: 'underline'
            }}>
              Répartition par produit :
            </h3>
          </div>

          <div>
            <div style={{
              background: '#17a2b8',
              padding: '30px',
              borderRadius: '20px',
              marginBottom: '30px',
              height: '350px'
            }}>
              <Line data={chartData} options={chartOptions} />
            </div>

            <div>
              <h2 style={{
                textAlign: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#17a2b8',
                marginBottom: '20px'
              }}>
                Mes crédits horaires
              </h2>
              <table style={{
                width: '100%',
                background: 'white',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <thead>
                  <tr style={{ background: '#e5e5e5' }}>
                    <th style={{ padding: '16px' }}>Produits\CH</th>
                    <th style={{ padding: '16px' }}>Initial</th>
                    <th style={{ padding: '16px' }}>Pris</th>
                    <th style={{ padding: '16px' }}>Reste</th>
                  </tr>
                </thead>
                <tbody>
                  {credits.map((credit, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '16px' }}>{credit.product}</td>
                      <td style={{ padding: '16px' }}>{credit.initial}</td>
                      <td style={{ padding: '16px' }}>{credit.used}</td>
                      <td style={{ padding: '16px' }}>{credit.remaining}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
