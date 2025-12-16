import React, { useState } from 'react';
import NavBar from '../../components/common/NavBar';
import { GeneralTab } from '../../components/config/GeneralTab';
import { EmailTab } from '../../components/config/EmailTab';
import { WorkflowTab } from '../../components/config/WorkflowTab';
import { SynchronisationTab } from '../../components/config/synchronisation/SynchronisationTab';
import { TabConfig } from '../../types/config';
import { WhatsAppTab } from '../../components/config/whatsapp/WhatsAppTab';
import { TemplateTabContent } from '../../components/config/template/TemplateTabContent';
import { useTemplate } from '../../hooks/admin/config/template/useTemplateConfig';
import { SchedulingManager } from '../../components/config/sheduling/SchedulingManager';

const Configurations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('email');

  // Hook pour la gestion des templates
  const templateHook = useTemplate();

  const tabs: TabConfig[] = [
    { id: 'email', label: 'Email', component: EmailTab },
    { id: 'general', label: 'Général', component: GeneralTab },
    { id: 'whatsapp', label: 'Whatsapp', component: WhatsAppTab },
    { id: 'workflow', label: 'Workflow Notifications', component: WorkflowTab },
    // { id: 'sla', label: 'SLA', component: () => <div>Configuration SLA</div> },
    // { id: 'credits', label: 'Crédits', component: () => <div>Gestion des crédits</div> },
    { id: 'backup', label: 'Synchronisation', component: SynchronisationTab },
    { 
      id: 'template', 
      label: 'Configuration templates', 
      component: () => <TemplateTabContent {...templateHook} />
    },
    { 
      id: 'scheduling', 
      label: 'Planification', 
      component: SchedulingManager 
    }
  ];

  const renderActiveTab = () => {
    const tab = tabs.find(t => t.id === activeTab);
    if (!tab) return null;

    const Component = tab.component;
    return <Component />;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="ADMIN" />

      <div style={{ padding: '40px 60px' }}>
        <h1 style={{
          fontSize: '42px',
          color: '#17a2b8',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>
          Configurations
        </h1>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          borderBottom: '2px solid #e5e7eb',
          flexWrap: 'wrap'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#17a2b8' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#666',
                padding: '12px 30px',
                border: 'none',
                borderRadius: '10px 10px 0 0',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: activeTab === tab.id ? '600' : '400',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Configurations;