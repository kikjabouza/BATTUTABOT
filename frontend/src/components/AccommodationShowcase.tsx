import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, Castle, Hotel, Star, MapPin, Wifi, Coffee, Waves, Users, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import d'images d'exemple pour les hébergements
import riadImage from '@/assets/article_24_137_1742826259.jpg';
import hotelImage from '@/assets/474656748.jpg';
import villaImage from '@/assets/161034491.jpg';
import maisonImage from '@/assets/maison-d-hotes-chamade.jpg';

const accommodations = [
  {
    id: 1,
    icon: Hotel,
    type: "Hôtels",
    title: "Hôtels de Luxe",
    description: "Des établissements 5 étoiles offrant un service exceptionnel et des équipements de premier ordre dans les plus belles villes du royaume",
    features: [
      { icon: Wifi, text: "Wi-Fi haut débit" },
      { icon: Waves, text: "Spa & Wellness" },
      { icon: Coffee, text: "Restaurants gastronomiques" },
      { icon: Users, text: "Service conciergerie 24/7" }
    ],
    amenities: ["Piscines chauffées", "Salles de sport", "Business center", "Parking sécurisé"],
    rating: 5,
    priceRange: "1500-5000 DH",
    capacity: "1-4 personnes",
    locations: ["Marrakech", "Casablanca", "Rabat"],
    badge: "Premium",
    image: hotelImage,
    ecoCertifie: true
  },
  {
    id: 2,
    icon: Castle,
    type: "Riads",
    title: "Riads Traditionnels",
    description: "Maisons traditionnelles au cœur des médinas, offrant authenticité et charme marocain dans un cadre d'exception",
    features: [
      { icon: Castle, text: "Architecture authentique" },
      { icon: Coffee, text: "Patio & fontaine" },
      { icon: Wifi, text: "Terrasse panoramique" },
      { icon: Users, text: "Service personnalisé" }
    ],
    amenities: ["Petit-déjeuner inclus", "Décoration artisanale", "Hammam traditionnel", "Salons marocains"],
    rating: 5,
    priceRange: "800-2500 DH",
    capacity: "2-6 personnes",
    locations: ["Fès", "Marrakech", "Essaouira"],
    badge: "Authentique",
    image: riadImage,
    ecoCertifie: true
  },
  {
    id: 3,
    icon: Home,
    type: "Maisons",
    title: "Maisons d'Hôtes",
    description: "Séjours chaleureux chez l'habitant pour une immersion culturelle authentique et des échanges enrichissants",
    features: [
      { icon: Users, text: "Ambiance familiale" },
      { icon: Coffee, text: "Cuisine maison" },
      { icon: MapPin, text: "Conseils locaux" },
      { icon: Home, text: "Confort simple" }
    ],
    amenities: ["Repas traditionnels", "Activités locales", "Visites guidées", "Cours de cuisine"],
    rating: 4,
    priceRange: "300-800 DH",
    capacity: "1-3 personnes",
    locations: ["Chefchaouen", "Ouarzazate", "Merzouga"],
    badge: "Convivial",
    image: maisonImage,
    ecoCertifie: false
  },
  {
    id: 4,
    icon: Building2,
    type: "Villas",
    title: "Villas Privées",
    description: "Propriétés exclusives avec piscine privée, jardin luxuriant, idéales pour groupes et familles en quête d'intimité",
    features: [
      { icon: Waves, text: "Piscine privée" },
      { icon: Users, text: "Chef à domicile" },
      { icon: Wifi, text: "Équipements modernes" },
      { icon: Home, text: "Plusieurs chambres" }
    ],
    amenities: ["Jardin privatif", "BBQ & terrasse", "Service de ménage", "Sécurité 24/7"],
    rating: 5,
    priceRange: "2000-8000 DH",
    capacity: "6-12 personnes",
    locations: ["Agadir", "Tanger", "Atlas"],
    badge: "Exclusif",
    image: villaImage,
    ecoCertifie: true
  }
];

const AccommodationShowcase = () => {
  const navigate = useNavigate();

  return (
    <section id="hebergements" className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
            <Hotel className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Hébergements</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Où Séjourner au Maroc
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Du riad authentique à l'hôtel de luxe, trouvez l'hébergement parfait pour votre séjour
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {accommodations.map((accommodation) => {
            const Icon = accommodation.icon;
            
            return (
              <Card 
                key={accommodation.id}
                className="p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group"
                onClick={() => navigate('/services')}
              >
                <div className="w-full h-64 rounded-lg flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-primary/10 to-accent/10">
                  {accommodation.image ? (
                    <img 
                      src={accommodation.image} 
                      alt={accommodation.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Icon className="w-16 h-16 text-primary/40" />
                  )}
                  
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {accommodation.badge}
                    </Badge>
                  </div>
                  
                  {accommodation.ecoCertifie && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                      🌱 Éco
                    </Badge>
                  )}
                  
                  <div className="absolute top-12 right-2 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {Array.from({ length: accommodation.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-foreground">
                        {accommodation.title}
                      </h3>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">À partir de</p>
                        <p className="text-lg font-bold text-primary">{accommodation.priceRange}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {accommodation.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <div className="flex gap-2 flex-wrap">
                      {accommodation.locations.map((location) => (
                        <Badge key={location} variant="outline" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Équipements :</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {accommodation.features.map((feature) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div key={feature.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FeatureIcon className="w-3 h-3 text-primary" />
                            {feature.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Capacité: <span className="font-semibold text-foreground">{accommodation.capacity}</span>
                    </div>
                    <Button 
                      className="hero-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/services');
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Voir les offres
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="hero-button"
            onClick={() => navigate('/services')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Découvrir tous nos hébergements
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AccommodationShowcase;