export interface Utilisateur {
  id: number;
  identifiant: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  whatsappNumero?: string;
  actif: boolean;
  dateCreation: string;
  dateMiseAJour: string;
  dateDerniereConnexion?: string;
  companyId?: number;
  idExterneCrm?: string;
  
  // Champs calculés pour l'affichage
  societe?: string;
  poste?: string;
  etat?: string;
  anciennete?: string;
}

export interface FiltresUtilisateurs {
  recherche: string;
  actif: string;
  dateDebut: string;
  dateFin: string;
}

export interface NouvelUtilisateur {
  identifiant: string;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  telephone: string;
  companyId?: number;
  actif?: number;
  idExterneCrm?: string;
}

export interface UtilisateurPageReponse {
  utilisateurs: Utilisateur[];
  pageCourante: number;
  totalPages: number;
  totalElements: number;
  taillePage: number;
}