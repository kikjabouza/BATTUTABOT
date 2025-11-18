import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Newspaper, ExternalLink, Clock, TrendingUp, Globe, MapPin, Image as ImageIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Mock data - En production, vous utiliseriez une vraie API de news
const mockArticles = [
  {
    id: 1,
    title: "Le tourisme marocain en forte croissance en 2024",
    source: "Aujourd'hui Le Maroc",
    sourceType: "national",
    category: "Tourisme",
    excerpt: "Le secteur touristique marocain enregistre une augmentation de 30% des visiteurs internationaux. Les chiffres officiels révèlent un afflux record de touristes européens et nord-américains, attirés par la diversité culturelle et naturelle du royaume.",
    publishedAt: "2024-01-15",
    url: "#",
    featured: true
  },
  {
    id: 2,
    title: "Marrakech accueille un nouveau festival culturel",
    source: "Le Matin",
    sourceType: "national",
    category: "Culture",
    excerpt: "Un festival célébrant l'artisanat et la gastronomie marocaine se tiendra du 20 au 25 février. Plus de 200 artisans et chefs cuisiniers participeront à cet événement culturel majeur.",
    publishedAt: "2024-01-14",
    url: "#",
    featured: false
  },
  {
    id: 3,
    title: "Le Maroc figure parmi les destinations tendances 2024",
    source: "BBC Travel",
    sourceType: "international",
    category: "International",
    excerpt: "Selon le classement mondial des destinations, le Maroc se positionne dans le top 10 des pays les plus attractifs pour les voyageurs en quête d'authenticité et d'aventure.",
    publishedAt: "2024-01-13",
    url: "#",
    featured: true
  },
  {
    id: 4,
    title: "Nouvelles liaisons aériennes vers le Maroc",
    source: "Medias24",
    sourceType: "national",
    category: "Transport",
    excerpt: "Royal Air Maroc annonce l'ouverture de nouvelles routes vers l'Amérique du Nord et l'Asie, renforçant ainsi la connectivité internationale du royaume.",
    publishedAt: "2024-01-12",
    url: "#",
    featured: false
  },
  {
    id: 5,
    title: "L'écotourisme au Maroc : une tendance en plein essor",
    source: "National Geographic",
    sourceType: "international",
    category: "Environnement",
    excerpt: "Les initiatives d'écotourisme se multiplient dans les régions rurales du Maroc, offrant aux visiteurs des expériences durables et respectueuses de l'environnement.",
    publishedAt: "2024-01-11",
    url: "#",
    featured: true
  },
  {
    id: 6,
    title: "Fès : restauration de la médina historique",
    source: "Hespress",
    sourceType: "national",
    category: "Patrimoine",
    excerpt: "Un projet majeur de restauration des monuments historiques de la médina de Fès a débuté, visant à préserver ce joyau du patrimoine mondial de l'UNESCO.",
    publishedAt: "2024-01-10",
    url: "#",
    featured: false
  },
  {
    id: 7,
    title: "Agadir mise sur le tourisme balnéaire haut de gamme",
    source: "L'Économiste",
    sourceType: "national",
    category: "Tourisme",
    excerpt: "La station balnéaire d'Agadir inaugure plusieurs complexes hôteliers de luxe pour attirer une clientèle internationale premium.",
    publishedAt: "2024-01-09",
    url: "#",
    featured: false
  },
  {
    id: 8,
    title: "Morocco ranked among world's safest tourist destinations",
    source: "CNN Travel",
    sourceType: "international",
    category: "International",
    excerpt: "Le Maroc est classé parmi les destinations touristiques les plus sûres au monde, selon une étude récente portant sur 150 pays.",
    publishedAt: "2024-01-08",
    url: "#",
    featured: true
  }
];

const NewsArticles = () => {
  // En production, utilisez une vraie API comme NewsAPI ou une API de presse marocaine
  const { data: articles = mockArticles, isLoading } = useQuery({
    queryKey: ['news-articles'],
    queryFn: async () => {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockArticles;
    }
  });

  const nationalArticles = articles.filter(a => a.sourceType === 'national');
  const internationalArticles = articles.filter(a => a.sourceType === 'international');
  const featuredArticles = articles.filter(a => a.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  if (isLoading) {
    return (
      <section id="actualites" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground">Chargement des actualités...</p>
          </div>
        </div>
      </section>
    );
  }

  const renderArticleCard = (article: typeof articles[0], featured = false) => (
    <Card 
      key={article.id}
      className={`overflow-hidden culture-card group ${featured ? 'md:col-span-2' : ''}`}
    >
      <div className={`grid grid-cols-1 ${featured ? 'md:grid-cols-2' : ''}`}>
        <div className={`relative ${featured ? 'h-80' : 'h-48'} bg-gradient-to-br from-primary/10 to-accent/10`}>
          <div className="absolute inset-0 bg-[url('/assets/background.svg')] bg-cover bg-center opacity-10" />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-primary/90 text-primary-foreground">
              {article.category}
            </Badge>
            {featured && (
              <Badge className="bg-accent/90 text-accent-foreground">
                À la Une
              </Badge>
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className={`${featured ? 'w-24 h-24' : 'w-16 h-16'} text-primary/20 group-hover:scale-110 transition-transform`} />
          </div>
        </div>
        
        <div className={`p-6 space-y-4 ${featured ? 'flex flex-col justify-center' : ''}`}>
          <div className="space-y-2">
            <h3 className={`${featured ? 'text-2xl' : 'text-lg'} font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors`}>
              {article.title}
            </h3>
            <p className={`text-sm text-muted-foreground ${featured ? 'line-clamp-4' : 'line-clamp-3'}`}>
              {article.excerpt}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span className="font-medium">{article.source}</span>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full group/btn justify-between"
            asChild
          >
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Lire l'article
              <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <section id="actualites" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Actualités</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Tourisme & Actualités du Maroc
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Restez informé des dernières nouvelles sur le tourisme marocain et international
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              À la Une
            </TabsTrigger>
            <TabsTrigger value="national" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Presse Marocaine
            </TabsTrigger>
            <TabsTrigger value="international" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Presse Mondiale
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.slice(0, 4).map(article => renderArticleCard(article, true))}
            </div>
          </TabsContent>

          <TabsContent value="national" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nationalArticles.map(article => renderArticleCard(article))}
            </div>
          </TabsContent>

          <TabsContent value="international" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internationalArticles.map(article => renderArticleCard(article))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" className="hero-button">
            Voir plus d'articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsArticles;
