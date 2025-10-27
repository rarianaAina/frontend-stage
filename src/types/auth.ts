export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface LoginResponse {
  jeton: string;
  email: string;
  utilisateurId: number;   
  nom: string;
  companyId: number;       
  companyName: string;
  validationCode?: string;
}

export interface CodeValidationRequest {
  utilisateurId: string;
  code: string;
}

export interface CodeValidationResponse {
  valid: boolean;
  message: string;
  code?: string;
}

export interface AuthResult {
  success: boolean;
  requiresVerification?: boolean;
  user?: LoginResponse;
  error?: string;
}

export interface VerificationResult {
  success: boolean;
  error?: string;
}

export interface DemoUser {
  email: string;
  password: string;
  role: string;
}