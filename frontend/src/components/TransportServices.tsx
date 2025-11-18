import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Train, Bus, Car, Plane, Ship, MapPin, Navigation, Clock, DollarSign } from "lucide-react";

const transportCategories = [
  {
    id: "aerien",
    label: "Aérien",
    icon: Plane,
    options: [
      {
        icon: Plane,
        title: "Vols Domestiques",
        description: "Voyagez rapidement entre les principales villes du Maroc avec Royal Air Maroc et Air Arabia",
        features: ["Casablanca - Marrakech", "Rabat - Dakhla", "Tanger - Agadir", "Service à bord"],
        duration: "1-2h",
        priceRange: "500-1500 DH",
        badge: "Rapide"
      }
    ]
  },
  {
    id: "ferroviaire",
    label: "Ferroviaire",
    icon: Train,
    options: [
      {
        icon: Train,
        title: "Al Boraq (TGV)",
        description: "Le train à grande vitesse reliant Casablanca à Tanger en 2h10",
        features: ["320 km/h", "Wi-Fi gratuit", "Prises électriques", "Confort premium"],
        duration: "2h10",
        priceRange: "150-300 DH",
        badge: "Moderne"
      },
      {
        icon: Train,
        title: "Trains ONCF",
        description: "Réseau ferroviaire national confortable et ponctuel",
        features: ["1ère et 2ème classe", "Climatisation", "Restaurant", "Ponctualité"],
        duration: "Variable",
        priceRange: "80-250 DH",
        badge: "Confortable"
      }
    ]
  },
  {
    id: "routier",
    label: "Routier",
    icon: Bus,
    options: [
      {
        icon: Bus,
        title: "Bus CTM & Supratours",
        description: "Services de bus premium avec réseau national complet",
        features: ["Sièges inclinables", "Climatisation", "Bagages inclus", "Arrêts fréquents"],
        duration: "Variable",
        priceRange: "50-200 DH",
        badge: "Économique"
      },
      {
        icon: Car,
        title: "Location de Voiture",
        description: "Explorez le Maroc en toute liberté avec votre véhicule",
        features: ["4x4 & SUV", "Berlines", "GPS inclus", "Assurance complète"],
        duration: "À votre rythme",
        priceRange: "300-800 DH/jour",
        badge: "Liberté"
      }
    ]
  },
  {
    id: "maritime",
    label: "Maritime",
    icon: Ship,
    options: [
      {
        icon: Ship,
        title: "Traversées Ferry",
        description: "Liaisons maritimes Europe-Maroc via les ports modernes",
        features: ["Tanger Med", "Nador", "Cabines disponibles", "Véhicules acceptés"],
        duration: "6-8h",
        priceRange: "500-1500 DH",
        badge: "International"
      }
    ]
  },
  {
    id: "urbain",
    label: "Urbain",
    icon: MapPin,
    options: [
      {
        icon: MapPin,
        title: "Taxis & VTC",
        description: "Solutions de mobilité urbaine flexibles et accessibles",
        features: ["Petits taxis (ville)", "Grands taxis (inter-villes)", "Uber & Careem", "Tarifs réglementés"],
        duration: "Sur demande",
        priceRange: "10-100 DH",
        badge: "Pratique"
      }
    ]
  }
];

const TransportServices = () => {
  return (
    <section id="transport" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Navigation className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Mobilité & Transport</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Services de Transport
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tous les moyens pour vous déplacer facilement à travers le Maroc
          </p>
        </div>

        <Tabs defaultValue="aerien" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2">
            {transportCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {transportCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              {category.options.map((transport) => {
                const Icon = transport.icon;
                return (
                  <Card key={transport.title} className="overflow-hidden culture-card">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="relative h-64 md:h-auto bg-gradient-to-br from-primary/10 to-accent/10">
                        <div className="absolute inset-0 bg-[url('/assets/background.svg')] bg-cover bg-center opacity-10" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary/90 text-primary-foreground">
                            {transport.badge}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-24 h-24 text-primary/30" />
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 p-8 space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-foreground">
                            {transport.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {transport.description}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              Durée
                            </h4>
                            <p className="text-muted-foreground">{transport.duration}</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-primary" />
                              Tarif
                            </h4>
                            <p className="text-muted-foreground">{transport.priceRange}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-foreground">Caractéristiques :</h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {transport.features.map((feature) => (
                              <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button className="hero-button">
                          Réserver maintenant
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default TransportServices;
