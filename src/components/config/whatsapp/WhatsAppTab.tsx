import React from 'react';
import { WhatsAppTabContent } from './WhatsAppTabContent';
import { useWhatsAppConfig } from '../../../hooks/admin/config/whatsapp/useWhatsAppConfig';

export const WhatsAppTab: React.FC = () => {
  const whatsAppConfig = useWhatsAppConfig();

  return <WhatsAppTabContent {...whatsAppConfig} />;
};