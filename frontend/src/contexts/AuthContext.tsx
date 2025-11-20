import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Créez le contexte
const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

// Créez le Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth(); // ⭐ UNE SEULE instance pour toute l'app
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Créez le hook personnalisé
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};