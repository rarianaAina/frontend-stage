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


export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}