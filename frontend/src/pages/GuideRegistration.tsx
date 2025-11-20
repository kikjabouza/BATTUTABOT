import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft, Sparkles, Languages, Clock, AlertCircle } from "lucide-react";
import { useAuthContext } from '@/contexts/AuthContext'; 
import { useNavigate } from "react-router-dom";

const GuideRegistration = () => {
  const [formData, setFormData] = useState({
    specialisations: "",
    languesParlees: "",
    experienceAnnees: "",
    tarifHoraire: "",
    disponibilities: "",
    certification: "",
    accessibiliteHandicap: false
  });

  const { user, createProfile, isLoading, error, clearError } = useAuthContext();
  const navigate = useNavigate();

  const languages = ["Français", "Anglais", "Arabe", "Espagnol", "Allemand", "Italien", "Japonais"];
  const specialisations = [
    "Culture & Histoire",
    "Nature & Randonnée",
    "Gastronomie",
    "Artisanat",
    "Photographie",
    "Écotourisme",
    "Aventure",
    "Spiritualité"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  clearError();

  // ⭐ SUPPRIMEZ cette vérification - elle bloque inutilement
  // if (!user) {
  //   alert("Utilisateur non connecté");
  //   return;
  // }

  // ⭐ RÉCUPÉREZ l'userId du localStorage au lieu de user.id
  const tempUserId = localStorage.getItem('temp_user_id');
  
  if (!tempUserId) {
    alert("Session utilisateur non trouvée");
    return;
  }

    const profileData = {
      userId: parseInt(tempUserId),
      profilType: "guide",
      specialisations: formData.specialisations,
      languesParlees: formData.languesParlees,
      experienceAnnees: parseInt(formData.experienceAnnees) || 0,
      tarifHoraire: parseFloat(formData.tarifHoraire) || 0,
      disponibilities: formData.disponibilities,
      certification: formData.certification,
      accessibiliteHandicap: formData.accessibiliteHandicap
    };

    const success = await createProfile(profileData);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Devenez Guide Certifié</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Votre Profil Guide 🧭
            </h1>
            <p className="text-xl text-muted-foreground">
              Accompagnez les voyageurs dans leurs découvertes
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Spécialisations */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Vos spécialisations *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {specialisations.map((spec) => (
                    <div key={spec} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={spec}
                        value={spec}
                        checked={formData.specialisations.includes(spec)}
                        onChange={(e) => {
                          const newSpecs = e.target.checked
                            ? [...formData.specialisations.split(',').filter(s => s), spec].join(',')
                            : formData.specialisations.split(',').filter(s => s !== spec).join(',');
                          setFormData({...formData, specialisations: newSpecs});
                        }}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <Label htmlFor={spec} className="text-sm cursor-pointer">{spec}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Langues parlées */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Langues parlées *
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {languages.map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={lang}
                        value={lang}
                        checked={formData.languesParlees.includes(lang)}
                        onChange={(e) => {
                          const newLangs = e.target.checked
                            ? [...formData.languesParlees.split(',').filter(l => l), lang].join(',')
                            : formData.languesParlees.split(',').filter(l => l !== lang).join(',');
                          setFormData({...formData, languesParlees: newLangs});
                        }}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <Label htmlFor={lang} className="text-sm cursor-pointer">{lang}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expérience et tarif */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Années d'expérience *</Label>
                  <Input
                    type="number"
                    placeholder="5"
                    value={formData.experienceAnnees}
                    onChange={(e) => setFormData({...formData, experienceAnnees: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label>Tarif horaire (DH) *</Label>
                  <Input
                    type="number"
                    placeholder="200"
                    value={formData.tarifHoraire}
                    onChange={(e) => setFormData({...formData, tarifHoraire: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Disponibilités */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Disponibilités
                </Label>
                <Textarea
                  placeholder="Ex: Lundi-Vendredi 9h-18h, Weekends sur réservation..."
                  value={formData.disponibilities}
                  onChange={(e) => setFormData({...formData, disponibilities: e.target.value})}
                  rows={2}
                />
              </div>

              {/* Certification */}
              <div className="space-y-3">
                <Label>Certifications ou formations</Label>
                <Input
                  placeholder="Ex: Guide certifié ONMT, Formation écotourisme..."
                  value={formData.certification}
                  onChange={(e) => setFormData({...formData, certification: e.target.value})}
                />
              </div>

              {/* Accessibilité */}
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                <input
                  type="checkbox"
                  id="accessibiliteHandicap"
                  checked={formData.accessibiliteHandicap}
                  onChange={(e) => setFormData({...formData, accessibiliteHandicap: e.target.checked})}
                  className="w-4 h-4 text-primary rounded"
                />
                <Label htmlFor="accessibiliteHandicap" className="cursor-pointer">
                  Je propose des visites accessibles aux personnes à mobilité réduite
                </Label>
              </div>

              <div className="flex gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Plus tard
                </Button>
                <Button
                  type="submit"
                  className="flex-1 hero-button"
                  size="lg"
                  disabled={isLoading || !formData.specialisations || !formData.languesParlees}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Création...
                    </>
                  ) : (
                    <>
                      Devenir Guide
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GuideRegistration;