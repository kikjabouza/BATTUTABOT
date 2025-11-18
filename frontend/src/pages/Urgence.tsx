import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Phone, 
  AlertCircle, 
  Shield, 
  Ambulance, 
  Building2, 
  CreditCard,
  Wifi,
  MapPin,
  ExternalLink,
  BookOpen,
  Info,
  Hospital,
  Flame
} from "lucide-react";

const Urgence = () => {
  const urgenceContacts = [
    { 
      nom: "Police", 
      numero: "19", 
      icon: Shield, 
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30"
    },
    { 
      nom: "Pompiers", 
      numero: "15", 
      icon: Flame, 
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/30"
    },
    { 
      nom: "Ambulance (SAMU)", 
      numero: "150 / 141", 
      icon: Ambulance, 
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30"
    },
    { 
      nom: "Gendarmerie Royale", 
      numero: "177", 
      icon: Shield, 
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/30"
    },
  ];

  const banques = [
    {
      nom: "Attijariwafa Bank",
      telephone: "+212 5 22 29 88 88",
      app: "Attijari Mobile",
      site: "https://www.attijariwafabank.com",
      services: ["Compte courant", "Cartes bancaires", "Crédit", "Mobile Banking"]
    },
    {
      nom: "BMCE Bank of Africa",
      telephone: "+212 5 22 49 98 98",
      app: "BMCE Direct",
      site: "https://www.bmcebank.ma",
      services: ["Comptes", "Western Union", "MoneyGram", "E-banking"]
    },
    {
      nom: "Banque Populaire",
      telephone: "+212 5 22 22 41 79",
      app: "Chaabi Mobile",
      site: "https://www.gbp.ma",
      services: ["Comptes populaires", "Épargne", "Crédit immobilier", "Assurance"]
    },
    {
      nom: "CIH Bank",
      telephone: "+212 5 22 47 93 93",
      app: "CIH Mobile",
      site: "https://www.cihbank.ma",
      services: ["Immobilier", "PME", "Particuliers", "Mobile Banking"]
    }
  ];

  const operateurs = [
    {
      nom: "Maroc Telecom (IAM)",
      logo: "📱",
      site: "https://www.iam.ma",
      services: ["2G", "3G", "4G", "5G"],
      forfaits: ["Jawal Prepaid", "Forfait Bloqué", "Forfait avec engagement"],
      color: "border-blue-500/30 hover:border-blue-500"
    },
    {
      nom: "Orange Maroc",
      logo: "🍊",
      site: "https://www.orange.ma",
      services: ["3G", "4G", "4G+"],
      forfaits: ["Orange Prepaid", "Forfaits Mobiles", "Internet Mobile"],
      color: "border-orange-500/30 hover:border-orange-500"
    },
    {
      nom: "inwi",
      logo: "📡",
      site: "https://www.inwi.ma",
      services: ["3G", "4G", "4G+"],
      forfaits: ["Carte Prepaid", "Forfaits Bloqués", "Abonnements"],
      color: "border-red-500/30 hover:border-red-500"
    }
  ];

  const commissariats = [
    { nom: "Commissariat Central Casablanca", adresse: "Boulevard Zerktouni, Casablanca", tel: "+212 5 22 26 76 10" },
    { nom: "Commissariat Guéliz - Marrakech", adresse: "Rue de la Liberté, Marrakech", tel: "+212 5 24 38 46 01" },
    { nom: "Commissariat Agdal - Rabat", adresse: "Avenue Al Araar, Rabat", tel: "+212 5 37 67 03 38" },
    { nom: "Commissariat Fès Médina", adresse: "Place Baghdad, Fès", tel: "+212 5 35 62 34 50" }
  ];

  return (
    <div className="min-h-screen bg-[url('assets/background.svg')] bg-center bg-cover bg-fixed bg-no-repeat">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-4">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Numéros d'Urgence au Maroc
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Informations essentielles pour votre sécurité et votre séjour au Maroc
            </p>
          </div>

          {/* Contacts d'urgence - Grid coloré */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Phone className="w-8 h-8 text-primary" />
              Contacts d'Urgence
            </h2>
            
            <Alert className="border-destructive/50 bg-destructive/5">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <AlertTitle className="text-destructive font-bold">Important</AlertTitle>
              <AlertDescription className="text-foreground">
                Ces numéros sont gratuits et disponibles 24h/24, 7j/7. Composez-les depuis n'importe quel téléphone.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {urgenceContacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div 
                    key={index}
                    className={`${contact.bg} border-2 border-border rounded-xl p-6 text-center space-y-4 hover:scale-105 transition-transform cursor-pointer`}
                  >
                    <div className="flex justify-center">
                      <div className={`w-16 h-16 rounded-full ${contact.bg} flex items-center justify-center border-2 ${contact.color}`}>
                        <Icon className={`w-8 h-8 ${contact.color}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{contact.nom}</h3>
                      <div className={`text-3xl font-black ${contact.color}`}>
                        {contact.numero}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comment passer un appel */}
          <Card className="border-2 border-accent/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Info className="w-6 h-6 text-accent" />
                Comment passer un appel d'urgence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-bold text-accent min-w-6">1.</span>
                  <span>Restez calme et parlez clairement</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent min-w-6">2.</span>
                  <span>Composez le numéro d'urgence approprié (19 pour Police, 15 pour Pompiers, 150/141 pour Ambulance)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent min-w-6">3.</span>
                  <span>Indiquez votre localisation précise (adresse, quartier, points de repère)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent min-w-6">4.</span>
                  <span>Décrivez brièvement la nature de l'urgence</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent min-w-6">5.</span>
                  <span>Ne raccrochez pas tant que l'opérateur ne vous le demande pas</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent min-w-6">6.</span>
                  <span>Si vous ne parlez pas arabe ou français, essayez de trouver quelqu’un pour traduire ou utilisez l’aide de notre assistant IA.</span>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Commissariats avec carte */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <MapPin className="w-8 h-8 text-primary" />
              Commissariats de Police Principaux
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {commissariats.map((commissariat, index) => (
                <Card key={index} className="hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5 text-blue-600" />
                      {commissariat.nom}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      {commissariat.adresse}
                    </p>
                    <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {commissariat.tel}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-500/30">
              <MapPin className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-900 dark:text-blue-300">Localisation GPS</AlertTitle>
              <AlertDescription className="text-blue-800 dark:text-blue-400">
                Utilisez Google Maps ou Waze pour trouver le commissariat le plus proche de votre position.
              </AlertDescription>
            </Alert>
          </div>

          {/* Banques - Accordion */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Building2 className="w-8 h-8 text-secondary" />
              Banques au Maroc
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {banques.map((banque, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-2 border-border rounded-lg px-6 hover:border-secondary/50 transition-colors"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-secondary" />
                      </div>
                      <span className="font-bold text-lg">{banque.nom}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Phone className="w-4 h-4 text-secondary" />
                          Téléphone: {banque.telephone}
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          📱 Application: {banque.app}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => window.open(banque.site, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Site Web
                        </Button>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">Services:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {banque.services.map((service, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg">💡 Comment ouvrir un compte bancaire</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Pour les touristes : Certaines banques proposent des comptes temporaires</p>
                <p>Documents nécessaires : Passeport, justificatif d'hébergement, dépôt initial</p>
                <p>Délai d'ouverture : 24h à 7 jours selon la banque</p>
              </CardContent>
            </Card>
          </div>

          {/* Opérateurs Télécom - Cards colorées */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Wifi className="w-8 h-8 text-primary" />
              Opérateurs Télécom
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {operateurs.map((operateur, index) => (
                <Card key={index} className={`border-2 ${operateur.color} transition-all hover:shadow-lg`}>
                  <CardHeader>
                    <div className="text-4xl mb-2">{operateur.logo}</div>
                    <CardTitle>{operateur.nom}</CardTitle>
                    <CardDescription>
                      {operateur.services.join(' • ')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Forfaits disponibles:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {operateur.forfaits.map((forfait, i) => (
                          <li key={i}>• {forfait}</li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full gap-2"
                      onClick={() => window.open(operateur.site, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Site officiel
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="text-xl">📱 Comment obtenir une carte SIM au Maroc</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Où acheter :</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Aéroports (kiosques disponibles 24h/24)</li>
                      <li>• Boutiques officielles des opérateurs</li>
                      <li>• Bureaux de tabac et kiosques agréés</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Documents requis :</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Passeport (obligatoire pour l'activation)</li>
                      <li>• Formulaire d'inscription à remplir</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Prix indicatifs :</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Carte SIM : 20-50 MAD</li>
                      <li>• Forfaits prépayés : 10-200 MAD</li>
                      <li>• Recharge Internet : 50-500 MAD</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lois et Réglementations */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-destructive" />
              Lois et Réglementations au Maroc
            </h2>

            <Alert className="border-destructive/50 bg-destructive/5">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <AlertTitle className="text-destructive font-bold">Information Importante</AlertTitle>
              <AlertDescription className="text-foreground">
                Le Maroc est un pays musulman avec des lois spécifiques. Respectez les coutumes locales et la réglementation en vigueur.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-green-500/30">
                <CardHeader className="bg-green-50 dark:bg-green-950/20">
                  <CardTitle className="text-green-900 dark:text-green-300 flex items-center gap-2">
                    ✅ Autorisé
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>• Photographier les paysages et monuments (sauf zones interdites)</li>
                    <li>• Porter des vêtements occidentaux (avec respect des normes de décence)</li>
                    <li>• Boire de l'alcool dans les hôtels et restaurants autorisés</li>
                    <li>• Pratiquer sa religion en privé</li>
                    <li>• Circuler librement avec un passeport valide</li>
                    <li>• Utiliser Internet et réseaux sociaux</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-500/30">
                <CardHeader className="bg-red-50 dark:bg-red-950/20">
                  <CardTitle className="text-red-900 dark:text-red-300 flex items-center gap-2">
                    ❌ Interdit / Réglementé
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>• Drogues (peines très sévères, y compris cannabis)</li>
                    <li>• Relations hors mariage (peut être poursuivi)</li>
                    <li>• Photographier les sites militaires et policiers</li>
                    <li>• Prosélytisme religieux</li>
                    <li>• Critique de la monarchie ou de l'Islam</li>
                    <li>• Importation de certains objets (drones, médicaments sans ordonnance)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-accent/50 bg-gradient-to-br from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-accent" />
                  Constitution Marocaine
                </CardTitle>
                <CardDescription>
                  Consultez le texte officiel de la Constitution du Royaume du Maroc (2011)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  La Constitution marocaine définit les droits et devoirs des citoyens et visiteurs. 
                  Elle garantit les libertés fondamentales tout en préservant l'identité marocaine.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="hero-button gap-2"
                    onClick={() => window.open('https://www.chambredesrepresentants.ma/fr/constitution-2011', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Lire la Constitution (Français)
                  </Button>
                  <Button 
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.open('https://www.amb-maroc.fr/tourisme/infos-pratiques/', '_blank')}
                  >
                    <Info className="w-4 h-4" />
                    Conseils aux voyageurs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Alert className="bg-muted">
              <Info className="h-5 w-5" />
              <AlertTitle>Conseil important</AlertTitle>
              <AlertDescription>
                En cas de doute sur la légalité d'une action, contactez votre ambassade ou consultez les autorités locales. 
                L'ignorance de la loi n'est pas une excuse valable.
              </AlertDescription>
            </Alert>
          </div>

          {/* Ambassades et Consulats */}
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                🏛️ Ambassades et Consulats
              </CardTitle>
              <CardDescription>
                Contactez votre ambassade en cas de problème majeur (perte de passeport, urgence juridique, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">🇫🇷 Ambassade de France - Rabat</h4>
                  <p className="text-muted-foreground">Tél: +212 5 37 68 97 00</p>
                  <p className="text-muted-foreground">Urgences: +212 6 61 32 15 55</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">🇧🇪 Ambassade de Belgique - Rabat</h4>
                  <p className="text-muted-foreground">Tél: +212 5 37 26 97 46</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">🇨🇭 Ambassade de Suisse - Rabat</h4>
                  <p className="text-muted-foreground">Tél: +212 5 37 26 80 30</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">🇨🇦 Ambassade du Canada - Rabat</h4>
                  <p className="text-muted-foreground">Tél: +212 5 37 54 49 49</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Urgence;
