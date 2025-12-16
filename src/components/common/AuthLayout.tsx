import React from 'react';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  showLogo?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  showLogo = true 
}) => {
  const { t } = useAppTranslation(['auth']);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(200, 200, 200, 0.9)',
        padding: '40px 50px',
        borderRadius: '30px',
        width: '450px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}>
        {showLogo && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <img 
              src="/src/dist/img/Logooo.png"
              alt="OPTIMADA"
              style={{
                width: '310px',
                height: '150px',
                marginBottom: '10px',
                borderRadius: '10px',
                objectFit: 'cover'
              }}
            />
            {title && (
              <h2 style={{
                textAlign: 'center',
                margin: 0,
                fontSize: '32px',
                color: '#333'
              }}>
                {t(title)}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};