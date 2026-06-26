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

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials" aria-label="Customer testimonials">
      <div className="testimonials-inner">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="section-eyebrow">Social Proof</p>
          <h2 className="section-title">Trusted by Data Teams Worldwide</h2>
          <p className="section-desc">
            From early-stage startups to Fortune 500 data orgs — NeuralFlow handles 
            over 800 billion records monthly across 4,200+ active pipelines.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid" role="list">
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="testimonial-card" aria-label={`Testimonial from ${t.name}`}>
              {/* Stars */}
              <div className="stars" aria-label="5 out of 5 stars" role="img">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--forsythia)" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote className="testimonial-quote">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

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

        {/* Logos Bar */}
        <div className="logos-bar" aria-label="Trusted by these companies" role="list">
          {LOGOS.map(logo => (
            <span key={logo} className="logo-item" role="listitem">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
