import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import NavCnx from "@/components/NavCnx";
import NavArtisan from "@/components/NavArtisan";
import NavProprietaire from "@/components/NavProprietaire";
import NavGuide from "@/components/NavGuide";
import Footer from "@/components/Footer";
import { Target, Users, Leaf, Award, Sparkles } from "lucide-react";
import NavigationRouter from "@/components/NavigationRouter";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Notre Mission",
      description: "Révolutionner le tourisme marocain en combinant IA et authenticité culturelle"
    },
    {
      icon: Leaf,
      title: "Éco-Responsable",
      description: "Promouvoir un tourisme durable et respectueux de l'environnement"
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Connecter voyageurs, artisans, guides et propriétaires locaux"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Offrir une expérience de voyage exceptionnelle et personnalisée"
    }
  ];

  const team = [
    { name: "Jallam Salma", role: "Chef Projet", speciality: "Big Data" },
    { name: "Jazouli Khadija", role: "Collaboratrice", speciality: "Big Data" },
    { name: "EL Hamidi Jillali", role: "Collaborateur", speciality: "Intelligence Artificielle" },
    { name: "Joyce Fortuna", role: "Collaboratrice", speciality: "Big Data" }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <NavigationRouter />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">À Propos de Battuta Bot</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Redéfinir le Voyage au Maroc
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Battuta Bot est né d'une vision : utiliser l'intelligence artificielle pour offrir 
              à chaque voyageur une expérience authentique, durable et inoubliable au cœur du patrimoine marocain.
            </p>
          </div>

          {/* Story Section */}
          <Card className="p-8 md:p-12 mb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
            <h2 className="text-3xl font-bold text-foreground mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Inspiré par le célèbre explorateur Ibn Battuta, notre plateforme porte le nom de celui qui a 
                parcouru le monde au 14ème siècle, découvrant cultures et merveilles.
              </p>
              <p>
                En 2025, nous avons décidé de réinventer le tourisme marocain en créant un compagnon IA intelligent 
                qui guide, conseille et enrichit l'expérience de chaque voyageur, tout en préservant l'authenticité 
                culturelle et en promouvant le développement durable.
              </p>
              <p>
                Aujourd'hui, Battuta Bot connecte lesvoyageurs avec des artisans locaux, des guides 
                passionnés et des hébergements éco-responsables à travers tout le Maroc.
              </p>
            </div>
          </Card>

          {/* Values Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="p-6 space-y-4 text-center hover:border-primary/30 transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Notre Équipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="p-6 space-y-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                    <span className="text-2xl text-white font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{member.name}</h4>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{member.speciality}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <Card className="p-8 md:p-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">
              Notre Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "50K+", label: "Voyageurs" },
                { number: "500+", label: "Artisans Partenaires" },
                { number: "200+", label: "Guides Certifiés" },
                { number: "95%", label: "Satisfaction" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;