import { Compass, Mail, MapPin, Phone } from "lucide-react";
import ChatBot from "./ChatBot"; // Importe le ChatBot

const Footer = () => {
  return (
    <>
      <footer className="bg-muted/50 border-t border-border py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Battuta Bot
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Votre compagnon IA pour explorer le Maroc de manière authentique et durable.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="/" className="footer-link">Accueil</a></li>
                <li><a href="/culture" className="footer-link">Culture</a></li>
                <li><a href="/ecodefis" className="footer-link">ÉcoDéfis</a></li>
                <li><a href="/about" className="footer-link">À propos</a></li>
                <li><a href="/contact" className="footer-link">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Légal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="footer-link">Mentions légales</a></li>
                <li><a href="#" className="footer-link">Confidentialité</a></li>
                <li><a href="#" className="footer-link">CGU</a></li>
                <li><a href="#" className="footer-link">Cookies</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">contact@battutabot.ma</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">+212 5XX-XXXXXX</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Kénitra, Maroc</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              © 2025 Battuta Bot. Tous droits réservés. Fait avec ❤️ au Maroc.
            </p>
          </div>
        </div>
      </footer>

      {/* ChatBot - sera présent sur toutes les pages où le Footer est utilisé */}
      <ChatBot />
    </>
  );
};

export default Footer;