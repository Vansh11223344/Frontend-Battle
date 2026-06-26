import { useEffect, useRef } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoFeatures from './components/BentoFeatures';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import { CTASection, Footer } from './components/Footer';

function PageLoader() {
  return (
    <div className="page-loader" id="page-loader" aria-label="Loading" role="status">
      <div className="loader-ring" />
    </div>
  );
}

export default function App() {
  const loaderRef = useRef(null);

  useEffect(() => {
    // Dismiss loader within 500ms constraint
    const loader = document.getElementById('page-loader');
    if (loader) {
      const t = setTimeout(() => {
        loader.classList.add('hidden');
      }, 400);
      return () => clearTimeout(t);
    }
  }, []);

  // Intersection Observer for scroll-triggered fade-up animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    // Observe all fade-up elements that aren't in the hero (hero handles its own)
    const elements = document.querySelectorAll('section:not(#hero) .fade-up, section:not(#hero) .fade-in');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageLoader />

      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
        onFocus={e => e.target.style.left = '1rem'}
        onBlur={e => e.target.style.left = '-9999px'}
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <BentoFeatures />
        <Pricing />
        <Testimonials />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
