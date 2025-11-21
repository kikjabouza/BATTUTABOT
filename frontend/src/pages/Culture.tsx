import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Play, BookOpen, Music, Utensils, Palette, Award, ExternalLink, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ArtisansList from '@/components/ArtisansList';
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
    image: madrassaImage,
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

const Culture = () => {
  const navigate = useNavigate();

  // Filtrer les cultures par type
  const artisanatItems = cultures.filter(item => item.type === "artisanat");
  const architectureItems = cultures.filter(item => item.type === "architecture");
  const gastronomieItems = cultures.filter(item => item.type === "gastronomie");

  const handleCardClick = (id: number) => {
    navigate(`/culture/${id}`);
  };

  const renderCultureCard = (item: typeof cultures[0]) => (
    <Card 
      key={item.id} 
      className="p-6 space-y-4 hover:border-primary/30 transition-all cursor-pointer group"
      onClick={() => handleCardClick(item.id)}
    >
      {/* Image avec gestion d'erreur améliorée */}
      <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center overflow-hidden relative">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <Palette className="w-12 h-12 text-primary" />
        )}
        
        {/* Badge 360° */}
        {item.vue === "360°" && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            360°
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-foreground">{item.titre}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            item.vue === "360°" 
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}>
            {item.vue}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.description}
        </p>

        {item.artisnat_name && (
          <p className="text-xs text-primary font-medium">
            Artisan: {item.artisnat_name}
          </p>
        )}

        {/* Bouton selon le type de vue */}
        <div className="flex justify-between items-center pt-2">
          <Button 
            className={`${
              item.vue === "360°" 
                ? "hero-button" 
                : "bg-gray-600 hover:bg-gray-700"
            } transition-all`}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick(item.id);
            }}
          >
            {item.vue === "360°" ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Visite {item.vue}
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                Voir détails
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderFeteCard = (fete: typeof fetesNationales[0]) => (
    <Card key={fete.id} className="p-6 space-y-4 group">
      <div className="w-full h-48 rounded-lg overflow-hidden relative">
        <img 
          src={fete.image} 
          alt={fete.titre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {fete.vue === "360°" && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            360°
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-foreground">{fete.titre}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            fete.type === "religieuse" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
          }`}>
            {fete.type}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm">{fete.description}</p>
        <p className="text-primary font-medium text-sm">📅 {fete.date}</p>

        <Button 
          className={fete.vue === "360°" ? "hero-button" : "bg-gray-600 hover:bg-gray-700"}
          onClick={() => fete.vue === "360°" && navigate(`/culture/fete-${fete.id}`)}
        >
          {fete.vue === "360°" ? (
            <>
              <Play className="mr-2 h-4 w-4" />
              Visite {fete.vue}
            </>
          ) : (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              <span onClick={()=> {
                  return window.open(fete.lien ? fete.lien : "", "_blank");
                }}>En savoir plus</span>
            </>
          )}
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-transparent">
      <NavigationRouter />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Patrimoine & Culture du Maroc
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explorez la richesse culturelle millénaire du royaume chérifien
            </p>
          </div>

          <Tabs defaultValue="artisanat" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2">
              <TabsTrigger value="artisanat" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Artisanat ({artisanatItems.length})
              </TabsTrigger>
              <TabsTrigger value="architecture" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Architecture ({architectureItems.length})
              </TabsTrigger>
              <TabsTrigger value="gastronomie" className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                Gastronomie ({gastronomieItems.length})
              </TabsTrigger>
              <TabsTrigger value="musique" className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                Musique
              </TabsTrigger>
              <TabsTrigger value="traditions" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Traditions
              </TabsTrigger>
            </TabsList>

            {/* Artisanat Tab */}
            <TabsContent value="artisanat" className="space-y-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Nos Artisanats Marocains
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artisanatItems.map(renderCultureCard)}
              </div>    
              <section className="py-0 bg-transparent">
                <ArtisansList />
              </section>  
            </TabsContent>

            {/* Architecture Tab */}
            <TabsContent value="architecture" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {architectureItems.map(renderCultureCard)}
              </div>
            </TabsContent>

            {/* Gastronomie Tab */}
            <TabsContent value="gastronomie" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gastronomieItems.map(renderCultureCard)}
              </div>
            </TabsContent>

            {/* Musique Tab */}
            <TabsContent value="musique" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Musique Marocaine
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Découvrez la richesse musicale du Maroc à travers ses genres traditionnels et modernes
                </p>
              </div>

              <div className="space-y-8">
                {categoriesMusique.map((categorie) => (
                  <Card key={categorie.id} className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-4 h-12 ${categorie.couleur} rounded-full`}></div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{categorie.nom}</h3>
                        <p className="text-muted-foreground">{categorie.description}</p>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {categorie.audios.map((audio, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-4">
                            <Music className="w-5 h-5 text-primary" />
                            <div>
                              <h4 className="font-semibold text-foreground">{audio.titre}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                audio.popularite === 'trending' 
                                  ? 'bg-red-100 text-red-800'
                                  : audio.popularite === 'popular'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {audio.popularite === 'trending' ? '🔥 Trending' : 
                                 audio.popularite === 'popular' ? '⭐ Populaire' : '🆕 Nouveau'}
                              </span>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="hero-button"
                            onClick={() => window.open(audio.url, '_blank')}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Écouter
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Traditions Tab */}
            <TabsContent value="traditions" className="space-y-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Traditions & Coutumes Marocaines
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Découvrez les fêtes, occasions et coutumes qui rythment la vie au Maroc
                </p>
              </div>

              {/* Fêtes Nationales */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Fêtes Nationales & Religieuses</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fetesNationales.map(renderFeteCard)}
                </div>
              </section>

              {/* Occasions Marocaines */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Occasions & Cérémonies</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {occasionsMarocaines.map((occasion) => (
                    <Card key={occasion.id} className="p-6 space-y-4 group">
                      <div className="w-full h-48 rounded-lg overflow-hidden relative">
                        <img 
                          src={occasion.image} 
                          alt={occasion.titre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {occasion.vue === "360°" && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            360°
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-foreground">{occasion.titre}</h3>
                        <p className="text-muted-foreground text-sm">{occasion.description}</p>
                        <div className="flex justify-between text-sm text-primary">
                          <span>⏱️ {occasion.duree}</span>
                          <span>📍 {occasion.region}</span>
                        </div>

                        <Button 
                          className={occasion.vue === "360°" ? "hero-button" : "bg-gray-600 hover:bg-gray-700"}
                          onClick={() => occasion.vue === "360°" && navigate(`/culture/occasion-${occasion.id}`)}
                        >
                          {occasion.vue === "360°" ? (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Visite {occasion.vue}
                            </>
                          ) : (
                            <>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Découvrir
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Coutumes & Traditions */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Coutumes & Traditions</h3>
                </div>
                <div className="grid gap-4">
                  {coutumesTraditions.map((tradition) => (
                    <Card key={tradition.id} className="p-6 hover:border-primary/30 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          <h4 className="text-lg font-semibold text-foreground">{tradition.titre}</h4>
                          <p className="text-muted-foreground">{tradition.description}</p>
                          <div className="flex gap-4 text-sm">
                            <span className="text-primary">📍 {tradition.region}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              tradition.importance === 'Très importante' 
                                ? 'bg-red-100 text-red-800'
                                : tradition.importance === 'Importante'
                                ? 'bg-orange-100 text-orange-800'
                                : tradition.importance === 'Fondamentale'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {tradition.importance}
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(tradition.article, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Lire
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Culture;