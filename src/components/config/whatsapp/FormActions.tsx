import React from 'react';

interface FormActionsProps {
  saving: boolean;
  testing: boolean;
  canTest: boolean;
  onTest: () => void;
  onReload: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({
  saving,
  testing,
  canTest,
  onTest,
  onReload
}) => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <button
      type="submit"
      disabled={saving}
      style={getButtonStyle(saving ? 'disabled' : 'save')}
    >
      {saving ? '⏳' : '💾'}
      {saving ? ' Sauvegarde...' : ' Sauvegarder'}
    </button>

    <button
      type="button"
      onClick={onTest}
      disabled={!canTest}
      style={getButtonStyle(!canTest ? 'disabled' : 'test')}
    >
      {testing ? '⏳' : '🔧'}
      {testing ? ' Test en cours...' : ' Tester la configuration'}
    </button>

    <button
      type="button"
      onClick={onReload}
      style={getButtonStyle('reload')}
    >
      🔄 Recharger
    </button>
  </div>
);

const getButtonStyle = (type: 'save' | 'test' | 'reload' | 'disabled') => {
  const baseStyle = {
    color: 'white',
    padding: '12px 24px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const styles = {
    save: { ...baseStyle, background: '#10b981' },
    test: { ...baseStyle, background: '#3b82f6' },
    reload: { ...baseStyle, background: '#6b7280' },
    disabled: { ...baseStyle, background: '#9ca3af', cursor: 'not-allowed' }
  };

  return styles[type];
};