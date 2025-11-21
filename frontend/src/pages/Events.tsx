import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavigationRouter from "@/components/NavigationRouter";
import Footer from "@/components/Footer";
import { 
  Calendar, MapPin, Clock, DollarSign, ExternalLink, 
  Filter, Search, Star, Users, Music, Palette, Utensils,
  ArrowRight, ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Types pour les événements
type Evenement = {
  id: string | number;
  nom: string;
  description: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  localisation: string;
  prix: number | null;
  urlInfo: string | null;
  idDestination: number | null;
};

const Events = () => {
  const navigate = useNavigate();
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [evenementsFiltres, setEvenementsFiltres] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtreType, setFiltreType] = useState("");
  const [filtreRecherche, setFiltreRecherche] = useState("");
  const [tri, setTri] = useState("date-croissant");

  useEffect(() => {
    fetchEvenements();
  }, []);

  // Appliquer les filtres automatiquement
  useEffect(() => {
    appliquerFiltres();
  }, [filtreType, filtreRecherche, tri, evenements]);

  const fetchEvenements = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/evenements');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📅 Événements chargés:', data);
      
      // Filtrer les événements dont la date de fin n'est pas encore passée
      const aujourdhui = new Date().toISOString().split('T')[0];
      const evenementsFuturs = data.filter((event: Evenement) => 
        event.dateFin && event.dateFin >= aujourdhui
      );
      
      setEvenements(evenementsFuturs);
      setEvenementsFiltres(evenementsFuturs);
      
    } catch (error) {
      console.error('💥 Erreur de chargement:', error);
      setEvenements([]);
      setEvenementsFiltres([]);
    } finally {
      setLoading(false);
    }
  };

  const appliquerFiltres = () => {
    let resultats = [...evenements];

    // Filtre par type
    if (filtreType) {
      resultats = resultats.filter(event => 
        event.type?.toLowerCase() === filtreType.toLowerCase()
      );
    }

    // Filtre par recherche
    if (filtreRecherche) {
      const recherche = filtreRecherche.toLowerCase();
      resultats = resultats.filter(event => 
        event.nom.toLowerCase().includes(recherche) ||
        event.description.toLowerCase().includes(recherche) ||
        event.localisation.toLowerCase().includes(recherche)
      );
    }

    // Tri des résultats
    resultats.sort((a, b) => {
      switch (tri) {
        case "date-croissant":
          return new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime();
        case "date-decroissant":
          return new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime();
        case "prix-croissant":
          return (a.prix || 0) - (b.prix || 0);
        case "prix-decroissant":
          return (b.prix || 0) - (a.prix || 0);
        default:
          return 0;
      }
    });

    setEvenementsFiltres(resultats);
  };

  const resetFiltres = () => {
    setFiltreType("");
    setFiltreRecherche("");
    setTri("date-croissant");
  };

  const getIconeType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'culturel':
      case 'culture':
        return <Palette className="w-4 h-4" />;
      case 'musique':
      case 'concert':
        return <Music className="w-4 h-4" />;
      case 'gastronomique':
      case 'food':
        return <Utensils className="w-4 h-4" />;
      case 'festival':
        return <Users className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getCouleurType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'culturel':
      case 'culture':
        return "bg-purple-500";
      case 'musique':
      case 'concert':
        return "bg-blue-500";
      case 'gastronomique':
      case 'food':
        return "bg-orange-500";
      case 'festival':
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const formaterPrix = (prix: number | null) => {
    if (prix === null || prix === 0) return "Gratuit";
    return `${prix} DH`;
  };

  const formaterDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getJoursRestants = (dateFin: string) => {
    const aujourdhui = new Date();
    const fin = new Date(dateFin);
    const diffTime = fin.getTime() - aujourdhui.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Terminé";
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Demain";
    if (diffDays < 7) return `Dans ${diffDays} jours`;
    if (diffDays < 30) return `Dans ${Math.ceil(diffDays / 7)} semaines`;
    return `Dans ${Math.ceil(diffDays / 30)} mois`;
  };

  // Obtenir les types uniques pour le filtre
  const typesUniques = [...new Set(evenements.map(e => e.type).filter(Boolean))];

  return (
    <div className="min-h-screen bg-transparent">
      <NavigationRouter />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Événements & Festivals</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Événements au Maroc
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez tous les événements culturels, festivals et activités à venir dans tout le royaume
            </p>
          </div>

          {/* Filtres et Recherche */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Barre de recherche */}
                <div className="relative flex-1 min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher un événement..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground"
                    value={filtreRecherche}
                    onChange={(e) => setFiltreRecherche(e.target.value)}
                  />
                </div>

                {/* Filtre par type */}
                <select 
                  className="p-2 rounded-lg border border-border bg-background text-foreground min-w-[180px]"
                  value={filtreType}
                  onChange={(e) => setFiltreType(e.target.value)}
                >
                  <option value="">Tous les types</option>
                  {typesUniques.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                {/* Tri */}
                <select 
                  className="p-2 rounded-lg border border-border bg-background text-foreground min-w-[180px]"
                  value={tri}
                  onChange={(e) => setTri(e.target.value)}
                >
                  <option value="date-croissant">Date (plus proche)</option>
                  <option value="date-decroissant">Date (plus lointain)</option>
                  <option value="prix-croissant">Prix (croissant)</option>
                  <option value="prix-decroissant">Prix (décroissant)</option>
                </select>
              </div>

              {/* Compteur et reset */}
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  {evenementsFiltres.length} événement{evenementsFiltres.length !== 1 ? 's' : ''}
                </Badge>
                {(filtreType || filtreRecherche) && (
                  <Button onClick={resetFiltres} variant="outline" size="sm">
                    Réinitialiser
                  </Button>
                )}
              </div>
            </div>

            {/* Indicateur de filtres actifs */}
            {(filtreType || filtreRecherche) && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-primary font-medium">
                  Filtres actifs: 
                  {filtreType && ` Type: ${filtreType}`}
                  {filtreRecherche && ` Recherche: "${filtreRecherche}"`}
                </p>
              </div>
            )}
          </Card>

          {/* Liste des événements */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Chargement des événements...</p>
            </div>
          ) : evenementsFiltres.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {evenementsFiltres.map((evenement) => (
                <Card key={evenement.id} className="p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group">
                  {/* En-tête avec type et date */}
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={`${getCouleurType(evenement.type)} text-white flex items-center gap-1`}>
                      {getIconeType(evenement.type)}
                      {evenement.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getJoursRestants(evenement.dateFin)}
                    </Badge>
                  </div>

                  {/* Image placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center overflow-hidden relative">
                    <Calendar className="w-16 h-16 text-primary/30" />
                    <div className="absolute inset-0 bg-[url('/assets/background.svg')] bg-cover bg-center opacity-10" />
                  </div>

                  {/* Contenu */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {evenement.nom}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {evenement.description}
                      </p>
                    </div>

                    {/* Informations pratiques */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>
                          {formaterDate(evenement.dateDebut)} 
                          {evenement.dateFin !== evenement.dateDebut && ` - ${formaterDate(evenement.dateFin)}`}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{evenement.localisation}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">
                          {formaterPrix(evenement.prix)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {evenement.urlInfo ? (
                        <Button 
                          className="hero-button flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(evenement.urlInfo!, '_blank');
                          }}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Plus d'infos
                        </Button>
                      ) : (
                        <Button className="hero-button flex-1" disabled>
                          Détails non disponibles
                        </Button>
                      )}
                      
                      <Button variant="outline" className="px-3">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Aucun événement trouvé</h4>
              <p className="text-muted-foreground mb-4">
                {filtreType || filtreRecherche 
                  ? "Aucun événement ne correspond à vos critères de recherche." 
                  : "Aucun événement à venir n'est disponible pour le moment."}
              </p>
              {(filtreType || filtreRecherche) && (
                <Button onClick={resetFiltres} variant="outline">
                  Réinitialiser les filtres
                </Button>
              )}
            </Card>
          )}

          {/* Section événements populaires */}
          {!loading && evenementsFiltres.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Événements Populaires
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Ne manquez pas ces événements incontournables qui attirent des visiteurs de tout le Maroc
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {evenementsFiltres.slice(0, 2).map((evenement) => (
                  <Card key={evenement.id} className="overflow-hidden group">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="md:col-span-1 relative h-48 md:h-auto bg-gradient-to-br from-primary/20 to-accent/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Calendar className="w-20 h-20 text-primary/30" />
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className={`${getCouleurType(evenement.type)} text-white`}>
                            {evenement.type}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-sm font-bold text-foreground">
                            {getJoursRestants(evenement.dateFin)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 p-6 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            {evenement.nom}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {evenement.description}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{evenement.localisation}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-foreground">
                              {formaterPrix(evenement.prix)}
                            </span>
                          </div>
                        </div>
                        
                        <Button className="hero-button">
                          Voir les détails
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;