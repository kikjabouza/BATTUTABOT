import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NavigationRouter from "@/components/NavigationRouter";
import { 
  Leaf, 
  Trophy, 
  Award, 
  Target, 
  Bike, 
  Footprints, 
  Trash2, 
  Users, 
  Camera,
  Lock,
  CheckCircle2,
  Clock,
  Upload,
  X,
  LucideIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Types pour les défis et réalisations
type DefiEco = {
  id: number;
  titre: string;
  description: string;
  typeDefi: string;
  pointsRecompense: number;
  valeurCible: number;
  unite: string;
  nomBadge: string;
  iconeBadge: string | null;
  estActif: boolean;
};

type RealisationDefi = {
  id: number;
  progresValeur: number;
  estTermine: boolean;
  dateTerminaison: string | null;
  pointsGagnes: number;
  idUtilisateur: number | null;
  idDefi: number | null;
  defi?: DefiEco;
};

// Type pour le mapping des icônes
type IconMapType = {
  [key: string]: LucideIcon;
};

const Ecodefis = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const isAuthenticated = !!user;
  
  const [defis, setDefis] = useState<DefiEco[]>([]);
  const [mesRealisations, setMesRealisations] = useState<RealisationDefi[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDefi, setSelectedDefi] = useState<DefiEco | null>(null);
  const [preuveText, setPreuveText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Icons mapping avec typage strict
  const iconMap: IconMapType = {
    'sport': Footprints,
    'transport': Bike,
    'environnement': Trash2,
    'communauté': Users,
    'default': Target
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDefis();
      fetchMesRealisations();
    } else {
      fetchDefis();
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchDefis = async (): Promise<void> => {
    try {
      const response = await fetch('/api/defis');
      if (!response.ok) throw new Error('Erreur lors du chargement des défis');
      const data = await response.json();
      setDefis(data.data || []);
    } catch (error) {
      console.error('Erreur:', error);
      setDefis([]);
    }
  };

  const fetchMesRealisations = async (): Promise<void> => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/realisations-defis');
      if (!response.ok) throw new Error('Erreur lors du chargement des réalisations');
      const realisations: RealisationDefi[] = await response.json();
      
      // Filtrer les réalisations de l'utilisateur connecté
      const mesRealisations = realisations.filter((r: RealisationDefi) => 
        r.idUtilisateur === user.id
      );
      
      // Récupérer les détails des défis pour chaque réalisation
      const realisationsAvecDefis = await Promise.all(
        mesRealisations.map(async (realisation: RealisationDefi) => {
          if (realisation.idDefi) {
            try {
              const defiResponse = await fetch(`/api/defis/${realisation.idDefi}`);
              if (defiResponse.ok) {
                const defiData = await defiResponse.json();
                return { ...realisation, defi: defiData.data };
              }
            } catch (error) {
              console.error('Erreur chargement défi:', error);
            }
          }
          return realisation;
        })
      );
      
      setMesRealisations(realisationsAvecDefis);
      calculerPointsUtilisateur(realisationsAvecDefis);
    } catch (error) {
      console.error('Erreur:', error);
      setMesRealisations([]);
    } finally {
      setLoading(false);
    }
  };

  const calculerPointsUtilisateur = (realisations: RealisationDefi[]): void => {
    const totalPoints = realisations
      .filter(r => r.estTermine)
      .reduce((sum, r) => sum + r.pointsGagnes, 0);
    setUserPoints(totalPoints);
  };

  const handleDefiAction = (defi: DefiEco): void => {
    if (!isAuthenticated) {
      navigate("/inscription");
    } else {
      setSelectedDefi(defi);
      setPreuveText("");
      setModalOpen(true);
    }
  };

  const soumettreRealisation = async (): Promise<void> => {
    if (!selectedDefi || !user) return;
    
    setSubmitting(true);
    try {
      // Pour l'instant, on considère que l'utilisateur complète 1 unité du défi
      const progresValeur = 1;
      const estTermine = progresValeur >= selectedDefi.valeurCible;
      const pointsGagnes = estTermine ? selectedDefi.pointsRecompense : 0;

      const realisationData = {
        progresValeur,
        estTermine,
        pointsGagnes,
        idUtilisateur: user.id,
        idDefi: selectedDefi.id,
        dateTerminaison: estTermine ? new Date().toISOString() : null
      };

      const response = await fetch('/api/realisations-defis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(realisationData),
      });

      if (!response.ok) throw new Error('Erreur lors de la soumission');

      // Mettre à jour l'interface
      await fetchMesRealisations();
      setModalOpen(false);
      setSelectedDefi(null);
      setPreuveText("");

      // Afficher un message de succès
      alert(estTermine ? 
        `Félicitations ! Vous avez terminé le défi "${selectedDefi.titre}" et gagné ${pointsGagnes} points !` :
        `Progression enregistrée pour le défi "${selectedDefi.titre}" !`
      );

    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la soumission. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const getDefiIcon = (typeDefi: string): JSX.Element => {
    const typeDefiLower = typeDefi.toLowerCase();
    const IconComponent = iconMap[typeDefiLower] || iconMap.default;
    return <IconComponent className="w-8 h-8 text-primary" />;
  };

  const pointsRequis = 500;
  const progressPercentage = (userPoints / pointsRequis) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('assets/bg_vers_zlij.png')] bg-center bg-repeat-y">
        <NavigationRouter />
        <main className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-7xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement des défis...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('assets/bg_vers_zlij.png')] bg-center bg-repeat-y">
      <NavigationRouter />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl space-y-12">
          
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Leaf className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Programme Éco-Responsable</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Éco-Défis <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Battuta</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Participez à des défis écologiques, gagnez des points et 
              <span className="text-primary font-semibold"> débloquez un voyage gratuit au Maroc</span> de 2 à 7 jours !
            </p>
          </div>

          {/* Comment ça marche */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Comment ça marche ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { num: "1", title: "Inscrivez-vous", desc: "Créez votre compte et commencez à 0 points" },
                  { num: "2", title: "Relevez des défis", desc: "Choisissez parmi nos défis écologiques" },
                  { num: "3", title: "Validez vos actions", desc: "Envoyez une preuve de votre réalisation" },
                  { num: "4", title: "Gagnez votre voyage", desc: "Atteignez 500 points pour un voyage gratuit !" }
                ].map((step, i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-xl flex items-center justify-center mx-auto">
                      {step.num}
                    </div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progression utilisateur connecté */}
          {isAuthenticated && (
            <Card className="border-accent/20 bg-gradient-to-r from-accent/10 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-accent" />
                    Ma Progression
                  </span>
                  <Badge className="text-lg px-4 py-1 bg-gradient-to-r from-primary to-accent text-white">
                    {userPoints} / {pointsRequis} points
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-muted-foreground text-center">
                  Plus que <span className="font-bold text-accent">{pointsRequis - userPoints} points</span> pour débloquer votre voyage gratuit !
                </p>
              </CardContent>
            </Card>
          )}

          {/* Avertissement pour non-connectés */}
          {!isAuthenticated && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="py-6 flex items-center gap-4">
                <Lock className="w-8 h-8 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-foreground font-medium">
                    Connectez-vous pour participer aux défis et suivre vos points !
                  </p>
                </div>
                <Button onClick={() => navigate("/inscription")} className="hero-button">
                  S'inscrire
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Mes défis en cours (utilisateurs connectés) */}
          {isAuthenticated && mesRealisations.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-primary" />
                Mes Défis en Cours
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mesRealisations.map((realisation) => (
                  <Card key={realisation.id} className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          {realisation.defi && getDefiIcon(realisation.defi.typeDefi)}
                          {realisation.defi?.titre || `Défi #${realisation.idDefi}`}
                        </span>
                        {realisation.estTermine && (
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Terminé
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {realisation.defi?.description || "Description non disponible"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-medium text-foreground">
                            {realisation.progresValeur} / {realisation.defi?.valeurCible || 1} {realisation.defi?.unite || "unité"}
                          </span>
                        </div>
                        <Progress 
                          value={(realisation.progresValeur / (realisation.defi?.valeurCible || 1)) * 100} 
                          className="h-2"
                        />
                      </div>
                      {!realisation.estTermine && realisation.defi && (
                        <Button 
                          onClick={() => handleDefiAction(realisation.defi!)} 
                          className="w-full hero-button"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Ajouter une preuve
                        </Button>
                      )}
                      {realisation.estTermine && (
                        <div className="text-center py-2 text-green-600 font-medium">
                          +{realisation.pointsGagnes} points gagnés !
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Tous les défis disponibles */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Award className="w-8 h-8 text-primary" />
              Défis Disponibles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defis.filter(defi => defi.estActif).map((defi) => (
                <Card 
                  key={defi.id} 
                  className="culture-card group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {getDefiIcon(defi.typeDefi)}
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      <span>{defi.titre}</span>
                      <Badge variant="secondary" className="text-primary font-bold">
                        +{defi.pointsRecompense} pts
                      </Badge>
                    </CardTitle>
                    <CardDescription>{defi.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4" />
                      <span>Objectif: {defi.valeurCible} {defi.unite}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="w-4 h-4" />
                      <span>Badge: {defi.nomBadge}</span>
                    </div>
                    <Button 
                      onClick={() => handleDefiAction(defi)}
                      className="w-full hero-button-outline group-hover:bg-primary/10"
                    >
                      {isAuthenticated ? (
                        <>
                          <Clock className="w-4 h-4 mr-2" />
                          Commencer le défi
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Connexion requise
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Récompense finale */}
          <Card className="border-accent/30 bg-gradient-to-br from-accent/10 via-primary/10 to-accent/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
            <CardHeader className="relative">
              <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
                <Trophy className="w-10 h-10 text-accent" />
                La Grande Récompense
                <Trophy className="w-10 h-10 text-accent" />
              </CardTitle>
            </CardHeader>
            <CardContent className="relative text-center space-y-6">
              <p className="text-xl text-foreground font-medium">
                Atteignez <span className="text-accent font-bold text-2xl">{pointsRequis} points</span> et gagnez
              </p>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Un Voyage Gratuit au Maroc
              </div>
              <p className="text-muted-foreground text-lg">
                De 2 à 7 jours, tout compris : hébergement, visites guidées, découvertes culturelles !
              </p>
              {!isAuthenticated && (
                <Button 
                  onClick={() => navigate("/inscription")} 
                  size="lg" 
                  className="hero-button text-lg px-8 py-6"
                >
                  Commencer l'aventure
                </Button>
              )}
            </CardContent>
          </Card>

        </div>
      </main>

      {/* Modal de soumission de preuve */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Soumettre une preuve
            </DialogTitle>
            <DialogDescription>
              Partagez votre réalisation pour le défi "{selectedDefi?.titre}"
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Description de votre réalisation (optionnel)
              </label>
              <Textarea
                placeholder="Décrivez comment vous avez réalisé ce défi..."
                value={preuveText}
                onChange={(e) => setPreuveText(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Preuve visuelle (optionnel)
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Cliquez pour télécharger une photo ou glissez-déposez
                </p>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  // Pour l'instant, on ne traite pas les fichiers
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="flex-1"
                disabled={submitting}
              >
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
              <Button
                onClick={soumettreRealisation}
                className="flex-1 hero-button"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Soumettre
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Ecodefis;