import { api } from '../lib/api';
import { 
  LoginRequest, 
  LoginResponse, 
  CodeValidationRequest, 
  CodeValidationResponse 
} from '../types/auth';

class AuthService {
  async login(email: string, password: string): Promise<{ success: boolean; data?: LoginResponse }> {
    const request: LoginRequest = { email, motDePasse: password };
    console.log('Login request:', request);
    
    const response = await api.post<LoginResponse>('/auth/connexion', request);
    console.log('Login response:', response.data);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data
      };
    }
    
    throw new Error('Login failed');
  }

  async verifyCode(code: string): Promise<CodeValidationResponse> {
    const userId = this.getStoredUserId();
    console.log('Verifying code for userId:', userId);
    
    if (!userId) {
      throw new Error('User ID not found');
    }
    
    const request: CodeValidationRequest = { 
      utilisateurId: userId,  
      code 
    };
    
    const response = await api.post<CodeValidationResponse>('/auth/valider-code', request);
    return response.data;
  }

  async regenerateCode(): Promise<CodeValidationResponse> {
    const userId = this.getStoredUserId();
    console.log('Regenerating code for userId:', userId);
    
    if (!userId) {
      throw new Error('User ID not found');
    }
    
    const response = await api.post<CodeValidationResponse>('/auth/regenerer-code', null, {
      params: { utilisateurId: userId }
    });
    return response.data;
  }

  async storeUserRole(userId: string): Promise<void> {
    try {
      const rolesResponse = await api.get(`/utilisateur-role/roles/${userId}`);
      const roles = rolesResponse.data;
      const mainRole = roles[0] || 'CLIENT';
      
      console.log('Storing user role:', mainRole);
      localStorage.setItem('role', mainRole);
    } catch (error) {
      console.error('Error fetching user role:', error);
      localStorage.setItem('role', 'CLIENT'); // Fallback
    }
  }

  storeUserData(userData: LoginResponse): void {
  console.log('Storing user data:', userData);
  
  const { jeton, email, utilisateurId, nom, companyId, companyName } = userData;
  
  // Convertir l'ID en string pour le localStorage
  const userIdString = utilisateurId.toString();
  const companyIdString = companyId?.toString() || '';
  
  console.log('Converted userId:', userIdString);
  
  // ✅ CORRECTION: Utiliser 'jeton' au lieu de 'token'
  localStorage.setItem('jeton', jeton);
  localStorage.setItem('email', email);
  localStorage.setItem('userId', userIdString);
  localStorage.setItem('userName', nom);
  localStorage.setItem('companyId', companyIdString);
  localStorage.setItem('companyName', companyName);
  
  // Récupérer et stocker le rôle
  this.storeUserRole(userIdString);
  
  // Vérification
  console.log('Stored jeton in localStorage:', localStorage.getItem('jeton'));
  console.log('Stored role in localStorage:', localStorage.getItem('role'));
}
  markUserAsVerified(): void {
    localStorage.setItem('verified', 'true');
  }

  getUserRole(): string {
    const role = localStorage.getItem('role');
    console.log('Retrieved role from localStorage:', role);
    return role || 'CLIENT';
  }

  logout(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jeton'); // ✅ Changer à 'jeton'
    const verified = localStorage.getItem('verified');
    
    console.log('isAuthenticated check:');
    console.log(' - jeton exists:', !!token);
    console.log(' - verified:', verified);
    console.log(' - result:', !!token && verified === 'true');
    
    return !!token && verified === 'true';
  }

  getStoredUserId(): string | null {
    const userId = localStorage.getItem('userId');
    console.log('Retrieved userId from localStorage:', userId);
    return userId;
  }
}

export const authService = new AuthService();