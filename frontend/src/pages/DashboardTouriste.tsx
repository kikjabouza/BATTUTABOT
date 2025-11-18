import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Home,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Leaf
} from "lucide-react";

const DashboardTouriste = () => {
  const quickActions = [
    {
      title: "Organiser mon voyage",
      description: "Créez votre itinéraire personnalisé avec l'IA",
      icon: Calendar,
      color: "primary",
      link: "/plan-voyage"
    },
    {
      title: "Culture marocaine",
      description: "Découvrez le patrimoine et les traditions",
      icon: Sparkles,
      color: "accent",
      link: "/culture"
    },
    {
      title: "Voyageurs proches",
      description: "Connectez-vous avec d'autres touristes",
      icon: Users,
      color: "secondary",
      link: "/communaute"
    },
    {
      title: "Hébergement & Transport",
      description: "Trouvez les meilleurs services",
      icon: Home,
      color: "primary",
      link: "/services"
    }
  ];

  const aiSuggestions = [
    {
      title: "Week-end à Chefchaouen",
      description: "La ville bleue vous attend - 3 jours d'exploration culturelle",
      image: "🏙️",
      distance: "250 km"
    },
    {
      title: "Oasis de Fint",
      description: "Escapade nature et tradition berbère",
      image: "🌴",
      distance: "180 km"
    },
    {
      title: "Atelier de poterie à Safi",
      description: "Découvrez l'artisanat traditionnel",
      image: "🏺",
      distance: "120 km"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Votre Assistant IA Personnel</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Bonjour Khadija ! 👋
            </h1>
            <p className="text-xl text-muted-foreground">
              Prête pour une nouvelle aventure au Maroc ?
            </p>
          </div>

          {/* AI Chat Quick Access */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Discutez avec votre IA</h3>
                  <p className="text-muted-foreground">Posez vos questions, obtenez des recommandations instantanées</p>
                </div>
              </div>
              <Button className="hero-button">
                Ouvrir le chat
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Actions */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Actions rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Card key={index} className="user-type-card group p-6 space-y-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${action.color}/20 to-accent/20 flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground">{action.title}</h3>
                        <p className="text-muted-foreground">{action.description}</p>
                      </div>
                      <Button variant="outline" className="w-full group/btn">
                        Accéder
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* AI Suggestions Sidebar */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Suggestions IA</h2>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              
              <div className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <Card key={index} className="p-4 space-y-3 hover:border-primary/30 transition-all cursor-pointer">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{suggestion.image}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground">{suggestion.title}</h4>
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span className="text-xs text-primary font-medium">{suggestion.distance}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Eco Score */}
              <Card className="p-6 bg-gradient-to-br from-secondary/20 to-primary/10 border-secondary/30">
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="w-6 h-6 text-secondary" />
                  <h3 className="font-bold text-lg text-foreground">Score Éco-Voyage</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Votre impact</span>
                    <span className="text-2xl font-bold text-secondary">850 pts</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-gradient-to-r from-secondary to-primary h-3 rounded-full" style={{width: "85%"}}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    🎉 Excellent ! Vous êtes dans le top 15% des voyageurs éco-responsables
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardTouriste;