import { Button } from "@/components/ui/button";
import { Menu, Compass } from "lucide-react";
import { useState } from "react";

const NavCnx = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[url('assets/background.svg')] bg-cover bg-center backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3" onClick={() => window.location.replace('/dashboard')} style={{cursor: "pointer"}}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Battuta Bot
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/dashboard" className="nav-link">Home</a>
            <a href="/culture" className="nav-link">Culture</a>
            <a href="/services" className="nav-link">Services</a>
            <a href="/ecodefis" className="nav-link" style={{color: "green"}}>ÉcoDéfis</a>
            <a href="/communaute" className="nav-link">Communauté</a>
            <a href="/events" className="nav-link">Events</a>
            <a href="/contact" className="nav-link">Contact</a>
            <a href="/urgence" className="nav-link" style={{color: "red"}}>Urgence</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Version SVG plus précise */}
             <button 
  onClick={() => window.location.replace('/plan-voyage')}
  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors group"
  title="Assistant de voyage IA - Planifiez votre séjour"
>
  <div className="relative">
    {/* Icône IA moderne */}
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className="group-hover:scale-110 transition-transform"
    >
      {/* Cerveau/IA */}
      <path 
        d="M12 2C8.13 2 5 5.13 5 9c0 1.66.67 3.16 1.75 4.25L6 14l2 2 1.25-1.25C10.84 16.33 12.34 17 14 17c3.87 0 7-3.13 7-7s-3.13-7-7-7z" 
        fill="#3B82F6"
      />
      {/* Points de données */}
      <circle cx="9" cy="9" r="1" fill="white"/>
      <circle cx="12" cy="12" r="1" fill="white"/>
      <circle cx="15" cy="9" r="1" fill="white"/>
      {/* Ondes */}
      <path 
        d="M5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z" 
        fill="#60A5FA"
      />
    </svg>
    
    {/* Badge IA animé */}
    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white"></div>
  </div>
  
  <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
    Assistant IA
  </span>
</button>
            <Button variant="ghost" className="nav-link" onClick={() => window.location.href = '/logout'}>
              Déconnexion
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border animate-fade-in">
            <a href="/" className="block py-2 nav-link">Accueil</a>
            <a href="/services" className="block py-2 nav-link">Services</a>
            <a href="/ecodefis" className="block py-2 nav-link" style={{color: "green"}}>ÉcoDéfis</a>
            <a href="/communaute" className="block py-2 nav-link">Communauté</a>
            <a href="/events" className="block py-2 nav-link">Events</a>
            <a href="/contact" className="block py-2 nav-link">Contact</a>
            <a href="/urgence" className="block py-2 nav-link" style={{color: "red"}}>Urgence</a>
            <div className="flex flex-col gap-2 pt-4">
              {/* Version SVG plus précise */}
              <button 
  onClick={() => window.location.replace('/plan-voyage')}
  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors group"
  title="Assistant de voyage IA - Planifiez votre séjour"
>
  <div className="relative">
    {/* Icône IA moderne */}
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className="group-hover:scale-110 transition-transform"
    >
      {/* Cerveau/IA */}
      <path 
        d="M12 2C8.13 2 5 5.13 5 9c0 1.66.67 3.16 1.75 4.25L6 14l2 2 1.25-1.25C10.84 16.33 12.34 17 14 17c3.87 0 7-3.13 7-7s-3.13-7-7-7z" 
        fill="#3B82F6"
      />
      {/* Points de données */}
      <circle cx="9" cy="9" r="1" fill="white"/>
      <circle cx="12" cy="12" r="1" fill="white"/>
      <circle cx="15" cy="9" r="1" fill="white"/>
      {/* Ondes */}
      <path 
        d="M5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z" 
        fill="#60A5FA"
      />
    </svg>
    
    {/* Badge IA animé */}
    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white"></div>
  </div>
  
  <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
    Assistant IA
  </span>
</button>
              <Button variant="ghost" className="w-full" onClick={() => window.location.href = '/logout'}>Déconnexion</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavCnx;