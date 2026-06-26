import { ChevronRightIcon, LinkSolidIcon } from './Icons';

export function CTASection() {
  return (
    <section className="cta-section" aria-label="Call to action">
      <div className="cta-box">
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--saffron)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Get Started Today
        </p>
        <h2 className="cta-title">
          Your Data Doesn't Sleep.<br />
          Neither Should Your Pipelines.
        </h2>
        <p className="cta-desc">
          Join 4,200+ engineering teams that moved to NeuralFlow and never looked back. 
          14-day free trial, no credit card required.
        </p>
        <div className="cta-actions">
          <a href="#pricing" className="btn-primary">
            Start Free Trial
            <ChevronRightIcon size={16} color="currentColor" />
          </a>
          <a href="#" className="btn-secondary">
            <LinkSolidIcon size={16} color="currentColor" />
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <a
            href="#"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--forsythia)', textDecoration: 'none' }}
            aria-label="NeuralFlow Home"
          >
            NeuralFlow<span style={{ color: 'var(--saffron)' }}>.</span>
          </a>
          <p>
            The AI-native data automation platform for teams that can't afford downtime. 
            Built by engineers, for engineers.
          </p>
        </div>

        <nav aria-label="Product links">
          <p className="footer-col-title">Product</p>
          <ul className="footer-links" role="list">
            {['Features', 'Pricing', 'Changelog', 'Roadmap', 'Status'].map(link => (
              <li key={link}><a href="#">{link}</a></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Developer links">
          <p className="footer-col-title">Developers</p>
          <ul className="footer-links" role="list">
            {['Documentation', 'API Reference', 'SDKs', 'Connectors', 'Open Source'].map(link => (
              <li key={link}><a href="#">{link}</a></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company links">
          <p className="footer-col-title">Company</p>
          <ul className="footer-links" role="list">
            {['About', 'Blog', 'Careers', 'Privacy', 'Terms'].map(link => (
              <li key={link}><a href="#">{link}</a></li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© {year} NeuralFlow Inc. All rights reserved.</p>
        <p className="footer-copy" style={{ fontFamily: 'var(--font-mono)' }}>
          Built with precision. Powered by AI.
        </p>
      </div>
    </footer>
  );
}
