// src/components/Logout.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext'; 

const Logout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.log('Déconnexion locale effectuée');
      } finally {
        // ⭐ REDIRIGER TOUJOURS VERS L'ACCUEIL
        navigate('/', { replace: true });
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2">Déconnexion en cours...</p>
      </div>
    </div>
  );
};

export default Logout;