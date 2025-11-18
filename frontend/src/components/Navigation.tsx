import { Button } from "@/components/ui/button";
import { Menu, Compass } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[url('assets/background.svg')] bg-cover bg-center backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Battuta Bot
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="nav-link">Accueil</a>
            <a href="/culture" className="nav-link">Culture</a>
            <a href="/ecodefis" className="nav-link" style={{color: "green"}}>ÉcoDéfis</a>
            <a href="/about" className="nav-link">À propos</a>
            <a href="/contact" className="nav-link">Contact</a>
            <a href="/urgence" className="nav-link" style={{color: "red"}}>Urgence</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Version SVG plus précise */}
              <button 
                onClick={() => window.open('https://www.google.com/maps/place/Maroc/', '_blank')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors group"
                title="Découvrir le Maroc"
              >
                <svg 
                  width="25" 
                  height="20" 
                  viewBox="0 0 25 20" 
                  className="group-hover:scale-110 transition-transform"
                >
                  {/* Fond rouge */}
                  <rect width="24" height="16" fill="#C1272D"/>
                  {/* Étoile verte */}
                  <path 
                    d="M12,4.5 L13.4,8.5 L17.5,8.5 L14.1,11 L15.5,15 L12,12.5 L8.5,15 L9.9,11 L6.5,8.5 L10.6,8.5 Z" 
                    fill="#006233"
                  />
                </svg>
              </button>
            <Button variant="ghost" className="nav-link" onClick={() => window.location.href = '/dashboard'}>
              Connexion
            </Button>
            <Button className="hero-button" onClick={() => window.location.href = '/inscription'}>
              S'inscrire
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
            <a href="/culture" className="block py-2 nav-link">Culture</a>
            <a href="/ecodefis" className="block py-2 nav-link" style={{color: "green"}}>ÉcoDéfis</a>
            <a href="/about" className="block py-2 nav-link">À propos</a>
            <a href="/contact" className="block py-2 nav-link">Contact</a>
            <a href="/urgence" className="block py-2 nav-link" style={{color: "red"}}>Urgence</a>
            <div className="flex flex-col gap-2 pt-4">
              {/* Version SVG plus précise */}
              <button 
              onClick={() => window.open('https://www.google.com/maps/place/Maroc/', '_blank')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors group"
              title="Découvrir le Maroc"
            >
              <svg 
                width="25" 
                height="20" 
                viewBox="0 0 25 20" 
                className="group-hover:scale-110 transition-transform"
              >
                {/* Fond rouge */}
                <rect width="24" height="16" fill="#C1272D"/>
                {/* Étoile verte */}
                <path
    d="M12 4.5 L13.6 8.5 L17.5 8.5 L14.2 10.9 L15.5 15 L12 12.6 L8.5 15 L9.8 10.9 L6.5 8.5 L10.4 8.5 Z"
    fill="#006233"
  />
              </svg>
            </button>
              <Button variant="ghost" className="w-full" onClick={() => window.location.href = '/dashboard'}>Connexion</Button>
              <Button className="w-full hero-button" onClick={() => window.location.href = '/inscription'}>S'inscrire</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;