export type Ticket = {
  id: string;
  reference: string;
  produitId: string;
  produitNom: string;
  description: string;
  prioriteTicketId: string;
  dateCreation: string;
  dateCloture: string;
  etat: string;
};

export type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};

export type TicketPageResponse = {
  tickets: Ticket[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};