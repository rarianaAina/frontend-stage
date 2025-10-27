import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import NavBar from '../../components/NavBar';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function AdminDashboard() {
  const statusData = {
    labels: ['Ouverts', 'En attente intervention', 'Intervention planifiée', 'Clôturé', 'Retard'],
    datasets: [{
      data: [37, 14.8, 7.4, 18.5, 22.2],
      backgroundColor: ['#6dd5ed', '#4db8d8', '#3a9fc7', '#2d8ab8', '#1f5f8b'],
    }],
  };

  const consultantData = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [{
      data: [37, 14.8, 7.4, 18.5, 22.2],
      backgroundColor: ['#6dd5ed', '#4db8d8', '#3a9fc7', '#2d8ab8', '#1f5f8b'],
    }],
  };

  const lineData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    datasets: [{
      label: 'Tickets',
      data: [18, 25, 22, 35, 27, 10],
      borderColor: '#000',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      tension: 0.4,
      borderWidth: 3,
    }],
  };

  const credits = [
    { societe: 'Test', product: 'ABC', initial: 22, used: 0, remaining: 22 },
    { societe: 'Test1', product: 'CDE', initial: 50, used: 45.5, remaining: 4.5 },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="ADMIN" />

      <div style={{ padding: '40px 60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '30px',
          marginBottom: '20px'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', height: '300px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Répartition par statut</h3>
            <Pie data={statusData} options={{ maintainAspectRatio: false, responsive: true, aspectRatio: 1}} />
          </div>

          <div style={{ background: '#17a2b8', padding: '20px', borderRadius: '15px', height: '500px' }}>
            <Line data={lineData} options={{
              maintainAspectRatio: false,
              plugins: { legend: { display: false } }
            }} />
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', height: '500px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Répartition par consultant</h3>
            <Pie data={consultantData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div style={{
          background: 'rgba(200, 240, 180, 0.7)',
          padding: '30px',
          borderRadius: '20px',
          marginBottom: '40px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textDecoration: 'underline'
          }}>
            Performance équipe :
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>
              Durée de traitement moyenne :
            </li>
          </ul>
        </div>

        <div>
          <h2 style={{
            textAlign: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#17a2b8',
            marginBottom: '20px'
          }}>
            Crédits horaires
          </h2>
          <table>
            <thead>
              <tr>
                <th>Société</th>
                <th>Produits\CH</th>
                <th>Initial</th>
                <th>Pris</th>
                <th>Reste</th>
              </tr>
            </thead>
            <tbody>
              {credits.map((credit, idx) => (
                <tr key={idx}>
                  <td>{credit.societe}</td>
                  <td>{credit.product}</td>
                  <td>{credit.initial}</td>
                  <td>{credit.used}</td>
                  <td>{credit.remaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
