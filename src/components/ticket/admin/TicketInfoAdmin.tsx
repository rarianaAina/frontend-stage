import React from 'react';
import { useAppTranslation } from '../../../hooks/translation/useTranslation';

interface TicketInfoAdminProps {
  ticket: any;
}

export const TicketInfoAdmin: React.FC<TicketInfoAdminProps> = ({ ticket }) => {
  const { t } = useAppTranslation(['common', 'tickets', 'admin']);

  return (
    <div className="ticket-info-admin">
      <h3 className="section-title">{t('admin:ticketInformation')}</h3>
      
      <div className="info-grid">
        {/* Informations client */}
        <div className="info-card">
          <h4 className="info-card-title">
            👥 {t('tickets:clientInfo')}
          </h4>
          <div className="info-content">
            <div className="info-row">
              <span className="info-label">{t('tickets:company')}:</span>
              <span className="info-value">{ticket.companyName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('tickets:contactName')}:</span>
              <span className="info-value">{ticket.contactName || t('common:notSpecified')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{ticket.contactEmail || t('common:notSpecified')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('tickets:phone')}:</span>
              <span className="info-value">{ticket.contactPhone || t('common:notSpecified')}</span>
            </div>
          </div>
        </div>

        {/* Informations ticket */}
        <div className="info-card">
          <h4 className="info-card-title">
            📋 {t('tickets:ticketInfo')}
          </h4>
          <div className="info-content">
            <div className="info-row">
              <span className="info-label">{t('tickets:product')}:</span>
              <span className="info-value">{ticket.produitNom}</span>
            </div>
            {/* <div className="info-row">
              <span className="info-label">{t('tickets:category')}:</span>
              <span className="info-value">{ticket.categorieNom || t('common:notSpecified')}</span>
            </div> */}
            <div className="info-row">
              <span className="info-label">{t('tickets:assignedAgent')}:</span>
              <span className="info-value">{ticket.agentAssigné || t('common:notAssigned')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('tickets:creationDate')}:</span>
              <span className="info-value">
                {new Date(ticket.dateCreation).toLocaleDateString()} à {new Date(ticket.dateCreation).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="info-card full-width">
          <h4 className="info-card-title">
            📝 {t('tickets:description')}
          </h4>
          <div className="info-content">
            <div className="description-content">
              {ticket.description || t('tickets:noDescription')}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};