import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketService, NouvelleDemandeData } from '../../services/ticketService';

export const useNouvelleDemande = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const soumettreDemande = async (data: NouvelleDemandeData, accepteConditions: boolean) => {
    if (!accepteConditions) {
      throw new Error('Vous devez accepter les conditions');
    }

    if (!data.logiciel) {
      throw new Error('Veuillez sélectionner un produit');
    }

    try {
      setLoading(true);
      await ticketService.soumettreDemande(data);
      navigate('/mes-demandes');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { soumettreDemande, loading };
};