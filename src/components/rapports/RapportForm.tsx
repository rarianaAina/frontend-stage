import { RapportRequest } from '../../services/rapportService';
import { useAppTranslation } from '../../hooks/translation/useTranslation';

interface RapportFormProps {
  formData: RapportRequest;
  onFormChange: (field: keyof RapportRequest, value: string) => void;
  onGenererRapport: () => void;
  loading?: boolean;
}

export const RapportForm = ({ 
  formData, 
  onFormChange, 
  onGenererRapport, 
  loading = false 
}: RapportFormProps) => {
  const { t } = useAppTranslation(['common', 'reports']);

  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      marginBottom: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('reports:reportType')}:
          </label>
          <select
            value={formData.typeRapport}
            onChange={(e) => onFormChange('typeRapport', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          >
            <option value="activite">{t('reports:generalActivity')}</option>
            <option value="performance">{t('reports:consultantPerformance')}</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('reports:startDate')}:
          </label>
          <input
            type="date"
            value={formData.dateDebut}
            onChange={(e) => onFormChange('dateDebut', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t('reports:endDate')}:
          </label>
          <input
            type="date"
            value={formData.dateFin}
            onChange={(e) => onFormChange('dateFin', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
        </div>
      </div>
      <button
        onClick={onGenererRapport}
        disabled={loading}
        style={{
          background: loading ? '#9ca3af' : '#10b981',
          color: 'white',
          padding: '12px 30px',
          borderRadius: '10px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? t('reports:generating') : t('reports:generateReport')}
      </button>
    </div>
  );
};