import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Sparkles, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Connexion = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Récupérer les paramètres d'URL pour les redirections
  const redirectParam = searchParams.get('redirect');
  const messageParam = searchParams.get('message');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    console.log('🎯 Tentative de connexion...', formData.email);

    const success = await login(formData);
    
    if (success) {
      console.log('✅ Connexion réussie, redirection...');
      
      // 🔄 Gestion des redirections intelligentes
      let redirectTo = '/dashboard';
      
      if (redirectParam) {
        switch(redirectParam) {
          case 'profile_creation':
            redirectTo = '/quise-registration';
            break;
          case 'questionnaire':
            redirectTo = '/quise-registration';
            break;
          case 'dashboard':
            redirectTo = '/dashboard';
            break;
          default:
            redirectTo = `/${redirectParam}`;
        }
      }
      
      // 🔄 Traitement des données temporaires après connexion
      const tempProfileData = localStorage.getItem('temp_profile_data');
      const tempQuestionnaireData = localStorage.getItem('temp_questionnaire_responses');
      
      if (tempProfileData) {
        console.log('📝 Données de profil temporaires détectées...');
        // Le profil sera créé automatiquement par useAuth
      }
      
      if (tempQuestionnaireData) {
        console.log('📝 Réponses de questionnaire temporaires détectées...');
        // Les réponses seront traitées dans QuiseRegistration
      }
      
      navigate(redirectTo);
    } else {
      console.log('❌ Échec de la connexion');
    }
  };

  // Messages contextuels selon le paramètre d'URL
  const getMessage = () => {
    switch(messageParam) {
      case 'session_expired':
        return "Votre session a expiré. Veuillez vous reconnecter.";
      case 'questionnaire_pending':
        return "Vos réponses au questionnaire ont été sauvegardées. Connectez-vous pour les finaliser.";
      case 'profile_creation':
        return "Votre inscription est presque terminée. Connectez-vous pour créer votre profil.";
      default:
        return null;
    }
  };

  const contextMessage = getMessage();

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      
      <main className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          {/* En-tête simple et épuré */}
          <div className="text-center mb-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Bienvenue</span>-<span className="font-arabic text-primary">مرحبا بكم</span>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground">
              Connexion
            </h1>
            <p className="text-muted-foreground">
              Accédez à votre compte BattutaBot
            </p>
          </div>

          {/* Message contextuel */}
          {contextMessage && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <Sparkles className="w-4 h-4" />
                <p className="text-sm">{contextMessage}</p>
              </div>
            </div>
          )}

          {/* Affichage des erreurs */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Carte de connexion simplifiée */}
          <Card className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="border-2 focus:border-primary transition-all"
                  required
                />
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pr-10 border-2 focus:border-primary transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Lien mot de passe oublié */}
              <div className="text-right">
                <a href="/reset-password" className="text-sm text-primary hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Bouton de connexion */}
              <Button 
                type="submit"
                className="w-full hero-button group"
                size="lg"
                disabled={isLoading || !formData.email || !formData.password}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Connexion...
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>

            {/* Séparateur */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">Nouveau ici ?</span>
              </div>
            </div>

            {/* Bouton d'inscription */}
            <Link to="/inscription">
              <Button 
                variant="outline" 
                className="w-full border-primary/30 hover:border-primary"
                size="lg"
              >
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                Créer un compte
              </Button>
            </Link>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Connexion;