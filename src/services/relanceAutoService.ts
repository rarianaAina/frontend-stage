import { Solution } from '../types/solution/solution';
import { InteractionCreateDTO, interactionService } from './ticketServiceCH';

export class RelanceAutoService {
  /**
   * Vérifie si une solution nécessite une relance automatique
   * (3 jours sans réponse)
   */
  static async verifierRelancesAutomatiques(
    solutions: Solution[], 
    utilisateurId: number
  ): Promise<void> {
    const maintenant = new Date();
    const troisJoursEnMs = 3 * 24 * 60 * 60 * 1000; // 3 jours en millisecondes

    for (const solution of solutions) {
      try {
        // Vérifier si la solution a déjà une relance automatique récente
        const aDejaRelance = await this.aRelanceRecente(solution.id);
        if (aDejaRelance) continue;

        // Vérifier si 3 jours se sont écoulés depuis la dernière activité
        const dateDerniereActivite = new Date(solution.dateMiseAJour);
        const delaiEcoule = maintenant.getTime() - dateDerniereActivite.getTime();

        if (delaiEcoule >= troisJoursEnMs) {
          await this.creerRelanceAutomatique(solution, utilisateurId);
        }
      } catch (error) {
        console.error(`Erreur lors de la vérification de la solution ${solution.id}:`, error);
      }
    }
  }

  /**
   * Vérifie si une relance automatique existe déjà pour cette solution
   */
  private static async aRelanceRecente(solutionId: number): Promise<boolean> {
    try {
      // Implémentez cette méthode selon votre API
      // Elle doit vérifier si une relance automatique existe déjà
      // dans les dernières 24 heures pour éviter les doublons
      const interactions = await interactionService.getInteractionsBySolution(solutionId);
      const maintenant = new Date();
      const vingtQuatreHeuresEnMs = 24 * 60 * 60 * 1000;

      return interactions.some(interaction => 
        interaction.message.includes('[RELANCE AUTOMATIQUE]') &&
        (maintenant.getTime() - new Date(interaction.dateCreation).getTime()) < vingtQuatreHeuresEnMs
      );
    } catch (error) {
      console.error('Erreur lors de la vérification des relances existantes:', error);
      return false;
    }
  }

  /**
   * Crée une relance automatique pour une solution
   */
  private static async creerRelanceAutomatique(
    solution: Solution, 
    utilisateurId: number
  ): Promise<void> {
    const interactionData: InteractionCreateDTO = {
      ticketId: solution.ticketId, // Assurez-vous que votre Solution a un ticketId
      message: `[RELANCE AUTOMATIQUE] Solution "${solution.titre}" - Aucune réponse depuis 3 jours. Merci de faire un suivi.`,
      typeInteractionId: 3, // Type relance
      canalInteractionId: 1, // Canal interne
      auteurUtilisateurId: utilisateurId,
      visibleClient: false,
      solutionId: solution.id // Lier la relance à la solution
    };

    await interactionService.createInteraction(interactionData);
    console.log(`Relance automatique créée pour la solution ${solution.id}`);
  }
}