import { useState } from 'react';
import { apiService, User, RegisterData, LoginData, ProfileData } from '@/services/api';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<{success: boolean; user?: User; _sessionIssue?: boolean}>;
  createProfile: (data: ProfileData) => Promise<boolean>;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData): Promise<{success: boolean; user?: User; _sessionIssue?: boolean}> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🎯 Début de l\'inscription...', data.email);
      
      // 1. Inscription
      const registerResult = await apiService.register(data);
      
      if (registerResult.success && registerResult.user) {
        console.log('✅ Inscription réussie, tentative de connexion automatique...');
        
        // ⭐ SOLUTION : Plus long délai pour laisser le temps à la session de se créer
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 2. Connexion automatique avec les mêmes identifiants
        const loginResult = await apiService.login({
          email: data.email,
          password: data.password
        });
        
        console.log('🔐 Résultat connexion automatique:', loginResult);
        
        if (loginResult.success && loginResult.user) {
          console.log('✅ Connexion automatique réussie', loginResult.user);
          setUser(loginResult.user);
          
          // ⭐ SOLUTION : Attendre un peu plus pour que la session soit stable
          await new Promise(resolve => setTimeout(resolve, 200));
          
          // VÉRIFICATION : Tester si on est vraiment connecté
          const meResult = await apiService.getCurrentUser();
          console.log('🔍 Vérification connexion (/api/auth/me):', meResult);
          
          if (meResult.success && meResult.user) {
            console.log('🎉 Utilisateur confirmé connecté:', meResult.user);
            return { success: true, user: meResult.user };
          } else {
            console.log('⚠️ Problème: connexion OK mais /me échoue - Session non créée');
            // ⭐ STRATÉGIE DE CONTOURNEMENT : On retourne l'user mais on sait qu'il n'est pas connecté
            return { 
              success: true, 
              user: loginResult.user,
              // ⭐ On ajoute un flag pour indiquer que la session a échoué
              _sessionIssue: true 
            };
          }
        } else {
          console.log('❌ Connexion automatique échouée:', loginResult.error);
          // Retourner l'user créé même si la connexion a échoué
          return { success: true, user: registerResult.user };
        }
      } else {
        console.log('❌ Inscription échouée:', registerResult.error);
        setError(registerResult.error || 'Erreur lors de l\'inscription');
        return { success: false };
      }
    } catch (err) {
      console.log('❌ Erreur inscription:', err);
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async (data: ProfileData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🎯 Création du profil...', data);
      
      // ⭐ VÉRIFICATION : D'abord vérifier si on est connecté
      console.log('🔐 Vérification connexion avant createProfile...');
      const meResult = await apiService.getCurrentUser();
      console.log('📊 Statut connexion (/api/auth/me):', meResult);
      
      if (!meResult.success) {
  console.log('❌ Utilisateur non connecté pour createProfile');
  console.log('💡 Stratégie: Stocker les données temporairement et rediriger vers la connexion');
  
  // Sauvegarder les données temporairement
  const tempProfileData = {
    ...data,
    timestamp: Date.now()
  };
  localStorage.setItem('temp_profile_data', JSON.stringify(tempProfileData));
  
  // ⭐ REDIRECTION VERS LA BONNE ROUTE
  setTimeout(() => {
    window.location.href = '/connexion?message=profile_creation&redirect=quise-registration';
  }, 1000);
  
  return false;
}
      
      // Si on est connecté, créer le profil normalement
      const result = await apiService.createProfile(data);
      
      if (result.success) {
        console.log('✅ Profil créé avec succès');
        // Nettoyer les données temporaires si elles existent
        localStorage.removeItem('temp_profile_data');
        return true;
      } else {
        console.log('❌ Erreur création profil:', result.error);
        setError(result.error || 'Erreur lors de la création du profil');
        return false;
      }
    } catch (err) {
      console.log('❌ Erreur création profil:', err);
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  

  const login = async (data: LoginData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🎯 Tentative de connexion...', data.email);
      const result = await apiService.login(data);
      
      if (result.success && result.user) {
        console.log('✅ Connexion réussie', result.user);
        
        // ⭐ VÉRIFICATION : Vérifier que la session est bien active
        await new Promise(resolve => setTimeout(resolve, 300));
        const meResult = await apiService.getCurrentUser();
        
        if (meResult.success && meResult.user) {
          console.log('🎉 Session confirmée active');
          setUser(meResult.user);
          
          // ⭐ BONUS : Vérifier s'il y a des données de profil temporaires à traiter
          const tempProfileData = localStorage.getItem('temp_profile_data');
          if (tempProfileData) {
            console.log('📝 Données de profil temporaires détectées, traitement...');
            const profileData = JSON.parse(tempProfileData);
            await apiService.createProfile(profileData);
            localStorage.removeItem('temp_profile_data');
          }
          
          return true;
        } else {
          console.log('⚠️ Connexion OK mais session inactive');
          setError('Problème de session. Veuillez réessayer.');
          return false;
        }
      } else {
        console.log('❌ Connexion échouée:', result.error);
        setError(result.error || 'Email ou mot de passe incorrect');
        return false;
      }
    } catch (err) {
      console.log('❌ Erreur connexion:', err);
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Dans useAuth.ts - modifier la méthode logout
const logout = async (): Promise<void> => {
  setIsLoading(true);
  try {
    console.log('🎯 Déconnexion...');
    await apiService.logout();
    setUser(null);
    
    // ⭐ NETTOYAGE COMPLET
    localStorage.removeItem('temp_profile_data');
    localStorage.removeItem('temp_questionnaire_responses');
    localStorage.removeItem('temp_user_id');
    
    console.log('✅ Déconnexion réussie');
  } catch (err) {
    console.error('❌ Erreur déconnexion:', err);
    // Déconnexion locale même si l'API échoue
    setUser(null);
    localStorage.clear();
  } finally {
    setIsLoading(false);
  }
};

  const clearError = (): void => {
    setError(null);
  };

  return {
    user,
    isLoading,
    error,
    register,
    createProfile,
    login,
    logout,
    clearError,
  };
};