import { useTranslation } from 'react-i18next';

export const useAppTranslation = (namespace?: string | string[]) => {
  const { t, i18n, ready } = useTranslation(namespace);

  // Fonction wrapper avec gestion d'erreur améliorée
  const translate = (key: string, options?: any): string => {
    if (!ready) {
      return key.split(':').pop() || key; // Retourne la dernière partie de la clé
    }
    
    const result = t(key, options);
    
    // Si la traduction n'est pas trouvée, retourne une version lisible de la clé
    if (result === key) {
      console.warn(`Translation missing for key: ${key}`);
      const parts = key.split(':');
      return parts[parts.length - 1]; // Retourne la dernière partie
    }
    
    return result as string;
  };
  
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
  
  const currentLanguage = i18n.language;

  return {
    t: translate,
    changeLanguage,
    currentLanguage,
    i18n,
    ready
  };
};