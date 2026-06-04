import HeroSection from "./HeroSection";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import UploadPreview from "./UploadPreview";
import DashboardPreview from "./DashboardPreview";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <HowItWorks />
      <UploadPreview />
      <DashboardPreview />
      <Footer />
    </div>
  );
};

export default Home;