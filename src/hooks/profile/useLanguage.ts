import { useState } from 'react';

export type Language = 'fr' | 'en' | 'mg';

export const useLanguage = (initialLanguage: Language = 'fr') => {
  const [langue, setLangue] = useState<Language>(initialLanguage);

  return {
    langue,
    setLangue
  };
};