import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
  Clock
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Ecodefis = () => {
  const navigate = useNavigate();
  
  // Simuler l'état de connexion - À remplacer par votre système d'auth réel
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  
  // Exemple de défis
  const defis = [
    {
      id: 1,
      titre: "Course Matinale",
      description: "Courir 15 minutes par jour pendant 7 jours",
      type: "sport",
      points: 50,
      valeurCible: 7,
      unite: "jours",
      badge: "Runner Éco",
      icon: Footprints,
      estActif: true
    },
    {
      id: 2,
      titre: "Transport Vert",
      description: "Utiliser vélo ou transport en commun au lieu de la voiture",
      type: "transport",
      points: 30,
      valeurCible: 5,
      unite: "trajets",
      badge: "Cycliste Urbain",
      icon: Bike,
      estActif: true
    },
    {
      id: 3,
      titre: "Ramassage de Déchets",
      description: "Ramasser et jeter correctement 10 déchets",
      type: "environnement",
      points: 40,
      valeurCible: 10,
      unite: "déchets",
      badge: "Gardien Nature",
      icon: Trash2,
      estActif: true
    },
    {
      id: 4,
      titre: "Clean Up Day",
      description: "Participer à un événement de nettoyage communautaire",
      type: "communauté",
      points: 100,
      valeurCible: 1,
      unite: "événement",
      badge: "Héros Éco",
      icon: Users,
      estActif: true
    }
  ];

  // Exemple de réalisations pour utilisateur connecté
  const mesRealisations = [
    {
      id: 1,
      defi: defis[0],
      progres: 4,
      estTermine: false,
      pointsGagnes: 0
    },
    {
      id: 2,
      defi: defis[2],
      progres: 10,
      estTermine: true,
      pointsGagnes: 40
    }
  ];

  const handleDefiAction = (defiId: number) => {
    if (!isAuthenticated) {
      navigate("/inscription");
    } else {
      // Ouvrir modal de soumission de justification
      console.log("Ouvrir modal pour défi", defiId);
    }
  };

  const pointsRequis = 500;
  const progressPercentage = (userPoints / pointsRequis) * 100;

  return (
    <div className="min-h-screen bg-[url('assets/bg_vers_zlij.png')] bg-center bg-repeat-y">
      <Navigation />
      
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
                  { num: "3", title: "Validez vos actions", desc: "Envoyez une photo ou message de preuve" },
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
                          <realisation.defi.icon className="w-5 h-5 text-primary" />
                          {realisation.defi.titre}
                        </span>
                        {realisation.estTermine && (
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Terminé
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{realisation.defi.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-medium text-foreground">
                            {realisation.progres} / {realisation.defi.valeurCible} {realisation.defi.unite}
                          </span>
                        </div>
                        <Progress 
                          value={(realisation.progres / realisation.defi.valeurCible) * 100} 
                          className="h-2"
                        />
                      </div>
                      {!realisation.estTermine && (
                        <Button 
                          onClick={() => handleDefiAction(realisation.defi.id)} 
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
              {defis.map((defi) => (
                <Card 
                  key={defi.id} 
                  className="culture-card group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <defi.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      <span>{defi.titre}</span>
                      <Badge variant="secondary" className="text-primary font-bold">
                        +{defi.points} pts
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
                      <span>Badge: {defi.badge}</span>
                    </div>
                    <Button 
                      onClick={() => handleDefiAction(defi.id)}
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

      <Footer />
    </div>
  );
};

export default Ecodefis;
