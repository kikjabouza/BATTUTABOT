import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Moon, Flag, PartyPopper, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import des images pour les célébrations
import aidAlAdha from '@/assets/86840689-61707207.jpg';
import aidAlFitr from '@/assets/72325997-50341972.jpg';
import feteTrone from '@/assets/fete-du-trone-.jpeg';
import ramadan from '@/assets/RAMADAN-web-fr.webp';
import mariageMarocain from '@/assets/43_8a8a9370-fdc9-470f-9400-c9ec61157602.webp';
import henna from '@/assets/84719443-60476695.jpg';

const celebrations = [
  {
    id: 1,
    icon: Moon,
    title: "Ramadan & Aïd Al Fitr",
    description: "Vivez l'esprit sacré du mois de Ramadan et les célébrations de l'Aïd dans la tradition marocaine",
    highlights: ["Iftar traditionnel", "Prières communautaires", "Solidarité et partage", "Nuit du Destin"],
    date: "Selon calendrier lunaire",
    badge: "Religieux",
    image: ramadan,
    lien: "https://medias24.com/2025/03/15/voici-la-date-de-aid-al-fitr-2025-au-maroc-selon-le-calcul-astronomique/",
    vue: "2D"
  },
  {
    id: 2,
    icon: Flag,
    title: "Aïd Al Adha",
    description: "Fête du sacrifice, célébration religieuse importante marquant la fin du pèlerinage à La Mecque",
    highlights: ["Sacrifice traditionnel", "Partage familial", "Prières spéciales", "Dons aux nécessiteux"],
    date: "10 Dhul Hijja",
    badge: "Religieux",
    image: aidAlAdha,
    lien: "https://www.lemonde.fr/afrique/article/2025/06/05/au-maroc-une-fete-de-l-aid-sans-sacrifice-de-mouton_6610642_3212.html",
    vue: "2D"
  },
  {
    id: 3,
    icon: PartyPopper,
    title: "Fête du Trône",
    description: "Rejoignez les festivités nationales célébrant l'intronisation de Sa Majesté le Roi Mohammed VI",
    highlights: ["Discours royal", "Réceptions officielles", "Feux d'artifice", "Grâces royales"],
    date: "30 Juillet",
    badge: "National",
    image: feteTrone,
    vue: "360°",
    sketchfabEmbed: "https://sketchfab.com/models/a2d9e41e7da642d9a7165b6a680e9586/embed"
  },
  {
    id: 4,
    icon: Calendar,
    title: "Mariage Traditionnel",
    description: "Cérémonie de mariage avec ses rituels et traditions ancestrales préservées",
    highlights: ["Cérémonie du henné", "Habit traditionnel", "Musique et danse", "Festin familial"],
    date: "Toute l'année",
    badge: "Culture",
    image: mariageMarocain,
    vue: "360°",
    sketchfabEmbed: "https://sketchfab.com/models/bbe1d83bf89f476fab8ce0c9403d8178/embed"
  },
  {
    id: 5,
    icon: Sparkles,
    title: "Cérémonie du Henné",
    description: "Rituel traditionnel du henné avant le mariage, symbole de protection et de beauté",
    highlights: ["Dessins complexes", "Célébration féminine", "Chants traditionnels", "Symbolisme ancestral"],
    date: "Avant le mariage",
    badge: "Tradition",
    image: henna,
    vue: "2D"
  }
];

const MoroccanCelebrations = () => {
  const navigate = useNavigate();

  const handleCelebrationClick = (celebration: typeof celebrations[0]) => {
    if (celebration.vue === "360°") {
      navigate(`/culture/celebration-${celebration.id}`);
    } else if (celebration.lien) {
      window.open(celebration.lien, '_blank');
    }
  };

  return (
    <section id="celebrations" className="py-24 px-4 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Traditions & Célébrations</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Célébrations Marocaines
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les fêtes et traditions qui rythment la vie marocaine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {celebrations.map((celebration) => {
            const Icon = celebration.icon;
            
            return (
              <Card 
                key={celebration.id}
                className="p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group"
                onClick={() => handleCelebrationClick(celebration)}
              >
                <div className="w-full h-48 rounded-lg flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-primary/10 to-accent/10">
                  {celebration.image ? (
                    <img 
                      src={celebration.image} 
                      alt={celebration.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Icon className="w-16 h-16 text-primary/40" />
                  )}
                  
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {celebration.badge}
                    </Badge>
                  </div>
                  
                  {celebration.vue === "360°" && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      360°
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-foreground">{celebration.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      celebration.vue === "360°" 
                        ? "bg-green-100 text-green-800 border border-green-200" 
                        : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}>
                      {celebration.vue}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {celebration.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-primary">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {celebration.date}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-xs text-foreground flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-primary" />
                      Points forts :
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      {celebration.highlights.slice(0, 4).map((highlight) => (
                        <div key={highlight} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      celebration.vue === "360°" 
                        ? "hero-button" 
                        : "bg-gray-600 hover:bg-gray-700"
                    } transition-all`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCelebrationClick(celebration);
                    }}
                  >
                    {celebration.vue === "360°" ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Visite {celebration.vue}
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        En savoir plus
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="hero-button"
            onClick={() => navigate('/culture')}
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Découvrir toutes les traditions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MoroccanCelebrations;