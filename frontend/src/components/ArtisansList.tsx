import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter, Phone, Mail, Map, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Interfaces TypeScript strictes
interface Utilisateur {
  id: number;
  prenom: string;
  nom: string;
  avatar: string | null;
  telephone: string | null;
  email: string;
  date_naissance: string | null;
  langue_preferee: string | null;
  besoins_accessibilite: string | null;
  date_creation: string;
  est_actif: boolean;
}

interface ArtisanData {
  id: number;
  typeArtisanat: string;
  adresseAtelier: string;
  latitude: number | null;
  longitude: number | null;
  description: string;
  produits: string;
  pratiquesEco: string | null;
  visiteAtelier: boolean;
  prixVisite: string;
  labelEco: string | null;
  idUtilisateur: number | null;
}

interface Artisan {
  id: number;
  typeArtisanat: string;
  adresseAtelier: string;
  description: string;
  produits: string;
  pratiquesEco: string | null;
  visiteAtelier: boolean;
  prixVisite: string;
  labelEco: string | null;
  utilisateur: Utilisateur | null;
}

interface ApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    limit: number;
  };
}

interface Filters {
  typeArtisanat: string;
  visiteAtelier: boolean;
  labelEco: boolean;
}

const ArtisansList: React.FC = () => {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    typeArtisanat: '',
    visiteAtelier: false,
    labelEco: false
  });

  const navigate = useNavigate();

  // Récupérer tous les artisans
  const fetchArtisans = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/artisans');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data: ApiResponse<ArtisanData[]> = await response.json();
      
      // Enrichir avec les données utilisateur
      const artisansWithUserData: Artisan[] = await Promise.all(
        data.data.map(async (artisan: ArtisanData): Promise<Artisan> => {
          if (artisan.idUtilisateur) {
            try {
              const userResponse = await fetch(`http://localhost:8000/api/utilisateurs/${artisan.idUtilisateur}`);
              
              if (!userResponse.ok) {
                throw new Error(`Erreur utilisateur: ${userResponse.status}`);
              }
              
              const userData: ApiResponse<Utilisateur> = await userResponse.json();
              return {
                ...artisan,
                utilisateur: userData.utilisateur
              };
            } catch (error) {
              console.error('Erreur récupération utilisateur:', error);
              return {
                ...artisan,
                utilisateur: null
              };
            }
          }
          return {
            ...artisan,
            utilisateur: null
          };
        })
      );
      
      setArtisans(artisansWithUserData);
    } catch (error) {
      console.error('Erreur récupération artisans:', error);
      setArtisans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtisans();
  }, []);

  // Fonction pour naviguer vers la page de détails
  const handleViewDetails = (artisan: Artisan): void => {
    navigate(`/artisan/${artisan.id}`, { state: { artisan } });
  };

  // Recherche et filtrage
  const filteredArtisans = artisans.filter((artisan: Artisan): boolean => {
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = 
      artisan.typeArtisanat.toLowerCase().includes(searchLower) ||
      artisan.adresseAtelier.toLowerCase().includes(searchLower) ||
      (artisan.utilisateur?.prenom.toLowerCase().includes(searchLower) ?? false) ||
      (artisan.utilisateur?.nom.toLowerCase().includes(searchLower) ?? false);

    const matchesType = !filters.typeArtisanat || artisan.typeArtisanat === filters.typeArtisanat;
    const matchesVisite = !filters.visiteAtelier || artisan.visiteAtelier;
    const matchesLabel = !filters.labelEco || (artisan.labelEco !== null && artisan.labelEco !== '');

    return matchesSearch && matchesType && matchesVisite && matchesLabel;
  });

  // Types d'artisanat uniques pour le filtre
  const artisanTypes: string[] = [...new Set(artisans.map((a: Artisan) => a.typeArtisanat))];

  const handleResetFilters = (): void => {
    setSearchTerm('');
    setFilters({ typeArtisanat: '', visiteAtelier: false, labelEco: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-0">
      
      {/* Barre de recherche et filtres */}
      <div className="culture-card rounded-xl p-6 mb-8 bg-[url('assets/lartisanatbg.jpg')] bg-cover bg-center">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Barre de recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, spécialité, adresse..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent backdrop-blur-sm transition-colors"
            />
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filters.typeArtisanat}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                setFilters(prev => ({ ...prev, typeArtisanat: e.target.value }))
              }
              className="px-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-ring backdrop-blur-sm transition-colors"
            >
              <option value="">Tous les types</option>
              {artisanTypes.map((type: string) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <label className="flex items-center space-x-2 bg-muted px-4 py-3 rounded-xl cursor-pointer hover-lift transition-all">
              <input
                type="checkbox"
                checked={filters.visiteAtelier}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFilters(prev => ({ ...prev, visiteAtelier: e.target.checked }))
                }
                className="rounded text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">Visite d'atelier</span>
            </label>

            <label className="flex items-center space-x-2 bg-muted px-4 py-3 rounded-xl cursor-pointer hover-lift transition-all">
              <input
                type="checkbox"
                checked={filters.labelEco}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setFilters(prev => ({ ...prev, labelEco: e.target.checked }))
                }
                className="rounded text-secondary focus:ring-secondary"
              />
              <span className="text-sm text-foreground">Éco-responsable</span>
            </label>
          </div>
        </div>
      </div>

      {/* Résultats */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Statistiques */}
          <div className="mb-6 text-sm text-muted-foreground">
            {filteredArtisans.length} artisan(s) trouvé(s)
          </div>

          {/* Grille des artisans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtisans.map((artisan: Artisan) => (
              <ArtisanCard 
                key={artisan.id} 
                artisan={artisan} 
                onViewDetails={() => handleViewDetails(artisan)}
              />
            ))}
          </div>

          {filteredArtisans.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Aucun artisan trouvé</p>
              <button 
                onClick={handleResetFilters}
                className="mt-4 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Composant Carte Artisan
interface ArtisanCardProps {
  artisan: Artisan;
  onViewDetails: () => void;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan, onViewDetails }) => {
  const getInitials = (prenom: string, nom: string): string => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  };

  // Fonction pour tronquer le texte
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="user-type-card rounded-xl overflow-hidden transition-all duration-300 hover-lift">
      {/* Avatar et informations principales */}
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden shadow-glow">
              {artisan.utilisateur ? (
                artisan.utilisateur.avatar ? (
                  <img 
                    src={artisan.utilisateur.avatar} 
                    alt={`${artisan.utilisateur.prenom} ${artisan.utilisateur.nom}`}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-white">{getInitials(artisan.utilisateur.prenom, artisan.utilisateur.nom)}</span>
                )
              ) : (
                <span className="text-white">🎨</span>
              )}
            </div>
            {artisan.labelEco && artisan.labelEco !== '' && (
              <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1 shadow-sm">
                <Star className="w-3 h-3 text-white" fill="white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {artisan.utilisateur ? 
                `${artisan.utilisateur.prenom} ${artisan.utilisateur.nom}` : 
                'Artisan'
              }
            </h3>
            <p className="text-primary font-medium truncate">{artisan.typeArtisanat}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{truncateText(artisan.adresseAtelier, 25)}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {truncateText(artisan.description, 120)}
          </p>
        </div>

        {/* Produits */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Produits :</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {truncateText(artisan.produits, 80)}
          </p>
        </div>

        {/* Pratiques écologiques */}
        {artisan.pratiquesEco && artisan.pratiquesEco !== '' && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-secondary mb-1 flex items-center">
              <span className="mr-2">♻️</span>
              Pratiques écologiques
            </h4>
            <p className="text-sm text-secondary/90 leading-relaxed">
              {truncateText(artisan.pratiquesEco, 60)}
            </p>
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {artisan.visiteAtelier && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              🎨 Visite d'atelier
            </span>
          )}
          {artisan.labelEco && artisan.labelEco !== '' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
              🌱 Éco-responsable
            </span>
          )}
        </div>

        {/* Prix visite */}
        {artisan.visiteAtelier && artisan.prixVisite && (
          <div className="flex justify-between items-center mb-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
            <span className="text-sm text-foreground">Prix visite :</span>
            <span className="text-lg font-bold text-primary">{artisan.prixVisite} €</span>
          </div>
        )}

        {/* Lien Voir plus de détails */}
        <button
          onClick={onViewDetails}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-xl transition-all duration-300 hover:gap-3 group"
        >
          <span className="font-medium text-sm">Voir plus de détails</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ArtisansList;