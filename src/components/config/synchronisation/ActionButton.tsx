import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  variant: 'success' | 'danger' | 'secondary';
  loading: boolean;
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled,
  variant,
  loading,
  children
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600' as const
    };

    if (disabled) {
      return {
        ...baseStyle,
        background: '#9ca3af',
        color: 'white',
        cursor: 'not-allowed'
      };
    }

    switch (variant) {
      case 'success':
        return { ...baseStyle, background: '#10b981', color: 'white' };
      case 'danger':
        return { ...baseStyle, background: '#ef4444', color: 'white' };
      case 'secondary':
        return { ...baseStyle, background: '#6b7280', color: 'white' };
      default:
        return { ...baseStyle, background: '#6b7280', color: 'white' };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={getButtonStyle()}
    >
      {loading ? '...' : children}
    </button>
  );
};