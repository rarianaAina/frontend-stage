import type { FiltresUtilisateurs as FiltresType } from '../../types/utilisateur';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

interface Props {
  filtres: FiltresType;
  onFiltresChange: (filtres: FiltresType) => void;
}

export default function FiltresUtilisateurs({ filtres, onFiltresChange }: Props) {
  const { t } = useAppTranslation(['common', 'users']);

  const handleChange = (champ: keyof FiltresType, valeur: string) => {
    onFiltresChange({
      ...filtres,
      [champ]: valeur
    });
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '30px',
      background: 'white',
      padding: '30px',
      borderRadius: '15px'
    }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          {t('users:search')}
        </label>
        <input
          type="text"
          placeholder={t('users:searchPlaceholder')}
          value={filtres.recherche}
          onChange={(e) => handleChange('recherche', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          {t('common:status')}
        </label>
        <select
          value={filtres.actif}
          onChange={(e) => handleChange('actif', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
        >
          <option value="">{t('common:all')}</option>
          <option value="true">{t('common:active')}</option>
          <option value="false">{t('common:inactive')}</option>
        </select>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          {t('users:startDate')}
        </label>
        <input
          type="date"
          value={filtres.dateDebut}
          onChange={(e) => handleChange('dateDebut', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
          {t('users:endDate')}
        </label>
        <input
          type="date"
          value={filtres.dateFin}
          onChange={(e) => handleChange('dateFin', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ddd' }}
        />
      </div>
    </div>
  );
}