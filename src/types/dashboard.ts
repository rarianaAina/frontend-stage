export interface CreditHoraire {
  id?: number;
  product: string;
  produitId?: number;
  company?: string;
  periodeDebut?: string;
  periodeFin?: string;
  initial: number;
  used: number;
  remaining: number;
  pourcentageUtilisation?: number;
  actif?: boolean;
  expire?: boolean;
}
export type StatisticItem = {
  label: string;
  value: number;
  color?: string;
};

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    borderWidth: number;
  }[];
};

export type DashboardStats = {
  repartitionStatut: StatisticItem[];
  dureeTraitement: StatisticItem[];
  repartitionProduit: StatisticItem[];
  creditsHoraires: CreditHoraire[];
  chartData: ChartData;
};

// Types spécifiques pour le dashboard admin
export type ConsultantPerformance = {
  consultantId: number;
  consultantNom: string;
  ticketsEnCours: number;
  ticketsClotures: number;
  interventionsRealisees: number;
  tauxResolution: number;
  dureeMoyenneTraitement: number;
};

export type StatistiquesGlobales = {
  totalTickets: number;
  ticketsOuverts: number;
  ticketsEnCours: number;
  ticketsClotures: number;
  totalCompanies: number;
  totalConsultants: number;
  interventionsPlanifiees: number;
};

export type DureeTraitement = {
  moyenneHeures: number;
  moyenneJours: number;
  rapides: number;
  normaux: number;
  lents: number;
};

export type TicketRecent = {
  id: number;
  reference: string;
  titre: string;
  statut: string;
  priorite: string;
  nomCompany: string;
  nomProduit: string;
  consultantNom: string;
  dateCreation: string;
};

export type DashboardAdminData = {
  statistiquesGlobales: StatistiquesGlobales;
  ticketsParStatut: StatisticItem[];
  ticketsParPriorite: StatisticItem[];
  ticketsParProduit: StatisticItem[];
  ticketsParCompany: StatisticItem[];
  performancesConsultants: ConsultantPerformance[];
  ticketsRecents: TicketRecent[];
  dureesMoyennes: DureeTraitement;
  chartData: ChartData;
};