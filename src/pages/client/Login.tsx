import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowVerification(true);
  };

  const handleVerificationChange = (index: number, value: string) => {
    if (value.length <= 1) {
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
    localStorage.setItem('jeton', 'fake-token');
    localStorage.setItem('role', 'client');
    navigate('/dashboard');
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
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Vérifier
          </button>
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
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
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
