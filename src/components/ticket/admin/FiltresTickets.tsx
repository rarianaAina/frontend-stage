import React from 'react';
import { TicketFiltres } from '../../../services/adminTicketService';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface FiltresTicketsProps {
  filtres: TicketFiltres;
  onFiltresChange: (filtres: TicketFiltres) => void;
}

export const FiltresTickets: React.FC<FiltresTicketsProps> = ({ 
  filtres, 
  onFiltresChange 
}) => {
  const { t } = useAppTranslation(['common', 'tickets']);

  const handleChange = (key: keyof TicketFiltres, value: string) => {
    onFiltresChange({
      ...filtres,
      [key]: value || undefined
    });
  };

  const handleReset = () => {
    onFiltresChange({
      page: 0,
      size: 10
    });
  };

  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      marginBottom: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          textDecoration: 'underline',
          margin: 0,
          color: '#1f2937'
        }}>
          {t('common:filter')}:
        </h3>
        <button
          onClick={handleReset}
          style={{
            background: '#6c757d',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#5a6268';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#6c757d';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>🔄</span>
          {t('common:reset')}
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}>
        {/* État */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            {t('tickets:status.label')}:
          </label>
          <select
            value={filtres.etat || ''}
            onChange={(e) => handleChange('etat', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '20px',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">{t('tickets:allStatuses')}</option>
            <option value="1">{t('tickets:status.new')}</option>
            <option value="2">{t('tickets:status.inProgress')}</option>
            <option value="3">{t('tickets:status.pending')}</option>
            <option value="4">{t('tickets:status.waitingClient')}</option>
            <option value="5">{t('tickets:status.scheduled')}</option>
            <option value="6">{t('tickets:status.resolved')}</option>
            <option value="7">{t('tickets:status.closed')}</option>
          </select>
        </div>
        
        {/* Référence */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            {t('tickets:reference')}:
          </label>
          <input
            type="text"
            value={filtres.reference || ''}
            onChange={(e) => handleChange('reference', e.target.value)}
            placeholder={t('tickets:searchByReference')}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '20px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        {/* Produit */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            {t('tickets:product')}:
          </label>
          <input
            type="text"
            value={filtres.produit || ''}
            onChange={(e) => handleChange('produit', e.target.value)}
            placeholder={t('tickets:searchByProduct')}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '20px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        {/* Date début */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            {t('tickets:startDate')}:
          </label>
          <input
            type="date"
            value={filtres.dateDebut || ''}
            onChange={(e) => handleChange('dateDebut', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '20px',
              border: '1px solid #d1d5db',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        {/* Date fin */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            {t('tickets:endDate')}:
          </label>
          <input
            type="date"
            value={filtres.dateFin || ''}
            onChange={(e) => handleChange('dateFin', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '20px',
              border: '1px solid #d1d5db',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        {/* Société */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            {t('tickets:company')}:
          </label>
          <input
            type="text"
            value={filtres.societe || ''}
            onChange={(e) => handleChange('societe', e.target.value)}
            placeholder={t('tickets:searchByCompany')}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '20px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        {/* Priorité */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            {t('tickets:priority.label')}:
          </label>
          <select
            value={filtres.priorite || ''}
            onChange={(e) => handleChange('priorite', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '20px',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">{t('tickets:allPriorities')}</option>
            <option value="1">{t('tickets:priority.low')}</option>
            <option value="2">{t('tickets:priority.normal')}</option>
            <option value="3">{t('tickets:priority.high')}</option>
            <option value="4">{t('tickets:priority.urgent')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};