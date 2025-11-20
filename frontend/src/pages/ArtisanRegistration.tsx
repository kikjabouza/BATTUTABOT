import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft, Sparkles, MapPin, Euro, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ArtisanRegistration = () => {
  const [formData, setFormData] = useState({
    typeArtisanat: "",
    adresseAtelier: "",
    description: "",
    produits: "",
    prixVisite: "",
    pratiquesEco: "",
    labelEco: false
  });

  const { user, createProfile, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const artisanatTypes = [
    "Poterie & Céramique",
    "Tissage & Tapis",
    "Boiserie & Marqueterie",
    "Métallerie & Ferronnerie",
    "Bijouterie & Orfèvrerie",
    "Cuir & Maroquinerie",
    "Vannerie & Sparterie",
    "Broderie & Couture",
    "Autre"
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
    userId: parseInt(tempUserId), // ⭐ UTILISEZ tempUserId
    profilType: "artisan",
    typeArtisanat: formData.typeArtisanat,
    adresseAtelier: formData.adresseAtelier,
    description: formData.description,
    produits: formData.produits,
    prixVisite: parseFloat(formData.prixVisite) || 0,
    pratiquesEco: formData.pratiquesEco,
    labelEco: formData.labelEco
  };

    const success = await createProfile(profileData);
    
    if (success) {
      // Appel à l'API choisir-profil pour créer le profil artisan
      try {
        const response = await fetch('/api/choisir-profil', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            profilType: 'artisan',
            typeArtisanat: formData.typeArtisanat,
            adresseAtelier: formData.adresseAtelier,
            description: formData.description,
            produits: formData.produits,
            prixVisite: parseFloat(formData.prixVisite) || 0,
            pratiquesEco: formData.pratiquesEco
          })
        });

        const result = await response.json();

        if (result.success) {
          console.log('✅ Profil artisan créé avec succès:', result);
          // Rediriger vers la connexion avec message de succès
          navigate('/connexion?message=profile_created&profil=artisan');
        } else {
          console.error('❌ Erreur création profil artisan:', result.error);
          // Même en cas d'erreur, rediriger vers la connexion
          navigate('/connexion?message=profile_creation_error');
        }
      } catch (error) {
        console.error('❌ Erreur API création profil:', error);
        navigate('/connexion?message=profile_creation_error');
      }
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
              <span className="text-sm font-medium text-primary">Complétez votre profil Artisan</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Votre Atelier 🎨
            </h1>
            <p className="text-xl text-muted-foreground">
              Partagez votre savoir-faire avec le monde
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
              {/* Type d'artisanat */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Votre spécialité *</Label>
                <select
                  value={formData.typeArtisanat}
                  onChange={(e) => setFormData({...formData, typeArtisanat: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  required
                >
                  <option value="">Sélectionnez votre artisanat</option>
                  {artisanatTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Adresse de l'atelier */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Adresse de l'atelier *
                </Label>
                <Input
                  placeholder="Rue, ville, région..."
                  value={formData.adresseAtelier}
                  onChange={(e) => setFormData({...formData, adresseAtelier: e.target.value})}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label>Description de votre atelier *</Label>
                <Textarea
                  placeholder="Parlez de votre histoire, vos techniques, votre passion..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  required
                />
              </div>

              {/* Produits */}
              <div className="space-y-3">
                <Label>Vos produits et créations *</Label>
                <Textarea
                  placeholder="Listez vos principales créations (vases, tapis, bijoux...)"
                  value={formData.produits}
                  onChange={(e) => setFormData({...formData, produits: e.target.value})}
                  rows={3}
                  required
                />
              </div>

              {/* Prix visite */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Euro className="w-4 h-4" />
                  Prix de la visite guidée (DH)
                </Label>
                <Input
                  type="number"
                  placeholder="50"
                  value={formData.prixVisite}
                  onChange={(e) => setFormData({...formData, prixVisite: e.target.value})}
                />
                <p className="text-sm text-muted-foreground">
                  Laissez 0 si vous ne proposez pas de visites
                </p>
              </div>

              {/* Pratiques éco-responsables */}
              <div className="space-y-3">
                <Label>Pratiques éco-responsables</Label>
                <Textarea
                  placeholder="Décrivez vos pratiques durables (matériaux naturels, recyclage, énergie solaire...)"
                  value={formData.pratiquesEco}
                  onChange={(e) => setFormData({...formData, pratiquesEco: e.target.value})}
                  rows={3}
                />
              </div>

              {/* Label éco */}
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                <input
                  type="checkbox"
                  id="labelEco"
                  checked={formData.labelEco}
                  onChange={(e) => setFormData({...formData, labelEco: e.target.checked})}
                  className="w-4 h-4 text-primary rounded"
                />
                <Label htmlFor="labelEco" className="cursor-pointer">
                  Je souhaite obtenir le label éco-responsable
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
                  disabled={isLoading || !formData.typeArtisanat || !formData.adresseAtelier}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Création...
                    </>
                  ) : (
                    <>
                      Finaliser mon profil
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

export default ArtisanRegistration;