import { useState } from 'react';
import NavBar from '../../components/NavBar';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

export default function Rapports() {
  const [dateDebut, setDateDebut] = useState('2025-01-01');
  const [dateFin, setDateFin] = useState('2025-10-31');
  const [typeRapport, setTypeRapport] = useState('activite');

  const activityData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Demandes créées',
        data: [45, 52, 48, 61, 55, 67, 58, 72, 65, 80],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: 'Demandes résolues',
        data: [38, 48, 44, 58, 52, 62, 55, 68, 60, 75],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      }
    ]
  };

  const consultantPerformanceData = {
    labels: ['Alain RAKOTO', 'Andria ZILY', 'Marie LAURENT', 'Paul MARTIN', 'Sophie DUBOIS'],
    datasets: [{
      label: 'Tickets résolus',
      data: [45, 38, 52, 41, 35],
      backgroundColor: [
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)',
        'rgba(139, 92, 246, 0.7)'
      ]
    }]
  };

  const satisfactionData = {
    labels: ['Très satisfait', 'Satisfait', 'Neutre', 'Insatisfait', 'Très insatisfait'],
    datasets: [{
      data: [45, 35, 12, 6, 2],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(107, 114, 128, 0.8)'
      ]
    }]
  };

  const stats = [
    { label: 'Total demandes', value: '324', trend: '+12%', color: '#3b82f6' },
    { label: 'Taux de résolution', value: '87%', trend: '+5%', color: '#10b981' },
    { label: 'Temps moyen réponse', value: '2.5h', trend: '-15%', color: '#f59e0b' },
    { label: 'Satisfaction client', value: '4.3/5', trend: '+0.3', color: '#8b5cf6' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="admin" />

      <div style={{ padding: '40px 60px' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#17a2b8',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>
          Rapports et Statistiques
        </h1>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Type de rapport:
              </label>
              <select
                value={typeRapport}
                onChange={(e) => setTypeRapport(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #ddd',
                  fontSize: '16px'
                }}
              >
                <option value="activite">Activité générale</option>
                <option value="performance">Performance consultants</option>
                <option value="satisfaction">Satisfaction client</option>
                <option value="credits">Utilisation crédits</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Date début:
              </label>
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Date fin:
              </label>
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>
          <button
            style={{
              background: '#10b981',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Générer le rapport
          </button>
        </div>

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
                color: stat.trend.startsWith('+') || stat.trend.startsWith('-') && !stat.label.includes('Temps') ? '#10b981' : '#ef4444'
              }}>
                {stat.trend} ce mois
              </div>
            </div>
          ))}
        </div>

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
              Évolution de l'activité
            </h3>
            <Bar
              data={activityData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2
              }}
            />
          </div>

          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
              Satisfaction client
            </h3>
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
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
            Performance des consultants
          </h3>
          <Bar
            data={consultantPerformanceData}
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 2
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
          <button
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Exporter en PDF
          </button>
          <button
            style={{
              background: '#10b981',
              color: 'white',
              padding: '12px 30px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Exporter en Excel
          </button>
        </div>
      </div>
    </div>
  );
}
