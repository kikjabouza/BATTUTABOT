import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft, Sparkles, AlertCircle, Calendar, Phone, Globe } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Inscription = () => {
  const [step, setStep] = useState<number>(1);
  const [userType, setUserType] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    prenom: "",
    nom: "",
    telephone: "",
    date_naissance: "",
    langue_preferee: "fr",
    besoins_accessibilite: "",
    preferences: [] as string[],
  });

  const { register, createProfile, isLoading, error: authError, clearError: clearAuthError } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const clearError = () => setError(null);

  const userTypes = [
    { value: "touriste", label: "Touriste", description: "Je veux explorer le Maroc", role: "ROLE_TOURISTE" },
    { value: "artisan", label: "Artisan", description: "Je veux partager mon savoir-faire", role: "ROLE_ARTISAN" },
    { value: "guide", label: "Guide", description: "Je veux accompagner des voyageurs", role: "ROLE_GUIDE" },
    { value: "proprietaire", label: "Propriétaire", description: "Je propose un hébergement", role: "ROLE_PROPRIETAIRE" },
  ];

  const languages = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "ar", label: "العربية" },
    { value: "es", label: "Español" },
  ];

  const touristePreferences = [
    "Culture & Patrimoine",
    "Nature & Aventure",
    "Gastronomie",
    "Artisanat",
    "Détente & Bien-être",
    "Tourisme Durable",
  ];

  const accessibiliteOptions = [
    "Mobilité réduite",
    "Auditif",
    "Visuel",
    "Aucun besoin spécifique",
  ];

 const handleFinalSubmit = async (): Promise<void> => {
  clearError();
  clearAuthError();
  
  const selectedUserType = userTypes.find(type => type.value === userType);
  if (!selectedUserType) {
    setError("Type d'utilisateur invalide");
    return;
  }

  const registerData = {
    email: formData.email,
    password: formData.password,
    prenom: formData.prenom,
    nom: formData.nom,
    telephone: formData.telephone || undefined,
    date_naissance: formData.date_naissance || undefined,
    langue_preferee: formData.langue_preferee,
    besoins_accessibilite: formData.besoins_accessibilite,
    role: selectedUserType.role,
  };

  console.log('🎯 Début inscription...');
  
  const registerResult = await register(registerData);
  
  console.log('✅ Résultat inscription:', registerResult);
  
  if (registerResult.success && registerResult.user) {
    const createdUser = registerResult.user;
    
    // Stocker l'ID utilisateur dans le localStorage
    localStorage.setItem('temp_user_id', createdUser.id.toString());
    
    console.log('🎯 Redirection pour:', userType, 'avec userId:', createdUser.id);
    
    // ⭐ STRATÉGIE ADAPTATIVE : 
    if (userType === "touriste") {
      // Préparer les données du profil
      const profileData = {
        userId: createdUser.id,
        profilType: "touriste",
        preferences: formData.preferences
      };
      
      // Si problème de session, createProfile redirigera automatiquement
      const profileSuccess = await createProfile(profileData);
      
      if (profileSuccess) {
        navigate('/quise-registration');
      }
      // Si profileSuccess est false, la redirection est déjà gérée dans createProfile
    } else {
      // Pour les autres types, redirection directe
      switch(userType) {
        case "artisan":
          navigate('/artisan-registration');
          break;
        case "guide":
          navigate('/guide-registration');
          break;
        case "proprietaire":
          navigate('/dashboard');
          break;
        default:
          setError("Type d'utilisateur non reconnu");
      }
    }
  } else {
    console.error('❌ Inscription échouée');
    setError(authError || 'Erreur lors de l\'inscription');
  }
};

  const handleNameChange = (value: string): void => {
    const names = value.split(' ');
    const prenom = names[0] || '';
    const nom = names.slice(1).join(' ') || '';
    
    setFormData(prev => ({
      ...prev,
      prenom,
      nom
    }));
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Inscription Guidée par IA</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Créez votre compte
            </h1>
            <p className="text-xl text-muted-foreground">
              Étape {step} sur 3 - Laissez notre IA personnaliser votre expérience
            </p>
          </div>

          {/* Affichage des erreurs */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}
          {authError && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-destructive text-sm">{authError}</p>
            </div>
          )}

          <Card className="p-8 space-y-8">
            {/* Step 1: User Type Selection */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">Qui êtes-vous ?</Label>
                  <p className="text-muted-foreground">Sélectionnez votre profil pour une expérience personnalisée</p>
                </div>

                <RadioGroup value={userType} onValueChange={setUserType} className="space-y-4">
                  {userTypes.map((type) => (
                    <div key={type.value} className="flex items-start space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all cursor-pointer">
                      <RadioGroupItem value={type.value} id={type.value} />
                      <div className="flex-1">
                        <Label htmlFor={type.value} className="cursor-pointer text-base font-semibold">
                          {type.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                <Button 
                  className="w-full hero-button" 
                  size="lg"
                  disabled={!userType}
                  onClick={() => setStep(2)}
                >
                  Continuer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Step 2: Basic Information */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">Informations de base</Label>
                  <p className="text-muted-foreground">Créez vos identifiants de connexion</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input 
                      id="name" 
                      placeholder="Entrez votre prénom et nom"
                      value={`${formData.prenom} ${formData.nom}`.trim()}
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe *</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telephone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Téléphone
                      </Label>
                      <Input 
                        id="telephone" 
                        type="tel"
                        placeholder="+212 6..."
                        value={formData.telephone}
                        onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date_naissance" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date de naissance
                      </Label>
                      <Input 
                        id="date_naissance" 
                        type="date"
                        value={formData.date_naissance}
                        onChange={(e) => setFormData({...formData, date_naissance: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="langue_preferee" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Langue préférée
                      </Label>
                      <select
                        id="langue_preferee"
                        value={formData.langue_preferee}
                        onChange={(e) => setFormData({...formData, langue_preferee: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      >
                        {languages.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="besoins_accessibilite">Besoins d'accessibilité</Label>
                      <select
                        id="besoins_accessibilite"
                        value={formData.besoins_accessibilite}
                        onChange={(e) => setFormData({...formData, besoins_accessibilite: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      >
                        <option value="">Sélectionnez une option</option>
                        {accessibiliteOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Retour
                  </Button>
                  <Button 
                    className="flex-1 hero-button" 
                    size="lg"
                    disabled={!formData.email || !formData.password || !formData.prenom}
                    onClick={() => setStep(3)}
                  >
                    Continuer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">
                    {userType === "touriste" 
                      ? "Vos préférences de voyage"
                      : "Dernière étape"}
                  </Label>
                  <p className="text-muted-foreground">
                    {userType === "touriste" 
                      ? "Sélectionnez vos centres d'intérêt pour des recommandations personnalisées"
                      : "Presque terminé ! Cliquez sur créer mon compte"}
                  </p>
                </div>

                {userType === "touriste" && (
                  <div className="space-y-3">
                    {touristePreferences.map((pref) => (
                      <div key={pref} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50">
                        <Checkbox 
                          id={pref}
                          checked={formData.preferences.includes(pref)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({...formData, preferences: [...formData.preferences, pref]});
                            } else {
                              setFormData({...formData, preferences: formData.preferences.filter(p => p !== pref)});
                            }
                          }}
                        />
                        <Label htmlFor={pref} className="cursor-pointer flex-1">{pref}</Label>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Prochaines étapes :</strong><br/>
                    {userType === "touriste" && "Vous serez redirigé vers la complétion de votre profil touriste"}
                    {userType === "artisan" && "Vous serez redirigé vers le formulaire détaillé pour artisans"}
                    {userType === "guide" && "Vous serez redirigé vers le formulaire détaillé pour guides"}
                    {userType === "proprietaire" && "Vous serez directement connecté à votre tableau de bord"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Retour
                  </Button>
                  <Button 
                    className="flex-1 hero-button" 
                    size="lg" 
                    onClick={handleFinalSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Inscription...
                      </>
                    ) : (
                      <>
                        Créer mon compte
                        <Sparkles className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Inscription;