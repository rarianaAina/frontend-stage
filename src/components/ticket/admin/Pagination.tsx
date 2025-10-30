import React from 'react';

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

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      marginTop: '30px',
      flexWrap: 'wrap'
    }}>
      <button 
        onClick={() => onPageChange(pageCourante - 1)}
        disabled={pageCourante === 0}
        style={{
          background: pageCourante === 0 ? '#ccc' : '#17a2b8',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          cursor: pageCourante === 0 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ‹
      </button>
      
      {startPage > 0 && (
        <>
          <button
            onClick={() => onPageChange(0)}
            style={{
              background: '#a0e7f0',
              color: 'black',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            1
          </button>
          {startPage > 1 && <span style={{ color: '#666' }}>...</span>}
        </>
      )}
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            background: page === pageCourante ? '#17a2b8' : '#a0e7f0',
            color: page === pageCourante ? 'white' : 'black',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            fontWeight: page === pageCourante ? 'bold' : 'normal'
          }}
        >
          {page + 1}
        </button>
      ))}
      
      {endPage < totalPages - 1 && (
        <>
          {endPage < totalPages - 2 && <span style={{ color: '#666' }}>...</span>}
          <button
            onClick={() => onPageChange(totalPages - 1)}
            style={{
              background: '#a0e7f0',
              color: 'black',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button 
        onClick={() => onPageChange(pageCourante + 1)}
        disabled={pageCourante === totalPages - 1}
        style={{
          background: pageCourante === totalPages - 1 ? '#ccc' : '#17a2b8',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          cursor: pageCourante === totalPages - 1 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ›
      </button>
    </div>
  );
};