import React from 'react';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

interface VerificationFormProps {
  code: string[];
  onCodeChange: (index: number, value: string) => void;
  error: string;
  onVerify: () => void;
  onRegenerateCode: () => void;
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
  const { t } = useAppTranslation(['auth', 'common']);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      onCodeChange(index, value);
      
      // Passer au champ suivant si un chiffre est saisi
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Revenir au champ précédent sur backspace si le champ est vide
      const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numbers = pastedData.replace(/\D/g, '').slice(0, 4);
    
    numbers.split('').forEach((char, index) => {
      onCodeChange(index, char);
    });
    
    // Focus sur le dernier champ rempli
    const lastIndex = Math.min(numbers.length - 1, 3);
    const lastInput = document.getElementById(`code-${lastIndex}`) as HTMLInputElement;
    if (lastInput) {
      lastInput.focus();
    }
  };

  return (
    <div style={{
      background: 'rgba(200, 200, 200, 0.9)',
      padding: '50px',
      borderRadius: '30px',
      width: '450px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      position: 'relative'
    }}>
      {/* Logo Optimada en haut du formulaire de vérification */}
      <div style={{
        position: 'absolute',
        top: '-80px', // Augmenté pour le logo plus grand
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        {/* Logo PNG */}
        <img 
          src="/src/dist/img/Logooo.png"
          alt="OPTIMADA"
          style={{
            width: '310px', // Taille adaptée pour cette position
            height: '120px',
            borderRadius: '30px',
            objectFit: 'cover',
            border: 'none',
            overflow: 'hidden',
            display: 'block',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}
          onError={(e) => {
            // Fallback si le logo n'est pas trouvé
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            
            // Afficher un fallback stylisé
            const fallback = document.getElementById('verification-logo-fallback');
            if (fallback) fallback.style.display = 'flex';
          }}
          onLoad={(e) => {
            // Force le border-radius après le chargement
            const target = e.target as HTMLImageElement;
            target.style.borderRadius = '30px';
          }}
        />
        
        {/* Fallback stylisé si le logo n'est pas chargé */}
        <div 
          id="verification-logo-fallback"
          style={{
            width: '120px',
            height: '120px',
            background: '#FFD700',
            borderRadius: '30px',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
          }}
        >
          <span style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#000'
          }}>
            O
          </span>
        </div>
      </div>

      <h2 style={{
        marginBottom: '30px',
        fontSize: '28px',
        color: '#333',
        marginTop: '20px' // Ajusté pour compenser le logo
      }}>
        {t('auth:verificationTitle')}
      </h2>

      <p style={{
        marginBottom: '30px',
        color: '#666',
        fontSize: '16px',
        lineHeight: '1.5'
      }}>
        {t('auth:verificationDescription')}
      </p>

      {error && (
        <div style={{
          color: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          padding: '10px 20px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '1px solid #dc3545'
        }}>
          {error}
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '30px'
      }}>
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={code[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            style={{
              width: '60px',
              height: '60px',
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              borderRadius: '15px',
              border: '2px solid #ddd',
              background: 'white',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
              e.target.style.boxShadow = 'none';
            }}
          />
        ))}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <button
          onClick={onVerify}
          disabled={loading || code.join('').length !== 4}
          style={{
            width: '100%',
            background: loading || code.join('').length !== 4 ? '#6c757d' : '#10b981',
            color: 'white',
            padding: '14px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading || code.join('').length !== 4 ? 'not-allowed' : 'pointer',
            opacity: loading || code.join('').length !== 4 ? 0.7 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          {loading ? t('auth:verifying') : t('auth:verify')}
        </button>

        <button
          onClick={onRegenerateCode}
          disabled={loading}
          style={{
            background: 'transparent',
            color: '#3b82f6',
            border: '1px solid #3b82f6',
            padding: '12px',
            borderRadius: '25px',
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          {t('auth:resendCode')}
        </button>

        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            color: '#666',
            border: 'none',
            padding: '10px',
            fontSize: '14px',
            cursor: 'pointer',
            textDecoration: 'underline',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#3b82f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#666';
          }}
        >
          {t('auth:backToLogin')}
        </button>
      </div>
    </div>
  );
};