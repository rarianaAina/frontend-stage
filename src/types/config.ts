export interface TabConfig {
  id: string;
  label: string;
  component: React.ComponentType;
}

export interface GeneralSettings {
  companyName: string;
  defaultLanguage: string;
  timezone: string;
}

// MISE À JOUR : Nouvelle interface pour SMTP
export interface SmtpSettings {
  id?: number;
  host: string;
  port: number;
  username: string;
  password: string;
  estActif?: boolean;
  dateCreation?: string;
  dateModification?: string;
}

// ANCIENNE INTERFACE (à supprimer ou garder pour compatibilité)
export interface EmailSettings {
  smtpServer: string;
  port: number;
  senderEmail: string;
}

export interface NotificationSettings {
  newRequest: boolean;
  assignedRequest: boolean;
  statusChange: boolean;
  interventionScheduled: boolean;
  interventionCompleted: boolean;
  messageAdded: boolean;
}

export interface SLASettings {
  urgent: number;
  medium: number;
  low: number;
}

export interface CreditSettings {
  alertThreshold: number;
  blockOnInsufficient: boolean;
}

export interface BackupSettings {
  frequency: 'daily' | 'weekly' | 'monthly';
  lastBackup?: string;
}

export interface WorkflowStep {
  id: number;
  ordre: number;
  utilisateurId: number;
  typeNotificationId: number;
  utilisateurNom?: string;
  typeNotificationLibelle?: string;
}

export interface WorkflowConfig {
  typeNotificationCode: string;
  steps: WorkflowStep[];
}