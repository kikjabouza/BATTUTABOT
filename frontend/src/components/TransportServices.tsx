import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Train, Bus, Car, Plane, Ship, MapPin, Navigation, Clock, DollarSign, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import des images pour le transport
import royalAirMaroc from "@/assets/royalair.svg";
import airArabia from "@/assets/airarabia.png";
import alboraq from "@/assets/Al_Boraq.png";
import oncf from "@/assets/logo.png";
import ctm from "@/assets/Fichier-17@2x-1.png";
import indrive from "@/assets/logo--white.svg";
import ferry from "@/assets/Aferry-logo.png";
import taxi from "@/assets/LOGO (1).png";

const transportCategories = [
  {
    id: "aerien",
    label: "Aérien",
    icon: Plane,
    options: [
      {
        icon: Plane,
        title: "Royal Air Maroc",
        description: "Compagnie nationale marocaine - Vols domestiques et internationaux",
        features: ["Casablanca - Marrakech", "Rabat - Dakhla", "Tanger - Agadir", "Service premium"],
        duration: "1-2h",
        image: royalAirMaroc,
        priceRange: "500-1500 DH",
        badge: "National",
        site: "https://royalairmaroc.com/ma-fr",
        reservation: "https://www.royalairmaroc.com/ma-fr/reservation/vols/choix-du-vol"
      },
      {
        icon: Plane,
        title: "Air Arabia",
        description: "Compagnie low-cost - Vols économiques vers les principales villes",
        features: ["Casablanca - Marrakech", "Rabat - Laâyoune", "Fès - Agadir", "Tarifs compétitifs"],
        duration: "1-2h",
        image: airArabia,
        priceRange: "300-1200 DH",
        badge: "Économique",
        site: "https://www.airarabia.com/fr",
        reservation: "https://www.airarabia.com/fr/book-flights"
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
        image: alboraq,
        priceRange: "150-300 DH",
        badge: "Moderne",
        site: "https://www.oncf.ma/fr/Al-Boraq",
        reservation: "https://www.oncf-voyages.ma/fr"
      },
      {
        icon: Train,
        title: "Trains ONCF",
        description: "Réseau ferroviaire national confortable et ponctuel",
        features: ["1ère et 2ème classe", "Climatisation", "Restaurant", "Ponctualité"],
        duration: "Variable",
        image: oncf,
        priceRange: "80-250 DH",
        badge: "Confortable",
        site: "https://www.oncf.ma",
        reservation: "https://www.oncf-voyages.ma/fr"
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
        image: ctm,
        priceRange: "50-200 DH",
        badge: "Économique",
        site: "https://www.ctm.ma",
        reservation: "https://www.ctm.ma/fr/reservation"
      },
      {
        icon: Car,
        title: "Location de Voiture",
        description: "Explorez le Maroc en toute liberté avec votre véhicule",
        features: ["4x4 & SUV", "Berlines", "GPS inclus", "Assurance complète"],
        duration: "À votre rythme",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500",
        priceRange: "300-800 DH/jour",
        badge: "Liberté",
        site: "https://www.hertz.com",
        reservation: "https://www.hertz.com/rentacar/reservation"
      }
    ]
  }
];

const TransportServices = () => {
  const navigate = useNavigate();

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

        <div className="space-y-8">
          {transportCategories.map((category) => {
            const Icon = category.icon;
            
            return (
              <div key={category.id} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">{category.label}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.options.map((transport) => {
                    const TransportIcon = transport.icon;
                    return (
                      <Card key={transport.title} className="p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group">
                        <div className="w-full h-48 rounded-lg flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-primary/10 to-accent/10">
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary/90 text-primary-foreground">
                              {transport.badge}
                            </Badge>
                          </div>
                          {transport.image ? (
                            <img 
                              src={transport.image} 
                              alt={transport.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <TransportIcon className="w-16 h-16 text-primary/40" />
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-foreground">{transport.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {transport.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {transport.duration}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground flex items-center gap-1">
                                <DollarSign className="w-3 h-3" /> {transport.priceRange}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <ul className="space-y-1 text-sm">
                              {transport.features.map((feature) => (
                                <li key={feature} className="text-muted-foreground flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              className="hero-button flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (transport.reservation) window.open(transport.reservation, '_blank');
                              }}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Réserver
                            </Button>
                            {transport.site && (
                              <Button 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(transport.site, '_blank');
                                }}
                              >
                                Site web
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="hero-button"
            onClick={() => navigate('/services')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Voir tous les services de transport
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TransportServices;