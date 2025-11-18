import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Home, UtensilsCrossed } from "lucide-react";
import artisanImage from "@/assets/artisan-pottery.jpg";
import riadImage from "@/assets/moroccan-riad.jpg";
import cuisineImage from "@/assets/moroccan-cuisine.jpg";

const culturalHighlights = [
  {
    title: "Artisanat Traditionnel",
    description: "Découvrez les savoir-faire ancestraux transmis de génération en génération",
    image: artisanImage,
    icon: Palette,
  },
  {
    title: "Architecture Authentique",
    description: "Explorez les riads, médinas et kasbahs emblématiques du patrimoine marocain",
    image: riadImage,
    icon: Home,
  },
  {
    title: "Gastronomie Raffinée",
    description: "Savourez les saveurs uniques de la cuisine marocaine, un voyage des sens",
    image: cuisineImage,
    icon: UtensilsCrossed,
  },
];

const CultureShowcase = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Patrimoine & Culture
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plongez dans la richesse culturelle du Maroc
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {culturalHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index}
                className="culture-card group overflow-hidden border-radius-50"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/100 via-background/0 to-transparent"></div>
                  
                </div>
                
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Discover More Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto pt-0">
            <Button 
              size="lg" 
              variant="outline"
              className="hero-button px-8 py-6 text-lg group"
              onClick={() => window.location.href = '/culture'}
            >
              Découvrir Toute la Culture
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
      </div>
    </section>
  );
};

export default CultureShowcase;