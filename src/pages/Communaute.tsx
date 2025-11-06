import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { MapPin, Users, MessageCircle, Calendar, Sparkles } from "lucide-react";

const Communaute = () => {
  const nearbyTravelers = [
    {
      name: "Sarah M.",
      from: "France",
      distance: "2.3 km",
      interests: ["Culture", "Gastronomie"],
      trip: "5 jours à Marrakech",
      avatar: "SM"
    },
    {
      name: "Ahmed K.",
      from: "Maroc",
      distance: "3.8 km",
      interests: ["Nature", "Aventure"],
      trip: "Week-end desert",
      avatar: "AK"
    },
    {
      name: "Lisa P.",
      from: "Belgique",
      distance: "5.1 km",
      interests: ["Artisanat", "Culture"],
      trip: "7 jours circuit sud",
      avatar: "LP"
    },
    {
      name: "Omar B.",
      from: "Espagne",
      distance: "6.2 km",
      interests: ["Gastronomie", "Culture"],
      trip: "3 jours Marrakech",
      avatar: "OB"
    }
  ];

  const groupTrips = [
    {
      title: "Excursion Cascade d'Ouzoud",
      date: "Samedi 15 mars",
      participants: 6,
      maxParticipants: 8,
      organizer: "Fatima Z."
    },
    {
      title: "Soirée Traditionnelle & Cuisine",
      date: "Vendredi 14 mars",
      participants: 4,
      maxParticipants: 6,
      organizer: "Youssef M."
    },
    {
      title: "Randonnée Atlas - Vallée d'Imlil",
      date: "Dimanche 16 mars",
      participants: 5,
      maxParticipants: 10,
      organizer: "Sophie L."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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

          {/* Map Preview Card */}
          <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-bold text-lg text-foreground">Voyageurs à proximité</h3>
                  <p className="text-sm text-muted-foreground">12 personnes dans un rayon de 10 km</p>
                </div>
              </div>
              <Button variant="outline">
                Voir la carte
              </Button>
            </div>
            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
              <MapPin className="w-12 h-12 text-muted-foreground" />
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Nearby Travelers */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Voyageurs proches</h2>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nearbyTravelers.map((traveler, index) => (
                  <Card key={index} className="p-6 space-y-4 hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-accent">
                          <AvatarFallback className="text-white font-bold">
                            {traveler.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-foreground">{traveler.name}</h4>
                          <p className="text-sm text-muted-foreground">{traveler.from}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-primary font-medium">
                        <MapPin className="w-3 h-3" />
                        {traveler.distance}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{traveler.trip}</p>
                      <div className="flex flex-wrap gap-2">
                        {traveler.interests.map((interest, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" size="sm">
                        👋 Coucou
                      </Button>
                      <Button className="flex-1 hero-button" size="sm">
                        <MessageCircle className="mr-2 h-3 w-3" />
                        Message
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Group Trips Sidebar */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Voyages en groupe</h2>
              
              <div className="space-y-4">
                {groupTrips.map((trip, index) => (
                  <Card key={index} className="p-4 space-y-3 hover:border-primary/30 transition-all">
                    <h4 className="font-bold text-foreground">{trip.title}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {trip.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        {trip.participants}/{trip.maxParticipants} participants
                      </div>
                      <p className="text-xs">
                        Organisé par <span className="font-semibold text-foreground">{trip.organizer}</span>
                      </p>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      Rejoindre
                    </Button>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <h3 className="font-bold text-lg text-foreground mb-3">Créer un groupe</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Organisez votre propre excursion et invitez d'autres voyageurs
                </p>
                <Button className="w-full hero-button">
                  + Nouveau groupe
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Communaute;