import Contact from '@/components/Contact/Contact';
import Hero from '@/components/Hero/Hero';

const HomePage = () => (
  <main className="flex flex-col flex-1 p-8 gap-y-16">
    <Hero />
    <Contact />
  </main>
);

export default HomePage;
