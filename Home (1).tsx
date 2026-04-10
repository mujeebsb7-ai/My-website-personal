import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import AIToolsSection from '@/sections/AIToolsSection';
import TrendingPromptsSection from '@/sections/TrendingPromptsSection';
import CategoriesSection from '@/sections/CategoriesSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import FeaturedCreatorsSection from '@/sections/FeaturedCreatorsSection';
import CTASection from '@/sections/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <AIToolsSection />
        <TrendingPromptsSection />
        <CategoriesSection />
        <HowItWorksSection />
        <FeaturedCreatorsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
