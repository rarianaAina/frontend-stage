export type Ticket = {
  id: string;
  reference: string;
  titre?: string;
  description: string;
  dateCreation: string;
  dateCloture?: string;
  produitId?: number;
  produitNom?: string;
  prioriteTicketId: string;
  statutTicketId?: number;
  etat?: string;
  typeTicketId?: number;
  companyId?: number;
  companyName: string;
  clientId?: number;
  affecteAUtilisateurId?: number;
};

export type StatutTicket = {
  id: number;
  libelle: string;
  code: string;
};

export type PrioriteTicket = {
  id: number;
  libelle: string;
  code: string;
};

export type Company = {
  id: number;
  nom: string;
  code: string;
};

export type Utilisateur = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
};