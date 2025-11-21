import { useAuthContext } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import NavCnx from "@/components/NavCnx";
import NavArtisan from "@/components/NavArtisan";
import NavProprietaire from "@/components/NavProprietaire";
import NavGuide from "@/components/NavGuide";

const NavigationRouter = () => {
  const { user } = useAuthContext();

  // ❌ Non connecté → NavBar général
  if (!user) return <Navigation />;

  // ✔️ Connecté → Nav selon rôle
  switch (user.role) {
    case "ROLE_TOURISTE":
      return <NavCnx />;
    case "ROLE_ARTISAN":
      return <NavArtisan />;
    case "ROLE_GUIDE":
      return <NavGuide />;
    case "ROLE_PROPRIETAIRE":
      return <NavProprietaire />;
    default:
      return <Navigation />;  // sécurité
  }
};

export default NavigationRouter;
