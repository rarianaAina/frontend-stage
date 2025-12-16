import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des traductions
import commonFR from '../locales/fr/common.json';
import ticketsFR from '../locales/fr/tickets.json';
import configFR from '../locales/fr/config.json';
import adminFR from '../locales/fr/admin.json';
import authFR from '../locales/fr/auth.json';
import dashboardFR from '../locales/fr/dashboard.json';
import templatesFR from '../locales/fr/templates.json';
import syncFR from '../locales/fr/sync.json';
import userFR from '../locales/fr/users.json';
import reportFR from '../locales/fr/reports.json';
import solutionFR from '../locales/fr/solution.json';
import requestsFR from '../locales/fr/requests.json';
import newRequestFR from '../locales/fr/newRequest.json';
import schedulingFR from '../locales/fr/scheduling.json';

import commonEN from '../locales/en/common.json';
import ticketsEN from '../locales/en/tickets.json';
import configEN from '../locales/en/config.json';
import adminEN from '../locales/en/admin.json';
import authEN from '../locales/en/auth.json';
import dashboardEN from '../locales/en/dashboard.json';
import templatesEN from '../locales/en/templates.json';
import syncEN from '../locales/en/sync.json';
import userEN from '../locales/en/users.json';
import reportEN from '../locales/en/reports.json';
import solutionEN from '../locales/fr/solution.json';
import requestsEN from '../locales/en/requests.json';
import newRequestEN from '../locales/en/newRequest.json';
import schedulingEN from '../locales/en/scheduling.json';

import commonMG from '../locales/mg/common.json';
import ticketsMG from '../locales/mg/tickets.json';
import configMG from '../locales/mg/config.json';
import adminMG from '../locales/mg/admin.json';
import authMG from '../locales/mg/auth.json';
import dashboardMG from '../locales/mg/dashboard.json';
import templatesMG from '../locales/mg/templates.json';
import syncMG from '../locales/mg/sync.json';
import userMG from '../locales/mg/users.json';
import reportMG from '../locales/mg/reports.json';
import solutionMG from '../locales/fr/solution.json';
import requestsMG from '../locales/mg/requests.json';
import newRequestMG from '../locales/mg/newRequest.json';
import schedulingMG from '../locales/mg/scheduling.json';

const resources = {
  fr: {
    common: commonFR,
    tickets: ticketsFR,
    config: configFR,
    admin: adminFR,
    auth: authFR,
    dashboard: dashboardFR,
    templates: templatesFR,
    sync: syncFR,
    users: userFR,
    reports: reportFR,
    solution: solutionFR,
    requests: requestsFR,
    newRequest: newRequestFR,
    scheduling: schedulingFR
  },
  en: {
    common: commonEN,
    tickets: ticketsEN,
    config: configEN,
    admin: adminEN,
    auth: authEN,
    dashboard: dashboardEN,
    templates: templatesEN,
    sync: syncEN,
    users: userEN,
    reports: reportEN,
    solution: solutionEN,
    requests: requestsEN,
    newRequest: newRequestEN,
    scheduling: schedulingEN
  },
  mg: {
    common: commonMG,
    tickets: ticketsMG,
    config: configMG,
    admin: adminMG,
    auth: authMG,
    dashboard: dashboardMG,
    templates: templatesMG,
    sync: syncMG,
    users: userMG,
    reports: reportMG,
    solution: solutionMG,
    requests: requestsMG,
    newRequest: newRequestMG,
    scheduling: schedulingMG
  }
};

// Détecteur personnalisé pour prioriser le localStorage
const customLanguageDetector = {
  type: 'languageDetector' as const,
  async: false,
  init: () => {},
  detect: () => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      return savedLanguage;
    }
    
    // Fallback à la détection normale
    const browserLang = navigator.language.split('-')[0];
    return resources[browserLang as keyof typeof resources] ? browserLang : 'fr';
  },
  cacheUserLanguage: (lng: string) => {
    localStorage.setItem('preferred-language', lng);
  }
};

i18n
  .use(customLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },

    // Configuration pour le format nesté
    keySeparator: '.',
    nsSeparator: ':',
    
    // Options pour forcer le retour de strings
    returnObjects: false,
    returnEmptyString: false,
    returnNull: false,

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      // Spécifier la clé du localStorage
      lookupLocalStorage: 'preferred-language'
    },

    supportedLngs: ['fr', 'en', 'mg'],
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;