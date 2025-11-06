import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import { Sparkles, MapPin, Calendar, DollarSign, Leaf, Download, Share2 } from "lucide-react";
import { toast } from "sonner";

const PlanVoyage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);

  const generatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPlanGenerated(true);
      toast.success("Votre itinéraire a été généré avec succès !");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">IA Organisateur de Voyage</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Créez votre itinéraire parfait
            </h1>
            <p className="text-xl text-muted-foreground">
              Notre IA conçoit un plan personnalisé et éco-responsable
            </p>
          </div>

          {!planGenerated ? (
            <Card className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Destination principale
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez une ville" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marrakech">Marrakech</SelectItem>
                      <SelectItem value="fes">Fès</SelectItem>
                      <SelectItem value="chefchaouen">Chefchaouen</SelectItem>
                      <SelectItem value="essaouira">Essaouira</SelectItem>
                      <SelectItem value="merzouga">Merzouga</SelectItem>
                      <SelectItem value="casablanca">Casablanca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Durée du séjour
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Nombre de jours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 jours</SelectItem>
                      <SelectItem value="5">5 jours</SelectItem>
                      <SelectItem value="7">7 jours</SelectItem>
                      <SelectItem value="10">10 jours</SelectItem>
                      <SelectItem value="14">14 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Budget (par personne)
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Budget estimé" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Économique ({"<"} 500 DH/jour)</SelectItem>
                      <SelectItem value="medium">Modéré (500-1000 DH/jour)</SelectItem>
                      <SelectItem value="high">Confortable ({">"} 1000 DH/jour)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type de voyage</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cultural">Culturel & Patrimoine</SelectItem>
                      <SelectItem value="adventure">Aventure & Nature</SelectItem>
                      <SelectItem value="relax">Détente & Bien-être</SelectItem>
                      <SelectItem value="gastro">Gastronomie</SelectItem>
                      <SelectItem value="mixed">Mixte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-secondary" />
                  Options éco-responsables
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                    <Checkbox id="eco1" />
                    <Label htmlFor="eco1" className="cursor-pointer flex-1">
                      Privilégier les hébergements écologiques
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                    <Checkbox id="eco2" />
                    <Label htmlFor="eco2" className="cursor-pointer flex-1">
                      Favoriser les transports durables
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                    <Checkbox id="eco3" />
                    <Label htmlFor="eco3" className="cursor-pointer flex-1">
                      Inclure des expériences locales authentiques
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferences">Préférences supplémentaires (optionnel)</Label>
                <Textarea 
                  id="preferences" 
                  placeholder="Ex: J'aimerais visiter des ateliers d'artisans, éviter les zones trop touristiques..."
                  rows={4}
                />
              </div>

              <Button 
                className="w-full hero-button" 
                size="lg"
                onClick={generatePlan}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Générer mon itinéraire IA
                  </>
                )}
              </Button>
            </Card>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Generated Plan Header */}
              <Card className="p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Votre Itinéraire Personnalisé</h2>
                    <p className="text-muted-foreground">7 jours à Marrakech - Budget Modéré</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Partager
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-secondary" />
                    <span className="font-medium text-secondary">95% Éco-responsable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>12 lieux à visiter</span>
                  </div>
                </div>
              </Card>

              {/* Day by Day Plan */}
              {[1, 2, 3].map((day) => (
                <Card key={day} className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white font-bold">{day}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Jour {day}</h3>
                      <p className="text-muted-foreground">Découverte de la Médina</p>
                    </div>
                  </div>

                  <div className="space-y-3 ml-6 pl-6 border-l-2 border-border">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold">9:00</span>
                        <span>-</span>
                        <span>12:00</span>
                      </div>
                      <h4 className="font-semibold text-foreground">Visite de la Place Jemaa el-Fna</h4>
                      <p className="text-sm text-muted-foreground">
                        Immersion dans le cœur historique de Marrakech avec guide local
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold">14:00</span>
                        <span>-</span>
                        <span>17:00</span>
                      </div>
                      <h4 className="font-semibold text-foreground">Atelier de poterie traditionnelle</h4>
                      <p className="text-sm text-muted-foreground">
                        Expérience artisanale avec un maître potier local
                      </p>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                        <Leaf className="w-3 h-3" />
                        Éco-certifié
                      </span>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="flex-1">
                  Modifier l'itinéraire
                </Button>
                <Button className="flex-1 hero-button" size="lg">
                  Activer l'accompagnant IA
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlanVoyage;