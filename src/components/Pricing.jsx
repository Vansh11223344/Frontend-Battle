import { useRef, useEffect, useCallback } from 'react';
import { ChevronDownIcon } from './Icons';

/**
 * FEATURE 1: Matrix-Driven Pricing & Performance-Isolated Currency Switcher
 *
 * Architecture:
 * - Multi-dimensional pricing matrix: base rate × annual multiplier × regional tariff
 * - State updates are ISOLATED to individual DOM text nodes via direct DOM mutation
 * - No React re-render triggered on currency/billing change
 * - Parent component never re-renders due to these interactions
 */

// ─── Multi-dimensional Pricing Matrix ───────────────────────────
const PRICING_MATRIX = {
  tiers: {
    starter: { baseUSD: 29,  label: 'Starter',     annualMultiplier: 0.8 },
    pro:     { baseUSD: 79,  label: 'Pro',          annualMultiplier: 0.8 },
    scale:   { baseUSD: 199, label: 'Scale',        annualMultiplier: 0.8 },
  },
  currencies: {
    USD: { symbol: '$', code: 'USD', tariff: 1.000 },
    INR: { symbol: '₹', code: 'INR', tariff: 83.50 },
    EUR: { symbol: '€', code: 'EUR', tariff: 0.925 },
  },
};

// ─── Pure price computation (no side effects) ───────────────────
function computePrice(tierKey, currencyKey, isAnnual) {
  const tier = PRICING_MATRIX.tiers[tierKey];
  const currency = PRICING_MATRIX.currencies[currencyKey];
  const rawMonthly = tier.baseUSD * currency.tariff;
  const monthly = isAnnual ? rawMonthly * tier.annualMultiplier : rawMonthly;
  // Round to sensible integer for cleaner display
  return Math.round(monthly);
}

// Feature list per tier
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

// ─── PricingCard — pure presentational, refs for isolated updates ─
function PricingCard({ tierKey, isFeatured }) {
  const tier = PRICING_MATRIX.tiers[tierKey];

  // Refs to the exact DOM text nodes that will be mutated directly
  const symbolRef = useRef(null);
  const amountRef = useRef(null);
  const annualNoteRef = useRef(null);

  // Expose update function via a data attribute on mount
  // The parent controller calls this to update ONLY these nodes
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Attach the update callback to the DOM node so the controller
      // can call it without triggering a React state change
      containerRef.current._updatePrice = (currencyKey, isAnnual) => {
        const currency = PRICING_MATRIX.currencies[currencyKey];
        const amount = computePrice(tierKey, currencyKey, isAnnual);

        if (symbolRef.current)     symbolRef.current.textContent = currency.symbol;
        if (amountRef.current)     amountRef.current.textContent = amount.toLocaleString();
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

  // Initial values (USD, Monthly)
  const initAmount = computePrice(tierKey, 'USD', false);

  return (
    <article
      className={`pricing-card ${isFeatured ? 'featured' : ''}`}
      ref={containerRef}
      data-tier={tierKey}
      aria-label={`${tier.label} pricing plan`}
    >
      {isFeatured && (
        <div className="featured-badge" aria-label="Most popular plan">Most Popular</div>
      )}

      <p className="pricing-tier">{tier.label}</p>

      <div className="pricing-price">
        <span className="price-currency" ref={symbolRef} aria-hidden="true">$</span>
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
              {/* Checkmark SVG inline — from asset: chevron-up-solid indicates upward success */}
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

// ─── Main Pricing Section ───────────────────────────────────────
export default function Pricing() {
  // Internal refs — NOT React state — to avoid any re-render on change
  const billingRef  = useRef('monthly');   // 'monthly' | 'annual'
  const currencyRef = useRef('USD');

  // Refs to toggle buttons for active class switching
  const monthlyBtnRef = useRef(null);
  const annualBtnRef  = useRef(null);
  const containerRef  = useRef(null);

  // ── Isolated price updater — touches only price text nodes ──
  const updateAllPrices = useCallback(() => {
    if (!containerRef.current) return;
    const isAnnual = billingRef.current === 'annual';
    const currency = currencyRef.current;

    // Query all card containers and call their direct DOM update function
    const cards = containerRef.current.querySelectorAll('[data-tier]');
    cards.forEach(card => {
      if (typeof card._updatePrice === 'function') {
        card._updatePrice(currency, isAnnual);
      }
    });
  }, []);

  const handleBillingToggle = useCallback((mode) => {
    if (billingRef.current === mode) return;
    billingRef.current = mode;

    // Update only toggle button classes — no React state
    if (monthlyBtnRef.current) monthlyBtnRef.current.classList.toggle('active', mode === 'monthly');
    if (annualBtnRef.current)  annualBtnRef.current.classList.toggle('active', mode === 'annual');

    updateAllPrices();
  }, [updateAllPrices]);

  const handleCurrencyChange = useCallback((e) => {
    currencyRef.current = e.target.value;
    updateAllPrices();
  }, [updateAllPrices]);

  return (
    <section className="pricing-section" id="pricing" aria-label="Pricing">
      <div className="pricing-inner">
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <p className="section-eyebrow">Pricing</p>
          <h2 className="section-title">Transparent, Scalable Pricing</h2>
          <p className="section-desc">
            Start free. Scale as you grow. No surprise bills — ever.
          </p>
        </div>

        {/* Controls — billing toggle + currency selector */}
        <div className="pricing-controls" role="group" aria-label="Pricing controls">

          {/* Billing Toggle */}
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

          {/* Currency Selector */}
          <div className="currency-select" aria-label="Currency selector">
            <select
              onChange={handleCurrencyChange}
              defaultValue="USD"
              aria-label="Select currency"
            >
              <option value="USD">$ USD</option>
              <option value="INR">₹ INR</option>
              <option value="EUR">€ EUR</option>
            </select>
            <span className="currency-chevron" aria-hidden="true">
              <ChevronDownIcon size={14} color="var(--forsythia)" />
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid" ref={containerRef} role="list">
          <PricingCard tierKey="starter" isFeatured={false} />
          <PricingCard tierKey="pro"     isFeatured={true}  />
          <PricingCard tierKey="scale"   isFeatured={false} />
        </div>

        {/* Footer note */}
        <p style={{
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
