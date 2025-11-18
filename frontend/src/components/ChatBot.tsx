import { useState, useEffect } from "react";
import { X, MessageCircle, Send } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentBackground, setCurrentBackground] = useState(0);

  // Liste des backgrounds disponibles
  const backgrounds = [
    '/src/assets/nature.jpg',
    '/src/assets/zellige-marocain-closeup.webp',
    '/src/assets/ecodefi_zelig.jpg',
    '/src/assets/bleu-marocain.webp',
    '/src/assets/nature-adventure-02.jpg',
    '/src/assets/Maroc.jpeg.1920x0_q85_format-jpg.jpg',
    '/src/assets/nador-maroc.webp',
    '/src/assets/kasbah-des-Oudayas-a-Rabat.jpg'
  ];

  // Changer le background automatiquement toutes les 4 secondes
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 4000); // Change toutes les 4 secondes

    return () => clearInterval(interval);
  }, [isOpen, backgrounds.length]);

  // Changer le background manuellement
  const changeBackground = () => {
    setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Ajouter le message de l'utilisateur
    setMessages([...messages, { text: inputMessage, isUser: true }]);
    setInputMessage("");

    // Simuler une réponse de l'IA (à remplacer par ton IA)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          text: "Je suis votre assistant BATTUTA BOT d'IA. Comment puis-je vous aider ?", 
          isUser: false 
        }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[url('assets/flag_maroc.png')] bg-cover bg-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group flex items-center justify-center"
        title="Assistant IA"
      >
        {/* Triangle de messagerie avec effet de bulle */}
        <div className="absolute -bottom-1.5 left-1/5 transform -translate-x-4 -rotate-90 -translate-y-2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent border-t-red-700 group-hover:border-t-red-700 transition-colors drop-shadow-md"></div>
      </button>

      {/* Sidebar de chat avec animations */}
      <div className={`fixed inset-0 z-[100] flex transition-all duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/10 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Sidebar avec animation de slide */}
        <div className={`relative z-10 ml-auto w-full max-w-sm h-[70vh] max-h-[600px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
             style={{ marginTop: '15vh', marginRight: '1rem', borderRadius: '1rem' }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-red-700 p-4 text-white flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[url('assets/flag_maroc.png')] bg-cover bg-center rounded-full flex items-center justify-center">
              </div>
              <div>
                <h3 className="font-semibold">BATTUTA BOT</h3>
                <p className="text-xs opacity-90">En ligne</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Bouton pour changer le background manuellement */}
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
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages avec background dynamique */}
          <div 
            className="flex-1 p-4 overflow-y-auto bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{ 
              backgroundImage: `url(${backgrounds[currentBackground]})`,
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
          >
            {/* Overlay pour meilleure lisibilité */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-b-2xl"></div>
            
            <div className="relative z-10">
              {messages.length === 0 ? (
                <div className="text-center text-white color-white mt-8 drop-shadow-lg">
                  <MessageCircle size={48} className="mx-auto mb-2 opacity-80" />
                  <p className="font-medium">Bonjour ! Je suis BATTUTA BOT.</p>
                  <p className="text-sm opacity-90">Comment puis-je vous aider ?</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 transition-all duration-200 backdrop-blur-sm ${
                          message.isUser
                            ? "bg-blue-600/90 text-white rounded-br-none border border-blue-400/30"
                            : "bg-gray-200/90 text-gray-800 rounded-bl-none border border-gray-300/30"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
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
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Tapez votre message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors duration-200 hover:scale-105"
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