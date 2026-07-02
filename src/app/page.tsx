"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function Home() {
  const [confidencePage, setConfidencePage] = useState(0);
  const [confidenceTransition, setConfidenceTransition] = useState<"idle" | "exit-left" | "enter-right">(
    "idle"
  );
  const confidenceStats = confidenceStatPages[confidencePage];
  const [testimonialsPage, setTestimonialsPage] = useState(0);
  const [testimonialsDir, setTestimonialsDir] = useState<"left" | "right" | null>(null);
  const [testimonialsAnimating, setTestimonialsAnimating] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current <= 60) {
        setNavVisible(true);
      } else if (current > lastScrollY.current) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeTestimonialsPage = (next: number, dir: "left" | "right") => {
    if (testimonialsAnimating) return;
    setTestimonialsDir(dir);
    setTestimonialsAnimating(true);
    window.setTimeout(() => {
      setTestimonialsPage(next);
      setTestimonialsAnimating(false);
    }, 350);
  };

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const changeConfidencePage = (nextPage: number) => {
    if (confidenceTransition !== "idle") return;

    setConfidenceTransition("exit-left");
    window.setTimeout(() => {
      setConfidencePage(nextPage);
      setConfidenceTransition("enter-right");
      window.setTimeout(() => setConfidenceTransition("idle"), 420);
    }, 220);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111",
        fontFamily: "Inter, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── NAVBAR ── */}
      <header
        style={{
          width: "100%",
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          position: "sticky",
          top: 0,
          zIndex: 50,
          transform: navVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <nav
          style={{
            maxWidth: 1380,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 48px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1,
              textDecoration: "none",
              userSelect: "none",
            }}
          >
            <span
              style={{
                fontSize: 21,
                fontWeight: 900,
                letterSpacing: "-0.5px",
                color: "#3dba44",
              }}
            >
              Franchise
            </span>
            <span
              style={{
                fontSize: 21,
                fontWeight: 900,
                letterSpacing: "-0.5px",
                color: "#111",
                marginTop: -2,
              }}
            >
              Broker.
            </span>
          </Link>

          {/* Desktop Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              fontSize: 14,
              fontWeight: 500,
              color: "#222",
            }}
          >
            {[
              { label: "Home", href: "#home" },
              { label: "For Investors ▾", href: "#opportunities" },
              { label: "For Franchisors", href: "#growth" },
              { label: "Resources ▾", href: "#why-us" },
              { label: "Testimonials", href: "#testimonials" },
              { label: "FAQs", href: "#faq" },
            ].map(
              ({ label: item, href }) => (
                <a
                  key={item}
                  href={href}
                  style={{
                    color: "#222",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* CTA Buttons — matching reference exactly */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Outlined "Contact Us" */}
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1.5px solid #111",
                borderRadius: 999,
                padding: "10px 22px",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "#111",
                textDecoration: "none",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              Contact Us
              <ArrowIcon />
            </a>

            {/* Green "Get Started" */}
            <a
              href="#get-started"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#3dba44",
                borderRadius: 999,
                padding: "10px 22px",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "#fff",
                textDecoration: "none",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              Get Started
              <ArrowIcon color="#fff" />
            </a>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <main
        id="home"
        style={{
          scrollMarginTop: 90,
          maxWidth: 1380,
          margin: "0 auto",
          padding: "0 48px 80px",
          position: "relative",
        }}
      >
        {/* Two-column flex */}
        <div
          className="hero-layout"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 48,
            paddingTop: 72,
          }}
        >
          {/* ── LEFT: Image ── */}
          <div className="hero-media-column" style={{ flex: "0 0 55%", position: "relative", marginLeft: "24px" }}>
            <div
              className="hero-stepped-media"
              style={{
                width: "100%",
                height: "clamp(460px, 46vw, 680px)",
                position: "relative",
                borderRadius: "2rem",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85"
                alt="Franchise Investment Opportunities"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <span className="hero-cut hero-cut-top-one" aria-hidden="true" />
              <span className="hero-cut hero-cut-top-two" aria-hidden="true" />
              <span className="hero-cut hero-cut-right" aria-hidden="true" />
              <span className="hero-cut hero-cut-bottom-left" aria-hidden="true" />
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              paddingTop: 8,
            }}
          >
            {/* Headline — massive, tight, Inter black */}
            <h1
              className="hero-heading"
              style={{
                fontSize: "clamp(3rem, 4.5vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-1px",
                color: "#111",
                margin: 0,
                marginTop: "-12px",
                fontFamily: "var(--font-display), Inter, sans-serif",
              }}
            >
              <div className="hero-line-1" style={{ whiteSpace: "nowrap" }}>Discover High-Potential</div>
              <div className="hero-line-2" style={{ whiteSpace: "nowrap" }}>Franchise Investment</div>
              <div className="hero-line-3">Opportunities</div>
            </h1>

            <div className="hero-content-bottom" style={{ width: "100%" }}>
              {/* Sub-paragraph */}
              <p
                style={{
                  marginTop: 72,
                  maxWidth: 520,
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "#888",
                  fontWeight: 400,
                }}
              >
                Helping investors connect with established restaurant franchises
                through expert guidance, market insights, and a carefully curated
                portfolio of proven brands.
              </p>

              {/* CTA Button — green pill, matching reference */}
              <a
                href="#get-started"
                style={{
                  marginTop: 20,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#3dba44",
                  borderRadius: 999,
                  padding: "13px 26px",
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#fff",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Get Started
                <ArrowIcon color="#fff" />
              </a>

              {/* Testimonial Card — matching reference card */}
              <div
                style={{
                  marginTop: 28,
                  background: "#f4f5f7",
                  borderRadius: 20,
                  padding: "20px 24px",
                  maxWidth: 420,
                  width: "100%",
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "#444",
                    fontWeight: 400,
                    margin: 0,
                    marginBottom: 16,
                  }}
                >
                  &ldquo;They helped us find the perfect franchise match — their
                  expert market analysis gave us complete confidence.&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#ccc",
                      flexShrink: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://i.pravatar.cc/80?img=68"
                      alt="Investor"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#111",
                        lineHeight: 1.3,
                      }}
                    >
                      Rohan M.
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#999",
                        marginTop: 2,
                        fontWeight: 400,
                      }}
                    >
                      Franchise Investor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative blobs — bottom right (matching ref) */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: 20,
            width: 240,
            height: 240,
            background: "#f4f5f7",
            borderRadius: "2.5rem",
            transform: "rotate(8deg)",
            zIndex: -1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 100,
            width: 110,
            height: 110,
            background: "#f4f5f7",
            borderRadius: "1.5rem",
            transform: "rotate(-12deg)",
            zIndex: -1,
          }}
        />
      </main>

      {/* ── PARTNERS MARQUEE & STATS SECTION ── */}
      <section
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "160px 24px 100px 24px",
        }}
      >
        {/* Marquee Banner */}
        <div
          className="marquee-box"
          style={{
            background: "#f4f5f7",
            borderRadius: 24,
            padding: "56px 48px",
            display: "flex",
            alignItems: "center",
            gap: 48,
          }}
        >
          {/* Text */}
          <div
            className="marquee-title"
            style={{
              flexShrink: 0,
              width: 180,
              fontSize: 15,
              fontWeight: 500,
              color: "#111",
              lineHeight: 1.4,
              borderRight: "1px solid #ddd",
              paddingRight: 32,
            }}
          >
            Partnering with the world&apos;s leading food franchises
          </div>

          {/* Scrolling Marquee */}
          <div style={{
            display: "flex",
            overflow: "hidden",
            width: "100%",
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 60,
              flexShrink: 0,
              minWidth: "max-content",
              animation: "marquee 25s linear infinite",
            }}>
              {[
                { name: "McDonald's",  src: "https://cdn.simpleicons.org/mcdonalds/111111" },
                { name: "KFC",         src: "https://cdn.simpleicons.org/kfc/111111" },
                { name: "Burger King", src: "https://cdn.simpleicons.org/burgerking/111111" },
                { name: "Starbucks",   src: "https://cdn.simpleicons.org/starbucks/111111" },
                { name: "Coca-Cola",   src: "https://cdn.simpleicons.org/cocacola/111111" },
                { name: "Deliveroo",   src: "https://cdn.simpleicons.org/deliveroo/111111" },
                { name: "DoorDash",    src: "https://cdn.simpleicons.org/doordash/111111" },
                { name: "foodpanda",   src: "https://cdn.simpleicons.org/foodpanda/111111" },
                { name: "McDonald's",  src: "https://cdn.simpleicons.org/mcdonalds/111111" },
                { name: "KFC",         src: "https://cdn.simpleicons.org/kfc/111111" },
                { name: "Burger King", src: "https://cdn.simpleicons.org/burgerking/111111" },
                { name: "Starbucks",   src: "https://cdn.simpleicons.org/starbucks/111111" },
                { name: "Coca-Cola",   src: "https://cdn.simpleicons.org/cocacola/111111" },
                { name: "Deliveroo",   src: "https://cdn.simpleicons.org/deliveroo/111111" },
                { name: "DoorDash",    src: "https://cdn.simpleicons.org/doordash/111111" },
                { name: "foodpanda",   src: "https://cdn.simpleicons.org/foodpanda/111111" },
              ].map((brand, idx) => (
                <div key={`logo-${idx}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.src}
                    alt={brand.name}
                    style={{
                      height: 60,
                      width: 60,
                      objectFit: "contain",
                      opacity: 0.55,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#888", whiteSpace: "nowrap", letterSpacing: "0.03em" }}>
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          className="stats-row"
          style={{
            marginTop: 160,
            display: "flex",
            alignItems: "center",
          }}
        >
          {[
            { target: 821, suffix: "cr", label: "Funded" },
            { target: 114, suffix: "", label: "Franchise Partners" },
            { target: 100, suffix: "%", label: "Guided Diligence" },
            { target: 6042, suffix: "+", label: "Investor Matches" },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 4.2rem)",
                    fontWeight: 900,
                    letterSpacing: "-2px",
                    color: "#111",
                    lineHeight: 1.1,
                    fontFamily: "var(--font-display), Inter, sans-serif",
                  }}
                >
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#444",
                    marginTop: 12,
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div
                  className="stats-divider"
                  style={{ width: 1, height: 60, background: "#eaeaea", flexShrink: 0 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Confidence Stats */}
        <div className="confidence-shell">
          <div className="confidence-bg-piece confidence-bg-top-left" aria-hidden="true" />
          <div className="confidence-bg-piece confidence-bg-top-right" aria-hidden="true" />
          <div className="confidence-bg-piece confidence-bg-right" aria-hidden="true" />
          <div className="confidence-bg-piece confidence-bg-bottom-left" aria-hidden="true" />
          <div className="confidence-bg-piece confidence-bg-bottom-mid" aria-hidden="true" />
          <div className="confidence-bg-piece confidence-bg-bottom-right" aria-hidden="true" />

          <div className="confidence-header">
            <div>
              <h2>Numbers that build confidence</h2>
              <p>
                Proven franchise guidance backed by curated opportunities, investor support,
                and market-tested restaurant brands.
              </p>
            </div>
            <a href="#success-stories">Success Stories</a>
          </div>

          <div className={`confidence-cards ${confidenceTransition}`} key={confidencePage}>
            {confidenceStats.map((stat) => (
              <article className="confidence-card" key={stat.label}>
                <button aria-label={`Open ${stat.label}`} type="button">
                  <ArrowIcon />
                </button>
                <div className="confidence-value">
                  <span>{stat.value}</span>
                  <small>{stat.unit}</small>
                </div>
                <p>{stat.label}</p>
                <div className="confidence-card-footer">
                  <div className="confidence-mini-logo">{stat.brand.slice(0, 2)}</div>
                  <strong>{stat.brand}</strong>
                  <em>{stat.detail}</em>
                </div>
              </article>
            ))}
          </div>

          <div className="confidence-controls">
            <button
              aria-label="Previous stats"
              type="button"
              disabled={confidenceTransition !== "idle"}
              onClick={() =>
                changeConfidencePage(
                  confidencePage === 0 ? confidenceStatPages.length - 1 : confidencePage - 1
                )
              }
            >
              ←
            </button>
            <button
              aria-label="Next stats"
              type="button"
              disabled={confidenceTransition !== "idle"}
              onClick={() => changeConfidencePage((confidencePage + 1) % confidenceStatPages.length)}
            >
              →
            </button>
          </div>
        </div>

        {/* ── FEATURED BRANDS SECTION ── */}
        <div id="opportunities" style={{ marginTop: 160, scrollMarginTop: 90 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 32 }}>
            <div style={{ maxWidth: 600 }}>
              <div style={{ 
                display: "inline-block", 
                background: "#fefae0", 
                color: "#ca8a04", 
                padding: "6px 16px", 
                borderRadius: 999, 
                fontSize: 12, 
                fontWeight: 700, 
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 24
              }}>
                Featured Brands
              </div>
              <h2 style={{ 
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)", 
                fontWeight: 900, 
                lineHeight: 1.1, 
                letterSpacing: "-1px",
                color: "#111",
                margin: 0,
                fontFamily: "var(--font-display), Inter, sans-serif"
              }}>
                Top Franchise Opportunities
              </h2>
            </div>
            <div style={{ maxWidth: 300 }}>
              <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
                Explore our curated selection of high-performing franchise brands ready for investment.
              </p>
            </div>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: 24 
          }}>
            {[
              {
                initials: "CC",
                name: "Chopped Chips",
                investment: "2cr",
                industry: "Food & Beverage",
                link: "#"
              },
              {
                initials: "EN",
                name: "Enaari (Fine dine, fish)",
                investment: "3cr",
                industry: "Fine Dining",
                link: "#"
              },
              {
                initials: "LC",
                name: "The last crumb cookies",
                investment: "3cr",
                industry: "Dessert & Bakery",
                link: "#"
              },
              {
                initials: "YI",
                name: "Yar Istanbul",
                investment: "4cr",
                industry: "Restaurant",
                link: "#"
              },
              {
                initials: "AR",
                name: "Artisan",
                investment: "4cr",
                industry: "Restaurant",
                link: "#"
              },
              {
                initials: "SS",
                name: "Soft Swirl",
                investment: "5cr",
                industry: "Dessert & Ice Cream",
                link: "#"
              },
              {
                initials: "SD",
                name: "Saadi di Sajji (by aleem daar)",
                investment: "3.5cr",
                industry: "Restaurant",
                link: "#"
              },
              {
                initials: "CP",
                name: "Cafe praha (Dha/Bahria)",
                investment: "5cr",
                industry: "Cafe",
                link: "#"
              },
              {
                initials: "CK",
                name: "Chai Khaana",
                investment: "2cr",
                industry: "Cafe",
                link: "#"
              },
              {
                initials: "FB",
                name: "The fat boy",
                investment: "2cr",
                industry: "Restaurant",
                link: "#"
              }
            ].map((brand, i) => (
              <div key={i} className="brand-card">
                <div style={{ marginBottom: 24, background: "#fff", padding: "16px", borderRadius: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", height: 72, width: 96, fontSize: 24, fontWeight: 900, color: "#111" }}>
                  {brand.initials}
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 24, letterSpacing: "-0.5px" }}>{brand.name}</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, color: "rgba(0,0,0,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Industry</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{brand.industry}</div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: 12, color: "rgba(0,0,0,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Investment Starting From</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{brand.investment}</div>
                  </div>
                </div>

                <div className="brand-card-cutout" aria-hidden="true" />
                
                <a
                  href={brand.link}
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 8,
                    zIndex: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#3dba44",
                    borderRadius: 999,
                    padding: "11px 18px",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#fff",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Learn More <ArrowIcon color="#fff" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── BUILT FOR LONG-TERM GROWTH (ROI) SECTION ── */}
        <div id="growth" style={{ marginTop: 160, scrollMarginTop: 90 }}>
          <div
            className="roi-shell"
            style={{ padding: "110px 80px" }}
          >
            <div className="roi-bg-piece roi-bg-top-right" aria-hidden="true" />
            <div className="roi-bg-piece roi-bg-bottom-left" aria-hidden="true" />

            <div style={{ display: "flex", flexWrap: "wrap", gap: 48, position: "relative", zIndex: 2 }}>
              <div style={{ flex: "1 1 400px" }}>
                <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1px", color: "#111", marginBottom: 24, fontFamily: "var(--font-display), Inter, sans-serif" }}>
                  Built for Long-Term Growth
                </h2>
                <p style={{ color: "#0b2530", fontSize: 16, lineHeight: 1.6, marginBottom: 40, fontWeight: 500 }}>
                  We break down costs, payback periods, and growth potential so you invest with confidence.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    "Comprehensive financial modeling",
                    "Market-specific growth projections",
                    "Clear visibility into operational costs"
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#0b2530", color: "#d8f6d2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#0b2530" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: 16, paddingTop: 16 }}>
                {[
                  {
                    label: "Investment Range",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E962F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v2m0 8v2M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-1 2-2.5 2.5S9.5 13 9.5 15h5"/>
                      </svg>
                    )
                  },
                  {
                    label: "Estimated Payback",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E962F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    )
                  },
                  {
                    label: "Growth Potential",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E962F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                        <polyline points="17 6 23 6 23 12"/>
                      </svg>
                    )
                  },
                  {
                    label: "Available Markets",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E962F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    )
                  }
                ].map((card, i) => (
                  <div key={i} style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "16px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    width: "85%",
                    marginLeft: i % 2 === 0 ? "0%" : "15%"
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {card.icon}
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{card.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── WHY US SECTION ── */}
        <div id="why-us" style={{ marginTop: 160, scrollMarginTop: 90 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 32 }}>
            <div style={{ maxWidth: 600 }}>
              <div style={{ 
                display: "inline-block", 
                background: "#dcfce7", 
                color: "#166534", 
                padding: "6px 16px", 
                borderRadius: 999, 
                fontSize: 12, 
                fontWeight: 700, 
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 24
              }}>
                Why Choose Us
              </div>
              <h2 style={{ 
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)", 
                fontWeight: 900, 
                lineHeight: 1.1, 
                letterSpacing: "-1px",
                color: "#111",
                margin: 0,
                fontFamily: "var(--font-display), Inter, sans-serif"
              }}>
                Streamlined Franchise Investment Solutions
              </h2>
            </div>
            <div style={{ maxWidth: 300 }}>
              <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
                Partner with industry experts and build a profitable franchise portfolio.
              </p>
              <a
                href="#schedule"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#3dba44",
                  borderRadius: 999,
                  padding: "14px 28px",
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Schedule a Call With Us <ArrowIcon color="#fff" />
              </a>
            </div>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: 24 
          }}>
            {[
              {
                bg: "#e3fbe9",
                iconColor: "#4ade80",
                title: "Expert guidance",
                desc: "Our dedicated team of franchise experts will guide you through every step of your investment journey.",
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="greenGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4ade80" />
                        <stop offset="1" stopColor="#16a34a" />
                      </linearGradient>
                    </defs>
                    <g>
                      <rect x="26" y="8" width="12" height="48" rx="6" fill="url(#greenGrad)" />
                      <rect x="8" y="26" width="48" height="12" rx="6" fill="url(#greenGrad)" />
                      <circle cx="14" cy="14" r="8" fill="url(#greenGrad)" />
                      <circle cx="50" cy="14" r="8" fill="url(#greenGrad)" />
                      <circle cx="14" cy="50" r="8" fill="url(#greenGrad)" />
                      <circle cx="50" cy="50" r="8" fill="url(#greenGrad)" />
                      <rect x="18" y="18" width="28" height="28" rx="8" fill="#ffffff" />
                      <path d="M34 22L26 33h6l-2 9 8-11h-6l2-9z" fill="url(#greenGrad)" />
                    </g>
                  </svg>
                )
              },
              {
                bg: "#fefae0",
                iconColor: "#facc15",
                title: "Curated opportunities",
                desc: "Gain access to a carefully vetted portfolio of high-growth food franchise brands.",
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="yellowGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#fde047" />
                        <stop offset="1" stopColor="#eab308" />
                      </linearGradient>
                    </defs>
                    <g>
                      <path d="M48 16H24c-4.4 0-8 3.6-8 8v8h12v-8h20v16H36v12h12c4.4 0 8-3.6 8-8V24c0-4.4-3.6-8-8-8z" fill="url(#yellowGrad)" />
                      <path d="M16 48h24c4.4 0 8-3.6 8-8v-8H36v8H16V24h12V12H16c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8z" fill="#fef08a" />
                    </g>
                  </svg>
                )
              },
              {
                bg: "#d9f9fb",
                iconColor: "#22d3ee",
                title: "Transparent process",
                desc: "No hidden fees or surprises. We believe in complete transparency from start to finish.",
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#67e8f9" />
                        <stop offset="1" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <g>
                      <circle cx="50" cy="14" r="6" fill="url(#blueGrad)" />
                      <circle cx="40" cy="24" r="4" fill="url(#blueGrad)" />
                      <circle cx="32" cy="28" r="14" fill="url(#blueGrad)" />
                      <rect x="12" y="46" width="40" height="14" rx="7" fill="url(#blueGrad)" />
                    </g>
                  </svg>
                )
              },
              {
                bg: "#fceef6",
                iconColor: "#c084fc",
                title: "Ongoing support",
                desc: "Our partnership doesn't end at signing. We provide continuous support to ensure your success.",
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="pinkGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f472b6" />
                        <stop offset="1" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>
                    <g>
                      <rect x="12" y="12" width="16" height="16" rx="4" fill="url(#pinkGrad)" />
                      <rect x="12" y="28" width="16" height="16" rx="4" fill="url(#pinkGrad)" />
                      <rect x="28" y="28" width="16" height="16" rx="4" fill="url(#pinkGrad)" />
                      <rect x="28" y="44" width="32" height="16" rx="4" fill="url(#pinkGrad)" />
                    </g>
                  </svg>
                )
              }
            ].map((card, i) => (
              <div key={i} style={{ 
                background: card.bg, 
                borderRadius: 24, 
                padding: "40px 32px 56px",
                minHeight: 320,
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ marginBottom: 40 }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111", lineHeight: 1.3, marginBottom: 16, fontFamily: "var(--font-display), Inter, sans-serif" }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.6, margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* ── TESTIMONIALS SECTION ── */}
      <section id="testimonials" style={{ maxWidth: 1360, margin: "0 auto", padding: "120px 24px 140px", scrollMarginTop: 90 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-block",
            background: "#dcfce7",
            color: "#166534",
            padding: "6px 20px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}>
            Testimonials
          </div>
          <h2 style={{
            fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-1px",
            color: "#111",
            margin: "0 0 20px",
            fontFamily: "var(--font-display), Inter, sans-serif",
          }}>
            Trusted by Investors Nationwide
          </h2>
          <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Don&apos;t just take our word for it. Hear what our franchise investors have to say about their experience with Franchise Broker.
          </p>
        </div>

        {/* Cards Row */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div
            key={testimonialsPage}
            className={`testi-slide ${
              testimonialsAnimating
                ? testimonialsDir === "left"
                  ? "testi-exit-left"
                  : "testi-exit-right"
                : testimonialsDir === "left"
                ? "testi-enter-right"
                : testimonialsDir === "right"
                ? "testi-enter-left"
                : ""
            }`}
            style={{
              display: "flex",
              gap: 20,
            }}
          >
            {testimonials
              .filter((_, i) => i === testimonialsPage || i === testimonialsPage + 1)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .map((t, _idx) => (
                <div
                  key={t.name}
                  style={{
                    flex: "0 0 calc(50% - 10px)",
                    background: "#eaf0f6",
                    borderRadius: 24,
                    padding: "32px",
                    display: "flex",
                    gap: 28,
                    alignItems: "stretch",
                    opacity: 1,
                    overflow: "hidden",
                    minHeight: 280,
                  }}
                >
                  {/* Left: quote + text */}
                  <div style={{
                    flex: 1,
                    background: "#dce3ea",
                    borderRadius: 16,
                    padding: "26px 26px 22px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}>
                    {/* Big open-quote mark */}
                    <div style={{
                      fontSize: 72,
                      lineHeight: 0.6,
                      color: "#3dba44",
                      fontWeight: 900,
                      fontFamily: "Georgia, serif",
                      userSelect: "none",
                    }}>
                      &ldquo;
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: "#2d3a42", margin: 0, flex: 1 }}>
                      {t.quote}
                    </p>
                  </div>

                  {/* Right: stat + avatar — shown on both cards */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minWidth: 154,
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                        <span style={{ fontSize: 13, color: "#4a5a6a", fontWeight: 500 }}>&#8377;</span>
                        <span style={{ fontSize: 50, fontWeight: 900, lineHeight: 1, color: "#111", letterSpacing: "-2px", fontFamily: "var(--font-display), Inter, sans-serif" }}>{t.stat}</span>
                        <span style={{ fontSize: 17, fontWeight: 700, color: "#4a5a6a", paddingBottom: 7 }}>cr</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#4a5a6a", fontWeight: 500, marginTop: 6 }}>{t.statLabel}</div>
                    </div>

                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.avatar}
                        alt={t.name}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          objectFit: "cover",
                          display: "block",
                          marginBottom: 14,
                        }}
                      />
                      <div style={{ height: 1, background: "#a0b4c4", marginBottom: 14 }} />
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: "#4a5a6a", marginTop: 3 }}>{t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 48 }}>
          <button
            aria-label="Previous testimonial"
            onClick={() => changeTestimonialsPage(Math.max(0, testimonialsPage - 1), "right")}
            disabled={testimonialsPage === 0 || testimonialsAnimating}
            style={{
              width: 52,
              height: 44,
              borderRadius: 999,
              border: "1.5px solid #ccc",
              background: "#fff",
              fontSize: 18,
              cursor: testimonialsPage === 0 ? "not-allowed" : "pointer",
              opacity: testimonialsPage === 0 ? 0.35 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 0.2s",
            }}
          >
            ←
          </button>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => changeTestimonialsPage(i, i > testimonialsPage ? "left" : "right")}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: i === testimonialsPage ? 24 : 10,
                  height: 10,
                  borderRadius: 999,
                  background: i === testimonialsPage ? "#3dba44" : "#d1d5db",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>

          <button
            aria-label="Next testimonial"
            onClick={() => changeTestimonialsPage(Math.min(testimonials.length - 1, testimonialsPage + 1), "left")}
            disabled={testimonialsPage >= testimonials.length - 1 || testimonialsAnimating}
            style={{
              width: 52,
              height: 44,
              borderRadius: 999,
              border: "1.5px solid #ccc",
              background: "#fff",
              fontSize: 18,
              cursor: testimonialsPage >= testimonials.length - 1 ? "not-allowed" : "pointer",
              opacity: testimonialsPage >= testimonials.length - 1 ? 0.35 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 0.2s",
            }}
          >
            →
          </button>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px 160px", scrollMarginTop: 90 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-block",
            background: "#dcfce7",
            color: "#166534",
            padding: "6px 20px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}>
            Support
          </div>
          <h2 style={{
            fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-1px",
            color: "#111",
            margin: 0,
            fontFamily: "var(--font-display), Inter, sans-serif",
          }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div>
          {faqs.slice(0, showAllFaqs ? faqs.length : 4).map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={faq.question} style={{ borderBottom: "1px solid #eee" }}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 24,
                    padding: "28px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#111",
                    fontFamily: "var(--font-display), Inter, sans-serif",
                  }}>
                    {faq.question}
                  </span>
                  <span style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1.5px solid #111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1V15M1 8H15" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 200 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "#666", margin: "0 0 28px", maxWidth: 680 }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {!showAllFaqs && faqs.length > 4 && (
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button
              type="button"
              onClick={() => setShowAllFaqs(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1.5px solid #111",
                borderRadius: 999,
                padding: "13px 28px",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#111",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Show More Questions
            </button>
          </div>
        )}
      </section>

      {/* ── CLOSING CTA SECTION ── */}
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "0 24px 140px" }}>
        <div
          className="closing-cta"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 64,
          }}
        >
          {/* Left: copy */}
          <div style={{ flex: "1 1 440px", position: "relative" }}>
            <h2 style={{
              fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: "-1px",
              color: "#111",
              margin: "0 0 24px",
              fontFamily: "var(--font-display), Inter, sans-serif",
            }}>
              Ready to Grow Your Franchise Portfolio?
            </h2>
            <p style={{ color: "#666", fontSize: 16, lineHeight: 1.7, maxWidth: 440, marginBottom: 32 }}>
              Get matched with vetted, high-performing restaurant franchise brands and
              start building long-term wealth with expert guidance every step of the way.
            </p>
            <a
              href="#get-started"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#3dba44",
                borderRadius: 999,
                padding: "14px 28px",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#fff",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Explore Now
              <ArrowIcon color="#fff" />
            </a>

            {/* Floating testimonial card */}
            <div style={{
              marginTop: 72,
              background: "#f4f5f7",
              borderRadius: 20,
              padding: "20px 24px",
              maxWidth: 400,
            }}>
              <p style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: "#444",
                fontWeight: 400,
                margin: 0,
                marginBottom: 16,
              }}>
                &ldquo;Investing through Franchise Broker felt effortless — clear
                guidance, no surprises, and steady returns from day one.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#ccc",
                  flexShrink: 0,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/image5.jpg"
                    alt="Karan Verma"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111", lineHeight: 1.3 }}>
                    Karan Verma
                  </div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 2, fontWeight: 400 }}>
                    Franchise Investor
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="closing-cta-media" style={{ flex: "0 0 55%", position: "relative" }}>
            <div
              className="cta-stepped-media"
              style={{
                width: "100%",
                height: "clamp(460px, 46vw, 680px)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/meeting.jpg"
                alt="Franchise investors meeting"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <span className="cta-cut cta-cut-top-one" aria-hidden="true" />
              <span className="cta-cut cta-cut-top-two" aria-hidden="true" />
              <span className="cta-cut cta-cut-right" aria-hidden="true" />
              <span className="cta-cut cta-cut-bottom-left" aria-hidden="true" />
            </div>

            {/* Floating accent chips */}
            <div style={{
              position: "absolute",
              bottom: 28,
              left: -24,
              width: 68,
              height: 68,
              borderRadius: 18,
              background: "#d4fc26",
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div style={{
              position: "absolute",
              bottom: -20,
              right: 40,
              width: 68,
              height: 68,
              borderRadius: 18,
              background: "#dcfce7",
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22V4a1 1 0 0 1 1-1h13.4a.6.6 0 0 1 .5.9l-3 5.6 3 5.6a.6.6 0 0 1-.5.9H5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #f0f0f0", padding: "40px 48px" }}>
        <div
          style={{
            maxWidth: 1380,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1,
              textDecoration: "none",
              userSelect: "none",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.5px", color: "#3dba44" }}>
              Franchise
            </span>
            <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.5px", color: "#111", marginTop: -2 }}>
              Broker.
            </span>
          </Link>

          <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
            © {new Date().getFullYear()} Franchise Broker. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: 24 }}>
            {["Home", "Opportunities", "FAQs"].map((item, i) => (
              <a
                key={item}
                href={["#home", "#opportunities", "#faq"][i]}
                style={{ fontSize: 13, color: "#666", textDecoration: "none", fontWeight: 500 }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          a:hover { opacity: 0.85; }
        `,
        }}
      />
    </div>
  );
}

const confidenceStatPages = [
  [
    {
      value: "120",
      unit: "+",
      label: "Franchise Matches",
      brand: "Restaurant Investors",
      detail: "Curated Deals",
    },
    {
      value: "48",
      unit: "M",
      label: "Opportunity Value",
      brand: "Food Franchise Portfolio",
      detail: "Reviewed",
    },
    {
      value: "30",
      unit: "Days",
      label: "Average Shortlist",
      brand: "Investor Roadmaps",
      detail: "Within 30 Days",
    },
  ],
  [
    {
      value: "92",
      unit: "%",
      label: "Qualified Leads",
      brand: "Growth Operators",
      detail: "Pre-screened",
    },
    {
      value: "18",
      unit: "States",
      label: "Market Coverage",
      brand: "Regional Partners",
      detail: "Active Markets",
    },
    {
      value: "64",
      unit: "+",
      label: "Brand Reviews",
      brand: "Due Diligence Desk",
      detail: "Completed",
    },
  ],
];

const testimonials = [
  {
    quote: "Franchise Broker was a game-changer for us. They matched us with the perfect brand within weeks, guided us through every step, and their expert market analysis gave us complete confidence in our investment decision.",
    stat: "4",
    statLabel: "Capital Invested (cr)",
    name: "Rohan M.",
    company: "First-time Franchise Investor",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote: "The team at Franchise Broker made the entire process seamless. From shortlisting brands to finalising the deal, their transparency and support were unmatched. We're already seeing returns ahead of schedule.",
    stat: "6",
    statLabel: "Capital Invested (cr)",
    name: "Sara K.",
    company: "Restaurant Franchise Owner",
    avatar: "/image2.jpg",
  },
  {
    quote: "I was sceptical at first, but Franchise Broker's curated portfolio and deep market insights helped me identify an opportunity I would never have found on my own. Highly recommend to any serious investor.",
    stat: "3",
    statLabel: "Capital Invested (cr)",
    name: "Imran T.",
    company: "Multi-Brand Investor",
    avatar: "/image3.jpg",
  },
  {
    quote: "Working with Franchise Broker felt like having a trusted partner by my side. They understood my goals, presented the right options, and ensured I made an informed decision every step of the way.",
    stat: "5",
    statLabel: "Capital Invested (cr)",
    name: "Nadia A.",
    company: "Franchise Investor",
    avatar: "/image4.jpg",
  },
];

const faqs = [
  {
    question: "What is the minimum investment required to start a franchise?",
    answer:
      "Minimum investment varies widely by brand and industry, typically ranging from a couple of crores for smaller quick-service formats to significantly more for larger dine-in concepts. We help you shortlist brands that match your budget.",
  },
  {
    question: "How does Franchise Broker select which brands to work with?",
    answer:
      "Every brand goes through a due-diligence review covering financial health, unit economics, and franchisee support before it's added to our curated portfolio.",
  },
  {
    question: "How long does the franchise matching process take?",
    answer:
      "Most investors receive a shortlisted set of matching opportunities within 30 days, though timelines can vary based on your requirements and target market.",
  },
  {
    question: "Do you charge investors any fees?",
    answer:
      "Our advisory services are free for investors — we're compensated by the franchisor once a deal is successfully closed.",
  },
  {
    question: "What support do you provide after the deal is signed?",
    answer:
      "We continue supporting you through site selection, financial modeling, and operational onboarding well after the agreement is finalized.",
  },
  {
    question: "Can I invest in a franchise outside my home state?",
    answer:
      "Yes. We work with brands and investors across multiple states and can help you evaluate market-specific growth potential wherever you want to invest.",
  },
];

function ArrowIcon({ color = "#111" }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="12"
      fill="none"
      viewBox="0 0 14 12"
    >
      <path
        fill={color}
        d="M1 5.25a.75.75 0 0 0 0 1.5v-1.5Zm12.53 1.28a.75.75 0 0 0 0-1.06L8.757.697a.75.75 0 1 0-1.06 1.06L11.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06L13.53 6.53ZM1 6.75h12v-1.5H1v1.5Z"
      />
    </svg>
  );
}
