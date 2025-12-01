import { PaginationInfo } from '../../../types/ticket';

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const Pagination = ({ 
  pagination, 
  onPageChange, 
  onPageSizeChange 
}: PaginationProps) => {
  const goToPage = (page: number) => {
    if (page >= 0 && page < pagination.totalPages) {
      onPageChange(page);
    }
  };

  const nextPage = () => {
    if (pagination.currentPage < pagination.totalPages - 1) {
      goToPage(pagination.currentPage + 1);
    }
  };

  const prevPage = () => {
    if (pagination.currentPage > 0) {
      goToPage(pagination.currentPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(0, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages - 1, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    // Bouton précédent
    buttons.push(
      <button
        key="prev"
        onClick={prevPage}
        disabled={pagination.currentPage === 0}
        style={{
          background: pagination.currentPage === 0 ? '#f0f0f0' : '#17a2b8',
          color: pagination.currentPage === 0 ? '#999' : 'white',
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          border: 'none',
          cursor: pagination.currentPage === 0 ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        &lt;
      </button>
    );

    // Boutons de pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          style={{
            background: i === pagination.currentPage ? '#17a2b8' : '#f8f9fa',
            color: i === pagination.currentPage ? 'white' : '#333',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            border: i === pagination.currentPage ? 'none' : '1px solid #ddd',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: i === pagination.currentPage ? 'bold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {i + 1}
        </button>
      );
    }

    // Bouton suivant
    buttons.push(
      <button
        key="next"
        onClick={nextPage}
        disabled={pagination.currentPage >= pagination.totalPages - 1}
        style={{
          background: pagination.currentPage >= pagination.totalPages - 1 ? '#f0f0f0' : '#17a2b8',
          color: pagination.currentPage >= pagination.totalPages - 1 ? '#999' : 'white',
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          border: 'none',
          cursor: pagination.currentPage >= pagination.totalPages - 1 ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        &gt;
      </button>
    );

    return buttons;
  };

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '10px'
      }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>
          Éléments par page:
        </label>
        <select
          value={pagination.pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {pagination.totalPages > 0 && (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '20px',
            alignItems: 'center'
          }}>
            {renderPaginationButtons()}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '8px',
            fontSize: '12px',
            color: '#666'
          }}>
            Page {pagination.currentPage + 1} sur {pagination.totalPages} 
            {pagination.totalElements > 0 && ` - ${pagination.totalElements} éléments au total`}
          </div>
        </>
      )}
    </>
  );
};