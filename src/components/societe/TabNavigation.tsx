import React from 'react';

type Tab = 'contacts' | 'produits' | 'informations';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { key: Tab; label: string }[] = [
    { key: 'contacts', label: 'Mes contacts' },
    { key: 'produits', label: 'Mes produits' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '40px'
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          style={{
            background: activeTab === tab.key ? '#666' : 'white',
            color: activeTab === tab.key ? 'white' : '#333',
            padding: '12px 40px',
            borderRadius: '25px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            minWidth: '250px',
            transition: 'all 0.3s ease'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;