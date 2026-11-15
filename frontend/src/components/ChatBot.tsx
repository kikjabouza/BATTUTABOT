import { useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import { X, MessageCircle, Send, Trash2, Mic, Headphones, Image as ImageIcon } from "lucide-react";

// Import des images
import nature from "@/assets/nature.jpg";
import zellige from "@/assets/zellige-marocain-closeup.webp";
import ecodefi from "@/assets/ecodefi_zelig.jpg"; 
import bleu from "@/assets/bleu-marocain.webp";
import nature2 from "@/assets/nature-adventure-02.jpg";
import maroc from "@/assets/Maroc.jpeg.1920x0_q85_format-jpg.jpg";
import nador from "@/assets/nador-maroc.webp";
import kasbah from "@/assets/kasbah-des-Oudayas-a-Rabat.jpg";
import NavigationRouter from "@/components/NavigationRouter";


// ✅ Types
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
  // ✅ Historique
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
  
  // ✅ Audio
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const backgrounds = [nature, zellige, ecodefi, bleu, nature2, maroc, nador, kasbah];

  // ✅ Réponses par défaut
  const defaultResponses: { [key: string]: string } = {
    "bonjour": "Bonjour ! Je suis BATTUTA BOT, votre guide virtuel pour découvrir le Maroc. Comment puis-je vous aider aujourd'hui ? 🇲🇦",
    "salut": "Salut ! Ravie de vous rencontrer. Je suis BATTUTA BOT. Quelle est votre question ?",
    "hello": "Hello ! Welcome to Morocco! I'm BATTUTA BOT. How can I assist you today?",
    "merci": "Je vous en prie ! N'hésitez pas si vous avez d'autres questions sur le Maroc. 😊",
    "au revoir": "Au revoir ! À bientôt pour de nouvelles découvertes marocaines. 🇲🇦",
    "ça va": "Tout va bien de mon côté ! 😊 Prêt à explorer le Maroc avec vous."
  };

  const getDefaultResponse = (question: string): string | null => {
    const cleanQuestion = question.toLowerCase().trim();
    for (const [key, response] of Object.entries(defaultResponses)) {
      if (cleanQuestion.includes(key)) return response;
    }
    return null;
  };

  const resetConversation = () => {
    setMessages([]);
    localStorage.removeItem("rag_chat_history");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen, backgrounds.length]);

  useEffect(() => {
    const messagesToSave = messages.filter(msg => msg.role !== "loading");
    try { localStorage.setItem("rag_chat_history", JSON.stringify(messagesToSave)); } catch (e) {}
  }, [messages]);

  const changeBackground = () => {
    setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
  };

  // ==========================================
  // 🎤 LOGIQUE AUDIO
  // ==========================================

  const handleSendAudio = async (file: File) => {
    if (!file || loading) return;
    setLoading(true);

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: "🎤 Message vocal envoyé",
      timestamp: new Date().toISOString(),
    };
    
    const loadingMsg: Message = {
      id: Date.now() + 0.5,
      role: "loading",
      text: "Analyse audio...",
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMsg, loadingMsg]);

    try {
      const formData = new FormData();
      formData.append("user_id", "user001");
      formData.append("audio_file", file);

      const res = await axios.post<ApiResponse>("https://jilali21-batotabot.hf.space/audio", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

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
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => msg.id !== loadingMsg.id);
        const axiosError = error as AxiosError;
        return [...withoutLoading, {
          id: Date.now() + 1, role: "assistant", text: null,
          error: { message: axiosError.message, details: axiosError.response?.data },
          timestamp: new Date().toISOString(),
        }];
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleRecording = async () => {
    if (recording) {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];
        mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const file = new File([audioBlob], `recording_${Date.now()}.webm`, { type: "audio/webm" });
          await handleSendAudio(file);
          stream.getTracks().forEach(track => track.stop());
        };
        mediaRecorder.start();
        setRecording(true);
      } catch (err) { alert("Impossible d'accéder au microphone."); }
    }
  };

  // ==========================================
  // 📨 LOGIQUE TEXTE
  // ==========================================

  const handleSendMessage = async () => {
    const question = inputMessage.trim();
    if (!question || loading) return;

    setLoading(true);

    const userMsg: Message = {
      id: Date.now(), role: "user", text: question, timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");

    const defaultResponse = getDefaultResponse(question);
    if (defaultResponse) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1, role: "assistant", text: defaultResponse, timestamp: new Date().toISOString(),
        }]);
        setLoading(false);
      }, 500);
      return;
    }

    const loadingMsg: Message = {
      id: Date.now() + 0.5, role: "loading", text: "BATTUTA BOT réfléchit...", timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, loadingMsg]);

    try {
      const formData = new FormData();
      formData.append("user_id", "user001");
      formData.append("question", question);

      const res = await axios.post<ApiResponse>("https://jilali21-batotabot.hf.space/rag", formData);

      setMessages(prev => {
        const withoutLoading = prev.filter(msg => msg.id !== loadingMsg.id);
        return [...withoutLoading, {
          id: Date.now() + 1, role: "assistant",
          text: res.data.answer || null,
          images: res.data.images || [],
          audio_url: res.data.audio_url || null,
          raw: res.data, timestamp: new Date().toISOString(),
        }];
      });
      
    } catch (error) {
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => msg.id !== loadingMsg.id);
        const axiosError = error as AxiosError;
        return [...withoutLoading, {
          id: Date.now() + 1, role: "assistant", text: null,
          error: { message: axiosError.message, details: axiosError.response?.data },
          timestamp: new Date().toISOString(),
        }];
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
              
              {/* BOUTON IA VOYAGE (Réintégré) */}
              

              <button onClick={changeBackground} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <ImageIcon size={18} />
              </button>
              {messages.length > 0 && (
                <button onClick={resetConversation} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <Trash2 size={18} />
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Zone */}
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
              .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
              .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
            
            <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-b-2xl" />
            
            <div className="relative z-10 h-full">
              {messages.length === 0 ? (
                <div className="text-center text-white mt-8 drop-shadow-lg animate-in fade-in duration-500">
                  <MessageCircle size={48} className="mx-auto mb-2 opacity-80" />
                  <p className="font-medium">Bonjour ! Je suis BATTUTA BOT.</p>
                  <p className="text-sm opacity-90">Posez-moi une question sur le Maroc !</p>
                  <p className="text-xs opacity-80 mt-2">Cliquez sur <span className="font-semibold">IA Voyage</span> pour planifier votre séjour.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => {
                    const isUser = message.role === "user";
                    const isLoading = message.role === "loading";

                    return (
                      <div
                        key={message.id || index}
                        className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex flex-col max-w-[85%] rounded-2xl p-3 shadow-sm backdrop-blur-sm transition-all duration-200 ${
                            isUser
                              ? "bg-blue-600/90 text-white rounded-br-none border border-blue-400/30"
                              : isLoading
                              ? "bg-white/50 text-gray-600 rounded-bl-none italic border border-white/40"
                              : "bg-gray-100/95 text-gray-800 rounded-bl-none border border-gray-200"
                          }`}
                        >
                          {/* 1. Le Texte */}
                          {message.text && (
                            <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                              {isLoading && <span className="inline-block w-2 h-2 bg-current rounded-full animate-bounce mr-1"/>}
                              {message.text}
                            </div>
                          )}

                          {/* 2. Les Erreurs */}
                          {message.error && (
                            <div className="text-red-600 text-xs mt-1 bg-red-50 p-1.5 rounded">
                              ⚠️ {message.error.message}
                            </div>
                          )}

                          {/* 3. La Galerie d'Images (Grille) */}
                          {message.images && message.images.length > 0 && (
                            <div className={`grid gap-1 mt-2 overflow-hidden rounded-xl ${
                              message.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                            }`}>
                              {message.images.map((url, i) => (
                                <div key={i} className="relative aspect-square cursor-pointer group overflow-hidden bg-gray-200" onClick={() => window.open(url, "_blank")}>
                                  <img 
                                    src={url} 
                                    alt="illustration" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* 4. Le Lecteur Audio (Note Vocale) */}
                          {message.audio_url && (
                            <div className={`mt-2 flex items-center gap-2 p-2 rounded-xl ${isUser ? 'bg-blue-700/50' : 'bg-white border border-gray-200'}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-white/20' : 'bg-green-100 text-green-600'}`}>
                                <Headphones size={16} />
                              </div>
                              <audio 
                                controls 
                                src={message.audio_url.startsWith("http") ? message.audio_url : `https://jilali21-batotabot.hf.space${message.audio_url}`} 
                                className="h-8 w-full min-w-[180px]" 
                              />
                            </div>
                          )}
                          
                          {/* Timestamp */}
                          {!isLoading && (
                            <span className={`text-[10px] mt-1 self-end ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
                              {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2 items-end">
              <button
                onClick={toggleRecording}
                className={`rounded-full p-3 transition-all duration-200 flex-shrink-0 ${
                  recording 
                  ? "bg-red-600 text-white animate-pulse shadow-lg" 
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
                disabled={loading}
              >
                <Mic size={20} />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={recording ? "Enregistrement..." : "Votre message..."}
                disabled={loading || recording}
                className="flex-1 border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
              />

              <button
                onClick={handleSendMessage}
                className={`rounded-full p-3 transition-all duration-200 flex-shrink-0 ${
                    inputMessage.trim() 
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-md hover:scale-105" 
                    : "bg-gray-200 text-gray-400"
                }`}
                disabled={loading || (!inputMessage.trim() && !recording)}
              >
                <Send size={20} className={inputMessage.trim() ? "ml-0.5" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;