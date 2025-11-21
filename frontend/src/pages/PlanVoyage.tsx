import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import NavigationRouter from "@/components/NavigationRouter";
import { 
  Sparkles, MapPin, Calendar, DollarSign, Leaf, 
  Plane, Hotel, Heart, Sun, Moon, Download, 
  RefreshCw, ArrowRight, 
  MessageSquare, Send, Bot, User, ChevronLeft
} from "lucide-react"; 
import { toast } from "sonner";

const PlanVoyage = () => {
  // ================================
  // STATES EXISTANTS
  // ================================
  
  // FORMULAIRE STANDARD
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelType, setTravelType] = useState("");
  const [preferences, setPreferences] = useState("");

  // CHAMPS PERSONNALISÉS
  const [customDestination, setCustomDestination] = useState("");
  const [customTravelType, setCustomTravelType] = useState("");

  // OPTIONS ECO
  const [eco1, setEco1] = useState(false);
  const [eco2, setEco2] = useState(false);
  const [eco3, setEco3] = useState(false);

  // RÉSULTATS & UI
  const [isGenerating, setIsGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [planText, setPlanText] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  // ================================
  // NOUVEAUX STATES (POUR LE CHAT & GPS)
  // ================================
  const [showCompanion, setShowCompanion] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  
  // --- NOUVEAU : State pour la localisation ---
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });

  const [messages, setMessages] = useState([
    { 
      role: "ai", 
      content: "Bonjour ! Je suis votre compagnon de voyage. J'ai mémorisé votre itinéraire. Je peux vous aider à trouver un restaurant, une pharmacie ou vous rappeler le programme. On y va ?" 
    }
  ]);
  
  const messagesEndRef = useRef(null);

  // Scroll automatique vers le bas du chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showCompanion]);

  const ECO_TIPS = [
      "Utilisez une gourde filtrante pour éviter d'acheter des bouteilles en plastique.",
      "Refusez les pailles en plastique dans les cafés et restaurants.",
      "Privilégiez la marche à pied ou le vélo pour les petits trajets urbains.",
      "Achetez des souvenirs fabriqués localement pour soutenir l'artisanat.",
      "Demandez à ne pas changer vos serviettes d'hôtel tous les jours.",
      "Éteignez la climatisation et les lumières en quittant votre chambre.",
      "Utilisez une crème solaire minérale respectueuse des coraux et des océans.",
      "Privilégiez les douches courtes pour économiser l'eau, souvent rare.",
      "Emportez un sac en tissu (tote bag) pour vos achats au souk ou au marché.",
      "Mangez végétarien au moins un repas par jour pour réduire votre empreinte carbone.",
      "Ne laissez aucune trace de votre passage lors de vos randonnées.",
      "Évitez les activités impliquant des animaux captifs ou maltraités.",
      "Utilisez les transports en commun locaux (bus, trains) plutôt que les taxis privés.",
      "Rechargez vos appareils électroniques en mode éco ou solaire si possible.",
      "Triez vos déchets même en vacances si l'infrastructure le permet.",
      "Privilégiez les restaurants qui utilisent des produits de saison et locaux.",
      "Refusez les emballages superflus lors de vos achats de rue.",
      "Utilisez des produits d'hygiène solides (shampoing, savon) pour limiter le plastique.",
      "Respectez les codes vestimentaires locaux pour une meilleure intégration culturelle.",
      "Demandez la permission avant de prendre des photos des habitants.",
      "Ne nourrissez pas les animaux sauvages pour ne pas perturber leur régime alimentaire.",
      "Fumeurs, utilisez un cendrier de poche, ne jetez jamais vos mégots au sol.",
      "Favorisez les hébergements labellisés 'Clef Verte' ou éco-responsables.",
      "Participez à une action de nettoyage de plage ou de sentier si l'occasion se présente.",
      "Évitez le gaspillage alimentaire aux buffets des hôtels.",
      "Utilisez une application de carte hors ligne pour limiter l'utilisation des données.",
      "Rapportez vos piles et déchets électroniques chez vous pour les recycler correctement.",
      "Optez pour le billet électronique sur votre téléphone plutôt que l'impression papier.",
      "Encouragez l'économie locale en mangeant dans les petits bouis-bouis familiaux.",
      "Partagez ces éco-gestes avec d'autres voyageurs rencontrés sur place !"
    ];

  // ================================
  // LOGIC EXISTANTE
  // ================================

  const generatePlan = async () => {
    const finalDestination = destination === "Autre" ? customDestination : destination;
    const finalTravelType = travelType === "Autre" ? customTravelType : travelType;

    if (!finalDestination || !days || !budget || !finalTravelType) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsGenerating(true);

    try {
      const body = {
        user_id: "user001",
        destination: finalDestination,
        days: parseInt(days),
        budget,
        travel_type: finalTravelType,
        eco_accommodation: eco1,
        eco_transport: eco2,
        eco_local_experiences: eco3,
        preferences
      };

      const res = await fetch("https://jilali21-ai-generale.hf.space/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      setPlanText(data.plan_text);
      setPdfUrl(data.pdf_url);

      setPlanGenerated(true);
      toast.success("Votre itinéraire a été généré !");
    } catch (err) {
      toast.error("Erreur lors de la génération.");
      console.error(err);
    }

    setIsGenerating(false);
  };

  // ================================
  // NOUVELLE LOGIQUE : GPS & CHAT
  // ================================

  // --- 1. Fonction pour demander le GPS ---
  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("La géolocalisation n'est pas supportée par ce navigateur.");
      return;
    }

    toast.info("Localisation en cours pour l'assistant...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        toast.success("Position GPS activée ! L'assistant sait où vous êtes.");
      },
      (error) => {
        console.error("Erreur GPS:", error);
        toast.warning("Impossible de récupérer votre position. L'assistant sera moins précis.");
      },
      { enableHighAccuracy: true }
    );
  };

  // --- 2. Fonction d'envoi du message (Modifiée) ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { role: "user", content: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsSendingMsg(true);

    // Récupération de l'heure actuelle formatée "HH:MM"
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    try {
      const res = await fetch("https://jilali21-ai-generale.hf.space/companion/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_input: userMsg.content,
          trip_context: planText,
          history: messages,
          // --- AJOUTS GPS & HEURE ---
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          local_time: currentTime
        }),
      });

      const data = await res.json();

      setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
    } catch (err) {
      toast.error("Erreur de connexion au compagnon.");
      console.error(err);
    }
    
    setIsSendingMsg(false);
  };

  // ================================
  // HELPERS & FORMATTING
  // ================================

  const getTimeIcon = (time) => {
    if (time.includes('Matin')) return <Sun className="w-5 h-5 text-orange-500" />;
    if (time.includes('Après-midi')) return <Sun className="w-5 h-5 text-yellow-500" />;
    if (time.includes('Soir')) return <Moon className="w-5 h-5 text-indigo-500" />;
    return <Calendar className="w-5 h-5 text-primary" />;
  };

  const formatTextWithKeywords = (text) => {
    if (!text) return text;

    const keywords = {
      'Transports?': 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 px-1 rounded',
      'Vols?': 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 px-1 rounded',
      'Aéroport': 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 px-1 rounded',
      'Gare': 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 px-1 rounded',
      'Taxis?': 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 px-1 rounded',
      'Bus': 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 px-1 rounded',
      'Voiture': 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30 px-1 rounded',
      'Eau': 'text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-1 rounded',
      'Déchets': 'text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-1 rounded',
      'Énergie': 'text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-1 rounded',
      'Soutien Local': 'text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-1 rounded',
      'Environnement': 'text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-1 rounded',
      'Hébergement éco-responsable': 'text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-1 rounded',
      'Eco-Responsable': 'text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-1 rounded',
      'Budget': 'text-amber-600 font-bold bg-amber-50 dark:bg-amber-900/30 px-1 rounded',
      'Hébergement': 'text-amber-600 font-bold bg-amber-50 dark:bg-amber-900/30 px-1 rounded',
      'Repas': 'text-amber-600 font-bold bg-amber-50 dark:bg-amber-900/30 px-1 rounded',
      'Souvenirs': 'text-amber-600 font-bold bg-amber-50 dark:bg-amber-900/30 px-1 rounded',
      'Total': 'text-amber-700 font-extrabold bg-amber-100 dark:bg-amber-900/50 px-1 rounded',
      'Activités': 'text-purple-600 font-bold bg-purple-50 dark:bg-purple-900/30 px-1 rounded',
      "Points d'intérêt": 'text-purple-600 font-bold bg-purple-50 dark:bg-purple-900/30 px-1 rounded',
      'Visites': 'text-purple-600 font-bold bg-purple-50 dark:bg-purple-900/30 px-1 rounded',
      'Important': 'text-rose-600 font-bold bg-rose-50 dark:bg-rose-900/30 px-1 rounded',
      'Conseils?': 'text-rose-600 font-bold bg-rose-50 dark:bg-rose-900/30 px-1 rounded',
      'Sécurité': 'text-rose-600 font-bold bg-rose-50 dark:bg-rose-900/30 px-1 rounded',
    };

    let formattedText = text;
    const sortedKeys = Object.keys(keywords).sort((a, b) => b.length - a.length);

    sortedKeys.forEach((keyword) => {
      const style = keywords[keyword];
      try {
        const cleanKeyword = keyword.replace(/[.*+^${}()|[\]\\]/g, '\\$&').replace(/\\\?/g, '?');
        const regex = new RegExp(`\\b(${cleanKeyword})\\b`, 'gi');
        formattedText = formattedText.replace(regex, `<span class="${style}">$1</span>`);
      } catch (e) {
        console.error("Erreur regex:", keyword);
      }
    });

    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  const formatPlanText = (text) => {
    if (!text) return null;

    const cleanText = text
      .replace(/^#+\s*/gm, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1');

    const [title, ...restLines] = cleanText.split('\n').filter(line => line.trim() !== '');
    const contentWithoutTitle = restLines.join('\n');
    const daySections = contentWithoutTitle.split(/(?=Jour \d+ :)/g);

    const displayDestination = destination === "Autre" ? customDestination : destination;
    const displayType = travelType === "Autre" ? customTravelType : travelType;

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-3xl -z-10 rounded-full transform scale-75 opacity-50"></div>
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4 tracking-tight">
            {title}
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="px-3 py-1 text-sm bg-background">{displayDestination}</Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm bg-background">{days} Jours</Badge>
            <Badge variant="secondary" className="px-3 py-1 text-sm">{displayType}</Badge>
          </div>
        </div>

        <div className="space-y-8 relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block"></div>

          {daySections.map((dayContent, dayIndex) => {
            if (!dayContent.trim()) return null;

            const dayMatch = dayContent.match(/^Jour (\d+) : (.+?)(?=\n|$)/s);
            
            if (!dayMatch) {
               return (
                 <Card key={`extra-${dayIndex}`} className="relative ml-0 md:ml-20 mt-8 border-none shadow-lg bg-white/60 dark:bg-slate-950/60 backdrop-blur-md">
                    <div className="p-6 text-foreground/80 leading-relaxed">
                      {dayContent.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{formatTextWithKeywords(line.trim())}</p>
                      ))}
                    </div>
                 </Card>
               );
            }

            const [, dayNumber, dayTitle] = dayMatch;
            const dayDescription = dayContent.replace(/^Jour \d+ : .+?\n/s, '');
            const timeSections = dayDescription.split(/(Matin|Après-midi|Soir)\s*:?\s*([^\n]*)/);

            return (
              <div key={dayIndex} className="relative pl-0 md:pl-20 group">
                <div className="absolute left-0 md:left-[1.15rem] top-0 w-16 h-16 md:w-12 md:h-12 bg-background border-4 border-primary text-primary rounded-full flex items-center justify-center font-bold shadow-lg z-10 mb-4 md:mb-0 text-lg md:text-base">
                  J{dayNumber}
                </div>

                <Card className="overflow-hidden border-none shadow-lg bg-white/60 dark:bg-slate-950/60 backdrop-blur-md hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b border-primary/5">
                    <h2 className="text-2xl font-bold text-foreground pl-16 md:pl-0">
                      {dayTitle.trim()}
                    </h2>
                  </div>

                  <div className="p-6 space-y-8">
                    {timeSections.map((section, sectionIndex) => {
                      if (sectionIndex % 3 !== 1 || !['Matin', 'Après-midi', 'Soir'].includes(timeSections[sectionIndex])) return null;

                      const timeOfDay = timeSections[sectionIndex];
                      const subtitle = timeSections[sectionIndex + 1]?.trim() || '';
                      const content = timeSections[sectionIndex + 2]?.trim() || '';
                      
                      const pointsInteret = content.match(/Points d'intérêt:[^\n]*(\n\s*[-•].*)*/g);
                      let mainContent = content;
                      if (pointsInteret && pointsInteret.length > 0) {
                        mainContent = content.replace(pointsInteret[0], '').trim();
                      }

                      return (
                        <div key={`${dayIndex}-${sectionIndex}`} className="relative">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-full bg-muted/50 text-primary shadow-sm">
                                {getTimeIcon(timeOfDay)}
                            </div>
                            <h3 className="text-lg font-bold text-foreground">
                              {timeOfDay} <span className="font-normal text-muted-foreground text-base">{subtitle && `• ${subtitle}`}</span>
                            </h3>
                          </div>

                          <div className="pl-12 space-y-3 text-foreground/80 leading-relaxed">
                            {mainContent.split('\n').filter(Boolean).map((paragraph, pIndex) => {
                              if (paragraph.trim().startsWith('-') || paragraph.trim().match(/^\d+\./)) {
                                return (
                                  <ul key={pIndex} className="list-disc pl-4 marker:text-primary/60">
                                    <li>{formatTextWithKeywords(paragraph.replace(/^[-•]\s*|^\d+\.\s*/, ''))}</li>
                                  </ul>
                                );
                              }
                              return <p key={pIndex}>{formatTextWithKeywords(paragraph.trim())}</p>;
                            })}

                            {pointsInteret && pointsInteret.length > 0 && (
                              <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 flex flex-col sm:flex-row gap-3">
                                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                <div>
                                  <h4 className="font-bold text-foreground mb-2 text-sm uppercase tracking-wider">À voir absolument</h4>
                                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                    {pointsInteret[0]
                                      .replace('Points d\'intérêt:', '')
                                      .split('\n')
                                      .filter(line => line.trim() && !line.includes('Points d\'intérêt:'))
                                      .map((point, pointIndex) => (
                                        <li key={pointIndex} className="text-sm flex items-center gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0"></span>
                                          {formatTextWithKeywords(point.trim().replace(/^[-•]\s*/, ''))}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-4 border-t border-emerald-100/50 dark:border-emerald-900/20 flex gap-3 items-center text-sm text-emerald-800 dark:text-emerald-400">
                    <Leaf className="w-4 h-4 flex-shrink-0" />
                    <p>
                      <span className="font-bold">Eco-Conseil du jour : </span>
                      {ECO_TIPS[Math.floor(Math.random() * ECO_TIPS.length)]}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <Card className="bg-gradient-to-br from-primary to-blue-700 text-primary-foreground border-none p-8 text-center rounded-2xl shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Bon voyage !</h3>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            "Le voyage est la seule chose qu'on achète qui nous rend plus riche."
          </p>
        </Card>
      </div>
    );
  };

  // ================================
  // RENDER: VUE COMPAGNON (CHAT)
  // ================================
  if (showCompanion) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
        <NavigationRouter />
        
        <div className="flex-1 container max-w-4xl mx-auto pt-24 pb-4 px-4 flex flex-col h-[100vh]">
          
          {/* Header du Chat */}
          <div className="flex items-center justify-between mb-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-primary/10 rounded-full text-primary">
                 <Bot className="w-6 h-6" />
               </div>
               <div>
                 <h2 className="font-bold text-lg">Assistant Voyage</h2>
                 <div className="flex items-center gap-3">
                   <p className="text-xs text-muted-foreground flex items-center gap-1">
                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> En ligne
                   </p>
                   {/* Indicateur GPS */}
                   {userLocation.latitude ? (
                     <p className="text-xs text-blue-600 flex items-center gap-1">
                       <MapPin className="w-3 h-3" /> GPS Actif
                     </p>
                   ) : (
                     <p className="text-xs text-orange-500 flex items-center gap-1">
                       <MapPin className="w-3 h-3" /> GPS Inactif
                     </p>
                   )}
                 </div>
               </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowCompanion(false)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Retour au plan
            </Button>
          </div>

          {/* Zone des messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 mb-4 scrollbar-thin scrollbar-thumb-primary/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-primary text-white'}`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>

                  <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-foreground border border-slate-100 dark:border-slate-700 rounded-tl-none'
                  }`}>
                    {msg.role === 'ai' ? (
                        <span dangerouslySetInnerHTML={{ 
                            __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br/>') 
                        }} />
                    ) : (
                        msg.content
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isSendingMsg && (
               <div className="flex justify-start">
                 <div className="flex gap-3 max-w-[80%]">
                   <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                     <Bot className="w-5 h-5" />
                   </div>
                   <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700">
                     <div className="flex gap-1">
                       <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                       <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-75"></span>
                       <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-150"></span>
                     </div>
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Zone */}
          <form onSubmit={handleSendMessage} className="relative">
            <Input 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Posez une question sur votre voyage (ex: Un resto sympa ce soir ?)"
              className="h-14 pr-14 rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus-visible:ring-primary shadow-lg"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!chatInput.trim() || isSendingMsg}
              className="absolute right-2 top-2 h-10 w-10 rounded-lg bg-primary hover:bg-primary/90 transition-all"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>

        </div>
      </div>
    );
  }

  // ================================
  // RENDER MAIN (VUE CLASSIQUE)
  // ================================
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-primary/20">
      <NavigationRouter />
      
      {/* BACKGROUND PATTERN */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          
          {!planGenerated ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* HEADER SECTION */}
              <div className="text-center space-y-6 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-sm hover:bg-primary/20 transition-colors cursor-default">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">IA Travel Planner</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                  Créez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">évasion parfaite</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Laissez notre intelligence artificielle concevoir un itinéraire sur-mesure, respectueux de l'environnement et de vos envies.
                </p>
              </div>

              <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden rounded-3xl">
                <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-purple-500 w-full"></div>
                <div className="p-8 md:p-10 space-y-10">
                  
                  {/* FORMULAIRE - SECTION PRINCIPALE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* DESTINATION AVEC OPTION AUTRE */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <MapPin className="w-4 h-4 text-primary" /> Destination
                      </Label>
                      <Select onValueChange={setDestination}>
                        <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-primary"><SelectValue placeholder="Où souhaitez-vous aller ?" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Marrakech">Marrakech - La ville ocre</SelectItem>
                          <SelectItem value="Fès">Fès - Capitale spirituelle</SelectItem>
                          <SelectItem value="Chefchaouen">Chefchaouen - La perle bleue</SelectItem>
                          <SelectItem value="Essaouira">Essaouira - La cité des vents</SelectItem>
                          <SelectItem value="Merzouga">Merzouga - Portes du désert</SelectItem>
                          <SelectItem value="Casablanca">Casablanca - Métropole blanche</SelectItem>
                          <SelectItem value="Autre" className="font-semibold text-primary">📍 Autre destination...</SelectItem>
                        </SelectContent>
                      </Select>

                      {destination === "Autre" && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                           <Input 
                             placeholder="Entrez le nom de la ville (ex: Tanger, Agadir...)" 
                             className="h-12 bg-white border-primary/50 focus-visible:ring-primary"
                             value={customDestination}
                             onChange={(e) => setCustomDestination(e.target.value)}
                             autoFocus
                           />
                        </div>
                      )}
                    </div>

                    {/* DUREE */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <Calendar className="w-4 h-4 text-primary" /> Durée du séjour
                      </Label>
                      <Select onValueChange={setDays}>
                        <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-primary"><SelectValue placeholder="Combien de temps ?" /></SelectTrigger>
                        <SelectContent>
                          {[3, 5, 7, 10, 14].map(d => (
                            <SelectItem key={d} value={d.toString()}>{d} jours</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* BUDGET */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <DollarSign className="w-4 h-4 text-primary" /> Budget journalier
                      </Label>
                      <Select onValueChange={setBudget}>
                        <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-primary"><SelectValue placeholder="Votre budget ?" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Economique">💰 Économique (&lt; 500 DH)</SelectItem>
                          <SelectItem value="Modéré">💰💰 Modéré (500-1000 DH)</SelectItem>
                          <SelectItem value="Confortable">💰💰💰 Confortable (&gt; 1000 DH)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* TYPE DE VOYAGE AVEC OPTION AUTRE */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <Heart className="w-4 h-4 text-primary" /> Style de voyage
                      </Label>
                      <Select onValueChange={setTravelType}>
                        <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-primary"><SelectValue placeholder="Ce qui vous fait vibrer" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Culturel">🏛️ Culturel & Historique</SelectItem>
                          <SelectItem value="Aventure">🎒 Aventure & Nature</SelectItem>
                          <SelectItem value="Relax">🧘 Détente & Bien-être</SelectItem>
                          <SelectItem value="Gastro">🍽️ Gastronomie</SelectItem>
                          <SelectItem value="Autre" className="font-semibold text-primary">✨ Autre style...</SelectItem>
                        </SelectContent>
                      </Select>

                      {travelType === "Autre" && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                           <Input 
                             placeholder="Décrivez votre style (ex: Road trip moto, Photographie...)" 
                             className="h-12 bg-white border-primary/50 focus-visible:ring-primary"
                             value={customTravelType}
                             onChange={(e) => setCustomTravelType(e.target.value)}
                             autoFocus
                           />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

                  {/* ECO OPTIONS - CARTES SELECTIONNABLES */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <Leaf className="w-4 h-4 text-emerald-500" /> Options Eco-Responsables
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        onClick={() => setEco1(!eco1)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-2 ${eco1 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-100 hover:border-slate-200 bg-slate-50'}`}
                      >
                        <Hotel className={`w-6 h-6 ${eco1 ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span className={`font-medium text-sm ${eco1 ? 'text-emerald-700' : 'text-slate-600'}`}>Hôtels Ecolos</span>
                      </div>

                      <div 
                        onClick={() => setEco2(!eco2)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-2 ${eco2 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-100 hover:border-slate-200 bg-slate-50'}`}
                      >
                        <Plane className={`w-6 h-6 ${eco2 ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span className={`font-medium text-sm ${eco2 ? 'text-emerald-700' : 'text-slate-600'}`}>Transport Durable</span>
                      </div>

                      <div 
                        onClick={() => setEco3(!eco3)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-2 ${eco3 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-100 hover:border-slate-200 bg-slate-50'}`}
                      >
                        <Heart className={`w-6 h-6 ${eco3 ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span className={`font-medium text-sm ${eco3 ? 'text-emerald-700' : 'text-slate-600'}`}>Local & Authentique</span>
                      </div>
                    </div>
                  </div>

                  {/* PREFERENCES TEXTAREA */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-slate-700 dark:text-slate-200">Détails spécifiques</Label>
                    <Textarea 
                      placeholder="Ex: J'ai un régime végétarien, je veux éviter les musées le lundi..." 
                      rows={3}
                      className="bg-slate-50 border-slate-200 resize-none focus-visible:ring-primary"
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                    />
                  </div>

                  {/* BUTTON GENERATE */}
                  <Button 
                    className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                    size="lg"
                    onClick={generatePlan}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" /> Conception de votre voyage...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Générer mon itinéraire <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </Card>
            </div>
          ) : (

            // ================================
            // RESULTATS DISPLAY
            // ================================
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* Toolbar Flottante */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24 z-20 transition-all">
                <Button variant="ghost" onClick={() => setPlanGenerated(false)} className="text-slate-600 dark:text-slate-300 hover:text-slate-900">
                  ← Nouveau voyage
                </Button>
                
                <div className="flex gap-3 w-full md:w-auto flex-col sm:flex-row">
                  {pdfUrl && (
                    <Button asChild variant="outline" className="flex-1 border-primary/20 hover:bg-primary/5 text-primary">
                      <a href={`https://jilali21-ai-generale.hf.space/${pdfUrl}`} target="_blank" download rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" /> PDF
                      </a>
                    </Button>
                  )}
                  
                  {/* BOUTON VALIDER ET ACTIVER LE GPS */}
                  <Button 
                    onClick={() => {
                        setShowCompanion(true);
                        requestUserLocation(); // <-- DEMANDE LE GPS ICI
                    }}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" /> Valider & Démarrer Compagnon
                  </Button>
                </div>
              </div>

              {/* Timeline et Contenu */}
              {formatPlanText(planText)}

            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default PlanVoyage;