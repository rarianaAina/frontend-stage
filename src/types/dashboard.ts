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