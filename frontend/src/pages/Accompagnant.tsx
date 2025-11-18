import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import NavCnx from "@/components/NavCnx";
import Footer from "@/components/Footer";
import { Send, MapPin, Cloud, Globe, Sparkles, Navigation as NavigationIcon } from "lucide-react";

const Accompagnant = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour ! Je suis votre guide IA personnel. Comment puis-je vous aider aujourd'hui ?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, 
      { role: "user", content: input },
      { role: "assistant", content: "Excellent choix ! Le musée de Marrakech se trouve à 15 minutes à pied. Je vous recommande de passer par la rue Riad Zitoun pour profiter des boutiques artisanales. 🗺️" }
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-transparent">
      <NavCnx />
      
      <main className="pt-32 pb-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Accompagnant IA en Temps Réel</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Votre Guide Personnel
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Trip Info */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="p-6 space-y-4">
                <h3 className="font-bold text-lg text-foreground">Votre journée</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">En cours</p>
                      <p className="text-xs text-muted-foreground">Place Jemaa el-Fna</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <div className="w-2 h-2 rounded-full bg-muted"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">14:00</p>
                      <p className="text-xs text-muted-foreground">Atelier de poterie</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <div className="w-2 h-2 rounded-full bg-muted"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">19:00</p>
                      <p className="text-xs text-muted-foreground">Dîner traditionnel</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="font-bold text-lg text-foreground">Infos locales</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Cloud className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">28°C Ensoleillé</p>
                      <p className="text-xs text-muted-foreground">Temps idéal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">Médina de Marrakech</p>
                      <p className="text-xs text-muted-foreground">Votre position</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">Festival local</p>
                      <p className="text-xs text-muted-foreground">Ce soir à 20h</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <NavigationIcon className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">Navigation</h3>
                </div>
                <Button className="w-full hero-button">
                  Ouvrir dans Maps
                </Button>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                {/* Messages */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                  {messages.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          msg.role === 'user' 
                            ? 'bg-primary text-white' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-6 border-t border-border">
                  <div className="flex gap-3">
                    <Input 
                      placeholder="Posez votre question à l'IA..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      className="hero-button"
                      onClick={sendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <Button variant="outline" size="sm" onClick={() => setInput("Où trouver un restaurant halal ?")}>
                      🍽️ Restaurants
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setInput("Traduis 'bonjour' en amazigh")}>
                      🗣️ Traduction
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setInput("Activités proches")}>
                      🎯 À proximité
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accompagnant;