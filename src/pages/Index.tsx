import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import UserTypeSelector from "@/components/UserTypeSelector";
import CultureShowcase from "@/components/CultureShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <UserTypeSelector />
      <CultureShowcase />
      <Footer />
    </div>
  );
};

export default Index;
