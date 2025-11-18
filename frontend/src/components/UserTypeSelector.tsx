import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Palette, 
  MapPin, 
  Home,
  ArrowRight 
} from "lucide-react";

const userTypes = [
  {
    type: "Touriste",
    icon: Camera,
    description: "Découvrez le Maroc avec votre guide IA personnalisé",
    color: "primary",
    gradient: "from-primary/20 to-accent/20"
  },
  {
    type: "Artisan",
    icon: Palette,
    description: "Partagez votre savoir-faire avec le monde",
    color: "secondary",
    gradient: "from-secondary/20 to-primary/20"
  },
  {
    type: "Guide",
    icon: MapPin,
    description: "Accompagnez les voyageurs dans leurs aventures",
    color: "accent",
    gradient: "from-accent/20 to-secondary/20"
  },
  {
    type: "Propriétaire",
    icon: Home,
    description: "Proposez votre hébergement éco-responsable",
    color: "primary",
    gradient: "from-primary/20 to-accent/20"
  }
];

const UserTypeSelector = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Qui êtes-vous ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez votre profil pour une expérience personnalisée
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {userTypes.map((userType) => {
            const Icon = userType.icon;
            return (
              <Card 
                key={userType.type}
                className="user-type-card group"
              >
                <div className="p-6 space-y-6">
                  <div className={`w-16 h-16 rounded-2xl bg-[url('assets/zellig_motif1.avif')] bg-cover bg-center flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {userType.type}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {userType.description}
                    </p>
                  </div>

                  <Button 
                    className="w-full group/btn bg-[url('assets/background.svg')] bg-cover bg-center color-white"
                    variant="outline"
                    onClick={() => window.location.href = '/inscription'}
                  >
                    Choisir
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserTypeSelector;