import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Contactez-nous
            </h1>
            <p className="text-xl text-muted-foreground">
              Notre équipe est à votre écoute 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Email</h3>
                  <p className="text-muted-foreground">contact@battutabot.ma</p>
                  <p className="text-muted-foreground">support@battutabot.ma</p>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Téléphone</h3>
                  <p className="text-muted-foreground">+212 5XX-XXXXXX</p>
                  <p className="text-sm text-muted-foreground">Lun-Dim: 8h-22h</p>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Adresse</h3>
                  <p className="text-muted-foreground">
                    Avenue Mohammed V<br />
                    Marrakech 40000<br />
                    Maroc
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-lg text-foreground">Chat IA</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Obtenez des réponses instantanées avec notre assistant IA
                </p>
                <Button className="w-full hero-button">
                  Ouvrir le chat
                </Button>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Envoyez-nous un message</h2>
                  <p className="text-muted-foreground">
                    Nous vous répondrons dans les plus brefs délais
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" placeholder="Votre nom" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input id="subject" placeholder="Objet de votre message" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Décrivez votre demande..."
                      rows={8}
                    />
                  </div>

                  <Button className="w-full hero-button" size="lg">
                    <Send className="mr-2 h-5 w-5" />
                    Envoyer le message
                  </Button>
                </form>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">
              Questions Fréquentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "Comment fonctionne l'IA de Battuta Bot ?",
                  a: "Notre IA analyse vos préférences pour créer un itinéraire personnalisé et vous accompagne en temps réel."
                },
                {
                  q: "Les services sont-ils gratuits ?",
                  a: "L'inscription et les fonctionnalités de base sont gratuites. Des options premium sont disponibles."
                },
                {
                  q: "Puis-je modifier mon itinéraire ?",
                  a: "Oui, vous pouvez modifier votre plan à tout moment avec l'aide de l'IA."
                },
                {
                  q: "L'application fonctionne-t-elle hors ligne ?",
                  a: "Certaines fonctionnalités sont disponibles hors ligne après téléchargement."
                }
              ].map((faq, i) => (
                <Card key={i} className="p-6 space-y-3">
                  <h4 className="font-bold text-foreground">{faq.q}</h4>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;