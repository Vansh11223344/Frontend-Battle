import { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';

// ─── Icons (inlined, same as your Icons.jsx) ──────────────
import { ReactComponent as ArrowPathIconRaw } from './assets/icons/arrow-path.svg';
import { ReactComponent as ArrowTrendingUpIconRaw } from './assets/icons/arrow-trending-up.svg';
import { ReactComponent as ChartPieIconRaw } from './assets/icons/chart-pie.svg';
import { ReactComponent as ChevronDownIconRaw } from './assets/icons/chevron-down.svg';
import { ReactComponent as ChevronLeftIconRaw } from './assets/icons/chevron-left.svg';
import { ReactComponent as ChevronRightIconRaw } from './assets/icons/chevron-right.svg';
import { ReactComponent as ChevronUpSolidIconRaw } from './assets/icons/chevron-up-solid.svg';
import { ReactComponent as ChevronUpIconRaw } from './assets/icons/chevron-up.svg';
import { ReactComponent as CogIconRaw } from './assets/icons/cog-8-tooth.svg';
import { ReactComponent as CubeIconRaw } from './assets/icons/cube-16-solid.svg';
import { ReactComponent as LinkSolidIconRaw } from './assets/icons/link-solid.svg';
import { ReactComponent as LinkIconRaw } from './assets/icons/link.svg';
import { ReactComponent as SearchIconRaw } from './assets/icons/search.svg';
import { ReactComponent as XMarkIconRaw } from './assets/icons/x-mark.svg';

function normalizeIcon(RawIcon) {
  return function NormalizedIcon({ size = 20, color = 'currentColor', className = '', style = {}, ...rest }) {
    return (
      <span
        className={`icon-box ${className}`}
        style={{
          width: size,
          height: size,
          minWidth: size,
          color,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 0,
          ...style,
        }}
      >
        <RawIcon width="100%" height="100%" style={{ display: 'block' }} {...rest} />
      </span>
    );
  };
}

export const ArrowPathIcon = normalizeIcon(ArrowPathIconRaw);
export const ArrowTrendingUpIcon = normalizeIcon(ArrowTrendingUpIconRaw);
export const ChartPieIcon = normalizeIcon(ChartPieIconRaw);
export const ChevronDownIcon = normalizeIcon(ChevronDownIconRaw);
export const ChevronLeftIcon = normalizeIcon(ChevronLeftIconRaw);
export const ChevronRightIcon = normalizeIcon(ChevronRightIconRaw);
export const ChevronUpSolidIcon = normalizeIcon(ChevronUpSolidIconRaw);
export const ChevronUpIcon = normalizeIcon(ChevronUpIconRaw);
export const CogIcon = normalizeIcon(CogIconRaw);
export const CubeIcon = normalizeIcon(CubeIconRaw);
export const LinkSolidIcon = normalizeIcon(LinkSolidIconRaw);
export const LinkIcon = normalizeIcon(LinkIconRaw);
export const SearchIcon = normalizeIcon(SearchIconRaw);
export const XMarkIcon = normalizeIcon(XMarkIconRaw);

// ─── Navbar ──────────────────────────────────────────────────
function Navbar() {
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
          NeuraFlow<span style={{ color: 'var(--saffron)' }}></span>
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

// ─── Animated Counter Hook ───────────────────────────────────
function AnimatedCounter({ value, duration = 2000, prefix = '', suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    let start = null;
    let animationFrameId;
    let observer;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out quartic equation
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(easeOut * value);
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    const handleIntersection = ([entry]) => {
      if (entry.isIntersecting) {
        start = null; // Reset start time
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        // Reset to 0 when scrolled out of view to re-animate on scroll
        setCount(0);
        if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      }
    };

    if (countRef.current) {
      observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
      observer.observe(countRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  return (
    <span ref={countRef}>
      {prefix}{(count).toFixed(decimals)}{suffix}
    </span>
  );
}

// ─── Hero ────────────────────────────────────────────────────
const CODE_LINES = [
  {
    text: "const flow = NeuralFlow",
    segments: [
      { text: "const", color: "var(--forsythia)" },
      { text: " flow = NeuralFlow" }
    ]
  },
  {
    text: "  .connect('postgres://...')",
    segments: [
      { text: "  .connect(" },
      { text: "'postgres://...'", color: "var(--saffron)" },
      { text: ")" }
    ]
  },
  {
    text: "  .transform('auto')",
    segments: [
      { text: "  .transform(" },
      { text: "'auto'", color: "var(--saffron)" },
      { text: ")" }
    ]
  },
  {
    text: "  .deploy();",
    segments: [
      { text: "  .deploy();" }
    ]
  }
];

function TypedLine({ line, len, isCurrent }) {
  let charsLeft = len;
  return (
    <span className="terminal-cmd">
      {line.segments.map((seg, idx) => {
        if (charsLeft <= 0) return null;
        const visibleText = seg.text.slice(0, charsLeft);
        charsLeft -= seg.text.length;
        return (
          <span key={idx} style={seg.color ? { color: seg.color } : {}}>
            {visibleText}
          </span>
        );
      })}
      {isCurrent && <span className="terminal-cursor" />}
    </span>
  );
}

function Hero() {
  const elementsRef = useRef([]);
  const [typedLengths, setTypedLengths] = useState([0, 0, 0, 0]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      elementsRef.current.forEach((el, i) => {
        if (!el) return;
        setTimeout(() => {
          el.classList.add('visible');
        }, i * 80);
      });
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    let timer;
    let charIndex = 0;
    let lineIdx = 0;

    const typeNextChar = () => {
      if (lineIdx >= CODE_LINES.length) {
        setShowSuccess(true);
        timer = setTimeout(() => {
          setTypedLengths([0, 0, 0, 0]);
          setCurrentLineIndex(0);
          setShowSuccess(false);
          charIndex = 0;
          lineIdx = 0;
          timer = setTimeout(typeNextChar, 1000);
        }, 6000);
        return;
      }

      const fullText = CODE_LINES[lineIdx].text;
      if (charIndex < fullText.length) {
        charIndex++;
        setTypedLengths(prev => {
          const updated = [...prev];
          updated[lineIdx] = charIndex;
          return updated;
        });
        timer = setTimeout(typeNextChar, 30 + Math.random() * 20);
      } else {
        lineIdx++;
        setCurrentLineIndex(lineIdx);
        charIndex = 0;
        timer = setTimeout(typeNextChar, 400);
      }
    };

    timer = setTimeout(typeNextChar, 800);
    return () => clearTimeout(timer);
  }, []);

  const addRef = (i) => (el) => { elementsRef.current[i] = el; };

  return (
    <section className="hero" aria-label="Hero" id="hero">
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content">
        <div>
          <p className="hero-eyebrow fade-up" ref={addRef(0)}>
            AI Automation Platform
          </p>
          <h1 className="hero-title fade-up delay-100" ref={addRef(1)}>
            Data Pipelines,<br/>
            <span className="accent">Reimagined</span>{' '}
            by AI
          </h1>
          <p className="hero-subtitle fade-up delay-200" ref={addRef(2)}>
            NeuraFlow transforms raw, unstructured data into intelligent,
            self-healing pipelines. Automate what takes your team days — in minutes.
          </p>
          <div className="hero-actions fade-up delay-300" ref={addRef(3)}>
            <a href="#pricing" className="btn-primary">
              Start Free Trial
              <ChevronRightIcon size={16} color="currentColor" />
            </a>
            <a href="#features" className="btn-secondary">
              See How It Works
            </a>
          </div>
          <div className="hero-stats fade-in delay-400" ref={addRef(4)}>
            <div className="stat-item">
              <span className="stat-value">
                <AnimatedCounter value={98.7} decimals={1} suffix="%" />
              </span>
              <span className="stat-label">Pipeline uptime</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                <AnimatedCounter value={12} suffix="×" />
              </span>
              <span className="stat-label">Faster processing</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                <AnimatedCounter value={500} suffix="+" />
              </span>
              <span className="stat-label">Integrations</span>
            </div>
          </div>
        </div>

        <div className="hero-visual fade-in delay-200" ref={addRef(5)} aria-hidden="true">
          <div className="hero-card">
            <div className="terminal-header">
              <span className="terminal-dot" style={{ background: '#FF5F57' }} />
              <span className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <span className="terminal-dot" style={{ background: '#28CA41' }} />
              <span className="terminal-title">neuraflow — pipeline.js</span>
            </div>

            <div className="terminal-body" style={{ minHeight: '190px' }}>
              <div className="terminal-line">
                <span className="terminal-comment">// Initialize AI pipeline</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">›</span>
                <TypedLine line={CODE_LINES[0]} len={typedLengths[0]} isCurrent={currentLineIndex === 0} />
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">&nbsp;</span>
                <TypedLine line={CODE_LINES[1]} len={typedLengths[1]} isCurrent={currentLineIndex === 1} />
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">&nbsp;</span>
                <TypedLine line={CODE_LINES[2]} len={typedLengths[2]} isCurrent={currentLineIndex === 2} />
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">&nbsp;</span>
                <TypedLine line={CODE_LINES[3]} len={typedLengths[3]} isCurrent={currentLineIndex === 3} />
              </div>

              {showSuccess && (
                <>
                  <div className="terminal-line animate-fade-in" style={{ marginTop: '0.75rem' }}>
                    <span className="terminal-success">✓ Pipeline deployed in 1.2s</span>
                  </div>
                  <div className="terminal-line animate-fade-in">
                    <span className="terminal-success">✓ Processing </span>
                    <span className="terminal-number">2.4M</span>
                    <span className="terminal-success"> records/min</span>
                  </div>
                  <div className="terminal-line animate-fade-in" style={{ marginTop: '0.5rem' }}>
                    <span className="terminal-prompt">›</span>
                    <span className="pulse-dot" style={{ marginLeft: '0.5rem' }} />
                  </div>
                </>
              )}
            </div>

            <div style={{
              position: 'absolute',
              top: '-1.25rem',
              right: '-1.25rem',
              background: 'var(--forsythia)',
              color: 'var(--oceanic)',
              borderRadius: '10px',
              padding: '0.625rem 0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(255,200,1,0.3)',
            }}>
              <ArrowTrendingUpIcon size={14} color="var(--oceanic)" />
              +340% throughput
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Bento Features ──────────────────────────────────────────
const FEATURES = [
  {
    id: 0,
    tag: 'Core Engine',
    title: 'Self-Healing Pipelines',
    desc: 'AI detects schema drift, upstream failures, and anomalies in real time — automatically rerouting data to maintain flow without human intervention.',
    icon: ArrowPathIcon,
    size: 'large',
  },
  {
    id: 1,
    tag: 'Intelligence',
    title: 'Predictive Analytics',
    desc: 'Embedded ML models surface insights before failures happen. Set thresholds, get alerts, and act on predictions — not post-mortems.',
    icon: ArrowTrendingUpIcon,
    size: 'normal',
  },
  {
    id: 2,
    tag: 'Visualization',
    title: 'Live Data Observatory',
    desc: 'A real-time dashboard that visualizes every byte as it moves. Drill into any node, replay events, and audit your full lineage graph.',
    icon: ChartPieIcon,
    size: 'normal',
  },
  {
    id: 3,
    tag: 'Automation',
    title: 'No-Code Orchestration',
    desc: 'Drag-and-drop workflow builder with version control. Schedule complex multi-step flows without writing a single line of glue code.',
    icon: CogIcon,
    size: 'normal',
  },
  {
    id: 4,
    tag: 'Infrastructure',
    title: 'Multi-Cloud Native',
    desc: 'Deploy on AWS, GCP, Azure, or on-premise. NeuralFlow abstracts cloud-specific APIs behind a single, unified control plane.',
    icon: CubeIcon,
    size: 'large',
  },
  {
    id: 5,
    tag: 'Integrations',
    title: '500+ Connectors',
    desc: 'From Salesforce to Snowflake, Kafka to REST — plug into your existing stack in under 2 minutes with pre-built, maintained connectors.',
    icon: LinkIcon,
    size: 'normal',
  },
];

function BentoCard({ feature, isActive, onActivate }) {
  const Icon = feature.icon;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <article
      className={`bento-card fade-up ${feature.size === 'large' ? 'large' : ''} ${isActive ? 'active' : ''}`}
      onMouseEnter={() => onActivate(feature.id)}
      onMouseLeave={() => onActivate(null)}
      onMouseMove={handleMouseMove}
      aria-label={feature.title}
    >
      <div className="bento-card-glow" />
      <div className="bento-icon" style={{ position: 'relative', zIndex: 1 }}>
        <Icon size={22} color="var(--forsythia)" />
      </div>
      <p className="bento-tag" style={{ position: 'relative', zIndex: 1 }}>{feature.tag}</p>
      <h3 className="bento-title" style={{ position: 'relative', zIndex: 1 }}>{feature.title}</h3>
      <p className="bento-desc" style={{ position: 'relative', zIndex: 1 }}>{feature.desc}</p>
    </article>
  );
}

function AccordionItem({ feature, isOpen, onToggle }) {
  const Icon = feature.icon;
  const bodyRef = useRef(null);

  return (
    <div
      className={`accordion-item fade-up ${isOpen ? 'active' : ''}`}
      id={`accordion-item-${feature.id}`}
    >
      <button
        className="accordion-header"
        onClick={() => onToggle(feature.id)}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${feature.id}`}
      >
        <span className="accordion-header-left">
          <span className="accordion-header-icon">
            <Icon size={18} color="var(--forsythia)" />
          </span>
          <span className="accordion-header-title">{feature.title}</span>
        </span>
        <span className="accordion-chevron">
          <ChevronDownIcon size={18} color="var(--forsythia)" />
        </span>
      </button>

      <div
        className="accordion-body"
        id={`accordion-body-${feature.id}`}
        role="region"
        aria-labelledby={`accordion-header-${feature.id}`}
        ref={bodyRef}
      >
        <div className="accordion-content">
          <p style={{ color: 'var(--saffron)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            {feature.tag}
          </p>
          {feature.desc}
        </div>
      </div>
    </div>
  );
}

function BentoFeatures() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const MOBILE_BREAKPOINT = 768;

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    checkMobile();
    const handleResize = () => {
      const nowMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(nowMobile);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [checkMobile]);

  const handleBentoActivate = (id) => setActiveIndex(id);
  const handleAccordionToggle = (id) => setActiveIndex(prev => (prev === id ? null : id));

  return (
    <section className="bento-section" id="features" aria-label="Features">
      <div className="bento-inner">
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="section-eyebrow">Platform Capabilities</p>
          <h2 className="section-title">Every Tool Your Data Pipeline Needs</h2>
          <p className="section-desc">
            Purpose-built modules that snap together — from ingestion to transformation
            to delivery, NeuraFlow handles the entire lifecycle.
          </p>
        </div>

        <div className="bento-grid" role="list" aria-label="Feature grid">
          {FEATURES.map(f => (
            <BentoCard
              key={f.id}
              feature={f}
              isActive={activeIndex === f.id}
              onActivate={handleBentoActivate}
            />
          ))}
        </div>

        <div className="accordion-list" role="list" aria-label="Feature list">
          {FEATURES.map(f => (
            <AccordionItem
              key={f.id}
              feature={f}
              isOpen={activeIndex === f.id}
              onToggle={handleAccordionToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────
const PRICING_MATRIX = {
  tiers: {
    starter: { baseUSD: 29, label: 'Starter', annualMultiplier: 0.8 },
    pro:     { baseUSD: 79, label: 'Pro',     annualMultiplier: 0.8 },
    scale:   { baseUSD: 199,label: 'Scale',   annualMultiplier: 0.8 },
  },
  currencies: {
    USD: { symbol: '$', code: 'USD', tariff: 1.000 },
    INR: { symbol: '₹', code: 'INR', tariff: 83.50 },
    EUR: { symbol: '€', code: 'EUR', tariff: 0.925 },
  },
};

function computePrice(tierKey, currencyKey, isAnnual) {
  const tier = PRICING_MATRIX.tiers[tierKey];
  const currency = PRICING_MATRIX.currencies[currencyKey];
  const rawMonthly = tier.baseUSD * currency.tariff;
  const monthly = isAnnual ? rawMonthly * tier.annualMultiplier : rawMonthly;
  return Math.round(monthly);
}

const TIER_FEATURES = {
  starter: [
    '5 active pipelines',
    'Up to 500K records/month',
    '10 integrations',
    'Community support',
    '99.5% SLA',
  ],
  pro: [
    '25 active pipelines',
    'Up to 10M records/month',
    '100+ integrations',
    'Priority email support',
    '99.9% SLA',
    'Custom transformations',
  ],
  scale: [
    'Unlimited pipelines',
    'Unlimited records',
    '500+ integrations',
    'Dedicated support engineer',
    '99.99% SLA',
    'Custom transformations',
    'SSO & advanced security',
  ],
};

function CurrencyButtons({ currentCurrency, onCurrencyChange }) {
  const currencies = [
    { key: 'USD', label: '$ USD' },
    { key: 'INR', label: '₹ INR' },
    { key: 'EUR', label: '€ EUR' },
  ];

  return (
    <div className="currency-buttons" role="radiogroup" aria-label="Currency">
      {currencies.map(({ key, label }) => (
        <button
          key={key}
          className={`currency-btn ${currentCurrency === key ? 'active' : ''}`}
          onClick={() => onCurrencyChange(key)}
          aria-pressed={currentCurrency === key}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function PricingCard({ tierKey, isFeatured }) {
  const tier = PRICING_MATRIX.tiers[tierKey];
  const symbolRef = useRef(null);
  const amountRef = useRef(null);
  const annualNoteRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current._updatePrice = (currencyKey, isAnnual) => {
        const currency = PRICING_MATRIX.currencies[currencyKey];
        const amount = computePrice(tierKey, currencyKey, isAnnual);

        if (symbolRef.current) {
          symbolRef.current.textContent = currency.symbol;
          symbolRef.current.classList.remove('price-flash');
          void symbolRef.current.offsetWidth;
          symbolRef.current.classList.add('price-flash');
        }
        if (amountRef.current) {
          amountRef.current.textContent = amount.toLocaleString();
          amountRef.current.classList.remove('price-flash');
          void amountRef.current.offsetWidth;
          amountRef.current.classList.add('price-flash');
        }
        if (annualNoteRef.current) {
          if (isAnnual) {
            const monthly = Math.round(tier.baseUSD * currency.tariff);
            annualNoteRef.current.textContent = `Billed annually · saves ${currency.symbol}${Math.round((monthly - amount) * 12).toLocaleString()}/yr`;
          } else {
            annualNoteRef.current.textContent = '';
          }
        }
      };
    }
  }, [tierKey]);

  const initAmount = computePrice(tierKey, 'USD', false);

  return (
    <article
      className={`pricing-card fade-up ${isFeatured ? 'featured' : ''}`}
      ref={containerRef}
      data-tier={tierKey}
      aria-label={`${tier.label} pricing plan`}
    >
      {isFeatured && <div className="featured-badge" style={{ position: 'relative', zIndex: 10 }}>Most Popular</div>}
      <p className="pricing-tier">{tier.label}</p>
      <div className="pricing-price">
        <span className="price-currency" ref={symbolRef}>$</span>
        <span className="price-amount" ref={amountRef}>{initAmount}</span>
        <span className="price-period">/mo</span>
      </div>
      <p className="price-annual-note" ref={annualNoteRef} aria-live="polite" />
      <p className="pricing-desc">
        {tierKey === 'starter' && 'Perfect for solo engineers and small teams getting started with automation.'}
        {tierKey === 'pro'     && 'The complete toolkit for growing teams with serious data requirements.'}
        {tierKey === 'scale'   && 'Enterprise-grade power for organizations running mission-critical pipelines.'}
      </p>
      <ul className="pricing-features" role="list">
        {TIER_FEATURES[tierKey].map((feat) => (
          <li key={feat} className="pricing-feature">
            <span className="feature-check" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="var(--forsythia)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {feat}
          </li>
        ))}
      </ul>
      <button
        className={`pricing-cta ${isFeatured ? 'pricing-cta-featured' : 'pricing-cta-default'}`}
        type="button"
        aria-label={`Get started with ${tier.label} plan`}
      >
        {isFeatured ? 'Start Free Trial' : 'Get Started'}
      </button>
    </article>
  );
}

function Pricing() {
  const billingRef = useRef('monthly');
  const currencyRef = useRef('USD');
  const monthlyBtnRef = useRef(null);
  const annualBtnRef = useRef(null);
  const containerRef = useRef(null);

  const [currency, setCurrency] = useState('USD');

  const updateAllPrices = useCallback(() => {
    if (!containerRef.current) return;
    const isAnnual = billingRef.current === 'annual';
    const curr = currencyRef.current;
    const cards = containerRef.current.querySelectorAll('[data-tier]');
    cards.forEach(card => {
      if (typeof card._updatePrice === 'function') {
        card._updatePrice(curr, isAnnual);
      }
    });
  }, []);

  const handleBillingToggle = useCallback((mode) => {
    if (billingRef.current === mode) return;
    billingRef.current = mode;
    if (monthlyBtnRef.current) monthlyBtnRef.current.classList.toggle('active', mode === 'monthly');
    if (annualBtnRef.current) annualBtnRef.current.classList.toggle('active', mode === 'annual');
    updateAllPrices();
  }, [updateAllPrices]);

  const handleCurrencyChange = useCallback((newCurrency) => {
    if (currencyRef.current === newCurrency) return;
    currencyRef.current = newCurrency;
    setCurrency(newCurrency);
    updateAllPrices();
  }, [updateAllPrices]);

  return (
    <section className="pricing-section" id="pricing" aria-label="Pricing">
      <div className="pricing-inner">
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <p className="section-eyebrow">Pricing</p>
          <h2 className="section-title">Transparent, Scalable Pricing</h2>
          <p className="section-desc">Start free. Scale as you grow. No surprise bills — ever.</p>
        </div>

        <div className="pricing-controls fade-up" role="group" aria-label="Pricing controls">
          <div className="billing-toggle" role="radiogroup" aria-label="Billing cycle">
            <button
              ref={monthlyBtnRef}
              className="toggle-btn active"
              onClick={() => handleBillingToggle('monthly')}
              aria-pressed={true}
              type="button"
            >
              Monthly
            </button>
            <button
              ref={annualBtnRef}
              className="toggle-btn"
              onClick={() => handleBillingToggle('annual')}
              aria-pressed={false}
              type="button"
            >
              Annual
              <span className="annual-badge">-20%</span>
            </button>
          </div>

          <CurrencyButtons
            currentCurrency={currency}
            onCurrencyChange={handleCurrencyChange}
          />
        </div>

        <div className="pricing-grid" ref={containerRef} role="list">
          <PricingCard tierKey="starter" isFeatured={false} />
          <PricingCard tierKey="pro"     isFeatured={true}  />
          <PricingCard tierKey="scale"   isFeatured={false} />
        </div>

        <p className="fade-up" style={{
          textAlign: 'center',
          marginTop: '2.5rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.875rem',
          color: 'var(--mystic)',
        }}>
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "We migrated our entire Redshift pipeline to NeuralFlow in a weekend. What used to require a dedicated data engineer now runs autonomously — it caught a schema drift at 3am that would have killed our Monday reporting.",
    name: "Priya Nair",
    role: "Head of Data Engineering, FinStack",
    initials: "PN",
  },
  {
    quote: "The predictive anomaly detection alone saved us from three production incidents last quarter. NeuralFlow doesn't just move data — it watches it, understands it, and protects it.",
    name: "Marcus Webb",
    role: "VP Engineering, CloudOps Inc.",
    initials: "MW",
  },
  {
    quote: "Our data team went from spending 40% of their time on pipeline maintenance to virtually zero. Now they're actually doing data science. The ROI was visible within the first billing cycle.",
    name: "Amara Diallo",
    role: "CTO, RetailMetrics",
    initials: "AD",
  },
];
const LOGOS = ['Stripe', 'Notion', 'Vercel', 'Databricks', 'Segment', 'Fivetran'];

function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials" aria-label="Customer testimonials">
      <div className="testimonials-inner">
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="section-eyebrow">Social Proof</p>
          <h2 className="section-title">Trusted by Data Teams Worldwide</h2>
          <p className="section-desc">
            From early-stage startups to Fortune 500 data orgs — NeuralFlow handles
            over 800 billion records monthly across 4,200+ active pipelines.
          </p>
        </div>

        <div className="testimonials-grid" role="list">
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="testimonial-card fade-up" aria-label={`Testimonial from ${t.name}`}>
              <div className="stars" aria-label="5 out of 5 stars" role="img">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--forsythia)" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="testimonial-quote">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="testimonial-author">
                <div className="author-avatar" aria-hidden="true">{t.initials}</div>
                <div>
                  <p className="author-name">{t.name}</p>
                  <p className="author-role">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="logos-bar fade-up" aria-label="Trusted by these companies" role="list">
          {LOGOS.map(logo => (
            <span key={logo} className="logo-item" role="listitem">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section & Footer ────────────────────────────────────
function CTASection() {
  return (
    <section className="cta-section" aria-label="Call to action">
      <div className="cta-box fade-up">
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

function Footer() {
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
            NeuraFlow<span style={{ color: 'var(--saffron)' }}></span>
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

// ─── Page Loader ──────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="page-loader" id="page-loader" aria-label="Loading" role="status">
      <div className="loader-ring" />
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const loader = document.getElementById('page-loader');
    if (loader) {
      const t = setTimeout(() => {
        loader.classList.add('hidden');
      }, 400);
      return () => clearTimeout(t);
    }
  }, []);

  // Scroll-triggered dynamic reveal/hide animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // Removes the 'visible' class when you scroll past, causing it to dynamically
            // fade out, and seamlessly fade back in when scrolled back into view
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all elements with .fade-up or .fade-in, excluding hero (hero handles itself)
    const elements = document.querySelectorAll('section:not(#hero) .fade-up, section:not(#hero) .fade-in');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageLoader />

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