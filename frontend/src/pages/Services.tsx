import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NavigationRouter from "@/components/NavigationRouter";
import { 
  Train, Bus, Car, Plane, Ship, MapPin, Navigation as NavigationIcon, 
  Clock, DollarSign, Hotel, Users, Award, Star, Map, Filter,
  CheckCircle2, Wifi, Coffee, Utensils, Phone, ExternalLink
} from "lucide-react";
import { useState, useEffect } from "react";

// Import des images pour le transport
import royalAirMaroc from "@/assets/royalair.svg";
import airArabia from "@/assets/airarabia.png";
import alboraq from "@/assets/Al_Boraq.png";
import oncf from "@/assets/logo.png";
import ctm from "@/assets/Fichier-17@2x-1.png";
import indrive from "@/assets/logo--white.svg";
import ferry from "@/assets/Aferry-logo.png";
import taxi from "@/assets/LOGO (1).png";

const Services = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <NavigationRouter />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <NavigationIcon className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Services Touristiques</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Tous nos Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transport, hébergement et guides professionnels pour un séjour inoubliable
            </p>
          </div>

          <Tabs defaultValue="transport" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-2">
              <TabsTrigger value="transport" className="flex items-center gap-2">
                <Bus className="w-4 h-4" />
                Transport
              </TabsTrigger>
              <TabsTrigger value="hebergement" className="flex items-center gap-2">
                <Hotel className="w-4 h-4" />
                Hébergement
              </TabsTrigger>
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Guides
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transport">
              <TransportSection />
            </TabsContent>

            <TabsContent value="hebergement">
              <HebergementSection />
            </TabsContent>

            <TabsContent value="guides">
              <GuidesSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Section Transport
const TransportSection = () => {
  const transportCategories = [
    {
      id: "aerien",
      label: "Aérien",
      icon: Plane,
      options: [
        {
          icon: Plane,
          title: "Royal Air Maroc",
          description: "Compagnie nationale marocaine - Vols domestiques et internationaux",
          features: ["Casablanca - Marrakech", "Rabat - Dakhla", "Tanger - Agadir", "Service premium"],
          duration: "1-2h",
          image: royalAirMaroc,
          priceRange: "500-1500 DH",
          badge: "National",
          site: "https://royalairmaroc.com/ma-fr",
          reservation: "https://www.royalairmaroc.com/ma-fr/reservation/vols/choix-du-vol"
        },
        {
          icon: Plane,
          title: "Air Arabia",
          description: "Compagnie low-cost - Vols économiques vers les principales villes",
          features: ["Casablanca - Marrakech", "Rabat - Laâyoune", "Fès - Agadir", "Tarifs compétitifs"],
          duration: "1-2h",
          image: airArabia,
          priceRange: "300-1200 DH",
          badge: "Économique",
          site: "https://www.airarabia.com/fr",
          reservation: "https://www.airarabia.com/fr/book-flights"
        }
      ]
    },
    {
      id: "ferroviaire",
      label: "Ferroviaire",
      icon: Train,
      options: [
        {
          icon: Train,
          title: "Al Boraq (TGV)",
          description: "Le train à grande vitesse reliant Casablanca à Tanger en 2h10",
          features: ["320 km/h", "Wi-Fi gratuit", "Prises électriques", "Confort premium"],
          duration: "2h10",
          image: alboraq,
          priceRange: "150-300 DH",
          badge: "Moderne",
          site: "https://www.oncf.ma/fr/Al-Boraq",
          reservation: "https://www.oncf-voyages.ma/fr"
        },
        {
          icon: Train,
          title: "Trains ONCF",
          description: "Réseau ferroviaire national confortable et ponctuel",
          features: ["1ère et 2ème classe", "Climatisation", "Restaurant", "Ponctualité"],
          duration: "Variable",
          image: oncf,
          priceRange: "80-250 DH",
          badge: "Confortable",
          site: "https://www.oncf.ma",
          reservation: "https://www.oncf-voyages.ma/fr"
        }
      ]
    },
    {
      id: "routier",
      label: "Routier",
      icon: Bus,
      options: [
        {
          icon: Bus,
          title: "Bus CTM & Supratours",
          description: "Services de bus premium avec réseau national complet",
          features: ["Sièges inclinables", "Climatisation", "Bagages inclus", "Arrêts fréquents"],
          duration: "Variable",
          image: ctm,
          priceRange: "50-200 DH",
          badge: "Économique",
          site: "https://www.ctm.ma",
          reservation: "https://www.ctm.ma/fr/reservation"
        },
        {
          icon: Car,
          title: "Location de Voiture",
          description: "Explorez le Maroc en toute liberté avec votre véhicule",
          features: ["4x4 & SUV", "Berlines", "GPS inclus", "Assurance complète"],
          duration: "À votre rythme",
          image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500",
          priceRange: "300-800 DH/jour",
          badge: "Liberté",
          site: "https://www.hertz.com",
          reservation: "https://www.hertz.com/rentacar/reservation"
        }
      ]
    },
    {
      id: "maritime",
      label: "Maritime",
      icon: Ship,
      options: [
        {
          icon: Ship,
          title: "Traversées Ferry",
          description: "Liaisons maritimes Europe-Maroc via les ports modernes",
          features: ["Tanger Med", "Nador", "Cabines disponibles", "Véhicules acceptés"],
          duration: "6-8h",
          image: ferry,
          priceRange: "500-1500 DH",
          badge: "International",
          site: "https://www.transmediterranea.es",
          reservation: "https://www.transmediterranea.es/en/booking"
        }
      ]
    },
    {
      id: "urbain",
      label: "Urbain",
      icon: MapPin,
      options: [
        {
          icon: MapPin,
          title: "InDrive - VTC Économique",
          description: "Service de VTC innovant où vous négociez le prix avec le conducteur",
          features: [
            "Prix négociable",
            "Sans frais cachés",
            "Conducteurs vérifiés",
            "Paiement cash ou carte"
          ],
          duration: "Immédiat",
          image: indrive,
          priceRange: "Variable",
          badge: "Flexible",
          site: "https://indrive.com",
          reservation: "https://indrive.com",
          guideSteps: [
            "1. Téléchargez l'app InDrive",
            "2. Créez votre compte",
            "3. Entrez votre destination",
            "4. Proposez votre prix",
            "5. Acceptez une offre conducteur"
          ]
        },
        {
          icon: Car,
          title: "Taxis & VTC",
          description: "Solutions de mobilité urbaine flexibles et accessibles",
          features: ["Petits taxis (ville)", "Grands taxis (inter-villes)", "Uber & Careem", "Tarifs réglementés"],
          duration: "Sur demande",
          image: taxi,
          priceRange: "10-100 DH",
          badge: "Pratique",
          site: "https://www.uber.com",
          reservation: "https://www.uber.com"
        }
      ]
    }
  ];

  return (
    <Tabs defaultValue="aerien" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2">
        {transportCategories.map((category) => {
          const Icon = category.icon;
          return (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {transportCategories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.options.map((transport) => {
              const Icon = transport.icon;
              return (
                <Card key={transport.title} className="p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="w-full h-48 rounded-lg flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-primary/10 to-accent/10">
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        {transport.badge}
                      </Badge>
                    </div>
                    {transport.image ? (
                      <img 
                        src={transport.image} 
                        alt={transport.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Icon className="w-16 h-16 text-primary/40" />
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">{transport.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {transport.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {transport.duration}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> {transport.priceRange}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <ul className="space-y-1 text-sm">
                        {transport.features.map((feature) => (
                          <li key={feature} className="text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {transport.guideSteps && (
                      <div className="space-y-2 p-3 bg-accent/5 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-xs text-foreground">📱 Guide d'utilisation :</h4>
                        <ul className="space-y-1">
                          {transport.guideSteps.map((step) => (
                            <li key={step} className="text-xs text-muted-foreground">
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        className="hero-button flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (transport.reservation) window.open(transport.reservation, '_blank');
                        }}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Réserver
                      </Button>
                      {transport.site && (
                        <Button 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(transport.site, '_blank');
                          }}
                        >
                          Site web
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

// Types pour les hébergements
type Hebergement = {
  id: string | number;
  nom: string;
  description?: string;
  type?: string;
  adresse?: string;
  prix_nuit?: string;
  capacite?: number;
  eco_certifie?: boolean;
  caracteristiques_eco?: string;
  equipements?: string;
  est_verifie?: boolean;
  latitude?: number;
  longitude?: number;
  proprietaire?: {
    id: number;
    prenom: string;
    nom: string;
    telephone?: string;
    email?: string;
  };
  destination?: {
    id: number;
    nom: string;
    region: string;
  };
};

// Section Hébergements
// Section Hébergements - Version avec filtrage statique côté client
const HebergementSection = () => {
  const [hebergements, setHebergements] = useState<Hebergement[]>([]);
  const [hebergementsFiltres, setHebergementsFiltres] = useState<Hebergement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtreType, setFiltreType] = useState("");
  const [filtreDestination, setFiltreDestination] = useState("");
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [ecoCertifie, setEcoCertifie] = useState(false);

  useEffect(() => {
    fetchHebergements();
  }, []);

  // Appliquer les filtres automatiquement quand les critères changent
  useEffect(() => {
    appliquerFiltres();
  }, [filtreType, filtreDestination, prixMin, prixMax, ecoCertifie, hebergements]);

  const fetchHebergements = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/hebergements');
      const data = await response.json();
      
      if (data.success) {
        setHebergements(data.hebergements || []);
        setHebergementsFiltres(data.hebergements || []);
      } else {
        console.error('Erreur API:', data.error);
        setHebergements([]);
        setHebergementsFiltres([]);
      }
    } catch (error) {
      console.error('Erreur de chargement:', error);
      setHebergements([]);
      setHebergementsFiltres([]);
    } finally {
      setLoading(false);
    }
  };

  const appliquerFiltres = () => {
    if (hebergements.length === 0) return;

    let resultats = [...hebergements];

    // Filtre par type
    if (filtreType) {
      resultats = resultats.filter(hebergement => 
        hebergement.type?.toLowerCase() === filtreType.toLowerCase()
      );
    }

    // Filtre par destination
    if (filtreDestination) {
      resultats = resultats.filter(hebergement => 
        hebergement.destination?.nom?.toLowerCase().includes(filtreDestination.toLowerCase()) ||
        hebergement.destination?.region?.toLowerCase().includes(filtreDestination.toLowerCase())
      );
    }

    // Filtre par prix minimum
    if (prixMin) {
      resultats = resultats.filter(hebergement => {
        const prix = parseFloat(hebergement.prix_nuit || '0');
        return prix >= parseFloat(prixMin);
      });
    }

    // Filtre par prix maximum
    if (prixMax) {
      resultats = resultats.filter(hebergement => {
        const prix = parseFloat(hebergement.prix_nuit || '0');
        return prix <= parseFloat(prixMax);
      });
    }

    // Filtre éco-certifié
    if (ecoCertifie) {
      resultats = resultats.filter(hebergement => hebergement.eco_certifie);
    }

    setHebergementsFiltres(resultats);
  };

  const resetFiltres = () => {
    setFiltreType("");
    setFiltreDestination("");
    setPrixMin("");
    setPrixMax("");
    setEcoCertifie(false);
    // Les filtres se réappliqueront automatiquement via le useEffect
  };

  const contacterProprietaire = (telephone: string) => {
    const message = "Bonjour, je suis intéressé(e) par votre hébergement. Pouvez-vous me donner plus d'informations ?";
    const whatsappUrl = `https://wa.me/${telephone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Obtenir les types uniques pour le select
  const typesUniques = [...new Set(hebergements.map(h => h.type).filter(Boolean))];
  // Obtenir les destinations uniques pour le select
  const destinationsUniques = [...new Set(
    hebergements
      .map(h => h.destination?.nom)
      .filter(Boolean)
      .sort()
  )];

  return (
    <div className="space-y-8">
      {/* Filtres */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Filtrer les hébergements</h3>
          <Badge variant="outline" className="ml-auto">
            {hebergementsFiltres.length} résultat{hebergementsFiltres.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Type d'hébergement</label>
            <select 
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
              value={filtreType}
              onChange={(e) => setFiltreType(e.target.value)}
            >
              <option value="">Tous les types</option>
              {typesUniques.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Destination</label>
            <select 
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
              value={filtreDestination}
              onChange={(e) => setFiltreDestination(e.target.value)}
            >
              <option value="">Toutes destinations</option>
              {destinationsUniques.map(destination => (
                <option key={destination} value={destination}>{destination}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Prix min (DH)</label>
            <input 
              type="number"
              placeholder="0"
              min="0"
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
              value={prixMin}
              onChange={(e) => setPrixMin(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Prix max (DH)</label>
            <input 
              type="number"
              placeholder="5000"
              min="0"
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
              value={prixMax}
              onChange={(e) => setPrixMax(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input 
            type="checkbox"
            id="ecoCertifie"
            checked={ecoCertifie}
            onChange={(e) => setEcoCertifie(e.target.checked)}
            className="rounded border-border"
          />
          <label htmlFor="ecoCertifie" className="text-sm text-foreground">
            🌱 Éco-certifié uniquement
          </label>
        </div>

        {/* Indicateur de filtres actifs */}
        {(filtreType || filtreDestination || prixMin || prixMax || ecoCertifie) && (
          <div className="mb-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary font-medium">
              Filtres actifs: 
              {filtreType && ` Type: ${filtreType}`}
              {filtreDestination && ` Destination: ${filtreDestination}`}
              {prixMin && ` Prix min: ${prixMin} DH`}
              {prixMax && ` Prix max: ${prixMax} DH`}
              {ecoCertifie && ` Éco-certifié`}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={resetFiltres} variant="outline">
            Réinitialiser les filtres
          </Button>
        </div>
      </Card>

      {/* Liste des hébergements */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des hébergements...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hebergementsFiltres.map((hebergement) => (
            <Card key={hebergement.id} className="p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center overflow-hidden relative">
                {hebergement.eco_certifie && (
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    🌱 Éco
                  </Badge>
                )}
                <Hotel className="w-12 h-12 text-primary" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-foreground">{hebergement.nom}</h3>
                    <Badge variant="outline">{hebergement.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {hebergement.description}
                  </p>
                </div>

                {hebergement.destination && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    {hebergement.destination.nom} - {hebergement.destination.region}
                  </div>
                )}

                {hebergement.proprietaire && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Propriétaire: </span>
                    {hebergement.proprietaire.prenom} {hebergement.proprietaire.nom}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <p className="text-2xl font-bold text-primary">{hebergement.prix_nuit} DH</p>
                    <p className="text-xs text-muted-foreground">par nuit</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Capacité</p>
                    <p className="font-semibold text-foreground">{hebergement.capacite} pers.</p>
                  </div>
                </div>

                {hebergement.equipements && (
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Wifi className="w-3 h-3" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Coffee className="w-3 h-3" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Utensils className="w-3 h-3" />
                    </div>
                  </div>
                )}

                {hebergement.proprietaire?.telephone ? (
                  <Button 
                    className="w-full hero-button"
                    onClick={() => contacterProprietaire(hebergement.proprietaire!.telephone!)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contacter sur WhatsApp
                  </Button>
                ) : (
                  <Button className="w-full hero-button" disabled>
                    Contact non disponible
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && hebergementsFiltres.length === 0 && (
        <Card className="p-12 text-center">
          <Hotel className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-foreground mb-2">Aucun hébergement trouvé</h4>
          <p className="text-muted-foreground mb-4">
            {filtreType || filtreDestination || prixMin || prixMax || ecoCertifie 
              ? "Aucun hébergement ne correspond à vos critères de recherche." 
              : "Aucun hébergement n'est disponible pour le moment."}
          </p>
          {(filtreType || filtreDestination || prixMin || prixMax || ecoCertifie) && (
            <Button onClick={resetFiltres} variant="outline">
              Réinitialiser les filtres
            </Button>
          )}
        </Card>
      )}
    </div>
  );
};

// Types pour les guides
type Guide = {
  id: string | number;
  estCertifie?: boolean;
  utilisateur: {
    prenom: string;
    nom: string;
    telephone?: string;
    email?: string;
    avatar?: string;
  };
  specialisations?: string;
  noteMoyenne?: number | string;
  totalAvis?: number;
  experienceAnnees?: number | string;
  languesParlees?: string;
  tarifHoraire?: number | string;
  certification?: string;
  accessibiliteHandicap?: boolean;
};

// Section Guides
const GuidesSection = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtreSpecialisation, setFiltreSpecialisation] = useState("");
  const [filtreLangue, setFiltreLangue] = useState("");

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/guides');
      const data = await response.json();
      
      if (data.success) {
        setGuides(data.guides || []);
      } else {
        console.error('Erreur API:', data.error);
        setGuides([]);
      }
    } catch (error) {
      console.error('Erreur de chargement:', error);
      setGuides([]);
    } finally {
      setLoading(false);
    }
  };

  const appliquerFiltres = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filtreSpecialisation) params.append('specialisation', filtreSpecialisation);
      if (filtreLangue) params.append('langue', filtreLangue);

      const response = await fetch(`/api/guides?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setGuides(data.guides || []);
      } else {
        console.error('Erreur filtres:', data.error);
      }
    } catch (error) {
      console.error('Erreur filtres:', error);
    } finally {
      setLoading(false);
    }
  };

  const contacterGuide = (telephone: string, nom: string) => {
    const message = `Bonjour ${nom}, je suis intéressé(e) par vos services de guide. Pouvez-vous me donner plus d'informations ?`;
    const whatsappUrl = `https://wa.me/${telephone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Filtres */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Trouver votre guide</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Spécialisation</label>
            <input 
              type="text"
              placeholder="Ex: Culture, Randonnée..."
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
              value={filtreSpecialisation}
              onChange={(e) => setFiltreSpecialisation(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Langue</label>
            <input 
              type="text"
              placeholder="Ex: Français, Anglais..."
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
              value={filtreLangue}
              onChange={(e) => setFiltreLangue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={appliquerFiltres} className="hero-button">
            Rechercher
          </Button>
          <Button onClick={fetchGuides} variant="outline">
            Réinitialiser
          </Button>
        </div>
      </Card>

      {/* Liste des guides */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement des guides...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card key={guide.id} className="p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="w-full h-48 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg flex items-center justify-center overflow-hidden relative">
                {guide.estCertifie && (
                  <Badge className="absolute top-2 right-2 bg-accent text-white flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Certifié
                  </Badge>
                )}
                <Users className="w-12 h-12 text-secondary" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {guide.utilisateur.prenom} {guide.utilisateur.nom}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {guide.specialisations}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{guide.noteMoyenne || "5.0"}</span>
                  <span className="text-sm text-muted-foreground">({guide.totalAvis || 0} avis)</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                    {guide.experienceAnnees} ans d'expérience
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                    {guide.languesParlees}
                  </div>
                  {guide.utilisateur.telephone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4 text-primary" />
                      {guide.utilisateur.telephone}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Tarif horaire</span>
                    <span className="text-xl font-bold text-primary">{guide.tarifHoraire} DH</span>
                  </div>
                  
                  {guide.utilisateur.telephone ? (
                    <Button 
                      className="w-full hero-button"
                      onClick={() => contacterGuide(guide.utilisateur.telephone!, `${guide.utilisateur.prenom} ${guide.utilisateur.nom}`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contacter sur WhatsApp
                    </Button>
                  ) : (
                    <Button className="w-full hero-button" disabled>
                      Contact non disponible
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && guides.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun guide trouvé</p>
        </Card>
      )}
    </div>
  );
};

export default Services;