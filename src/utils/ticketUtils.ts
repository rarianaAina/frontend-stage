import { PRIORITE_MAPPING, STATUT_MAPPING } from '../constants/ticketConstants';

export const getStatutText = (statutId: string): string => {
  return STATUT_MAPPING[statutId] || statutId;
};

export const getPrioriteText = (prioriteId: string): string => {
  return PRIORITE_MAPPING[prioriteId] || prioriteId;
};

export const getCouleurPriorite = (prioriteId: string): string => {
  const priorite = getPrioriteText(prioriteId).toLowerCase();
  
  switch (priorite) {
    case 'basse':
      return '#10b981';
    case 'moyenne':
      return '#f59e0b';
    case 'haute':
      return '#ef4444';
    case 'urgente':
      return '#dc2626';
    default:
      return '#6b7280';
  }
};

export const getCouleurStatut = (statutId: string): string => {
  const statut = getStatutText(statutId).toLowerCase();
  
  switch (statut) {
    case 'ouvert':
      return '#3b82f6';
    case 'en cours':
      return '#f59e0b';
    case 'en attente':
      return '#f59e0b';
    case 'en attente client':
      return '#f59e0b';
    case 'intervention planifiée':
      return '#8b5cf6';
    case 'résolu':
      return '#10b981';
    case 'clôturé':
      return '#6b7280';
    default:
      return '#6b7280';
  }
};