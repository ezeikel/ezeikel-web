import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import TechStackSection from '@/components/home/TechStackSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import ShortFormSection from '@/components/home/ShortFormSection';
import LatestContentSection from '@/components/home/LatestContentSection';
import StatsSnapshot from '@/components/home/StatsSnapshot';
import JourneySection from '@/components/home/JourneySection';
import CurrentlyPlayingSection from '@/components/home/CurrentlyPlayingSection';
import BlogTeaser from '@/components/home/BlogTeaser';
import ShopTeaser from '@/components/home/ShopTeaser';
import NewsletterSection from '@/components/home/NewsletterSection';

const HomePage = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      <HeroSection />
      <TechStackSection />
      <FeaturedProjectsSection />
      <ShortFormSection />
      <LatestContentSection />
      <StatsSnapshot />
      <JourneySection />
      <CurrentlyPlayingSection />
      <BlogTeaser />
      <ShopTeaser />
      <NewsletterSection />
    </main>
    <Footer />
  </div>
);

export default HomePage;
