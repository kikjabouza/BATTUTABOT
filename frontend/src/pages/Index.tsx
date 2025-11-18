import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import UserTypeSelector from "@/components/UserTypeSelector";
import CultureShowcase from "@/components/CultureShowcase";
import Footer from "@/components/Footer";
import MoroccanCelebrations from "@/components/MoroccanCelebrations";
import TransportServices from "@/components/TransportServices";
import AccommodationShowcase from "@/components/AccommodationShowcase";
import NewsArticles from "@/components/NewsArticles";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />
      <Hero />
      <UserTypeSelector />
      <CultureShowcase />
      <MoroccanCelebrations />
      <TransportServices />
      <AccommodationShowcase />
      <NewsArticles />
      <Footer />
    </div>
  );
};

export default Index;
