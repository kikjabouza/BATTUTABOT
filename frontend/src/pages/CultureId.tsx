// pages/CultureDetail.tsx
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NavigationRouter from "@/components/NavigationRouter";

// Import des images depuis src/assets/
import artisanPotterySafi from '@/assets/artisan-pottery-safi.jpg';
import artisanZelligeFes from '@/assets/artisan-zellige-fes.webp';
import couscous from '@/assets/couscous.webp';
import kasbahOudayas from '@/assets/Kasbah-Udayas-Rabat.jpg';
import fantasia from '@/assets/Tbourida-Fantasia-in-Morocco-MAwebzine.jpg';
import babMansour from '@/assets/bab-mansour-gate.jpg';
import caftan from '@/assets/1_5b369908-cfdb-496f-816a-95450bdeca9e.jpg';
import gnaoua from '@/assets/19131936lpw-19131959-article-jpg_6354925_660x287.webp';
import argan from '@/assets/xargan-1.jpg.pagespeed.ic_.koS95lpq-1.webp';
import jemaaElFna from '@/assets/istockphoto-475057992-612x612.jpg';
import chebakia from '@/assets/recette-chebakia-patisserie-orientale-perle-doree-e1742378327148-500x350.webp';
import tannerie from '@/assets/images.jpeg';
import madrassaImage from '@/assets/madrassa-bou-inania.jpeg';
// Import des images pour les traditions
import aidAlAdha from '@/assets/86840689-61707207.jpg';
import aidAlFitr from '@/assets/72325997-50341972.jpg';
import feteTrone from '@/assets/fete-du-trone-.jpeg';
import feteJeunesse from '@/assets/F4C3Tk1XcAAxqZp.jpg';
import mariageMarocain from '@/assets/43_8a8a9370-fdc9-470f-9400-c9ec61157602.webp';
import circoncision from '@/assets/circonsision.jpg';
import henna from '@/assets/84719443-60476695.jpg';
import ramadan from '@/assets/RAMADAN-web-fr.webp';
import { Item } from "@radix-ui/react-select";


// Table de données des cultures AVEC IMPORT DES IMAGES
const cultures = [
  {
    id: 1,
    titre: "Poterie de Safi",
    description: "Art céramique ancestral transmis de génération en génération",
    type: "artisanat",
    vue: "2D",
    autres_infos: "Technique unique de glaçure et cuisson",
    artisant_id: null,
    artisnat_name: null,
    image: artisanPotterySafi
  },
  {
    id: 4,
    titre: "Zellige de Fès",
    description: "Mosaïques géométriques uniques au monde",
    type: "artisanat",
    vue: "360°",
    autres_infos: "Patrimoine UNESCO, techniques séculaires",
    artisant_id: "1",
    artisnat_name: "Mohamed Salah",
    image: artisanZelligeFes,
    sketchfabEmbed: "https://sketchfab.com/models/771d8e1689604905b0e321cc41fe29d4/embed"
  },
  {
    id: 5,
    titre: "Couscous Royal",
    description: "Plat de fête aux multiples saveurs et textures",
    type: "gastronomie", 
    vue: "360°",
    autres_infos: "Préparation traditionnelle à la vapeur",
    artisant_id: "2",
    artisnat_name: "Fatima Zahra",
    image: couscous,
    sketchfabEmbed: "https://sketchfab.com/models/c6be2a348c18468ea359ac8e0c2e0d10/embed"
  },
  {
    id: 6,
    titre: "Kasbah des Oudayas",
    description: "Forteresse historique avec vue sur l'océan",
    type: "architecture",
    vue: "360°",
    autres_infos: "Architecture militaire et résidentielle",
    artisant_id: "3",
    artisnat_name: "Ahmed Benali",
    image: kasbahOudayas,
    sketchfabEmbed: "https://sketchfab.com/models/27c6aba6f5194ac597dbb534b0e06f4f/embed"
  },
  {
    id: 8,
    titre: "Fantasia Tbourida",
    description: "Spectacle équestre traditionnel célébrant l'art de la poudre",
    type: "culture",
    vue: "2D",
    autres_infos: "Classée patrimoine immatériel de l'UNESCO",
    artisant_id: "7",
    artisnat_name: "Youssef El Baroudi",
    image: fantasia
  },
  {
    id: 12,
    titre: "Bab Mansour",
    description: "Monument historique de Meknès, célèbre pour ses arcs sculptés",
    type: "architecture",
    vue: "2D",
    autres_infos: "Construit sous Moulay Ismaïl",
    artisant_id: null,
    artisnat_name: null,
    image: babMansour
  },
  {
    id: 13,
    titre: "Caftan Marocain",
    description: "Habit traditionnel porté lors des cérémonies",
    type: "artisanat",
    vue: "360°",
    autres_infos: "Broderie à la main et travail de maâlem",
    artisant_id: "10",
    artisnat_name: "Khadija El Mernissi",
    image: caftan,
    sketchfabEmbed: "https://sketchfab.com/models/aa2bbe88363c49778328068960d65c6f/embed"
  },
  {
    id: 14,
    titre: "Gnaoua d'Essaouira",
    description: "Musique spirituelle afro-marocaine avec guembri et qraqeb",
    type: "culture",
    vue: "2D",
    autres_infos: "Festival Gnaoua mondialement connu",
    artisant_id: "11",
    artisnat_name: "Maâlem Hamid",
    image: gnaoua
  },
  {
    id: 15,
    titre: "Argan du Souss",
    description: "Huile naturelle produite dans le sud marocain",
    type: "artisanat",
    vue: "2D",
    autres_infos: "Produit par des coopératives féminines",
    artisant_id: "12",
    artisnat_name: "Coopérative Tifawin",
    image: argan
  },
  {
    id: 16,
    titre: "Place Jemaa el-Fna",
    description: "Cœur vibrant de Marrakech avec spectacles et souks",
    type: "culture",
    vue: "360°",
    autres_infos: "Patrimoine immatériel de l'humanité",
    artisant_id: null,
    artisnat_name: null,
    image: jemaaElFna,
    sketchfabEmbed: "https://sketchfab.com/models/b70c5c9ad1ab4ebfab108e02b5e165be/embed"
  },
  {
    id: 18,
    titre: "Chebakia",
    description: "Pâtisserie en forme de fleur, très prisée pendant Ramadan",
    type: "gastronomie",
    vue: "2D",
    autres_infos: "Mélange de miel, sésame et fleur d'oranger",
    artisant_id: "14",
    artisnat_name: "Amina Chbakiya",
    image: chebakia
  },
  {
    id: 19,
    titre: "Tannerie Adouar, Marrakech",
    description: "Tannerie traditionnelle utilisant des techniques ancestrales de tannage végétal",
    type: "artisanat",
    vue: "360°",
    autres_infos: "Techniques de tannage naturel transmises depuis des générations",
    artisant_id: null,
    artisnat_name: null,
    image: tannerie,
    sketchfabEmbed: "https://sketchfab.com/models/0bc346d861294384ac9ba3262bc295f1/embed"
  },
  {
  id: 20,
  titre: "Madrassa Bou Inania - Fès",
  description: "École coranique historique du 14ème siècle, joyau de l'architecture mérinide",
  type: "architecture",
  vue: "360°", 
  autres_infos: "Fondée en 1350-1355 par le sultan mérinide Abou Inan Faris. Chef-d'œuvre de l'art hispano-mauresque.",
  artisant_id: null,
  artisnat_name: null,
  image: madrassaImage, // Utilisation de l'import
  sketchfabEmbed: "https://sketchfab.com/models/77e4281f57ed44e9b54ba1be55379c1d/embed"
}
];
// Données pour la musique
const categoriesMusique = [
  {
    id: 1,
    nom: "Musique Gnaoua",
    description: "Musique spirituelle et rythmée aux origines subsahariennes",
    couleur: "bg-purple-500",
    audios: [
      {
        titre: "Gnaoua Legacy - Maâlem Mahmoud Guinia",
        url: "https://open.spotify.com/search/Gnaoua%20Legacy%20-%20Ma%C3%A2lem%20Mahmoud%20Guinia",
        popularite: "trending"
      },
      {
        titre: "Bambara - Fusion Gnaoua",
        url: "https://open.spotify.com/search/Bambara%20-%20Fusion%20Gnaoua",
        popularite: "popular"
      }
    ]
  },
  {
    id: 2,
    nom: "Chaâbi Marocain",
    description: "Musique populaire joyeuse et festive",
    couleur: "bg-yellow-500",
    audios: [
      {
        titre: "Chaâbi Fusion 2024",
        url: "https://open.spotify.com/search/Cha%C3%A2bi%20Fusion%202024",
        popularite: "trending"
      },
      {
        titre: "Nass El Ghiwane - Classic",
        url: "https://open.spotify.com/search/Nass%20El%20Ghiwane%20-%20Classic",
        popularite: "popular"
      },
      {
        titre: "Modern Chaâbi Hits",
        url: "https://open.spotify.com/search/Modern%20Cha%C3%A2bi%20Hits",
        popularite: "new"
      }
    ]
  },
  {
    id: 3,
    nom: "Musique Andalouse",
    description: "Héritage musical raffiné de l'Andalousie",
    couleur: "bg-blue-500",
    audios: [
      {
        titre: "Nouba Al Istihlal",
        url: "https://open.spotify.com/intl-fr/track/0EOmp74MYQ9kNlh4JdfSmQ",
        popularite: "trending"
      },
      {
        titre: "Andaloussiyat - Ensemble de Fès",
        url: "https://open.spotify.com/search/Andaloussiyat%20-%20Ensemble%20de%20F%C3%A8s",
        popularite: "popular"
      },
      {
        titre: "Lama Bada",
        url: "https://open.spotify.com/intl-fr/track/5t80t4CJ88zbxwqi8bXbR4",
        popularite: "popular"
      }
    ]
  },
  {
    id: 4,
    nom: "Ahidous & Ahwach",
    description: "Musique et danse collective berbère",
    couleur: "bg-green-500",
    audios: [
      {
        titre: "Ahidous de l'Atlas",
        url: "https://open.spotify.com/search/Ahidous%20de%20l'Atlas",
        popularite: "trending"
      },
      {
        titre: "Rythmes Amazighs",
        url: "https://open.spotify.com/intl-fr/track/7KEPjtwcTp5jdP4lf8BikY",
        popularite: "popular"
      },
      {
        titre: "Ahwach Traditionnel",
        url: "https://open.spotify.com/search/Ahwach%20Traditionnel",
        popularite: "new"
      }
    ]
  },
  {
    id: 5,
    nom: "Rai Marocain",
    description: "Musique populaire moderne et engagée",
    couleur: "bg-red-500",
    audios: [
      {
        titre: "Rai 2024 - Nouveaux Talents",
        url: "https://open.spotify.com/search/Rai%202024%20-%20Nouveaux%20Talents",
        popularite: "trending"
      },
      {
        titre: "Cheb Khaled - Best Of",
        url: "https://open.spotify.com/search/Cheb%20Khaled%20-%20Best%20Of",
        popularite: "popular"
      },
      {
        titre: "Rai Fusion Mix",
        url: "https://open.spotify.com/search/Rai%20Fusion%20Mix",
        popularite: "new"
      }
    ]
  }
];

// Données pour les traditions
const fetesNationales = [
  {
    id: 1,
    titre: "Aïd Al Adha",
    description: "Fête du sacrifice, célébration religieuse importante",
    date: "10 Dhul Hijja",
    type: "religieuse",
    image: aidAlAdha,
    vue: "2D",
    lien:"https://www.lemonde.fr/afrique/article/2025/06/05/au-maroc-une-fete-de-l-aid-sans-sacrifice-de-mouton_6610642_3212.html"
  },
  {
    id: 2,
    titre: "Aïd Al Fitr",
    description: "Fête de rupture du jeûne, marquant la fin du Ramadan",
    date: "1 Shawwal",
    type: "religieuse",
    image: aidAlFitr,
    vue: "2D",
    lien: "https://medias24.com/2025/03/15/voici-la-date-de-aid-al-fitr-2025-au-maroc-selon-le-calcul-astronomique/"
  },
  {
    id: 3,
    titre: "Fête du Trône",
    description: "Célébration de l'anniversaire du Roi du Maroc",
    date: "30 Juillet",
    type: "nationale",
    image: feteTrone,
    vue: "360°",
    sketchfabEmbed: "https://sketchfab.com/models/a2d9e41e7da642d9a7165b6a680e9586/embed"
  },
  {
    id: 4,
    titre: "Fête de la Jeunesse",
    description: "Célébration de la jeunesse marocaine",
    date: "21 Août",
    type: "nationale",
    image: feteJeunesse,
    vue: "2D"
  }
];

const occasionsMarocaines = [
  {
    id: 1,
    titre: "Mariage Traditionnel",
    description: "Cérémonie de mariage avec ses rituels et traditions",
    duree: "3-7 jours",
    region: "Tout le Maroc",
    image: mariageMarocain,
    vue: "360°",
    sketchfabEmbed: "https://sketchfab.com/models/bbe1d83bf89f476fab8ce0c9403d8178/embed"
  },
  {
    id: 2,
    titre: "Cérémonie de Circoncision",
    description: "Célébration traditionnelle de la circoncision",
    duree: "1 jour",
    region: "Tout le Maroc",
    image: circoncision,
    vue: "2D"
  },
  {
    id: 3,
    titre: "Cérémonie du Henné",
    description: "Rituel du henné avant le mariage",
    duree: "1 soirée",
    region: "Tout le Maroc",
    image: henna,
    vue: "2D"
  },
  {
    id: 4,
    titre: "Mois de Ramadan",
    description: "Mois sacré de jeûne et de spiritualité",
    duree: "1 mois",
    region: "Tout le Maroc",
    image: ramadan,
    vue: "2D"
  }
];

const coutumesTraditions = [
  {
    id: 1,
    titre: "L'Art du Thé à la Menthe",
    description: "Cérémonie traditionnelle de préparation et service du thé",
    region: "Tout le Maroc",
    article: "https://www.maroc.ma/fr/the-marocain",
    importance: "Très importante"
  },
  {
    id: 2,
    titre: "Hammam Traditionnel",
    description: "Rituel de bien-être et de purification sociale",
    region: "Tout le Maroc",
    article: "https://www.maroc.ma/fr/hammam-traditionnel",
    importance: "Importante"
  },
  {
    id: 3,
    titre: "Hospitalité Marocaine",
    description: "Culture d'accueil et de générosité envers les invités",
    region: "Tout le Maroc",
    article: "https://www.maroc.ma/fr/hospitalite-marocaine",
    importance: "Fondamentale"
  },
  {
    id: 4,
    titre: "Art de la Negafa",
    description: "Traditions vestimentaires et préparation de la mariée",
    region: "Villes impériales",
    article: "https://www.maroc.ma/fr/negafa-tradition",
    importance: "Culturelle"
  },
  {
    id: 5,
    titre: "Moussems et Pèlerinages",
    description: "Célébrations religieuses et culturelles locales",
    region: "Diverses régions",
    article: "https://www.maroc.ma/fr/moussems-maroc",
    importance: "Religieuse"
  }
];
// Composant Sketchfab Viewer
const SketchfabViewer = ({ embedUrl }: { embedUrl: string }) => {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={embedUrl}
        title="Sketchfab 3D Viewer"
        className="w-full h-full border-0"
        allow="autoplay; fullscreen; vr; accelerometer; gyroscope; xr"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const CultureDetail = () => {
  const { id } = useParams();
  const culture = cultures.find(item => item.id === Number(id));

  if (!culture) {
    return (
      <div className="min-h-screen bg-transparent">
        <NavigationRouter />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Culture non trouvée</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <NavigationRouter />
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Media Section */}
            <div className="space-y-6">
              {culture.vue === "360°" && culture.sketchfabEmbed ? (
                <div className="space-y-4">
                  <SketchfabViewer embedUrl={culture.sketchfabEmbed} />
                  <div className="text-center text-sm text-muted-foreground">
                    <p>🖱️ Utilisez votre souris pour naviguer dans la vue 3D</p>
                    <p>🔍 Zoom avec la molette • 🎥 Rotation en cliquant-glissant</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <img 
                    src={culture.image} 
                    alt={culture.titre}
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                  />
                  <div className="text-center text-sm text-muted-foreground">
                    Vue en 2D
                  </div>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    culture.vue === "360°" 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}>
                    {culture.vue}
                  </span>
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {culture.type}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold text-foreground">{culture.titre}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {culture.description}
                </p>
              </div>

              {/* Informations supplémentaires */}
              <div className="space-y-6">
                {culture.artisnat_name && (
                  <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                    <h3 className="font-semibold text-foreground mb-2 text-lg">👨‍🎨 Artisan</h3>
                    <p className="text-primary font-medium">{culture.artisnat_name}</p>
                  </div>
                )}

                {culture.autres_infos && (
                  <div className="bg-muted/50 p-6 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-3 text-lg">Informations détaillées</h3>
                    <p className="text-muted-foreground leading-relaxed">{culture.autres_infos}</p>
                  </div>
                )}

                {culture.vue === "360°" && (
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2 text-lg">Contrôles 3D</h3>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• <strong>Clic gauche + glisser</strong> : Rotation de la vue</li>
                      <li>• <strong>Clic droit + glisser</strong> : Déplacement</li>
                      <li>• <strong>Molette</strong> : Zoom avant/arrière</li>
                      <li>• <strong>Touche Shift</strong> : Accélération</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CultureDetail;