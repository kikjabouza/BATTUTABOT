import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, User, RegisterData, LoginData, ProfileData } from '@/services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<{success: boolean; user?: User}>;
  createProfile: (data: ProfileData) => Promise<boolean>;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ⭐ Vérifier la session au chargement
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        console.log('🔍 Initialisation AuthContext...');
        const result = await apiService.getCurrentUser();
        
        if (isMounted) {
          if (result.success && result.user) {
            console.log('✅ Utilisateur chargé:', result.user);
            setUser(result.user);
          } else {
            console.log('ℹ️ Pas d\'utilisateur connecté');
            setUser(null);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error('⚠️ Erreur initialisation auth:', err);
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshUser = async () => {
    try {
      console.log('🔍 Rafraîchissement utilisateur...');
      const result = await apiService.getCurrentUser();
      
      if (result.success && result.user) {
        console.log('✅ Utilisateur rafraîchi:', result.user);
        setUser(result.user);
      } else {
        console.log('ℹ️ Pas d\'utilisateur connecté');
        setUser(null);
      }
    } catch (err) {
      console.log('⚠️ Erreur rafraîchissement:', err);
      setUser(null);
    }
  };

  const register = async (data: RegisterData): Promise<{success: boolean; user?: User}> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🎯 Début inscription...', data.email);
      
      const registerResult = await apiService.register(data);
      
      if (registerResult.success && registerResult.user) {
        console.log('✅ Inscription réussie');
        
        // Attendre que la session soit prête
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Connexion automatique
        const loginResult = await apiService.login({
          email: data.email,
          password: data.password
        });
        
        if (loginResult.success && loginResult.user) {
          console.log('✅ Connexion automatique réussie');
          
          // Attendre stabilisation session
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Vérifier que la session est active
          const meResult = await apiService.getCurrentUser();
          
          if (meResult.success && meResult.user) {
            console.log('🎉 Session confirmée active');
            setUser(meResult.user);
            return { success: true, user: meResult.user };
          }
        }
        
        // Si connexion auto échoue, retourner l'user créé
        setUser(registerResult.user);
        return { success: true, user: registerResult.user };
      }
      
      setError(registerResult.error || 'Erreur lors de l\'inscription');
      return { success: false };
    } catch (err) {
      console.error('❌ Erreur inscription:', err);
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
      console.log('🎯 Création profil...', data);
      
      // Vérifier connexion
      const meResult = await apiService.getCurrentUser();
      
      if (!meResult.success) {
        console.log('❌ Non connecté - sauvegarde temporaire');
        localStorage.setItem('temp_profile_data', JSON.stringify({
          ...data,
          timestamp: Date.now()
        }));
        
        setTimeout(() => {
          window.location.href = '/connexion?message=profile_creation&redirect=artisan-registration';
        }, 1000);
        
        return false;
      }
      
      // Créer le profil
      const result = await apiService.createProfile(data);
      
      if (result.success) {
        console.log('✅ Profil créé');
        localStorage.removeItem('temp_profile_data');
        
        // Rafraîchir les données utilisateur
        await refreshUser();
        
        return true;
      }
      
      setError(result.error || 'Erreur création profil');
      return false;
    } catch (err) {
      console.error('❌ Erreur création profil:', err);
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
      console.log('🎯 Connexion...', data.email);
      const result = await apiService.login(data);
      
      if (result.success && result.user) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Vérifier session
        const meResult = await apiService.getCurrentUser();
        
        if (meResult.success && meResult.user) {
          console.log('🎉 Session active');
          setUser(meResult.user);
          
          // Traiter profil temporaire si existe
          const tempProfileData = localStorage.getItem('temp_profile_data');
          if (tempProfileData) {
            console.log('📝 Traitement profil temporaire...');
            try {
              const profileData = JSON.parse(tempProfileData);
              await apiService.createProfile(profileData);
              localStorage.removeItem('temp_profile_data');
            } catch (e) {
              console.error('Erreur traitement profil temp:', e);
            }
          }
          
          return true;
        }
        
        setError('Problème de session');
        return false;
      }
      
      setError(result.error || 'Email ou mot de passe incorrect');
      return false;
    } catch (err) {
      console.error('❌ Erreur connexion:', err);
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      console.log('🎯 Déconnexion...');
      await apiService.logout();
      setUser(null);
      
      // Nettoyage
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

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      error,
      register,
      createProfile,
      login,
      logout,
      clearError,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};