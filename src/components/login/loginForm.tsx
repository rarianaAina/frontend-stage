import React from 'react';
import { DemoCredentials } from '../login/DemoCredentials';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  onLogin: (e: React.FormEvent) => void;
  loading: boolean;
  onFillCredentials: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  error, 
  onLogin, 
  loading,
  onFillCredentials 
}) => {
  return (
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

      <DemoCredentials onFillCredentials={onFillCredentials} />

      <form onSubmit={onLogin}>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#333' }}>
            Adresse email :
          </label>
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#6c757d' : '#10b981',
            color: 'white',
            padding: '14px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '18px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '20px',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="#" style={{ color: '#666', fontSize: '14px', textDecoration: 'none' }}>
            Mot de passe oublié?
          </a>
        </div>
      </form>
    </div>
  );
};