import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Play, BookOpen, Music, Utensils, Palette, Award, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Table de données des cultures
const cultures = [
  {
    id: 1,
    titre: "Poterie de Safi",
    description: "Art céramique ancestral transmis de génération en génération",
    type: "artisanat",
    vue: "2D",
    autres_infos: "Technique unique de glaçure et cuisson",
    artisant_id: null,
    artisnat_name: null,
    image: "/src/assets/images/artisan-pottery.jpg"
  },
  {
    id: 2,
    titre: "Tajine Marocain",
    description: "Plat traditionnel mijoté aux épices et saveurs uniques",
    type: "gastronomie",
    vue: "2D",
    autres_infos: "Cuisson lente qui préserve les nutriments",
    artisant_id: null,
    artisnat_name: null,
    image: "/src/assets/images/moroccan-cuisine.jpg"
  },
  {
    id: 3,
    titre: "Mosquée Hassan II",
    description: "Joyau architectural avec le plus haut minaret du monde",
    type: "architecture",
    vue: "2D",
    autres_infos: "Mélange d'architecture traditionnelle et moderne",
    artisant_id: null,
    artisnat_name: null,
    image: "/src/assets/images/moroccan-riad.jpg"
  },
  {
    id: 4,
    titre: "Zellige de Fès",
    description: "Mosaïques géométriques uniques au monde",
    type: "artisanat",
    vue: "360°",
    autres_infos: "Patrimoine UNESCO, techniques séculaires",
    artisant_id: "1",
    artisnat_name: "Mohamed Salah"
  },
  {
    id: 5,
    titre: "Couscous Royal",
    description: "Plat de fête aux multiples saveurs et textures",
    type: "gastronomie",
    vue: "360°",
    autres_infos: "Préparation traditionnelle à la vapeur",
    artisant_id: "2",
    artisnat_name: "Fatima Zahra"
  },
  {
    id: 6,
    titre: "Kasbah des Oudayas",
    description: "Forteresse historique avec vue sur l'océan",
    type: "architecture",
    vue: "360°",
    autres_infos: "Architecture militaire et résidentielle",
    artisant_id: "3",
    artisnat_name: "Ahmed Benali"
  }
];

const Culture = () => {
  const navigate = useNavigate();

  // Filtrer les cultures par type
  const artisanatItems = cultures.filter(item => item.type === "artisanat");
  const architectureItems = cultures.filter(item => item.type === "architecture");
  const gastronomieItems = cultures.filter(item => item.type === "gastronomie");

  const handleCardClick = (id: number) => {
    navigate(`/culture/${id}`);
  };

  const renderCultureCard = (item: typeof cultures[0]) => (
    <Card 
      key={item.id} 
      className="p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group"
      onClick={() => handleCardClick(item.id)}
    >
      {/* Image ou placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Palette className="w-12 h-12 text-primary" />
        )}
      </div>

      {/* Contenu */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-foreground">{item.titre}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            item.vue === "360°" 
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}>
            {item.vue}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.description}
        </p>

        {item.artisnat_name && (
          <p className="text-xs text-primary font-medium">
            Artisan: {item.artisnat_name}
          </p>
        )}

        {/* Bouton selon le type de vue */}
        <div className="flex justify-between items-center pt-2">
          <Button 
            className={`${
              item.vue === "360°" 
                ? "hero-button" 
                : "bg-gray-600 hover:bg-gray-700"
            } transition-all`}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick(item.id);
            }}
          >
            {item.vue === "360°" ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Visite {item.vue}
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                Voir détails
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Patrimoine & Culture du Maroc
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explorez la richesse culturelle millénaire du royaume chérifien
            </p>
          </div>

          <Tabs defaultValue="artisanat" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2">
              <TabsTrigger value="artisanat" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Artisanat ({artisanatItems.length})
              </TabsTrigger>
              <TabsTrigger value="architecture" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Architecture ({architectureItems.length})
              </TabsTrigger>
              <TabsTrigger value="gastronomie" className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                Gastronomie ({gastronomieItems.length})
              </TabsTrigger>
              <TabsTrigger value="musique" className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                Musique
              </TabsTrigger>
              <TabsTrigger value="traditions" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Traditions
              </TabsTrigger>
            </TabsList>

            {/* Artisanat Tab */}
            <TabsContent value="artisanat" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artisanatItems.map(renderCultureCard)}
              </div>
            </TabsContent>

            {/* Architecture Tab */}
            <TabsContent value="architecture" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {architectureItems.map(renderCultureCard)}
              </div>
            </TabsContent>

            {/* Gastronomie Tab */}
            <TabsContent value="gastronomie" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gastronomieItems.map(renderCultureCard)}
              </div>
            </TabsContent>

            {/* Musique & Traditions Tabs */}
            <TabsContent value="musique" className="space-y-8">
              <Card className="p-8 text-center space-y-4">
                <Music className="w-16 h-16 text-primary mx-auto" />
                <h2 className="text-3xl font-bold text-foreground">Musique & Danses</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Découvrez la richesse musicale marocaine : Gnawa, Chaâbi, Andalou, Ahidous...
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="traditions" className="space-y-8">
              <Card className="p-8 text-center space-y-4">
                <Award className="w-16 h-16 text-primary mx-auto" />
                <h2 className="text-3xl font-bold text-foreground">Traditions & Coutumes</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explorez les traditions séculaires qui font la richesse du Maroc
                </p>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Culture;