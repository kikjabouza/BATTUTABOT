import { Button } from "@/components/ui/button";
import { Menu, Compass } from "lucide-react";
import { useState } from "react";

const NavArtisan = () => {
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
            <a href="/profil" className="nav-link">Profil</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/culture" className="nav-link">Culture</a>
            <a href="/services" className="nav-link">Services</a>
            <a href="/events" className="nav-link">Events</a>
            <a href="/contact" className="nav-link">Contact</a>
            <a href="/urgence" className="nav-link" style={{color: "red"}}>Urgence</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
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
            <a href="/dashboard" className="nav-link">Home</a>
            <a href="/profil" className="nav-link">Profil</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/culture" className="nav-link">Culture</a>
            <a href="/services" className="nav-link">Services</a>
            <a href="/events" className="nav-link">Events</a>
            <a href="/contact" className="nav-link">Contact</a>
            <a href="/urgence" className="nav-link" style={{color: "red"}}>Urgence</a>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" className="w-full" onClick={() => window.location.href = '/logout'}>Déconnexion</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavArtisan;