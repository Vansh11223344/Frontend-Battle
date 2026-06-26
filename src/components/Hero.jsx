import { useEffect, useRef } from 'react';
import { ArrowTrendingUpIcon, ChevronRightIcon } from './Icons';

export default function Hero() {
  const elementsRef = useRef([]);

  useEffect(() => {
    // Trigger entry animations after mount — total orchestration < 500ms
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

  const addRef = (i) => (el) => { elementsRef.current[i] = el; };

  return (
    <section className="hero" aria-label="Hero" id="hero">
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content">
        {/* Left: Copy */}
        <div>
          <p className="hero-eyebrow fade-up" ref={addRef(0)}>
            AI Automation Platform
          </p>

          <h1 className="hero-title fade-up delay-100" ref={addRef(1)}>
            Data Pipelines,
            <span className="accent">Reimagined</span>
            by AI
          </h1>

          <p className="hero-subtitle fade-up delay-200" ref={addRef(2)}>
            NeuralFlow transforms raw, unstructured data into intelligent, 
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
              <span className="stat-value">98.7%</span>
              <span className="stat-label">Pipeline uptime</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">12×</span>
              <span className="stat-label">Faster processing</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">Integrations</span>
            </div>
          </div>
        </div>

        {/* Right: Terminal Card */}
        <div className="hero-visual fade-in delay-200" ref={addRef(5)} aria-hidden="true">
          <div className="hero-card">
            <div className="terminal-header">
              <span className="terminal-dot" style={{ background: '#FF5F57' }} />
              <span className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <span className="terminal-dot" style={{ background: '#28CA41' }} />
              <span className="terminal-title">neuralflow — pipeline.js</span>
            </div>

            <div className="terminal-body">
              <div className="terminal-line">
                <span className="terminal-comment">// Initialize AI pipeline</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">›</span>
                <span className="terminal-cmd">
                  <span style={{ color: 'var(--forsythia)' }}>const</span>
                  {' '}flow = NeuralFlow
                </span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt"> </span>
                <span className="terminal-cmd">
                  &nbsp;&nbsp;.connect(<span style={{ color: 'var(--saffron)' }}>'postgres://...'</span>)
                </span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt"> </span>
                <span className="terminal-cmd">
                  &nbsp;&nbsp;.transform(<span style={{ color: 'var(--saffron)' }}>'auto'</span>)
                </span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt"> </span>
                <span className="terminal-cmd">
                  &nbsp;&nbsp;.deploy();
                </span>
              </div>
              <div className="terminal-line" style={{ marginTop: '0.75rem' }}>
                <span className="terminal-success">✓ Pipeline deployed in 1.2s</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-success">✓ Processing </span>
                <span className="terminal-number">2.4M</span>
                <span className="terminal-success"> records/min</span>
              </div>
              <div className="terminal-line" style={{ marginTop: '0.5rem' }}>
                <span className="terminal-prompt">›</span>
                <span className="pulse-dot" style={{ marginLeft: '0.5rem' }} />
              </div>
            </div>

            {/* Floating stat */}
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
