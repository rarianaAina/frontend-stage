import React from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface PaginationProps {
  pageCourante: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  pageCourante, 
  totalPages, 
  onPageChange 
}) => {
  const { t } = useAppTranslation('common');

  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(0, pageCourante - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(0, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const getButtonStyle = (isActive: boolean, isDisabled: boolean = false) => ({
    background: isDisabled ? '#e5e7eb' : (isActive ? '#3b82f6' : 'white'),
    color: isDisabled ? '#9ca3af' : (isActive ? 'white' : '#374151'),
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    border: isDisabled ? '1px solid #e5e7eb' : (isActive ? '1px solid #3b82f6' : '1px solid #d1d5db'),
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: isActive ? '600' : '400',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontFamily: 'inherit'
  });

  const getNavigationButtonStyle = (isDisabled: boolean = false) => ({
    background: isDisabled ? '#f3f4f6' : 'white',
    color: isDisabled ? '#9ca3af' : '#374151',
    padding: '8px 16px',
    borderRadius: '8px',
    border: isDisabled ? '1px solid #e5e7eb' : '1px solid #d1d5db',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontFamily: 'inherit',
    gap: '6px'
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '30px',
      padding: '20px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      flexWrap: 'wrap',
      gap: '15px'
    }}>
      {/* Informations de pagination */}
      <div style={{
        fontSize: '14px',
        color: '#6b7280',
        fontWeight: '500'
      }}>
        {t('page')} <strong style={{ color: '#374151' }}>{pageCourante + 1}</strong> {t('of')} <strong style={{ color: '#374151' }}>{totalPages}</strong>
      </div>

      {/* Contrôles de pagination */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        {/* Bouton Première page */}
        <button
          onClick={() => onPageChange(0)}
          disabled={pageCourante === 0}
          style={getNavigationButtonStyle(pageCourante === 0)}
          title={t('firstPage')}
        >
          <span>⏮</span>
          {t('first')}
        </button>

        {/* Bouton Précédent */}
        <button 
          onClick={() => onPageChange(pageCourante - 1)}
          disabled={pageCourante === 0}
          style={getNavigationButtonStyle(pageCourante === 0)}
          title={t('previous')}
        >
          <span>◀</span>
          {t('previous')}
        </button>

        {/* Pages numérotées */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {/* Première page avec ellipsis */}
          {startPage > 0 && (
            <>
              <button
                onClick={() => onPageChange(0)}
                style={getButtonStyle(false)}
                title={`${t('goToPage')} 1`}
              >
                1
              </button>
              {startPage > 1 && (
                <span style={{ 
                  color: '#9ca3af', 
                  padding: '0 8px',
                  fontSize: '14px'
                }}>
                  ...
                </span>
              )}
            </>
          )}
          
          {/* Pages visibles */}
          {pages.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={getButtonStyle(page === pageCourante)}
              title={`${t('goToPage')} ${page + 1}`}
            >
              {page + 1}
            </button>
          ))}
          
          {/* Dernière page avec ellipsis */}
          {endPage < totalPages - 1 && (
            <>
              {endPage < totalPages - 2 && (
                <span style={{ 
                  color: '#9ca3af', 
                  padding: '0 8px',
                  fontSize: '14px'
                }}>
                  ...
                </span>
              )}
              <button
                onClick={() => onPageChange(totalPages - 1)}
                style={getButtonStyle(false)}
                title={`${t('goToPage')} ${totalPages}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Bouton Suivant */}
        <button 
          onClick={() => onPageChange(pageCourante + 1)}
          disabled={pageCourante === totalPages - 1}
          style={getNavigationButtonStyle(pageCourante === totalPages - 1)}
          title={t('next')}
        >
          {t('next')}
          <span>▶</span>
        </button>

        {/* Bouton Dernière page */}
        <button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={pageCourante === totalPages - 1}
          style={getNavigationButtonStyle(pageCourante === totalPages - 1)}
          title={t('lastPage')}
        >
          {t('last')}
          <span>⏭</span>
        </button>
      </div>
    </div>
  );
};