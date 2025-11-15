import { Card } from "@/components/ui/card";
import artisanImage from "@/assets/artisan-pottery.jpg";
import riadImage from "@/assets/moroccan-riad.jpg";
import cuisineImage from "@/assets/moroccan-cuisine.jpg";

const culturalHighlights = [
  {
    title: "Artisanat Traditionnel",
    description: "Découvrez les savoir-faire ancestraux transmis de génération en génération",
    image: artisanImage,
  },
  {
    title: "Architecture Authentique",
    description: "Explorez les riads, médinas et kasbahs emblématiques du patrimoine marocain",
    image: riadImage,
  },
  {
    title: "Gastronomie Raffinée",
    description: "Savourez les saveurs uniques de la cuisine marocaine, un voyage des sens",
    image: cuisineImage,
  },
];

const CultureShowcase = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Patrimoine & Culture
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plongez dans la richesse culturelle du Maroc
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {culturalHighlights.map((item, index) => (
            <Card 
              key={index}
              className="culture-card group overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureShowcase;