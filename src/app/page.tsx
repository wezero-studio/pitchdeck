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
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85"
                alt="Restaurant Franchise Opportunities"
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
              <div className="hero-line-1" style={{ whiteSpace: "nowrap" }}>Curated Restaurant</div>
              <div className="hero-line-2" style={{ whiteSpace: "nowrap" }}>Franchise Portfolio</div>
              <div className="hero-line-3">in Pakistan</div>
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
                A carefully selected portfolio of high-performing food and beverage franchises in Pakistan, prepared exclusively for our UK investor partners. Review key metrics, investments, and robust ROI projections below.
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


            </div>
          </div>
        </div>


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
            Partnering with Pakistan's leading food franchises
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
                    lineHeight: 1.1
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
                margin: 0
              }}>
                Top franchise opportunities CURATED FOR YOU
              </h2>
            </div>
            <div style={{ maxWidth: 300 }}>
              <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
                Explore our curated selection of high-performing franchise brands ready for investment.
              </p>
            </div>
          </div>

          <div className="brand-list-container">
            {[
              {
                initials: "CC",
                name: "Chopped Chips",
                investment: "£85,000",
                industry: "Food & Beverage",
                link: "#",
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
                reviews: "4.8",
                reviewsCount: "1.2k",
                followers: "15k",
                sales: "£180,000 / yr",
                roi: "18%"
              },
              {
                initials: "EN",
                name: "Enaari",
                investment: "£150,000",
                industry: "Fine Dining",
                link: "#",
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
                reviews: "4.9",
                reviewsCount: "850",
                followers: "22k",
                sales: "£350,000 / yr",
                roi: "22%"
              },
              {
                initials: "LC",
                name: "The Last Crumb",
                investment: "£120,000",
                industry: "Dessert & Bakery",
                link: "#",
                image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
                reviews: "4.7",
                reviewsCount: "2.1k",
                followers: "45k",
                sales: "£280,000 / yr",
                roi: "20%"
              },
              {
                initials: "YI",
                name: "Yar Istanbul",
                investment: "£200,000",
                industry: "Restaurant",
                link: "#",
                image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80",
                reviews: "4.6",
                reviewsCount: "940",
                followers: "12k",
                sales: "£420,000 / yr",
                roi: "19%"
              },
              {
                initials: "AR",
                name: "Artisan",
                investment: "£140,000",
                industry: "Restaurant",
                link: "#",
                image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
                reviews: "4.8",
                reviewsCount: "1.5k",
                followers: "18k",
                sales: "£310,000 / yr",
                roi: "21%"
              },
              {
                initials: "SS",
                name: "Soft Swirl",
                investment: "£90,000",
                industry: "Dessert & Ice Cream",
                link: "#",
                image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
                reviews: "4.9",
                reviewsCount: "3.2k",
                followers: "50k",
                sales: "£200,000 / yr",
                roi: "25%"
              },
              {
                initials: "SD",
                name: "Saadi di Sajji",
                investment: "£160,000",
                industry: "Restaurant",
                link: "#",
                image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
                reviews: "4.5",
                reviewsCount: "1.1k",
                followers: "9k",
                sales: "£360,000 / yr",
                roi: "17%"
              },
              {
                initials: "CP",
                name: "Cafe Praha",
                investment: "£130,000",
                industry: "Cafe",
                link: "#",
                image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
                reviews: "4.7",
                reviewsCount: "1.8k",
                followers: "28k",
                sales: "£290,000 / yr",
                roi: "22%"
              },
              {
                initials: "CK",
                name: "Chai Khaana",
                investment: "£75,000",
                industry: "Cafe",
                link: "#",
                image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
                reviews: "4.8",
                reviewsCount: "4.5k",
                followers: "65k",
                sales: "£150,000 / yr",
                roi: "24%"
              },
              {
                initials: "FB",
                name: "The Fat Boy",
                investment: "£110,000",
                industry: "Restaurant",
                link: "#",
                image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
                reviews: "4.6",
                reviewsCount: "820",
                followers: "11k",
                sales: "£250,000 / yr",
                roi: "21%"
              }
            ].map((brand, i) => {
              const secondaryImages = [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
              ];
              return (
              <div key={i} className="brand-card-item" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: i % 2 !== 0 ? 'row-reverse' : 'row', gap: 64, marginBottom: 120 }}>
                
                {/* Left: Info */}
                <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", marginTop: 16 }}>
                  <div style={{ marginBottom: 24, background: "#f4f5f7", padding: "16px", borderRadius: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", height: 72, width: 96, fontSize: 24, fontWeight: 900, color: "#111" }}>
                    {brand.initials}
                  </div>
                  
                  <h3 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 900, marginBottom: 16, letterSpacing: "-0.5px" }}>{brand.name}</h3>
                  <p style={{ color: "#555", fontSize: 16, lineHeight: 1.6, marginBottom: 24, maxWidth: "90%" }}>
                    A highly profitable and rapidly growing franchise brand with an established customer base.
                  </p>
                  
                  {/* Social/Reviews Row - Highlighted Cards */}
                  <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
                    <div style={{ flex: "1 1 140px", display: "flex", alignItems: "center", gap: 12, padding: "16px", background: "#fff", border: "1.5px solid #eaeaea", borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.04)" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#fefae0", display: "flex", alignItems: "center", justifyContent: "center", color: "#ca8a04", fontSize: 22, flexShrink: 0 }}>★</div>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: "#111", lineHeight: 1 }}>{brand.reviews}</div>
                        <div style={{ fontSize: 13, color: "#666", marginTop: 4, fontWeight: 500 }}>{brand.reviewsCount} reviews</div>
                      </div>
                    </div>
                    
                    <div style={{ flex: "1 1 140px", display: "flex", alignItems: "center", gap: 12, padding: "16px", background: "#fff", border: "1.5px solid #eaeaea", borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.04)" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#f4f5f7", display: "flex", alignItems: "center", justifyContent: "center", color: "#111", flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: "#111", lineHeight: 1 }}>{brand.followers}</div>
                        <div style={{ fontSize: 13, color: "#666", marginTop: 4, fontWeight: 500 }}>Followers</div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 24px", marginBottom: 40, padding: "24px", background: "#f9fafb", borderRadius: 20 }}>
                    <div>
                      <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Industry</div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>{brand.industry}</div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Investment Needed</div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>{brand.investment}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Projected Sales</div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>{brand.sales}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Est. ROI</div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "#3dba44" }}>{brand.roi}</div>
                    </div>
                  </div>

                  <div>
                    <a
                      href={brand.link}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        background: "#3dba44",
                        borderRadius: 999,
                        padding: "16px 32px",
                        fontSize: 14,
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
                </div>

                {/* Right: Collage */}
                <div style={{ flex: "1 1 500px", minHeight: 500, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(5, 1fr)", gap: 12 }}>
                  {/* Tall Left */}
                  <div style={{ gridColumn: "1 / 2", gridRow: "1 / 3", borderRadius: 20, overflow: "hidden" }}>
                    <img src={secondaryImages[(i + 1) % 7]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  {/* Top Mid */}
                  <div style={{ gridColumn: "2 / 3", gridRow: "1 / 2", borderRadius: 12, overflow: "hidden" }}>
                    <img src={secondaryImages[(i + 2) % 7]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  {/* Top Right */}
                  <div style={{ gridColumn: "3 / 4", gridRow: "1 / 2", borderRadius: 12, overflow: "hidden" }}>
                    <img src={secondaryImages[(i + 3) % 7]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  {/* Large Center (Brand Image) */}
                  <div style={{ gridColumn: "2 / 4", gridRow: "2 / 4", borderRadius: 24, overflow: "hidden", zIndex: 2, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                    <img src={brand.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  {/* Small Left */}
                  <div style={{ gridColumn: "1 / 2", gridRow: "3 / 4", borderRadius: 12, overflow: "hidden" }}>
                    <img src={secondaryImages[(i + 4) % 7]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  {/* Mid Right Tall */}
                  <div style={{ gridColumn: "4 / 5", gridRow: "2 / 4", borderRadius: 16, overflow: "hidden" }}>
                    <img src={secondaryImages[(i + 5) % 7]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  {/* Bottom Mid Tall */}
                  <div style={{ gridColumn: "2 / 3", gridRow: "4 / 6", borderRadius: 20, overflow: "hidden" }}>
                    <img src={secondaryImages[(i + 6) % 7]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  {/* Bottom Right Large-ish */}
                  <div style={{ gridColumn: "3 / 5", gridRow: "4 / 6", borderRadius: 20, overflow: "hidden", marginTop: 24 }}>
                    <img src={secondaryImages[(i) % 7]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>

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
            margin: 0
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
              margin: "0 0 24px"
            }}>
              Your Investment Roadmap
            </h2>
            <p style={{ color: "#666", fontSize: 16, lineHeight: 1.7, maxWidth: 440, marginBottom: 32 }}>
              From initial selection to your first dividend payout, we handle the complexities of cross-border franchise investment.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
              {[
                { step: "01", title: "Select Brand", desc: "Review financials and lock in the territory." },
                { step: "02", title: "Due Diligence", desc: "Legal structuring and profit repatriation setup for UK investors." },
                { step: "03", title: "Buildout & Hiring", desc: "Handled seamlessly by the verified local franchise team." },
                { step: "04", title: "Launch & Returns", desc: "Store opening and transparent monthly dividend distributions." }
              ].map((item) => (
                <div key={item.step} style={{ display: "flex", gap: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#3dba44", flexShrink: 0, marginTop: 2 }}>{item.step}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 15, color: "#666", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
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
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
                alt="Restaurant dining experience"
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
    question: "Can I repatriate my profits back to the UK?",
    answer:
      "Yes. Pakistan's foreign investment laws allow for 100% repatriation of capital, profits, and dividends for foreign investors, provided the initial investment is properly registered through authorized banking channels.",
  },
  {
    question: "Do I need to be in Pakistan to manage the restaurant?",
    answer:
      "No. We prioritize franchise opportunities that offer turnkey management or connect you with verified local operating partners. You will receive transparent monthly reporting while they handle daily operations.",
  },
  {
    question: "How is my £250,000 budget best allocated?",
    answer:
      "Depending on the brand, £250K can fund a single flagship location for a premium brand, or 2-3 locations for smaller quick-service or cafe formats, providing instant portfolio diversification.",
  },
  {
    question: "Why invest in the Pakistani food sector?",
    answer:
      "Pakistan has a booming, food-loving middle class and a massive youth demographic. Combined with significantly lower operating, labor, and real estate costs compared to the UK, the profit margins and ROI potential are exceptionally high.",
  },
  {
    question: "How does Franchise Broker select which brands to pitch?",
    answer:
      "Every brand goes through rigorous due-diligence covering financial health, unit economics, supply chain stability, and franchisee support before we present it to our international investors.",
  },
  {
    question: "What support do you provide after the deal is signed?",
    answer:
      "We act as your local representatives, supporting you through legal structuring, site selection verification, financial modeling, and ensuring smooth operational onboarding with the franchisor.",
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
