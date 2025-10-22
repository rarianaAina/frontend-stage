import { useState } from 'react';
import NavBar from '../../components/NavBar';
import TabNavigation from '../../components/societe/TabNavigation';
import ContactsTab from '../../components/societe/ContactsTab';
import ProduitsTab from '../../components/societe/ProduitsTab';
import InformationsTab from '../../components/societe/InformationsTab';

type Tab = 'contacts' | 'produits' | 'informations';

export default function MaSociete() {
  const [activeTab, setActiveTab] = useState<Tab>('contacts');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #c8f7dc 0%, #e0f2fe 50%, #ddd6fe 100%)',
    }}>
      <NavBar role="CLIENT" />

      <div style={{ padding: '40px 60px' }}>
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'contacts' && <ContactsTab />}
        {activeTab === 'produits' && <ProduitsTab />}
        {activeTab === 'informations' && <InformationsTab />}
      </div>
    </div>
  );
}