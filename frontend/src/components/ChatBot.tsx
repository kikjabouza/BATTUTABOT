import { useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import { X, MessageCircle, Send, Trash2 } from "lucide-react";

// Import des images
import nature from "@/assets/nature.jpg";
import zellige from "@/assets/zellige-marocain-closeup.webp";
import ecodefi from "@/assets/ecodefi_zelig.jpg"; 
import bleu from "@/assets/bleu-marocain.webp";
import nature2 from "@/assets/nature-adventure-02.jpg";
import maroc from "@/assets/Maroc.jpeg.1920x0_q85_format-jpg.jpg";
import nador from "@/assets/nador-maroc.webp";
import kasbah from "@/assets/kasbah-des-Oudayas-a-Rabat.jpg";

// ✅ Définition des types COMPLETS sans any
interface ApiError {
  message: string;
  details?: unknown;
}

interface ApiResponse {
  answer?: string;
  images?: string[];
  audio_url?: string;
  [key: string]: unknown;
}

interface Message {
  id: number;
  role: "user" | "assistant" | "loading";
  text: string | null;
  images?: string[];
  audio_url?: string | null;
  error?: ApiError;
  raw?: ApiResponse;
  timestamp: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  // ✅ CONSERVER LA DISCUSSION DANS LE LOCALSTORAGE
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem("rag_chat_history");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [inputMessage, setInputMessage] = useState("");
  const [currentBackground, setCurrentBackground] = useState(0);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const backgrounds = [nature, zellige, ecodefi, bleu, nature2, maroc, nador, kasbah];

  // ✅ RÉPONSES PAR DÉFAUT
  const defaultResponses: { [key: string]: string } = {
    "bonjour": "Bonjour ! Je suis BATTUTA BOT, votre guide virtuel pour découvrir le Maroc. Comment puis-je vous aider aujourd'hui ? 🇲🇦",
    "salut": "Salut ! Ravie de vous rencontrer. Je suis BATTUTA BOT, prêt à vous faire découvrir les merveilles du Maroc. Quelle est votre question ?",
    "hello": "Hello ! Welcome to Morocco! I'm BATTUTA BOT, your virtual guide. How can I assist you today?",
    "merci": "Je vous en prie ! N'hésitez pas si vous avez d'autres questions sur le Maroc. 😊",
    "merci beaucoup": "Avec grand plaisir ! N'hésitez pas à me solliciter pour toute information sur le Maroc, sa culture, son histoire ou ses destinations.",
    "coucou": "Coucou ! 👋 Je suis BATTUTA BOT, enchanté de faire votre connaissance. Que souhaitez-vous savoir sur le Maroc ?",
    "bjr": "Bjr ! 😊 Je suis BATTUTA BOT, votre assistant pour tout savoir sur le Maroc. Comment puis-je vous aider ?",
    "bonsoir": "Bonsoir ! 🌙 Je suis BATTUTA BOT, toujours disponible pour vous guider à travers la richesse du Maroc. Quelle est votre question ?",
    "au revoir": "Au revoir ! À bientôt pour de nouvelles découvertes marocaines. 🇲🇦",
    "bye": "Bye bye ! Hope to see you soon for more Moroccan adventures!",
    "comment ça va": "Je vais très bien, merci ! Prêt à vous faire découvrir les trésors du Maroc. Et vous, quelle merveille marocaine souhaitez-vous explorer aujourd'hui ?",
    "ça va": "Tout va bien de mon côté ! 😊 En tant que BATTUTA BOT, je suis toujours enthousiaste à l'idée de partager la beauté du Maroc. Quelle est votre question ?"
  };

  // Fonction pour détecter les questions simples et répondre directement
  const getDefaultResponse = (question: string): string | null => {
    const cleanQuestion = question.toLowerCase().trim();
    
    // Vérifier les correspondances exactes
    for (const [key, response] of Object.entries(defaultResponses)) {
      if (cleanQuestion === key.toLowerCase()) {
        return response;
      }
    }
    
    // Vérifier les correspondances partielles
    if (cleanQuestion.includes("bonjour") || cleanQuestion.includes("salut") || cleanQuestion.includes("coucou")) {
      return defaultResponses["bonjour"];
    }
    if (cleanQuestion.includes("merci")) {
      return defaultResponses["merci"];
    }
    if (cleanQuestion.includes("au revoir") || cleanQuestion.includes("bye")) {
      return defaultResponses["au revoir"];
    }
    if (cleanQuestion.includes("comment ça va") || cleanQuestion.includes("ça va")) {
      return defaultResponses["comment ça va"];
    }
    
    return null;
  };

  // ✅ FONCTION POUR RESET LA CONVERSATION
  const resetConversation = () => {
    setMessages([]);
    localStorage.removeItem("rag_chat_history");
  };

  // Scroll automatique vers le bas quand les messages changent
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Changer le background automatiquement
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, backgrounds.length]);

  // ✅ PERSISTER LES MESSAGES DANS LE LOCALSTORAGE (sauf les messages de loading)
  useEffect(() => {
    const messagesToSave = messages.filter(msg => msg.role !== "loading");
    try {
      localStorage.setItem("rag_chat_history", JSON.stringify(messagesToSave));
    } catch (e) {
      // ignore
    }
  }, [messages]);

  const changeBackground = () => {
    setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
  };

  const handleSendMessage = async () => {
    const question = inputMessage.trim();
    if (!question || loading) return;

    setLoading(true);

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: question,
      timestamp: new Date().toISOString(),
    };
    
    // Ajouter le message de l'utilisateur
    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");

    // ✅ VÉRIFIER SI C'EST UNE QUESTION SIMPLE
    const defaultResponse = getDefaultResponse(question);
    
    if (defaultResponse) {
      // Réponse immédiate sans appel API
      setTimeout(() => {
        const assistantMsg: Message = {
          id: Date.now() + 1,
          role: "assistant",
          text: defaultResponse,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, assistantMsg]);
        setLoading(false);
      }, 500); // Petit délai pour un effet naturel
      return;
    }

    // Ajouter le message de chargement (pour les vraies questions)
    const loadingMsg: Message = {
      id: Date.now() + 0.5, // ID temporaire pour le loading
      role: "loading",
      text: "BATTUTA BOT réfléchit...",
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, loadingMsg]);

    try {
      const formData = new FormData();
      formData.append("user_id", "user001");
      formData.append("question", question);

      const res = await axios.post<ApiResponse>("https://jilali21-batotabot.hf.space/rag", formData);

      // Supprimer le message de loading et ajouter la réponse
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => msg.id !== loadingMsg.id);
        const assistantMsg: Message = {
          id: Date.now() + 1,
          role: "assistant",
          text: res.data.answer || null,
          images: res.data.images || [],
          audio_url: res.data.audio_url || null,
          raw: res.data,
          timestamp: new Date().toISOString(),
        };
        return [...withoutLoading, assistantMsg];
      });
      
    } catch (error) {
      console.error("Erreur API:", error);
      
      // Supprimer le message de loading et ajouter l'erreur
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => msg.id !== loadingMsg.id);
        const axiosError = error as AxiosError;
        const errorMsg: ApiError = {
          message: axiosError.message,
          details: axiosError.response?.data
        };

        const assistantMsg: Message = {
          id: Date.now() + 1,
          role: "assistant",
          text: null,
          error: errorMsg,
          timestamp: new Date().toISOString(),
        };
        return [...withoutLoading, assistantMsg];
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[url('@/assets/flag_maroc.png')] bg-cover bg-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group flex items-center justify-center"
        title="Assistant IA"
      >
        <div className="absolute -bottom-1.5 left-1/5 transform -translate-x-4 -rotate-90 -translate-y-2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent border-t-red-700 group-hover:border-t-red-700 transition-colors drop-shadow-md"></div>
      </button>

      {/* Overlay et sidebar */}
      <div className={`fixed inset-0 z-[100] flex transition-all duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="fixed inset-0 bg-black/10 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
        
        <div className={`relative z-10 ml-auto w-full max-w-sm h-[70vh] max-h-[600px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
             style={{ marginTop: '15vh', marginRight: '1rem', borderRadius: '1rem' }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-red-700 p-4 text-white flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[url('@/assets/flag_maroc.png')] bg-cover bg-center rounded-full flex items-center justify-center" />
              <div>
                <h3 className="font-semibold">BATTUTA BOT</h3>
                <p className="text-xs opacity-90">En ligne</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Bouton pour changer le background */}
              <button
                onClick={changeBackground}
                className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                title="Changer le fond"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </button>
              
              
              
              {/* Bouton pour reset la conversation (affiché seulement s'il y a des messages) */}
              {messages.length > 0 && (
                <button
                  onClick={resetConversation}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                  title="Nouvelle conversation"
                >
                  <Trash2 size={16} />
                </button>
              )}
              
              {/* Bouton fermer */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages avec scroll automatique et masqué */}
          <div 
            ref={chatRef}
            className="flex-1 p-4 overflow-y-auto bg-cover bg-center transition-all duration-1000 ease-in-out relative scrollbar-hide"
            style={{ 
              backgroundImage: `url(${backgrounds[currentBackground]})`,
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
          >
            <style>{`
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-b-2xl" />
            
            <div className="relative z-10 h-full">
              {messages.length === 0 ? (
                <div className="text-center text-white mt-8 drop-shadow-lg">
                  <MessageCircle size={48} className="mx-auto mb-2 opacity-80" />
                  <p className="font-medium">Bonjour ! Je suis BATTUTA BOT.</p>
                  <p className="text-sm opacity-90">Comment puis-je vous aider ?</p>
                  <p className="text-xs opacity-80 mt-2">Essayez notre <span className="font-semibold">Assistant IA de Voyage</span> pour planifier votre séjour !</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={message.id || index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 transition-all duration-200 backdrop-blur-sm ${
                          message.role === "user"
                            ? "bg-blue-600/90 text-white rounded-br-none border border-blue-400/30"
                            : message.role === "loading" 
                            ? "bg-transparent text-gray-300/90 rounded-bl-none border border-gray-400/30 italic"
                            : "bg-gray-200/80 text-gray-800 rounded-bl-none border border-gray-300/30"
                        }`}
                      >
                        {message.role === "loading" ? (
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span>{message.text}</span>
                          </div>
                        ) : (
                          <>
                            {message.text && <div>{message.text}</div>}
                            {message.error && (
                              <div className="text-red-600 text-sm">
                                Erreur: {message.error.message}
                              </div>
                            )}
                            {message.images && message.images.length > 0 && (
                              <div className="mt-2 grid grid-cols-2 gap-2">
                                {message.images.map((url, i) => (
                                  <img 
                                    key={i} 
                                    src={url} 
                                    alt={`image-${i}`} 
                                    className="w-full rounded cursor-pointer" 
                                    onClick={() => window.open(url, "_blank")} 
                                  />
                                ))}
                              </div>
                            )}
                            {message.audio_url && (
                              <div className="mt-2">
                                <audio 
                                  controls 
                                  src={message.audio_url.startsWith("http") ? message.audio_url : `https://jilali21-batotabot.hf.space${message.audio_url}`} 
                                  className="w-full" 
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Element invisible pour le scroll automatique */}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={loading ? "Chargement..." : "Tapez votre message..."}
                disabled={loading}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-60"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors duration-200 hover:scale-105 disabled:opacity-60"
                disabled={loading}
                title={loading ? "Chargement..." : "Envoyer"}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;