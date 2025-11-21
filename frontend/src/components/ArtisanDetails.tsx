import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Star, Clock, Euro } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import Footer from './Footer';
import Navigation from './Navigation';

const ArtisanDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { artisan } = location.state || {};

  if (!artisan) {
    return (
      <div className="min-h-screen bg-transparent">
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Artisan non trouvé</h1>
          <button 
            onClick={() => navigate('/culture')}
            className="text-primary hover:text-primary/80"
          >
            Retour à la liste
          </button>
        </div>
      </div>
      <Footer />
      </div>
      
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
    <Navigation />
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/culture')}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux artisans</span>
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* En-tête artisan */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl overflow-hidden shadow-glow">
                {artisan.utilisateur ? (
                  artisan.utilisateur.avatar ? (
                    <img 
                      src={artisan.utilisateur.avatar} 
                      alt={`${artisan.utilisateur.prenom} ${artisan.utilisateur.nom}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span>
                      {artisan.utilisateur.prenom.charAt(0)}
                      {artisan.utilisateur.nom.charAt(0)}
                    </span>
                  )
                ) : (
                  <span>🎨</span>
                )}
              </div>
              {artisan.labelEco && (
                <div className="absolute -bottom-2 -right-2 bg-secondary rounded-full p-2 shadow-lg">
                  <Star className="w-4 h-4 text-white" fill="white" />
                </div>
              )}
            </div>

            {/* Informations principales */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {artisan.utilisateur ? 
                  `${artisan.utilisateur.prenom} ${artisan.utilisateur.nom}` : 
                  'Artisan'
                }
              </h1>
              <p className="text-xl text-primary font-semibold mb-4">{artisan.typeArtisanat}</p>
              
              <div className="flex items-center gap-6 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{artisan.adresseAtelier}</span>
                </div>
                {artisan.visiteAtelier && artisan.prixVisite && (
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4" />
                    <span className="font-semibold text-foreground">{artisan.prixVisite} €</span>
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {artisan.visiteAtelier && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                    🎨 Visite d'atelier disponible
                  </span>
                )}
                {artisan.labelEco && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary border border-secondary/20">
                    🌱 Éco-responsable
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description complète */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {artisan.description}
              </p>
            </div>

            {/* Produits complets */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Produits et créations</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {artisan.produits}
              </p>
            </div>

            {/* Pratiques écologiques */}
            {artisan.pratiquesEco && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                  <span className="mr-3">♻️</span>
                  Pratiques écologiques
                </h2>
                <p className="text-secondary/90 leading-relaxed text-lg">
                  {artisan.pratiquesEco}
                </p>
              </div>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Contact */}
            {artisan.utilisateur && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Contact</h3>
                <div className="space-y-3">
                  {artisan.utilisateur.telephone && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-lg">{artisan.utilisateur.telephone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-lg">{artisan.utilisateur.email}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Informations visite */}
            {artisan.visiteAtelier && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Visite d'atelier</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Prix par personne</span>
                    <span className="text-2xl font-bold text-primary">{artisan.prixVisite} €</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Réservez votre visite pour découvrir les secrets de fabrication et rencontrer l'artisan.
                  </p>
                </div>
              </div>
            )}

            {/* Localisation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Localisation</h3>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-lg">{artisan.adresseAtelier}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ArtisanDetails;