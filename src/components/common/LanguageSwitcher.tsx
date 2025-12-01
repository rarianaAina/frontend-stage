import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import languagesData from '../../locales/common/languages.json';
import { FlagIcon } from '../utils/FlagIcon'; // Import du composant FlagIcon

interface Language {
  code: string;
  name: string;
  flag: string;
  fullName: string;
}

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const languages = languagesData as Language[];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    localStorage.setItem('preferred-language', languageCode);
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div style={{ 
      position: 'relative',
      display: 'inline-block'
    }}>
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          minWidth: '120px',
          justifyContent: 'space-between',
          fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FlagIcon code={currentLanguage.code} size={16} />
          <span>{currentLanguage.name}</span>
        </span>
        <span style={{ 
          fontSize: '12px', 
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          ▼
        </span>
      </button>

      {/* Liste déroulante */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          marginTop: '8px',
          padding: '8px',
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          minWidth: '140px',
          fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif'
        }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                width: '100%',
                background: i18n.language === lang.code ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: i18n.language === lang.code ? '#3b82f6' : '#374151',
                border: 'none',
                padding: '10px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
            >
              <FlagIcon code={lang.code} size={16} />
              <span style={{ flex: 1 }}>{lang.fullName}</span>
              {i18n.language === lang.code && (
                <span style={{ color: '#3b82f6', fontSize: '12px' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay pour fermer en cliquant à l'extérieur */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};