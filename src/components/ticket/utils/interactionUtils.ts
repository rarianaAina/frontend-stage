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
    default:
      return '#6b7280'; // Gris
  }
};