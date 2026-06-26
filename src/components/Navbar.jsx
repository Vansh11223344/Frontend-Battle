import { useState, useEffect } from 'react';
import { SearchIcon, XMarkIcon } from './Icons';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className="navbar"
        style={{ background: scrolled ? 'rgba(23,43,54,0.97)' : 'rgba(23,43,54,0.85)' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#" className="nav-logo" aria-label="NeuralFlow Home">
          NeuralFlow<span style={{ color: 'var(--saffron)' }}>.</span>
        </a>

        <ul className="nav-links" role="list">
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#testimonials">Customers</a></li>
          <li><a href="#" aria-label="Search">
            <SearchIcon size={16} color="var(--mystic)" />
          </a></li>
          <li><a href="#" className="nav-cta">Get Started</a></li>
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {['Features', 'Pricing', 'Customers', 'Docs'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, color: 'var(--arctic)', textDecoration: 'none' }}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <a href="#" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
          Get Started Free
        </a>
      </div>
    </>
  );
}
