import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Données d'authentification simulées
const AUTH_DATA = [
  { email: 'client@optimada.com', password: 'client123', code: '1234', role: 'client', name: 'Jean Client' },
  { email: 'admin@optimada.com', password: 'admin123', code: '1111', role: 'admin', name: 'Admin Principal' },
  { email: 'consultant@optimada.com', password: 'consultant123', code: '7777', role: 'consultant', name: 'Pierre Consultant' }
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Vérification des identifiants
    const user = AUTH_DATA.find(user => 
      user.email === email && user.password === password
    );

    if (user) {
      setCurrentUser(user);
      setShowVerification(true);
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleVerificationChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredCode = verificationCode.join('');

    if (currentUser && enteredCode === currentUser.code) {
      localStorage.setItem('jeton', `token-${Date.now()}`);
      localStorage.setItem('role', currentUser.role);
      localStorage.setItem('email', currentUser.email);
      localStorage.setItem('userName', currentUser.name);

      switch(currentUser.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'consultant':
          navigate('/consultant/tickets');
          break;
        case 'client':
        default:
          navigate('/dashboard');
      }
    } else {
      setError('Code de vérification incorrect');
      setVerificationCode(['', '', '', '']);
      const firstInput = document.getElementById('code-0');
      firstInput?.focus();
    }
  };

  const handleBackToLogin = () => {
    setShowVerification(false);
    setError('');
    setVerificationCode(['', '', '', '']);
    setCurrentUser(null);
  };

  // Remplissage automatique pour le développement
  const fillDemoCredentials = (role = 'client') => {
    const demoUser = AUTH_DATA.find(user => user.role === role);
    if (demoUser) {
      setEmail(demoUser.email);
      setPassword(demoUser.password);
      setError('');
    }
  };

  if (showVerification) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
          <div style={{
            fontSize: '72px',
            fontFamily: 'cursive',
            color: '#ffd700',
            marginBottom: '40px',
            textShadow: '3px 3px 6px rgba(0,0,0,0.3)'
          }}>
            Optimada
          </div>
          <div style={{ fontSize: '20px', color: 'white', marginBottom: '10px' }}>
            Portail client
          </div>
          <p style={{ color: 'white', marginBottom: '40px', fontSize: '18px' }}>
            Un code de vérification vous a été envoyé par email et whatsapp
          </p>
          <h2 style={{ color: 'white', marginBottom: '40px', fontSize: '36px', fontWeight: 'bold' }}>
            Code de vérification
          </h2>
          
          {error && (
            <div style={{
              color: '#ff6b6b',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              padding: '10px 20px',
              borderRadius: '10px',
              marginBottom: '20px',
              border: '1px solid #ff6b6b'
            }}>
              {error}
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleVerificationChange(index, e.target.value)}
                style={{
                  width: '80px',
                  height: '80px',
                  fontSize: '32px',
                  textAlign: 'center',
                  borderRadius: '20px',
                  border: '3px solid rgba(0, 0, 0, 0.3)',
                  background: '#17a2b8',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            ))}
          </div>

          {/* Indication du code pour le développement */}
          <div style={{ 
            color: 'white', 
            marginBottom: '20px',
            fontSize: '14px',
            opacity: 0.8
          }}>
            💡 Code de test: {currentUser?.code}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={handleBackToLogin}
              style={{
                background: '#6c757d',
                color: 'white',
                padding: '14px 30px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Retour
            </button>
            <button
              onClick={handleVerify}
              style={{
                background: '#10b981',
                color: 'white',
                padding: '14px 40px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Vérifier
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
      padding: '40px 80px'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '120px',
          fontFamily: 'cursive',
          color: '#ffd700',
          marginBottom: '40px',
          textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
          lineHeight: 1
        }}>
          Optimada
        </div>
        
        {/* Boutons de remplissage automatique pour le développement */}
        <div style={{ marginBottom: '20px' }}>
        <button 
            onClick={() => fillDemoCredentials('consultant')}
            style={{
              background: '#28a745',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '14px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Remplir Consultant
          </button>
          <button 
            onClick={() => fillDemoCredentials('client')}
            style={{
              background: '#28a745',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '14px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Remplir Client
          </button>
          <button 
            onClick={() => fillDemoCredentials('admin')}
            style={{
              background: '#dc3545',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Remplir Admin
          </button>
        </div>

        <button style={{
          background: '#17a2b8',
          color: 'white',
          padding: '14px 40px',
          borderRadius: '25px',
          border: 'none',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          En savoir plus
        </button>
      </div>

      <div style={{
        background: 'rgba(200, 200, 200, 0.9)',
        padding: '60px 50px',
        borderRadius: '30px',
        width: '450px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          fontSize: '28px',
          fontFamily: 'cursive',
          color: '#333'
        }}>
          Portail client
        </div>

        <h2 style={{
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '32px',
          color: '#333'
        }}>
          Identifiez-vous
        </h2>

        {error && (
          <div style={{
            color: '#dc3545',
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            padding: '10px 20px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid #dc3545',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#333' }}>
              Adresse email :
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '16px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#333' }}>
              Mot de passe :
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '16px'
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: '#10b981',
              color: 'white',
              padding: '14px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Se connecter
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a href="#" style={{ color: '#666', fontSize: '14px', textDecoration: 'none' }}>
              Mot de passe oublié?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}