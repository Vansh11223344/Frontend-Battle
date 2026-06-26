import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowPathIcon, ArrowTrendingUpIcon, ChartPieIcon,
  CogIcon, CubeIcon, LinkIcon, ChevronDownIcon
} from './Icons';

// Feature data
const FEATURES = [
  {
    id: 0,
    tag: 'Core Engine',
    title: 'Self-Healing Pipelines',
    desc: 'AI detects schema drift, upstream failures, and anomalies in real time — automatically rerouting data to maintain flow without human intervention.',
    icon: ArrowPathIcon,
    size: 'large', // spans 2 cols
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

// ─── Bento Card (desktop) ────────────────────────────────────────
function BentoCard({ feature, isActive, onActivate }) {
  const Icon = feature.icon;
  return (
    <article
      className={`bento-card ${feature.size === 'large' ? 'large' : ''} ${isActive ? 'active' : ''}`}
      onMouseEnter={() => onActivate(feature.id)}
      onMouseLeave={() => onActivate(null)}
      aria-label={feature.title}
    >
      <div className="bento-icon">
        <Icon size={22} color="var(--forsythia)" />
      </div>
      <p className="bento-tag">{feature.tag}</p>
      <h3 className="bento-title">{feature.title}</h3>
      <p className="bento-desc">{feature.desc}</p>
    </article>
  );
}

// ─── Accordion Item (mobile) ────────────────────────────────────
function AccordionItem({ feature, isOpen, onToggle }) {
  const Icon = feature.icon;
  const bodyRef = useRef(null);

  return (
    <div
      className={`accordion-item ${isOpen ? 'active' : ''}`}
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

// ─── Main BentoFeatures Component ───────────────────────────────
export default function BentoFeatures() {
  // Shared active index — bridges desktop hover ↔ mobile accordion
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const MOBILE_BREAKPOINT = 768;

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    checkMobile();

    // Context Lock: on resize, transfer active bento state → accordion
    const handleResize = () => {
      const nowMobile = window.innerWidth < MOBILE_BREAKPOINT;
      // activeIndex already carries the context — no extra transfer needed
      // because both views read from the same `activeIndex` state
      setIsMobile(nowMobile);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [checkMobile]);

  // Desktop: hover sets active, null = nothing hovered
  const handleBentoActivate = (id) => {
    setActiveIndex(id);
  };

  // Mobile: accordion toggle
  const handleAccordionToggle = (id) => {
    setActiveIndex(prev => (prev === id ? null : id));
  };

  return (
    <section className="bento-section" id="features" aria-label="Features">
      <div className="bento-inner">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="section-eyebrow">Platform Capabilities</p>
          <h2 className="section-title">
            Every Tool Your Data Pipeline Needs
          </h2>
          <p className="section-desc">
            Purpose-built modules that snap together — from ingestion to transformation 
            to delivery, NeuralFlow handles the entire lifecycle.
          </p>
        </div>

        {/* Desktop: Bento Grid */}
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

        {/* Mobile: Accordion — same activeIndex from potential bento hover */}
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
