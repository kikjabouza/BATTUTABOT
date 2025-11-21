import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { MapPin, Users, MessageCircle, Calendar, Sparkles, Mail, Navigation as NavigationIcon } from "lucide-react";
import NavCnx from "@/components/NavCnx";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Types
type ProfilTouriste = {
  id: number;
  budget: number | null;
  styleVoyage: string | null;
  preferencesCulturelles: string | null;
  localisationGPS: string | null;
  historiqueRecherches: string | null;
  scoreEco: number | null;
  empreinteCarbone: number | null;
  idUtilisateur: number | null;
  utilisateur?: {
    id: number;
    email: string;
    prenom: string;
    nom: string;
    telephone: string | null;
    avatar: string | null;
  };
};

type GroupeCommunaute = {
  id: number;
  nom: string;
  description: string;
  typeInteret: string;
  urlWhatsapp: string | null;
  urlTelegram: string | null;
  estActif: boolean;
  membreMax: number | null;
  idDestination: number | null;
  idCreateur: number | null;
  destination?: {
    id: number;
    nom: string;
    region: string;
  };
  createur?: {
    id: number;
    prenom: string;
    nom: string;
    email: string;
  };
};

type Destination = {
  id: number;
  nom: string;
  description: string | null;
  region: string;
  latitude: number | null;
  longitude: number | null;
};

const Communaute = () => {
  const { user } = useAuthContext();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocationVisible, setIsLocationVisible] = useState(false);
  const [profilsTouristes, setProfilsTouristes] = useState<ProfilTouriste[]>([]);
  const [groupes, setGroupes] = useState<GroupeCommunaute[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({
    nom: '',
    description: '',
    typeInteret: '',
    urlWhatsapp: '',
    urlTelegram: '',
    membreMax: 10,
    idDestination: ''
  });

  // Demander la localisation au chargement
  useEffect(() => {
    requestLocationPermission();
    fetchData();
  }, []);

  const requestLocationPermission = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
      return;
    }

    const confirmed = window.confirm(
      "Voulez-vous partager votre position pour voir les voyageurs proches de vous ?"
    );

    if (confirmed) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setIsLocationVisible(true);
          
          // Mettre à jour la localisation dans le profil
          updateUserLocation(location);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          alert("Impossible d'accéder à votre position");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
  };

  const updateUserLocation = async (location: { lat: number; lng: number }) => {
    if (!user) return;

    try {
      const locationString = `${location.lat},${location.lng}`;
      
      // Récupérer le profil touriste de l'utilisateur
      const profilsResponse = await fetch('/api/profils-touristes');
      const profils: ProfilTouriste[] = await profilsResponse.json();
      const userProfil = profils.find(p => p.idUtilisateur === user.id);

      if (userProfil) {
        // Mettre à jour la localisation
        await fetch(`/api/profils-touristes/${userProfil.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            localisationGPS: locationString
          }),
        });
      }
    } catch (error) {
      console.error("Erreur mise à jour localisation:", error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Récupérer les profils touristes
      const profilsResponse = await fetch('/api/profils-touristes');
      const profils: ProfilTouriste[] = await profilsResponse.json();

      // Récupérer les utilisateurs pour compléter les profils
      const profilsAvecUtilisateurs = await Promise.all(
        profils.map(async (profil) => {
          if (profil.idUtilisateur) {
            try {
              const userResponse = await fetch(`/api/utilisateurs/${profil.idUtilisateur}`);
              if (userResponse.ok) {
                const userData = await userResponse.json();
                return { ...profil, utilisateur: userData.utilisateur };
              }
            } catch (error) {
              console.error('Erreur chargement utilisateur:', error);
            }
          }
          return profil;
        })
      );

      setProfilsTouristes(profilsAvecUtilisateurs);

      // Récupérer les groupes
      const groupesResponse = await fetch('/api/groupe');
      const groupesData: GroupeCommunaute[] = await groupesResponse.json();

      // Compléter les données des groupes
      const groupesComplets = await Promise.all(
        groupesData.map(async (groupe) => {
          let destination = null;
          let createur = null;

          if (groupe.idDestination) {
            try {
              const destResponse = await fetch(`/api/destinations/${groupe.idDestination}`);
              if (destResponse.ok) {
                const destData = await destResponse.json();
                destination = destData.data;
              }
            } catch (error) {
              console.error('Erreur chargement destination:', error);
            }
          }

          if (groupe.idCreateur) {
            try {
              const userResponse = await fetch(`/api/utilisateurs/${groupe.idCreateur}`);
              if (userResponse.ok) {
                const userData = await userResponse.json();
                createur = userData.utilisateur;
              }
            } catch (error) {
              console.error('Erreur chargement createur:', error);
            }
          }

          return { ...groupe, destination, createur };
        })
      );

      setGroupes(groupesComplets);

      // Récupérer les destinations pour le formulaire
      const destResponse = await fetch('/api/destinations');
      const destData = await destResponse.json();
      setDestinations(destData.data || []);

    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getNearbyTravelers = (): (ProfilTouriste & { distance: number })[] => {
    if (!userLocation) return [];

    const travelersWithDistance = profilsTouristes
      .filter(profil => 
        profil.utilisateur && 
        profil.idUtilisateur !== user?.id && // Exclure l'utilisateur connecté
        profil.localisationGPS
      )
      .map(profil => {
        const [lat, lng] = profil.localisationGPS!.split(',').map(Number);
        const distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
        return { ...profil, distance };
      })
      .filter(traveler => traveler.distance <= 50) // 50km max
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 8); // Limiter à 8 voyageurs

    return travelersWithDistance;
  };

  const createGroup = async () => {
    if (!user) return;

    try {
      const groupData = {
        nom: newGroup.nom,
        description: newGroup.description,
        typeInteret: newGroup.typeInteret,
        urlWhatsapp: newGroup.urlWhatsapp || null,
        urlTelegram: newGroup.urlTelegram || null,
        estActif: true,
        membreMax: newGroup.membreMax,
        idDestination: newGroup.idDestination || null,
        idCreateur: user.id
      };

      const response = await fetch('/api/groupe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) throw new Error('Erreur création groupe');

      setModalOpen(false);
      setNewGroup({
        nom: '',
        description: '',
        typeInteret: '',
        urlWhatsapp: '',
        urlTelegram: '',
        membreMax: 10,
        idDestination: ''
      });
      
      // Recharger les données
      fetchData();
      
      alert('Groupe créé avec succès !');

    } catch (error) {
      console.error('Erreur création groupe:', error);
      alert('Erreur lors de la création du groupe');
    }
  };

  const joinGroup = async (groupId: number) => {
    // Pour l'instant, on redirige vers WhatsApp/Telegram si disponible
    const group = groupes.find(g => g.id === groupId);
    if (group?.urlWhatsapp) {
      window.open(group.urlWhatsapp, '_blank');
    } else if (group?.urlTelegram) {
      window.open(group.urlTelegram, '_blank');
    } else {
      alert(`Contactez le créateur du groupe: ${group?.createur?.email}`);
    }
  };

  const nearbyTravelers = getNearbyTravelers();

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent">
        <NavCnx />
        <main className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-7xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement de la communauté...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <NavCnx />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Communauté de Voyageurs</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Rencontrez d'autres voyageurs
            </h1>
            <p className="text-xl text-muted-foreground">
              Connectez-vous, partagez et créez des souvenirs ensemble
            </p>
          </div>

          {/* Carte avec localisation */}
          <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    {userLocation ? 'Votre position' : 'Localisation'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {userLocation 
                      ? `${nearbyTravelers.length} voyageur${nearbyTravelers.length > 1 ? 's' : ''} à proximité`
                      : 'Activez votre localisation pour voir les voyageurs proches'
                    }
                  </p>
                </div>
              </div>
              {!userLocation && (
                <Button onClick={requestLocationPermission} variant="outline">
                  <NavigationIcon className="w-4 h-4 mr-2" />
                  Activer la localisation
                </Button>
              )}
            </div>
            
            {userLocation && (
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    userLocation.lng - 0.1
                  },${
                    userLocation.lat - 0.1
                  },${
                    userLocation.lng + 0.1
                  },${
                    userLocation.lat + 0.1
                  }&marker=${userLocation.lat},${userLocation.lng}&layer=mapnik`}
                  allowFullScreen
                />
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Voyageurs proches */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Voyageurs proches {userLocation && `(${nearbyTravelers.length})`}
                </h2>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>

              {!userLocation ? (
                <Card className="p-8 text-center">
                  <NavigationIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Activez votre localisation
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Partagez votre position pour voir les voyageurs près de vous
                  </p>
                  <Button onClick={requestLocationPermission} className="hero-button">
                    Activer la localisation
                  </Button>
                </Card>
              ) : nearbyTravelers.length === 0 ? (
                <Card className="p-8 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Aucun voyageur à proximité
                  </h3>
                  <p className="text-muted-foreground">
                    Aucun autre voyageur n'a partagé sa position dans un rayon de 50km
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nearbyTravelers.map((traveler, index) => (
                    <Card key={index} className="p-6 space-y-4 hover:border-primary/30 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-accent">
                            <AvatarFallback className="text-white font-bold">
                              {traveler.utilisateur?.prenom?.charAt(0)}{traveler.utilisateur?.nom?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-bold text-foreground">
                              {traveler.utilisateur?.prenom} {traveler.utilisateur?.nom}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {traveler.utilisateur?.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-primary font-medium">
                          <MapPin className="w-3 h-3" />
                          {traveler.distance.toFixed(1)} km
                        </div>
                      </div>

                      <div className="space-y-2">
                        {traveler.styleVoyage && (
                          <p className="text-sm text-muted-foreground">
                            Style: {traveler.styleVoyage}
                          </p>
                        )}
                        {traveler.preferencesCulturelles && (
                          <div className="flex flex-wrap gap-2">
                            {traveler.preferencesCulturelles.split(',').map((pref, i) => (
                              <span 
                                key={i}
                                className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                              >
                                {pref.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" size="sm" asChild>
                          <a href={`mailto:${traveler.utilisateur?.email}`}>
                            <Mail className="mr-2 h-3 w-3" />
                            Email
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Groupes de voyage */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Groupes de voyage</h2>
                <Button onClick={() => setModalOpen(true)} size="sm">
                  + Nouveau groupe
                </Button>
              </div>
              
              <div className="space-y-4">
                {groupes.filter(g => g.estActif).map((groupe, index) => (
                  <Card key={index} className="p-4 space-y-3 hover:border-primary/30 transition-all">
                    <h4 className="font-bold text-foreground">{groupe.nom}</h4>
                    <p className="text-sm text-muted-foreground">{groupe.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Type: {groupe.typeInteret}</span>
                      </div>
                      {groupe.destination && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{groupe.destination.nom}, {groupe.destination.region}</span>
                        </div>
                      )}
                      {groupe.membreMax && (
                        <p className="text-xs">
                          Maximum {groupe.membreMax} membres
                        </p>
                      )}
                      <p className="text-xs">
                        Créé par <span className="font-semibold text-foreground">
                          {groupe.createur?.prenom} {groupe.createur?.nom}
                        </span>
                      </p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="sm"
                      onClick={() => joinGroup(groupe.id)}
                    >
                      Rejoindre
                    </Button>
                  </Card>
                ))}

                {groupes.filter(g => g.estActif).length === 0 && (
                  <Card className="p-6 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Aucun groupe actif
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Soyez le premier à créer un groupe de voyage !
                    </p>
                    <Button onClick={() => setModalOpen(true)} className="hero-button">
                      Créer un groupe
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal création groupe */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
  <DialogContent className="sm:max-w-md max-h-[85vh] overflow-hidden flex flex-col">
    <DialogHeader className="flex-shrink-0">
      <DialogTitle>Créer un nouveau groupe</DialogTitle>
      <DialogDescription>
        Rassemblez d'autres voyageurs autour d'une destination ou d'un centre d'intérêt
      </DialogDescription>
    </DialogHeader>

    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Nom du groupe</label>
        <Input
          placeholder="Ex: Randonnée Atlas Maroc"
          value={newGroup.nom}
          onChange={(e) => setNewGroup({...newGroup, nom: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Description</label>
        <Textarea
          placeholder="Décrivez votre groupe et ses objectifs..."
          value={newGroup.description}
          onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Type d'intérêt</label>
        <Input
          placeholder="Ex: Randonnée, Culture, Gastronomie..."
          value={newGroup.typeInteret}
          onChange={(e) => setNewGroup({...newGroup, typeInteret: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Destination (optionnel)</label>
        <Select value={newGroup.idDestination} onValueChange={(value) => setNewGroup({...newGroup, idDestination: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir une destination" />
          </SelectTrigger>
          <SelectContent>
            {destinations.map((dest) => (
              <SelectItem key={dest.id} value={dest.id.toString()}>
                {dest.nom} - {dest.region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Nombre maximum de membres</label>
        <Input
          type="number"
          min="2"
          max="50"
          value={newGroup.membreMax}
          onChange={(e) => setNewGroup({...newGroup, membreMax: parseInt(e.target.value) || 10})}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Lien WhatsApp (optionnel)</label>
        <Input
          placeholder="https://chat.whatsapp.com/..."
          value={newGroup.urlWhatsapp}
          onChange={(e) => setNewGroup({...newGroup, urlWhatsapp: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Lien Telegram (optionnel)</label>
        <Input
          placeholder="https://t.me/..."
          value={newGroup.urlTelegram}
          onChange={(e) => setNewGroup({...newGroup, urlTelegram: e.target.value})}
        />
      </div>
    </div>

    <div className="flex-shrink-0 flex gap-3 pt-4 border-t">
      <Button
        variant="outline"
        onClick={() => setModalOpen(false)}
        className="flex-1"
      >
        Annuler
      </Button>
      <Button
        onClick={createGroup}
        className="flex-1 hero-button"
        disabled={!newGroup.nom || !newGroup.description || !newGroup.typeInteret}
      >
        Créer le groupe
      </Button>
    </div>
  </DialogContent>
</Dialog>

      <Footer />
    </div>
  );
};

export default Communaute;