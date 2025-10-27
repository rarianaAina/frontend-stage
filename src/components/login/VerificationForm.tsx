import React from 'react';

interface VerificationFormProps {
  code: string[];
  onCodeChange: (index: number, value: string) => void;
  error: string;
  onVerify: () => void;
  onRegenerateCode: () => void; // Nouvelle prop
  onBack: () => void;
  loading: boolean;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({ 
  code, 
  onCodeChange, 
  error, 
  onVerify, 
  onRegenerateCode,
  onBack, 
  loading 
}) => {
  return (
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
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCodeChange(index, e.target.value)}
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

      {/* Bouton Renvoyer le code */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={onRegenerateCode}
          disabled={loading}
          style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid white',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Envoi...' : 'Renvoyer le code'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={onBack}
          disabled={loading}
          style={{
            background: '#6c757d',
            color: 'white',
            padding: '14px 30px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          Retour
        </button>
        <button
          onClick={onVerify}
          disabled={loading}
          style={{
            background: loading ? '#6c757d' : '#10b981',
            color: 'white',
            padding: '14px 40px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '18px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Vérification...' : 'Vérifier'}
        </button>
      </div>
    </div>
  );
};