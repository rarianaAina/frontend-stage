export interface Utilisateur {
  id: number;
  companyId: number;
  companyName: string;
  idExterneCrm: string;
  identifiant: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  whatsappNumero: string;
  actif: boolean;
  dateDerniereConnexion: string;
  dateCreation: string;
  dateMiseAJour: string;
  
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