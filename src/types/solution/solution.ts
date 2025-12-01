export interface Solution {
  id: number; 
  titre: string;
  description: string;
  zone: string;
  statut: string;
  etape: string;
  reference: string;
  dateCreation: string;
  dateMiseAJour: string;
  dateCloture: string | null;
  cloture: boolean;
}


export interface ReponseSolution {
  id: number;
  solutionId: number;
  estValide: boolean;
  commentaire?: string;
  dateReponse: string;
  creeParId: number;
  creeParNom: string;
  canalReponse: string;
}

export interface CreateReponseSolutionRequest {
  solutionId: number;
  estValide: boolean;
  commentaire?: string;
  canalReponse?: string;
}

export interface StatistiquesReponse {
  solutionId: number;
  totalReponses: number;
  reponsesValides: number;
  reponsesRejetees: number;
  tauxValidation: number;
}