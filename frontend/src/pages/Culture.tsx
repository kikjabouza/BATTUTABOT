import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Play, BookOpen, Music, Utensils, Palette, Award } from "lucide-react";
import artisanImage from "@/assets/artisan-pottery.jpg";
import riadImage from "@/assets/moroccan-riad.jpg";
import cuisineImage from "@/assets/moroccan-cuisine.jpg";

const Culture = () => {
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
                Artisanat
              </TabsTrigger>
              <TabsTrigger value="architecture" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Architecture
              </TabsTrigger>
              <TabsTrigger value="gastronomie" className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                Gastronomie
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
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-80">
                    <img 
                      src={artisanImage} 
                      alt="Artisan" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">L'Artisanat Marocain</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Le Maroc est réputé pour son artisanat d'exception, transmis de génération en génération. 
                      Poterie de Safi, tapis berbères, zellige de Fès, cuir de Marrakech... chaque région possède 
                      ses spécialités uniques.
                    </p>
                    <Button className="hero-button">
                      <Play className="mr-2 h-4 w-4" />
                      Visite virtuelle 360°
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Poterie de Safi", desc: "Art céramique ancestral" },
                  { title: "Zellige de Fès", desc: "Mosaïques géométriques" },
                  { title: "Tapis Berbères", desc: "Tissage traditionnel" },
                ].map((item, i) => (
                  <Card key={i} className="p-6 space-y-3 hover:border-primary/30 transition-all cursor-pointer">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                      <Palette className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Architecture Tab */}
            <TabsContent value="architecture" className="space-y-8">
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-80">
                    <img 
                      src={riadImage} 
                      alt="Architecture" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">Architecture Marocaine</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      L'architecture marocaine reflète la richesse de son histoire. Des riads aux médinas, 
                      des kasbahs aux mosquées, chaque édifice raconte une histoire millénaire.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Sites emblématiques :</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Mosquée Hassan II - Casablanca</li>
                        <li>• Médina de Fès - UNESCO</li>
                        <li>• Koutoubia - Marrakech</li>
                        <li>• Kasbah des Oudayas - Rabat</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Gastronomie Tab */}
            <TabsContent value="gastronomie" className="space-y-8">
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-80">
                    <img 
                      src={cuisineImage} 
                      alt="Gastronomie" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <h2 className="text-3xl font-bold text-foreground">Gastronomie Marocaine</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      La cuisine marocaine est un art culinaire raffiné, mêlant épices, saveurs et traditions. 
                      Chaque plat est une invitation au voyage des sens.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Plats emblématiques :</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>🍲 Tagine - Mijoté aux épices</li>
                        <li>🥘 Couscous - Plat national</li>
                        <li>🥧 Pastilla - Feuilleté sucré-salé</li>
                        <li>🍵 Thé à la menthe - Boisson traditionnelle</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
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

          {/* Quiz Section */}
          <Card className="p-8 mt-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Quiz Culturel</h3>
              <p className="text-muted-foreground">
                Testez vos connaissances sur la culture marocaine
              </p>
              <Button className="hero-button" size="lg">
                Commencer le quiz
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Culture;