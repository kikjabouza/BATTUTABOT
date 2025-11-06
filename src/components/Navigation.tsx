import { Button } from "@/components/ui/button";
import { Menu, Compass } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
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
            <a href="/communaute" className="nav-link">Communauté</a>
            <a href="/about" className="nav-link">À propos</a>
            <a href="/contact" className="nav-link">Contact</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
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
            <a href="/communaute" className="block py-2 nav-link">Communauté</a>
            <a href="/about" className="block py-2 nav-link">À propos</a>
            <a href="/contact" className="block py-2 nav-link">Contact</a>
            <div className="flex flex-col gap-2 pt-4">
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