// Fonction utilitaire pour les couleurs des types d'interaction
export const getInteractionColor = (type?: string): string => {
  if (!type) return '#6b7280'; // Gris par défaut si undefined
  
  switch (type.toLowerCase()) {
    case 'message':
      return '#f59e0b'; // Orange
    case 'reponse':
      return '#10b981'; // Vert
    case 'question':
      return '#3b82f6'; // Bleu
    case 'information':
      return '#8b5cf6'; // Violet
    case 'urgence':
      return '#ef4444'; // Rouge
    case 'relance':
      return '#f97316'; // Orange foncé
    case 'clôture':
      return '#6b7280'; // Gris
    case 'solution': // Ajout pour les solutions
      return '#0b2261ff';
    default:
      return '#6b7280'; // Gris
  }
};

export const getSolutionColor = (statut?: string) => {
  const statutLower = statut?.toLowerCase() || '';
  
  switch (statutLower) {
    case 'résolu':
    case 'clôturé':
    case 'terminé':
      return '#28a745';
    case 'en cours':
    case 'en traitement':
      return '#ffc107';
    case 'nouveau':
    case 'ouvert':
      return '#17a2b8';
    default:
      return '#6c757d';
  }
};