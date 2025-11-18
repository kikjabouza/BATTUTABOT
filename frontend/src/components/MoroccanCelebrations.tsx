import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Moon, Flag, PartyPopper, ArrowRight, Sparkles } from "lucide-react";

const celebrations = [
  {
    icon: Moon,
    title: "Ramadan & Aïd",
    description: "Vivez l'esprit sacré du mois de Ramadan et les célébrations de l'Aïd dans la tradition marocaine",
    highlights: ["Iftar traditionnel", "Prières communautaires", "Solidarité et partage", "Nuit du Destin"],
    date: "Selon calendrier lunaire",
    badge: "Religieux"
  },
  {
    icon: Flag,
    title: "Marche Verte",
    description: "Célébrez l'événement historique du 6 novembre 1975 qui a marqué la récupération du Sahara marocain",
    highlights: ["Défilés militaires", "Festivités nationales", "Expositions historiques", "Concerts patriotiques"],
    date: "6 Novembre",
    badge: "National"
  },
  {
    icon: Calendar,
    title: "Moussems & Festivals",
    description: "Participez aux festivals traditionnels et aux moussems qui animent les villes et villages du Maroc",
    highlights: ["Musique Gnawa", "Danses folkloriques", "Artisanat local", "Fantasia"],
    date: "Toute l'année",
    badge: "Culture"
  },
  {
    icon: PartyPopper,
    title: "Fête du Trône",
    description: "Rejoignez les festivités nationales célébrant l'intronisation de Sa Majesté le Roi",
    highlights: ["Discours royal", "Réceptions officielles", "Feux d'artifice", "Grâces royales"],
    date: "30 Juillet",
    badge: "National"
  }
];

const MoroccanCelebrations = () => {
  return (
    <section id="celebrations" className="py-24 px-4 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Traditions & Célébrations</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Nos Célébrations au Maroc
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les fêtes et événements qui rythment la vie marocaine tout au long de l'année
          </p>
        </div>

        <div className="space-y-8">
          {celebrations.map((celebration, index) => {
            const Icon = celebration.icon;
            const isEven = index % 2 === 0;
            
            return (
              <Card 
                key={celebration.title}
                className="overflow-hidden culture-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`grid grid-cols-1 ${isEven ? 'md:grid-cols-2' : 'md:grid-cols-2'}`}>
                  <div className={`relative h-80 ${!isEven ? 'md:order-2' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20">
                      <div className="absolute inset-0 bg-[url('/assets/zellig_motif1.avif')] bg-cover bg-center opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-32 h-32 text-primary/40" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="font-semibold">
                          {celebration.badge}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-bold text-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {celebration.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-8 space-y-6 ${!isEven ? 'md:order-1' : ''}`}>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold text-foreground">
                        {celebration.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {celebration.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Points forts :
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {celebration.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="hero-button group/btn">
                      Découvrir
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
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

export default MoroccanCelebrations;
