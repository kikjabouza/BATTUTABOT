import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const Inscription = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    preferences: [] as string[],
  });

  const userTypes = [
    { value: "touriste", label: "Touriste", description: "Je veux explorer le Maroc" },
    { value: "artisan", label: "Artisan", description: "Je veux partager mon savoir-faire" },
    { value: "guide", label: "Guide", description: "Je veux accompagner des voyageurs" },
    { value: "proprietaire", label: "Propriétaire", description: "Je propose un hébergement" },
  ];

  const touristePreferences = [
    "Culture & Patrimoine",
    "Nature & Aventure",
    "Gastronomie",
    "Artisanat",
    "Détente & Bien-être",
    "Tourisme Durable",
  ];

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
                    <Label htmlFor="name">Nom complet</Label>
                    <Input 
                      id="name" 
                      placeholder="Entrez votre nom"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
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
                    disabled={!formData.email || !formData.password || !formData.name}
                    onClick={() => setStep(3)}
                  >
                    Continuer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Preferences (example for Touriste) */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">Vos préférences de voyage</Label>
                  <p className="text-muted-foreground">
                    {userType === "touriste" 
                      ? "Sélectionnez vos centres d'intérêt pour des recommandations personnalisées"
                      : "Complétez votre profil professionnel"}
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
                  >
                    Créer mon compte
                    <Sparkles className="ml-2 h-5 w-5" />
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