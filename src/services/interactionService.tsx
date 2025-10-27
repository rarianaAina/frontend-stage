import { api } from '../lib/api';

export interface TypeInteraction {
  id: number;
  libelle: string;
}

export interface CanalInteraction {
  id: number;
  libelle: string;
}

class InteractionService {
//   async getTypesInteraction(): Promise<TypeInteraction[]> {
//     const response = await api.get('/types-interaction');
//     return response.data;
//   }

//   async getCanauxInteraction(): Promise<CanalInteraction[]> {
//     const response = await api.get('/canaux-interaction');
//     return response.data;
//   }

  // Récupérer l'ID du type "Relance"
//   async getTypeRelanceId(): Promise<number> {
//     const types = await this.getTypesInteraction();
//     const relanceType = types.find(type => 
//       type.libelle.toLowerCase().includes('relance') || 
//       type.libelle.toLowerCase().includes('rappel')
//     );
//     if (!relanceType) {
//       throw new Error('Type d\'interaction "Relance" non trouvé');
//     }
//     return relanceType.id;
//   }

  // Récupérer l'ID du canal "Système" ou "Interne"
//   async getCanalInterneId(): Promise<number> {
//     const canaux = await this.getCanauxInteraction();
//     const canalInterne = canaux.find(canal => 
//       canal.libelle.toLowerCase().includes('système') || 
//       canal.libelle.toLowerCase().includes('interne')
//     );
//     if (!canalInterne) {
//       throw new Error('Canal d\'interaction "Interne" non trouvé');
//     }
//     return canalInterne.id;
//   }
}

export const interactionService = new InteractionService();