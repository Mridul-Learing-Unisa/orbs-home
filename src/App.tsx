import { Backdrop } from './components/Backdrop';
import { Categories } from './components/Categories';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { ScenesSection } from './components/ScenesSection';
import { TermsPage } from './components/pages/TermsPage';
import { useHashRoute } from './hooks/useHashRoute';
import { HomeProvider } from './state/HomeProvider';

export default function App() {
  const page = useHashRoute();

  return (
    <HomeProvider>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <ScenesSection />
        <Categories />
        <Contact />
      </main>
      <Footer />
      <TermsPage open={page === 'terms'} />
    </HomeProvider>
  );
}
