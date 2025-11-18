import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, Castle, Hotel, Star, MapPin, Wifi, Coffee, Waves, Users } from "lucide-react";

const accommodations = [
  {
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
    badge: "Premium"
  },
  {
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
    badge: "Authentique"
  },
  {
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
    badge: "Convivial"
  },
  {
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
    badge: "Exclusif"
  }
];

const AccommodationShowcase = () => {
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

        <div className="space-y-8">
          {accommodations.map((accommodation, index) => {
            const Icon = accommodation.icon;
            
            return (
              <Card 
                key={accommodation.title}
                className="overflow-hidden culture-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="relative h-80 md:col-span-2 bg-gradient-to-br from-primary/20 to-accent/20">
                    <div className="absolute inset-0 bg-[url('/assets/zellig_motif1.avif')] bg-cover bg-center opacity-20" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-primary-foreground font-semibold">
                        {accommodation.badge}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {Array.from({ length: accommodation.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-32 h-32 text-primary/30" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <div className="flex gap-2 flex-wrap">
                          {accommodation.locations.map((location) => (
                            <Badge key={location} variant="outline" className="text-xs">
                              {location}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 p-8 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="text-3xl font-bold text-foreground">
                          {accommodation.title}
                        </h3>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">À partir de</p>
                          <p className="text-xl font-bold text-primary">{accommodation.priceRange}</p>
                          <p className="text-xs text-muted-foreground">{accommodation.capacity}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {accommodation.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Équipements principaux :</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {accommodation.features.map((feature) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div key={feature.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <FeatureIcon className="w-4 h-4 text-primary" />
                              {feature.text}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground text-sm">Services inclus :</h4>
                      <div className="flex flex-wrap gap-2">
                        {accommodation.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="hero-button flex-1">
                        Réserver maintenant
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Voir les détails
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccommodationShowcase;
