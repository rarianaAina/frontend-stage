import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import { useNouvelleDemande } from '../../hooks/demandes/useNouvelleDemande';
import { SelectProduit } from '../../components/demande/formsDemande/SelectProduit';
import { SelectPriorite } from '../../components/demande/formsDemande/SelectPriorite';
import { InputFichiers } from '../../components/demande/formsDemande/InputFichiers';
import { SelectType } from '../../components/demande/formsDemande/SelectType';
import { useAppTranslation } from '../../hooks/translation/useTranslation';
import '../../styles/NouvelleDemande.css';

export default function NouvelleDemande() {
  const location = useLocation();
  const [raison, setRaison] = useState('');
  const [logicielId, setLogicielId] = useState('');
  const [description, setDescription] = useState('');
  const [niveau, setNiveau] = useState('');
  const [type, setType] = useState('');
  const [accepteConditions, setAccepteConditions] = useState(false);
  const [fichiers, setFichiers] = useState<FileList | null>(null);
  
  const { soumettreDemande, loading } = useNouvelleDemande();
  const companyId = localStorage.getItem('companyId') || '';
  const utilisateurId = localStorage.getItem('userId') || '';
  const company = companyId;
  const utilisateur = utilisateurId;
  
  const { t } = useAppTranslation(['common', 'requests', 'newRequest']);

  useEffect(() => {
    if (location.state?.produitSelectionne) {
      console.log('Produit ID présélectionné:', location.state.produitSelectionne);
      setLogicielId(location.state.produitSelectionne);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await soumettreDemande({
        raison,
        logiciel: logicielId,
        type,
        company,
        utilisateur,
        description,
        niveau,
        fichiers
      }, accepteConditions);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  return (
    <div className="nouvelle-demande-container">
      <NavBar role="CLIENT" />

      <div className="nouvelle-demande-content">
        <div className="nouvelle-demande-form-container">
          <h2 className="nouvelle-demande-title">
            {t('newRequest:title') || 'Nouvelle demande'}
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Raison */}
            <div className="form-field">
              <label className="form-label">
                {t('newRequest:reason.label') || '*Raison :'}
              </label>
              <input
                type="text"
                value={raison}
                onChange={(e) => setRaison(e.target.value)}
                className="form-input"
                required
                placeholder={t('newRequest:reason.placeholder') || 'Saisissez la raison de votre demande'}
              />
            </div>

            {/* Produit */}
            <SelectProduit 
              value={logicielId}
              onChange={setLogicielId}
              required
              label={t('newRequest:product.label') || 'Produit :'}
              placeholder={t('newRequest:product.placeholder') || 'Sélectionnez un produit'}
            />

            {/* Description */}
            <div className="form-field">
              <label className="form-label">
                {t('newRequest:description.label') || '*Description :'}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                required
                placeholder={t('newRequest:description.placeholder') || 'Décrivez votre problème ou demande en détail...'}
              />
            </div>

            {/* Priorité */}
            <SelectPriorite 
              value={niveau}
              onChange={setNiveau}
              required
              label={t('newRequest:priority.label') || 'Priorité :'}
              placeholder={t('newRequest:priority.placeholder') || 'Sélectionnez une priorité'}
            />

            {/* Type */}
            <SelectType 
              value={type}
              onChange={setType}
              required
              label={t('newRequest:type.label') || 'Type :'}
              placeholder={t('newRequest:type.placeholder') || 'Sélectionnez un type'}
            />

            {/* Fichiers */}
            <InputFichiers 
              onChange={setFichiers}
              label={t('newRequest:files.label') || 'Fichiers joints :'}
              description={t('newRequest:files.description') || 'Ajoutez des fichiers (images, documents) pour illustrer votre demande'}
            />

            {/* Conditions */}
            <div className="conditions-container">
              <label className="conditions-label">
                <input
                  type="checkbox"
                  checked={accepteConditions}
                  onChange={(e) => setAccepteConditions(e.target.checked)}
                  className="conditions-checkbox"
                  required
                />
                <span className="conditions-text">
                  {t('newRequest:conditions.text', {
                    privacyPolicy: t('newRequest:conditions.privacyPolicy') || 'Politique de confidentialité'
                  }) || `J'accepte les termes de la ${t('newRequest:conditions.privacyPolicy') || 'Politique de confidentialité'} et autorise que mes données personnelles soient traitées dans la mesure nécessaire à mon abonnement`}
                </span>
              </label>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading 
                ? (t('newRequest:submit.loading') || 'Soumission en cours...')
                : (t('newRequest:submit.label') || 'Soumettre')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}