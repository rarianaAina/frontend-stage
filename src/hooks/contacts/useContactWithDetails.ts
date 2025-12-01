import { useState, useEffect } from 'react';
import { contactService, Contact } from '../../services/contactService';

export const useContactsWithDetails = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const companyId = localStorage.getItem('companyId') || '';

  useEffect(() => {
    const chargerContacts = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (!companyId) {
          throw new Error('ID entreprise non trouvé');
        }

        // Utilise la version avec détails des parcs
        const data = await contactService.getInterlocuteursByCompany(companyId);
        console.log('Contacts récupérés avec détails:', companyId);
        setContacts(data);
      } catch (err) {
        console.error('Erreur lors du chargement des contacts:', err);
        setError('Impossible de charger la liste des contacts');
      } finally {
        setLoading(false);
      }
    };

    chargerContacts();
  }, [companyId]);

  return { contacts, loading, error };
};