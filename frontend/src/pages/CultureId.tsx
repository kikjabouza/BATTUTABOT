// pages/CultureDetail.tsx
import { useParams } from 'react-router-dom';
import ThreeSixtyViewer from '@/components/360Viewer.tsx';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
const cultures = [
  {
    id: 1,
    titre: "Poterie de Safi",
    description: "Art céramique ancestral transmis de génération en génération",
    type: "artisanat",
    points: 50,
    valeurCible: 7,
    vue: "2D",
    autres_infos: "Technique unique de glaçure et cuisson",
    artisant_id: null,
    artisnat_name: null,
    image: "assets/artisan-pottery-safi.jpg"
  },
  {
    id: 2,
    titre: "Tajine Marocain",
    description: "Plat traditionnel mijoté aux épices et saveurs uniques",
    type: "gastronomie",
    points: 30,
    valeurCible: 5,
    vue: "2D",
    autres_infos: "Cuisson lente qui préserve les nutriments",
    artisant_id: null,
    artisnat_name: null,
    image: "assets/moroccan-cuisine.jpg"
  },
  {
    id: 3,
    titre: "Mosquée Hassan II",
    description: "Joyau architectural avec le plus haut minaret du monde",
    type: "architecture",
    points: 75,
    valeurCible: 10,
    vue: "2D",
    autres_infos: "Mélange d'architecture traditionnelle et moderne",
    artisant_id: null,
    artisnat_name: null,
    image: "assets/moroccan-riad.jpg"// pour ces images + images de baground sur design , pas besoin d'import , puisque il accede deja a react et cherche l image non hasher et deja on doit comencer chemin par assets car sur symfony c dans public , alors qu'on copy directement sans hash vers public du backend
  },
  {
    id: 4,
    titre: "Zellige de Fès",
    description: "Mosaïques géométriques uniques au monde",
    type: "artisanat",
    points: 60,
    valeurCible: 8,
    vue: "360°",
    autres_infos: "Patrimoine UNESCO, techniques séculaires",
    artisant_id: "1",
    artisnat_name: "Mohamed Salah"
  },
  {
    id: 5,
    titre: "Couscous Royal",
    description: "Plat de fête aux multiples saveurs et textures",
    type: "gastronomie",
    points: 40,
    valeurCible: 6,
    vue: "360°",
    autres_infos: "Préparation traditionnelle à la vapeur",
    artisant_id: "2",
    artisnat_name: "Fatima Zahra"
  },
  {
    id: 6,
    titre: "Kasbah des Oudayas",
    description: "Forteresse historique avec vue sur l'océan",
    type: "architecture",
    points: 55,
    valeurCible: 7,
    vue: "360°",
    autres_infos: "Architecture militaire et résidentielle",
    artisant_id: "3",
    artisnat_name: "Ahmed Benali"
  }
];

const CultureDetail = () => {
  const { id } = useParams();
  const culture = cultures.find(item => item.id === Number(id));

  if (!culture) {
    return <div>Culture non trouvée</div>;
  }

  // Simuler des images 360° (à remplacer par vos vraies images)
  const images360 = Array.from({ length: 24 }, (_, i) => 
    `/assets/360/${culture.titre.toLowerCase().replace(/ /g, '-')}/frame-${i + 1}.jpg`
  );

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Media Section */}
            <div className="space-y-4">
              {culture.vue === "360°" ? (
                <ThreeSixtyViewer 
                  images={images360} 
                  alt={culture.titre}
                />
              ) : (
                <img 
                  src={culture.image} 
                  alt={culture.titre}
                  className="w-full h-96 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  culture.vue === "360°" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {culture.vue}
                </span>
                <h1 className="text-4xl font-bold mt-4">{culture.titre}</h1>
                <p className="text-muted-foreground mt-2">{culture.description}</p>
              </div>

              {culture.artisnat_name && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-semibold">Artisan</h3>
                  <p>{culture.artisnat_name}</p>
                </div>
              )}

              {culture.autres_infos && (
                <div>
                  <h3 className="font-semibold">Informations supplémentaires</h3>
                  <p className="text-muted-foreground">{culture.autres_infos}</p>
                </div>
              )}

              {culture.points && (
                <div className="bg-accent/10 p-4 rounded-lg">
                  <h3 className="font-semibold">Points</h3>
                  <p className="text-2xl font-bold text-accent">{culture.points} pts</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CultureDetail;