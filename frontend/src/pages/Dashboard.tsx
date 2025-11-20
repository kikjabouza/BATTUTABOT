import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import NavCnx from "@/components/NavCnx";
import NavArtisan from "@/components/NavArtisan";
import NavProprietaire from "@/components/NavProprietaire";
import NavGuide from "@/components/NavGuide";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useAuthContext } from '@/contexts/AuthContext'; 


import { 
  MapPin, 
  Calendar, 
  Users, 
  Home,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Leaf,
  Briefcase,
  Compass,
  Building,
  Star,
  TrendingUp
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuthContext();
  // ⭐ AJOUTEZ CE LOG pour vérifier
  console.log('👤 User dans Dashboard:', user);
  console.log('🎯 Rôle détecté:', user?.role);
  // Déterminer le composant de dashboard selon le rôle
  const renderDashboard = () => {
    switch(user?.role) {
      case 'ROLE_TOURISTE':
        return <><NavCnx /><DashboardTouriste /><Footer /></>;
      case 'ROLE_ARTISAN':
        return <><NavArtisan /><DashboardArtisan /><Footer /></>;
      case 'ROLE_GUIDE':
        return <><NavGuide /><DashboardGuide /><Footer /></>;
      case 'ROLE_PROPRIETAIRE':
        return <><NavProprietaire /><DashboardProprietaire /><Footer /></>;
      default:
        return <><NavCnx /><DashboardTouriste /><Footer /></>;
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      {renderDashboard()}
    </div>
  );
};

// Dashboard Touriste
// DashboardTouriste.tsx
const DashboardTouriste = () => {
  const { user } =  useAuthContext();
  const [defisRealises, setDefisRealises] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchDefisRealises = async () => {
      try {
        const response = await fetch('/api/realisations-defis');
        const data = await response.json();
        // Filtrer pour l'utilisateur connecté
        const mesDefis = data.filter(d => d.idUtilisateur === user.id);
        setDefisRealises(mesDefis);
        
        // Calculer les points totaux
        const totalPoints = mesDefis.reduce((sum, defi) => sum + defi.pointsGagnes, 0);
        setPoints(totalPoints);
      } catch (error) {
        console.error('Erreur chargement défis:', error);
      }
    };

    const fetchGroupes = async () => {
      try {
        const response = await fetch('/api/membres-groupe');
        const data = await response.json();
        // Filtrer les groupes où l'utilisateur est membre
        const mesGroupes = data.filter(m => m.idUtilisateur === user.id);
        setGroupes(mesGroupes);
      } catch (error) {
        console.error('Erreur chargement groupes:', error);
      }
    };

    fetchDefisRealises();
    fetchGroupes();
  }, [user]);

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Points et Score Éco */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Mes Points Éco</h2>
              <p className="text-4xl font-bold text-green-600">{points} pts</p>
              <p className="text-muted-foreground">Continue tes défis éco-responsables !</p>
            </div>
            <Leaf className="w-12 h-12 text-green-500" />
          </div>
        </Card>

        {/* Défis Réalisés */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Mes Défis Réalisés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {defisRealises.map((defi) => (
              <Card key={defi.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Défi #{defi.idDefi}</h3>
                    <p className="text-sm text-muted-foreground">
                      Progrès: {defi.progresValeur}%
                    </p>
                    {defi.estTermine && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        ✅ Terminé
                      </span>
                    )}
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    +{defi.pointsGagnes} pts
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Groupes de Voyage */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Mes Groupes de Voyage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupes.map((groupe) => (
              <Card key={groupe.id} className="p-4">
                <h3 className="font-bold">Groupe #{groupe.idGroupe}</h3>
                <p className="text-sm text-muted-foreground">
                  Rôle: {groupe.role}
                </p>
                <p className="text-sm">
                  Date d'adhésion: {new Date(groupe.dateAdhesion).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};

// Dashboard Artisan
// DashboardArtisan.tsx
const DashboardArtisan = () => {
  const { user } = useAuthContext();
  const [artisanProfile, setArtisanProfile] = useState(null);
  const [allArtisans, setAllArtisans] = useState([]);

  useEffect(() => {
    const fetchArtisanProfile = async () => {
      // Utiliser votre route pour récupérer le profil artisan de l'utilisateur connecté
      try {
        const response = await fetch(`/api/artisans?userId=${user.id}`);
        const data = await response.json();
        if (data.data) {
          setArtisanProfile(data.data[0]); // Prendre le premier artisan
        }
      } catch (error) {
        console.error('Erreur chargement profil artisan:', error);
      }
    };

    const fetchAllArtisans = async () => {
      try {
        const response = await fetch('/api/artisans');
        const data = await response.json();
        setAllArtisans(data.data || []);
      } catch (error) {
        console.error('Erreur chargement artisans:', error);
      }
    };

    fetchArtisanProfile();
    fetchAllArtisans();
  }, [user]);

  const updateArtisan = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/artisans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      if (data.message === 'Artisan updated') {
        setArtisanProfile(prev => ({...prev, ...updatedData}));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur mise à jour artisan:', error);
      return false;
    }
  };

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Profil Artisan */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Mon Atelier</h2>
          {artisanProfile && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p><strong>Type d'artisanat:</strong> {artisanProfile.typeArtisanat}</p>
                <p><strong>Adresse:</strong> {artisanProfile.adresseAtelier}</p>
                <p><strong>Description:</strong> {artisanProfile.description}</p>
                <p><strong>Produits:</strong> {artisanProfile.produits}</p>
                <p><strong>Prix visite:</strong> {artisanProfile.prixVisite} DH</p>
              </div>
              <div>
                <Button onClick={() => {/* Modal modification */}}>
                  Modifier mon atelier
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Liste des Artisans */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Artisans de la Plateforme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArtisans.map((artisan) => (
              <Card key={artisan.id} className="p-4">
                <h3 className="font-bold">{artisan.typeArtisanat}</h3>
                <p className="text-sm">{artisan.adresseAtelier}</p>
                <p className="text-sm">💰 Visite: {artisan.prixVisite} DH</p>
                {artisan.labelEco && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">🌿 Éco-responsable</span>}
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};

// Dashboard Guide
// DashboardGuide.tsx - Version complète
const DashboardGuide = () => {
  const { user } = useAuthContext();
  const [guideProfile, setGuideProfile] = useState(null);
  const [allGuides, setAllGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger le profil du guide connecté
  useEffect(() => {
    const fetchGuideProfile = async () => {
      try {
        const response = await fetch('/api/guides/my-profile');
        const data = await response.json();
        if (data.success) {
          setGuideProfile(data.guide);
        }
      } catch (error) {
        console.error('Erreur chargement profil guide:', error);
      }
    };

    const fetchAllGuides = async () => {
      try {
        const response = await fetch('/api/guides');
        const data = await response.json();
        if (data.success) {
          setAllGuides(data.guides);
        }
      } catch (error) {
        console.error('Erreur chargement guides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuideProfile();
    fetchAllGuides();
  }, []);

  const updateProfile = async (updatedData) => {
    try {
      const response = await fetch('/api/guides/my-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      if (data.success) {
        setGuideProfile(data.guide);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      return false;
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Profil Personnel */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Mon Profil Guide</h2>
          {guideProfile && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Informations Personnelles</h3>
                <p><strong>Nom:</strong> {guideProfile.utilisateur.prenom} {guideProfile.utilisateur.nom}</p>
                <p><strong>Email:</strong> {guideProfile.utilisateur.email}</p>
                <p><strong>Téléphone:</strong> {guideProfile.utilisateur.telephone}</p>
                
                <h3 className="font-semibold mt-4 mb-2">Informations Professionnelles</h3>
                <p><strong>Spécialisations:</strong> {guideProfile.specialisations}</p>
                <p><strong>Langues:</strong> {guideProfile.languesParlees}</p>
                <p><strong>Expérience:</strong> {guideProfile.experienceAnnees} ans</p>
                <p><strong>Tarif horaire:</strong> {guideProfile.tarifHoraire} DH</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Modifier le profil</h3>
                <Button onClick={() => {/* Ouvrir modal de modification */}}>
                  Modifier mes informations
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Section Liste des Guides */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Tous les Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGuides.map((guide) => (
              <Card key={guide.id} className="p-4">
                <h3 className="font-bold">{guide.utilisateur.prenom} {guide.utilisateur.nom}</h3>
                <p className="text-sm text-muted-foreground">{guide.specialisations}</p>
                <p className="text-sm">⭐ {guide.noteMoyenne}/5 ({guide.totalAvis} avis)</p>
                <p className="text-sm">💬 {guide.languesParlees}</p>
                <p className="text-sm">💰 {guide.tarifHoraire} DH/heure</p>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};

// Dashboard Propriétaire
// DashboardProprietaire.tsx
const DashboardProprietaire = () => {
  const { user } = useAuthContext();
  const [myHebergements, setMyHebergements] = useState([]);
  const [allHebergements, setAllHebergements] = useState([]);

  useEffect(() => {
    const fetchMyHebergements = async () => {
      try {
        const response = await fetch('/api/hebergements');
        const data = await response.json();
        if (data.success) {
          // Filtrer pour n'avoir que les hébergements du propriétaire connecté
          const myProperties = data.hebergements.filter(
            h => h.proprietaire?.id === user.id
          );
          setMyHebergements(myProperties);
        }
      } catch (error) {
        console.error('Erreur chargement hébergements:', error);
      }
    };

    const fetchAllHebergements = async () => {
      try {
        const response = await fetch('/api/hebergements');
        const data = await response.json();
        if (data.success) {
          setAllHebergements(data.hebergements);
        }
      } catch (error) {
        console.error('Erreur chargement hébergements:', error);
      }
    };

    fetchMyHebergements();
    fetchAllHebergements();
  }, [user]);

  const createHebergement = async (newHebergement) => {
    try {
      const response = await fetch('/api/hebergements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newHebergement,
          id_proprietaire: user.id
        })
      });
      const data = await response.json();
      if (data.success) {
        setMyHebergements(prev => [...prev, {...newHebergement, id: data.hebergement_id}]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur création hébergement:', error);
      return false;
    }
  };

  const deleteHebergement = async (id) => {
    try {
      const response = await fetch(`/api/hebergements/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setMyHebergements(prev => prev.filter(h => h.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur suppression hébergement:', error);
      return false;
    }
  };

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Mes Hébergements */}
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Mes Hébergements</h2>
            <Button onClick={() => {/* Modal création */}}>
              + Ajouter un hébergement
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myHebergements.map((hebergement) => (
              <Card key={hebergement.id} className="p-4">
                <h3 className="font-bold">{hebergement.nom}</h3>
                <p className="text-sm">{hebergement.type} - {hebergement.destination?.nom}</p>
                <p className="text-sm">💰 {hebergement.prix_nuit} DH/nuit</p>
                <p className="text-sm">👥 Capacité: {hebergement.capacite}</p>
                {hebergement.eco_certifie && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">🌿 Éco-certifié</span>}
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">Modifier</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteHebergement(hebergement.id)}>
                    Supprimer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Tous les Hébergements */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Tous les Hébergements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allHebergements.map((hebergement) => (
              <Card key={hebergement.id} className="p-4">
                <h3 className="font-bold">{hebergement.nom}</h3>
                <p className="text-sm">{hebergement.type}</p>
                <p className="text-sm">📍 {hebergement.destination?.nom}</p>
                <p className="text-sm">💰 {hebergement.prix_nuit} DH/nuit</p>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;