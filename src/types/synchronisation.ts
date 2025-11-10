export interface SynchronisationResponse {
  status: string;
  message: string;
  timestamp?: string;
}

export interface StatutSynchronisationResponse {
  statut: 'INACTIVE' | 'EN_COURS' | 'ARRET_DEMANDE';
  message: string;
  timestamp?: string;
}

export interface StatutCompletSynchronisation {
  type: string;
  nom: string;
  statut: string;
  enCours: boolean;
  message: string;
}

export interface StatutsGlobaux {
  companies: StatutCompletSynchronisation;
  creditsHoraires: StatutCompletSynchronisation;
  personnes: StatutCompletSynchronisation;
  produits: StatutCompletSynchronisation;
  tickets: StatutCompletSynchronisation;
  solutions: StatutCompletSynchronisation;
  liaisonsSolutionsTickets: StatutCompletSynchronisation;
}

export type TypeSynchronisation = 
  | 'companies'
  | 'credits-horaires'
  | 'personnes'
  | 'produits'
  | 'tickets'
  | 'solutions'
  | 'liaisons-solutions-tickets';

  // src/types/synchronisation.ts (ajouter ces interfaces)
export interface SyncStatusData {
  type: string;
  nom: string;
  statut: string;
  enCours: boolean;
  message: string;
  derniereSync?: string;
}

export interface SynchronisationStatus {
  companies: SyncStatusData;
  creditsHoraires: SyncStatusData;
  personnes: SyncStatusData;
  produits: SyncStatusData;
  tickets: SyncStatusData;
  solutions: SyncStatusData;
  liaisonsSolutionsTickets: SyncStatusData;
}