import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'fr', name: 'FR', flag: '🇫🇷', fullName: 'Français' },
    { code: 'en', name: 'EN', flag: '🇺🇸', fullName: 'English' },
    { code: 'mg', name: 'MG', flag: '🇲🇬', fullName: 'Malagasy' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    // Sauvegarder la langue dans le localStorage
    localStorage.setItem('preferred-language', languageCode);
    
    // Changer la langue avec i18next
    i18n.changeLanguage(languageCode);
  };

  // Récupérer la langue préférée du localStorage au chargement
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div style={{ 
      display: 'flex', 
      gap: '4px', 
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.2)',
      padding: '6px',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(10px)'
    }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          title={lang.fullName}
          style={{
            background: i18n.language === lang.code ? 'rgba(59, 130, 246, 0.8)' : 'transparent',
            color: i18n.language === lang.code ? 'white' : 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '16px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s ease',
            minWidth: '50px',
            justifyContent: 'center',
            textShadow: i18n.language === lang.code ? 'none' : '0 1px 2px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e) => {
            if (i18n.language !== lang.code) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.color = '#1f2937';
            }
          }}
          onMouseLeave={(e) => {
            if (i18n.language !== lang.code) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'white';
            }
          }}
        >
          <span style={{ fontSize: '14px' }}>{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  );
};