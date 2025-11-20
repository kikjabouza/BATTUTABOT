// Types pour les réponses API
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  user?: T;
  token?: string;
}

interface User {
  id: number;
  email: string;
  prenom: string;
  nom: string;
  telephone?: string;
  avatar?: string;
  role: string;
  date_naissance?: string;
  langue_preferee?: string;
  besoins_accessibilite?: string;
  date_creation?: string;
  est_actif: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  prenom: string;
  nom: string;
  telephone?: string;
  date_naissance?: string;
  langue_preferee?: string;
  besoins_accessibilite?: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ProfileData {
  userId: number;
  profilType: string;
  typeArtisanat?: string;
  adresseAtelier?: string;
  description?: string;
  produits?: string;
  prixVisite?: number;

  // 🌿 AJOUTER ICI
  pratiquesEco?: string;
  labelEco?: boolean;

  specialisations?: string;
  languesParlees?: string;
  experienceAnnees?: number;
  tarifHoraire?: number;
  disponibilities?: string;
  preferences?: string[];
}


// Configuration de base
const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  private async fetchApi<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include' as RequestCredentials,
    };

    console.log(`🌐 API Call: ${options.method || 'GET'} ${url}`, {
      hasBody: !!options.body,
      credentials: 'include'
    });

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      console.log(`📡 API Response: ${response.status} ${response.statusText}`, {
        url,
        ok: response.ok,
        status: response.status
      });

      // Vérifier si la réponse est vide
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return {
          success: response.ok,
        } as ApiResponse<T>;
      }
      
      // Vérifier le content-type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text.substring(0, 200));
        return {
          success: false,
          error: 'Erreur serveur - Réponse non-JSON reçue'
        };
      }
      
      const data = await response.json();
      console.log(`📊 API Data:`, data);
      
      return {
        success: response.ok,
        ...data,
      };
    } catch (error) {
      console.error('❌ API Error:', error);
      return {
        success: false,
        error: 'Erreur de connexion au serveur'
      };
    }
  }

  // Inscription
  async register(userData: RegisterData): Promise<ApiResponse<User>> {
    return this.fetchApi<User>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Création de profil spécifique
  async createProfile(profileData: ProfileData): Promise<ApiResponse<{profil_id: number, profil_type: string}>> {
    return this.fetchApi<{profil_id: number, profil_type: string}>('/api/choisir-profil', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  // Connexion
  async login(credentials: LoginData): Promise<ApiResponse<User>> {
    return this.fetchApi<User>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Récupérer l'utilisateur connecté
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.fetchApi<User>('/api/auth/me');
  }

  // Déconnexion
  async logout(): Promise<ApiResponse<null>> {
    return this.fetchApi<null>('/api/auth/logout', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();
export type { User, RegisterData, LoginData, ProfileData, ApiResponse };