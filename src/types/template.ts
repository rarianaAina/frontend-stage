export interface NotificationTemplate {
  id: number;
  code: string;
  libelle: string;
  canal: string;
  sujet: string;
  contenuHtml: string;
  actif: boolean;
  dateCreation: string;
  dateMiseAJour: string;
}

export interface TemplateTestRequest {
  variables: {
    [key: string]: any;
  };
}

export interface TemplateCreateRequest {
  code: string;
  libelle: string;
  canal: string;
  sujet: string;
  contenuHtml: string;
  actif?: boolean;
}

export interface TemplateUpdateRequest {
  libelle?: string;
  canal?: string;
  sujet?: string;
  contenuHtml?: string;
  actif?: boolean;
}

export interface TemplateDuplicateRequest {
  newCode: string;
}