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

type BrandPhoto = { src: string; w: number; h: number };

type BrandData = {
  logo: string;
  name: string;
  investment: string;
  industry: string;
  link: string;
  instagram?: string;
  image: string;
  reviews: string;
  reviewsCount: string;
  followers: string;
  sales: string;
  roi: string;
  logoStyle?: React.CSSProperties;
  logoNoBox?: boolean;
  photos?: BrandPhoto[];
  photoFallback?: string[];
};

// Fills the 8 collage slots — [hero, tallLeft, topMid, topRight, smallLeft,
// midRightTall, bottomMidTall, bottomRight] — with real photos first, widest
// ones going to the two big landscape-ish boxes (hero, bottomRight) and
// narrower ones to the tall boxes. Each real photo is used at most once —
// no duplicates. Once real photos run out, remaining slots (least visually
// prominent first) are filled from the fallback stock list.
function buildCollageSlots(photos: BrandPhoto[], fallback: string[]): string[] {
  const real = [...photos].sort((a, b) => b.w / b.h - a.w / a.h).map((p) => p.src);
  const slotsByPriority = [0, 7, 1, 5, 6, 2, 3, 4];
  const slots: string[] = new Array(8);
  slotsByPriority.forEach((slot, i) => {
    slots[slot] = i < real.length ? real[i] : fallback[(i - real.length) % fallback.length];
  });
  return slots;
}

const curatedBrands = [
  /*
  {
    name: "The Fat Boy",
    logo: "/thefatboy.png",
    logoNoBox: false,
    desc: [
      "From operational foundations to scalable franchising, we help culinary concepts evolve into High-Yield Destinations, where true value is defined by quality, consistency, and market dominance.",
      "By building strong, centralized operating systems, we reduce dependency on third-party aggregators, strengthen direct consumer channels, and protect your profit margins."
    ],
    price: "4cr",
    sales: "1-5L",
    profit: "15-25L",
    ownership: "50/50 Partnership or Franchise",
    dealTooltip: "Feedboy (Fat Boy) offers a 50/50 Partnership (~4 crore) where they run everything and split profit 50/50. Or choose full franchise rights (like KFC).",
    instagram: "https://www.instagram.com/thefatboylahore/?hl=en",
    rating: "4.6",
    reviews: "820 reviews",
    photos: [
      "/thefatboy/img1.jpg", "/thefatboy/img2.jpg", "/thefatboy/img1.jpg", "/thefatboy/img2.jpg", "/thefatboy/img1.jpg"
    ],
    marqueePhotos: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    name: "Chop Chips",
    logo: "/chopchips.png",
    logoNoBox: false,
    desc: [
      "From operational foundations to scalable franchising, we help culinary concepts evolve into High-Yield Destinations, where true value is defined by quality, consistency, and market dominance.",
      "By building strong, centralized operating systems, we reduce dependency on third-party aggregators, strengthen direct consumer channels, and protect your profit margins."
    ],
    price: "3cr",
    sales: "1-4L",
    profit: "10-17L",
    ownership: "Franchise Only",
    dealTooltip: "Only franchise model. Investor buys rights, runs own branch, covers staff/kitchen, pays ~10% royalty. Single branch only.",
    instagram: "https://www.instagram.com/chopchips.pk/",
    rating: "4.8",
    reviews: "1.2k reviews",
    photos: [
      "/chopchips/img2.jpg", "/chopchips/img3.jpg", "/chopchips/img4.jpg", "/chopchips/img5.jpg", "/chopchips/img6.jpg", "/chopchips/img7.jpg"
    ],
    marqueePhotos: [
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80"
    ]
  },
  */
  {
    name: "Ottoman Kitchen",
    logo: "/ottoman/logo.jpg",
    logoNoBox: false,
    logoStyle: { objectFit: "contain", transform: "scale(1.15)" } as React.CSSProperties,
    desc: [
      "Turkish Restaurant",
      "One branch. Buy a Franchise."
    ],
    price: "5cr",
    sales: "2.5-7L",
    profit: "20-30L",
    ownership: "Franchise Only",
    dealTooltip: "Franchise model. Investor buys rights, runs own branch, covers staff/kitchen, pays ~10% royalty. Single branch only.",
    isBestPick: false,
    instagram: "https://www.instagram.com/ottomankitchen.isb/",
    rating: "4.7",
    reviews: "820 reviews",
    staffInfo: [
      { role: "Head Chef", count: "TBD" },
      { role: "Management", count: "TBD" },
      { role: "Kitchen Staff", count: "TBD" },
      { role: "Total Staff", count: "TBD" },
    ],
    photos: [
      "/ottoman/img2.jpg", "/ottoman/img3.jpg", "/ottoman/img4.jpg", "/ottoman/img5.jpg", "/ottoman/img6.jpg", "/ottoman/img7.jpg"
    ],
    marqueePhotos: [
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    name: "Yer istanbul",
    logo: "/yeristanbul.jpg",
    logoNoBox: true,
    logoStyle: { objectFit: "contain" } as React.CSSProperties,
    desc: [
      <span key="1">
        <span className="hidden md:inline">From operational foundations to scalable franchising, we help culinary concepts evolve into High-Yield Destinations, where true value is defined by quality, consistency, and market dominance.</span>
        <span className="md:hidden">We evolve culinary concepts into High-Yield Destinations defined by quality and market dominance.</span>
      </span>,
      "Our centralized operating systems strengthen direct channels and protect your profit margins."
    ],
    price: "5.5cr-6cr",
    sales: "2.5-9L",
    profit: "25-35L",
    ownership: "100% Shares / Full Rights",
    dealTooltip: "100% shares and full franchising rights. You can sub-franchise and sell branches to others. Most profitable opportunity.",
    isBestPick: true,
    instagram: "https://www.instagram.com/yeristanbulisb/?hl=en",
    rating: "4.6",
    reviews: "940 reviews",
    staffInfo: [
      { role: "Head Chef", count: "1 + 1 backup" },
      { role: "Management", count: "1 Head Manager + Associate Managers" },
      { role: "Main Staff", count: "25 (11–12 Kitchen · 13–14 Waiting & Cleaning)" },
      { role: "Backup Staff", count: "6–7 backup · ~31 total" },
    ],
    photos: [
      "/yeristanbul/img1.jpg", "/yeristanbul/img2.jpg", "/yeristanbul/img3.jpg", "/yeristanbul/img4.jpg", "/yeristanbul/img5.jpg", "/yeristanbul/img6.jpg"
    ],
    marqueePhotos: [
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    name: "Basha Istanbul",
    logo: "/basha istanbul/logo.png",
    logoNoBox: true,
    logoStyle: { objectFit: "contain" } as React.CSSProperties,
    desc: [
      "Franchise Turkish Restaurant"
    ],
    price: "7-8cr",
    sales: "2.5-7.5L",
    profit: "22-33L",
    ownership: "Franchise Only",
    dealTooltip: "Franchise model. Investor buys rights, runs own branch, covers staff/kitchen, pays ~10% royalty. Single branch only.",
    isBestPick: false,
    instagram: "https://www.instagram.com/bashaistanbulpk/?hl=en",
    rating: "4.7",
    reviews: "820 reviews",
    staffInfo: [
      { role: "Head Chef", count: "TBD" },
      { role: "Management", count: "TBD" },
      { role: "Kitchen Staff", count: "TBD" },
      { role: "Total Staff", count: "TBD" },
    ],
    photos: [
      "/basha istanbul/img2.jpg", "/basha istanbul/img3.jpg", "/basha istanbul/img4.jpg", "/basha istanbul/img6.jpg", "/basha istanbul/img7.jpg", "/basha istanbul/img8.jpg"
    ],
    marqueePhotos: [
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=600&q=80"
    ]
  }
];


function useIntersectionObserver(threshold = 0.15) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, isIntersecting] as const;
}

export default function Home() {
  // Mobile carousel (state kept for future use)

  // Desktop scroll-reveal
  const brandRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [visibleBrands, setVisibleBrands] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    brandRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleBrands((prev) => new Set(prev).add(idx));
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const [section2Ref, section2Visible] = useIntersectionObserver();
  const [statsHeadingRef, statsHeadingVisible] = useIntersectionObserver();
  const [optionsHeadingRef, optionsHeadingVisible] = useIntersectionObserver();
  const [faqHeadingRef, faqHeadingVisible] = useIntersectionObserver();
  const [ctaHeadingRef, ctaHeadingVisible] = useIntersectionObserver();

  // Mobile-only: "Our Curated Picks" horizontal scroll-jacked card carousel.
  // Each brand gets a tall wrapper (extra scroll room) with a sticky, fixed-
  // height viewport inside it; the card track's translateX is driven 1:1 by
  // how far you've scrolled through that wrapper, so cards slide left as you
  // scroll down and the section releases once you reach the last card.
  const curatedWrapperRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const curatedTrackRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    function updateCuratedScroll() {
      curatedWrapperRefs.current.forEach((wrapper, i) => {
        const track = curatedTrackRefs.current[i];
        if (!wrapper || !track) return;
        // The sticky pinned element (heading + card track) is no longer
        // forced to viewport height — it releases once the wrapper runs out
        // of room for *its own* height, not the full viewport.
        const stickyEl = wrapper.firstElementChild as HTMLElement | null;
        const stickyHeight = stickyEl ? stickyEl.getBoundingClientRect().height : window.innerHeight;
        const rect = wrapper.getBoundingClientRect();
        const scrollableRange = rect.height - stickyHeight;
        let progress = scrollableRange > 0 ? -rect.top / scrollableRange : 0;
        progress = Math.min(1, Math.max(0, progress));
        const cardCount = track.children.length;
        track.style.transform = `translateX(-${progress * (cardCount - 1) * 100}vw)`;
      });
      ticking = false;
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateCuratedScroll);
      }
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    updateCuratedScroll();
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [expandedBrand, setExpandedBrand] = useState<number | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111",
        fontFamily: "Fraunces, serif",
      }}
    >
      {/* ── HERO ── */}
      <style>{`
        @keyframes sliceUp {
          0% {
            transform: translateY(110%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-slice-up {
          animation: sliceUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform: translateY(110%);
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .slice-hidden {
          transform: translateY(110%);
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .tooltip-container:hover .tooltip-content,
        .tooltip-container:active .tooltip-content {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translateY(0) !important;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .brand-list-row {
          border-top: 1px solid #e5e5e5;
          padding: 28px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: background 0.3s ease, padding 0.3s ease;
          border-radius: 0;
          background: transparent;
        }
        .brand-list-row:hover {
          background: #111;
          padding: 28px 32px;
          border-radius: 8px;
          border-top-color: transparent;
          margin-top: -1px;
        }
        .brand-list-row:hover .row-name,
        .brand-list-row:hover .row-tag,
        .brand-list-row:hover .row-num {
          color: #fff !important;
        }
        .brand-list-row:hover .row-arrow {
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }
      `}</style>
      <main
        id="home"
        style={{
          width: "100%",
          minHeight: "100svh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85"
          alt="Paisana Living Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        {/* Gradient Overlay for Text Readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.5) 100%)",
            zIndex: 1,
          }}
        />

        {/* Header Navigation */}
        <header
          style={{
            position: "relative",
            zIndex: 2,
            padding: "32px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpeg" alt="Polaris Commercials" style={{ height: "48px", width: "auto", objectFit: "contain", mixBlendMode: "lighten" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <a
              href="#get-started"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#737373", // grey color
                backdropFilter: "blur(8px)",
                borderRadius: "4px",
                padding: "15px 28px",
                fontSize: 15,
                fontWeight: 400,
                fontFamily: "var(--font-playfair), serif",
                color: "#fff",
                textDecoration: "none",
                transition: "background 0.3s ease",
              }}
            >
              Get Started
            </a>
            <a
              href="#get-started"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                background: "#737373", // grey color
                backdropFilter: "blur(8px)",
                borderRadius: "50%",
                color: "#fff",
                textDecoration: "none",
                transition: "background 0.3s ease",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </header>

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 48px 80px",
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(3rem, 5.5vw, 6.5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "#f4f4f4",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            <div style={{ overflow: "hidden" }}><div className="animate-slice-up whitespace-normal md:whitespace-nowrap">Curated Restaurant</div></div>
            <div style={{ overflow: "hidden" }}><div className="animate-slice-up delay-100 whitespace-normal md:whitespace-nowrap">Franchise Portfolio</div></div>
            <div style={{ overflow: "hidden" }}>
              <div className="animate-slice-up delay-200 whitespace-normal md:whitespace-nowrap">
                <span style={{ fontStyle: "italic", paddingRight: "4px" }}>in</span> <span style={{ fontStyle: "italic" }}>Pakistan</span>
              </div>
            </div>
          </h1>
        </div>
      </main>

      {/* ── SECTION 2: Subtext & Visuals ── */}
      <section
        ref={section2Ref}
        style={{
          backgroundColor: "#fff",
          padding: "160px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "80px",
          color: "#111",
        }}
      >
        <div style={{ maxWidth: "1200px", textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ overflow: "hidden" }}>
            <p className={section2Visible ? "animate-slice-up delay-100" : "slice-hidden"} style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 3.8vw, 3.2rem)", lineHeight: 1.35, fontWeight: 400, margin: 0 }}>
              A carefully selected portfolio of high-performing food and beverage franchises in Pakistan, prepared exclusively for our UK investor partners. <span style={{ fontStyle: "italic" }}>Review key metrics, investments, and robust ROI projections below.</span>
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
          <div style={{ overflow: "hidden", padding: "8px" }}>
            <div className={section2Visible ? "animate-slice-up delay-200" : "slice-hidden"} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <img src="/cafepraha/img1.jpg" alt="Cafe Praha" style={{ width: "120px", height: "64px", objectFit: "cover", borderRadius: "6px" }} />
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 3.8vw, 3.2rem)", fontWeight: 400 }}>High-Yield <span style={{ fontStyle: "italic" }}>Franchises</span></div>
            </div>
          </div>
          <div style={{ overflow: "hidden", padding: "8px" }}>
            <div className={section2Visible ? "animate-slice-up delay-300" : "slice-hidden"} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 3.8vw, 3.2rem)", fontWeight: 400 }}>Strategic <span style={{ fontStyle: "italic" }}>Positioning</span></div>
              <img src="/chaayekhana/img1.jpg" alt="Chai Khaana" style={{ width: "120px", height: "64px", objectFit: "cover", borderRadius: "6px" }} />
            </div>
          </div>
          <div style={{ overflow: "hidden", padding: "8px" }}>
            <div className={section2Visible ? "animate-slice-up delay-300" : "slice-hidden"} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <img src="/saadidisajji/img1.jpg" alt="Saadi di Sajji" style={{ width: "120px", height: "64px", objectFit: "cover", borderRadius: "6px" }} />
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 3.8vw, 3.2rem)", fontWeight: 400 }}>Proven Financial <span style={{ fontStyle: "italic" }}>Returns</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "40px 24px 80px 24px",
        }}
      >
        {/* Stats Row */}
        <div
          className="stats-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            alignItems: "center",
          }}
        >
          {[
            { target: 821, suffix: "+", label: "Brands Evaluated" },
            { target: 114, suffix: "", label: "Franchise Partners" },
            { target: 100, suffix: "%", label: "Guided Diligence" },
            { target: 6042, suffix: "+", label: "Investor Matches" },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center", padding: "12px 8px" }}>
                <div
                  style={{
                    fontSize: "clamp(2rem, 4vw, 4.2rem)",
                    fontWeight: 700,
                    letterSpacing: "-2px",
                    color: "#111",
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
                  }}
                >
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#444",
                    marginTop: 10,
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {stat.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div
                  className="stats-divider"
                  style={{ width: 1, height: 48, background: "#eaeaea", flexShrink: 0 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── OUR CURATED PICKS HEADER ── */}
        <div style={{ marginTop: 160, textAlign: "left", marginBottom: 80 }}>
          <h2 style={{ fontSize: "clamp(3rem, 5vw, 4rem)", fontFamily: "var(--font-playfair), serif", fontWeight: 400, color: "#111", margin: 0 }}>
            Our Curated <span style={{ fontStyle: "italic" }}>Picks</span>
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#555", marginTop: "16px", maxWidth: "600px" }}>
            Explore our top 3 highly vetted franchise opportunities yielding robust daily sales and maximum ROI.
          </p>
        </div>

        {/* ── CURATED BRANDS STICKY LIST ── */}
        <div>
          {curatedBrands.map((brand, idx) => (
            <div key={idx} style={{ marginBottom: 0 }}>
              {/* ── PER-BRAND IMAGE MARQUEE (3 rows) ── */}
              <div style={{ background: "#111", padding: "64px 0", overflow: "hidden", display: "flex", flexDirection: "column", gap: "20px", marginBottom: "80px", marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw" }}>
                {/* Row 1: left to right */}
                <div style={{ display: "flex", width: "max-content", animation: "marquee-right 35s linear infinite" }}>
                  {[...brand.marqueePhotos, ...brand.marqueePhotos].map((src, i) => {
                    // eslint-disable-next-line @next/next/no-img-element
                    return <img key={i} src={src} alt={brand.name} style={{ height: "220px", width: "340px", objectFit: "cover", borderRadius: "8px", margin: "0 10px" }} />
                  })}
                </div>
                {/* Row 2: right to left */}
                <div style={{ display: "flex", width: "max-content", animation: "marquee-left 35s linear infinite" }}>
                  {[...brand.marqueePhotos.slice().reverse(), ...brand.marqueePhotos.slice().reverse()].map((src, i) => {
                    // eslint-disable-next-line @next/next/no-img-element
                    return <img key={i} src={src} alt={brand.name} style={{ height: "220px", width: "340px", objectFit: "cover", borderRadius: "8px", margin: "0 10px" }} />
                  })}
                </div>
                {/* Row 3: left to right */}
                <div style={{ display: "flex", width: "max-content", animation: "marquee-right 35s linear infinite" }}>
                  {[...brand.marqueePhotos, ...brand.marqueePhotos].map((src, i) => {
                    // eslint-disable-next-line @next/next/no-img-element
                    return <img key={i} src={src} alt={brand.name} style={{ height: "220px", width: "340px", objectFit: "cover", borderRadius: "8px", margin: "0 10px" }} />
                  })}
                </div>
              </div>

              {/* Brand Info + Metrics Row (desktop only — see .curated-mobile-scroll below for mobile) */}
              <div className="curated-desktop-row" style={{ display: "flex", alignItems: "flex-start", gap: "64px", marginBottom: idx < curatedBrands.length - 1 ? "160px" : "80px", position: "relative", flexWrap: "wrap", paddingBottom: "80px" }}>

              {/* LEFT STICKY (INFO) */}
              <div style={{ flex: "1 1 350px", position: "sticky", top: "120px" }}>
                <div style={brand.logoNoBox ? { marginBottom: 24, display: "inline-flex", alignItems: "center", justifyContent: "flex-start" } : { marginBottom: 24, background: "#f4f5f7", borderRadius: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", height: 80, width: 96, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={brand.logo} alt={brand.name} style={brand.logoNoBox ? { maxHeight: 100, maxWidth: 160, objectFit: "contain", ...brand.logoStyle } : { width: "100%", height: "100%", objectFit: "cover", ...brand.logoStyle }} />
                </div>
                <h3 className={brand.isBestPick ? "gold-gradient-text" : ""} style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontFamily: "var(--font-playfair), serif", fontWeight: 400, margin: brand.isBestPick ? "0 0 12px 0" : "0 0 24px 0", letterSpacing: "-1px", ...(!brand.isBestPick ? { color: "#111" } : {}) }}>{brand.name}</h3>
                {brand.isBestPick && (
                  <div style={{ display: "inline-flex", padding: "6px 14px", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600, fontFamily: "var(--font-sans), sans-serif", letterSpacing: "0.5px", textTransform: "uppercase", border: "1.5px solid #111", color: "#111", background: "transparent", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    Investor Top Pick
                  </div>
                )}
                <div style={{ fontSize: "1.2rem", color: "#444", lineHeight: 1.6, maxWidth: "400px" }}>
                  {brand.desc.map((p, i) => (
                    <p key={i} style={{ marginBottom: 16 }}>{p}</p>
                  ))}
                </div>

              </div>

              {/* RIGHT SCROLLING (METRICS) */}
              <div style={{ flex: "1 1 50%", maxWidth: "560px", display: "flex", flexDirection: "column", gap: "24px" }}>

                {/* Metric Card: Staff Breakdown */}
                {brand.staffInfo && (
                  <div style={{ background: "#f4f5f7", padding: "32px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Staff Breakdown</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {brand.staffInfo.map((s: { role: string; count: string }, i: number) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #e8e8e8", padding: "12px 0", gap: 12 }}>
                          <span style={{ fontSize: "0.95rem", color: "#666", fontWeight: 500, flexShrink: 0 }}>{s.role}</span>
                          <span style={{ fontSize: "0.95rem", color: "#111", fontWeight: 600, textAlign: "right" }}>{s.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metric Card: Investment */}
                <div style={{ background: "#f4f5f7", padding: "32px", borderRadius: "8px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Investment Required</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 400, color: "#111", lineHeight: 1 }}>{brand.price}</div>
                    <div style={{ fontSize: "0.9rem", color: "#555", maxWidth: "200px", textAlign: "right", lineHeight: 1.4 }}>Initial capital needed to set up.</div>
                  </div>
                </div>

                {/* Metric Card: Daily Sales */}
                <div style={{ background: "#f4f5f7", padding: "32px", borderRadius: "8px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Average Daily Sales</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 400, color: "#111", lineHeight: 1 }}>{brand.sales}</div>
                    <div style={{ fontSize: "0.9rem", color: "#555", maxWidth: "200px", textAlign: "right", lineHeight: 1.4 }}>Expected daily turnover.</div>
                  </div>
                </div>

                {/* Metric Card: Monthly Net Profit */}
                <div style={{ background: "#f4f5f7", padding: "32px", borderRadius: "8px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Monthly Net Profit <span style={{ fontSize: "0.85rem", color: "#666", display: "block", fontFamily: "var(--font-sans), sans-serif", marginTop: 4 }}>(100% ownership)</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 400, color: "#111", lineHeight: 1 }}>{brand.profit}</div>
                    <div style={{ fontSize: "0.9rem", color: "#555", maxWidth: "200px", textAlign: "right", lineHeight: 1.4 }}>Take-home profit after all costs.</div>
                  </div>
                </div>

                {/* Metric Card: Ownership & Deal Type */}
                <div className="tooltip-container" style={{ position: "relative", background: "#f4f5f7", padding: "32px", borderRadius: "8px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
                  <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-playfair), serif", color: "#111", display: "flex", alignItems: "center", gap: "8px" }}>
                    Ownership Structure
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                    <div style={{ fontSize: "1.8rem", fontWeight: 400, color: "#111", lineHeight: 1.1, maxWidth: "200px" }}>{brand.ownership}</div>
                    <div style={{ fontSize: "0.9rem", color: "#555", maxWidth: "160px", textAlign: "right", lineHeight: 1.4 }}>Hover for terms</div>
                  </div>
                  <div className="tooltip-content" style={{ opacity: 0, visibility: "hidden", transform: "translateY(10px)", transition: "all 0.2s ease", position: "absolute", bottom: "110%", left: 0, width: "100%", fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.5, padding: "16px", background: "#fff", borderRadius: "8px", border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", zIndex: 10 }}>
                    {brand.dealTooltip}
                  </div>
                </div>

                {/* Social / Rating Row */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px", background: "#f4f5f7", padding: "32px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", color: "#444", fontSize: 22, flexShrink: 0 }}>★</div>
                    <div>
                      <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", lineHeight: 1 }}>{brand.rating}</div>
                      <div style={{ fontSize: 13, color: "#555", marginTop: 4, fontWeight: 600 }}>{brand.reviews}</div>
                    </div>
                  </div>

                  <a href={brand.instagram} target="_blank" rel="noopener noreferrer" style={{ flex: "1 1 200px", background: "#f4f5f7", padding: "32px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "16px", textDecoration: "none" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", color: "#444", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111", lineHeight: 1 }}>Instagram</div>
                      <div style={{ fontSize: 13, color: "#555", marginTop: 4, fontWeight: 600 }}>View Profile</div>
                    </div>
                  </a>
                </div>

              </div>
              </div>

              {/* Mobile only: heading + metric cards are both pinned together
                  (see the useEffect above), so nothing scrolls out of frame
                  before the cards appear — only the card track moves. */}
              <div className="curated-mobile-scroll" style={{ marginBottom: idx < curatedBrands.length - 1 ? "60px" : "40px" }}>
                <div ref={(el) => { curatedWrapperRefs.current[idx] = el; }} style={{ height: `${(brand.staffInfo ? 6 : 5) * 55}vh`, position: "relative" }}>
                  <div style={{ position: "sticky", top: "90px", transform: "translateZ(0)" }}>

                    {/* Heading — pinned alongside the cards, not scrolled past first */}
                    <div style={{ padding: "0 16px", marginBottom: 24 }}>
                      <div style={brand.logoNoBox ? { marginBottom: 24, display: "inline-flex", alignItems: "center", justifyContent: "flex-start" } : { marginBottom: 24, background: "#f4f5f7", borderRadius: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", height: 80, width: 96, overflow: "hidden" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={brand.logo} alt={brand.name} style={brand.logoNoBox ? { maxHeight: 100, maxWidth: 160, objectFit: "contain", ...brand.logoStyle } : { width: "100%", height: "100%", objectFit: "cover", ...brand.logoStyle }} />
                      </div>
                      <h3 className={brand.isBestPick ? "gold-gradient-text" : ""} style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontFamily: "var(--font-playfair), serif", fontWeight: 400, margin: brand.isBestPick ? "0 0 12px 0" : "0 0 24px 0", letterSpacing: "-1px", ...(!brand.isBestPick ? { color: "#111" } : {}) }}>{brand.name}</h3>
                      {brand.isBestPick && (
                        <div style={{ display: "inline-flex", padding: "6px 14px", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600, fontFamily: "var(--font-sans), sans-serif", letterSpacing: "0.5px", textTransform: "uppercase", border: "1.5px solid #111", color: "#111", background: "transparent", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                          Investor Top Pick
                        </div>
                      )}
                      {brand.desc[0] && (
                        <div style={{ fontSize: "1.2rem", color: "#444", lineHeight: 1.6 }}>
                          <p style={{ marginBottom: 0 }}>{brand.desc[0]}</p>
                        </div>
                      )}
                    </div>

                    {/* Card track */}
                    <div style={{ overflow: "hidden" }}>
                      <div ref={(el) => { curatedTrackRefs.current[idx] = el; }} style={{ display: "flex", willChange: "transform" }}>

                      {/* Card: Staff Breakdown */}
                      {brand.staffInfo && (
                        <div style={{ width: "100vw", flexShrink: 0, padding: "0 16px", boxSizing: "border-box" }}>
                          <div style={{ background: "#f4f5f7", padding: "32px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "20px" }}>
                            <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Staff Breakdown</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                              {brand.staffInfo.map((s: { role: string; count: string }, i: number) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #e8e8e8", padding: "12px 0", gap: 12 }}>
                                  <span style={{ fontSize: "0.95rem", color: "#666", fontWeight: 500, flexShrink: 0 }}>{s.role}</span>
                                  <span style={{ fontSize: "0.95rem", color: "#111", fontWeight: 600, textAlign: "right" }}>{s.count}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Card: Investment */}
                      <div style={{ width: "100vw", flexShrink: 0, padding: "0 16px", boxSizing: "border-box" }}>
                        <div style={{ background: "#f4f5f7", padding: "32px", borderRadius: "8px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Investment Required</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                            <div style={{ fontSize: "2.5rem", fontWeight: 400, color: "#111", lineHeight: 1 }}>{brand.price}</div>
                            <div style={{ fontSize: "0.9rem", color: "#555", maxWidth: "200px", textAlign: "right", lineHeight: 1.4 }}>Initial capital needed to set up.</div>
                          </div>
                        </div>
                      </div>

                      {/* Card: Daily Sales */}
                      <div style={{ width: "100vw", flexShrink: 0, padding: "0 16px", boxSizing: "border-box" }}>
                        <div style={{ background: "#f4f5f7", padding: "32px", borderRadius: "8px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Average Daily Sales</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                            <div style={{ fontSize: "2.5rem", fontWeight: 400, color: "#111", lineHeight: 1 }}>{brand.sales}</div>
                            <div style={{ fontSize: "0.9rem", color: "#555", maxWidth: "200px", textAlign: "right", lineHeight: 1.4 }}>Expected daily turnover.</div>
                          </div>
                        </div>
                      </div>

                      {/* Card: Monthly Net Profit */}
                      <div style={{ width: "100vw", flexShrink: 0, padding: "0 16px", boxSizing: "border-box" }}>
                        <div style={{ background: "#f4f5f7", padding: "32px", borderRadius: "8px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Monthly Net Profit <span style={{ fontSize: "0.85rem", color: "#666", display: "block", fontFamily: "var(--font-sans), sans-serif", marginTop: 4 }}>(100% ownership)</span></div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                            <div style={{ fontSize: "2.5rem", fontWeight: 400, color: "#111", lineHeight: 1 }}>{brand.profit}</div>
                            <div style={{ fontSize: "0.9rem", color: "#555", maxWidth: "200px", textAlign: "right", lineHeight: 1.4 }}>Take-home profit after all costs.</div>
                          </div>
                        </div>
                      </div>

                      {/* Card: Ownership & Deal Type */}
                      <div style={{ width: "100vw", flexShrink: 0, padding: "0 16px", boxSizing: "border-box" }}>
                        <div className="tooltip-container" style={{ position: "relative", background: "#f4f5f7", padding: "32px", borderRadius: "8px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-playfair), serif", color: "#111", display: "flex", alignItems: "center", gap: "8px" }}>
                            Ownership Structure
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                            <div style={{ fontSize: "1.8rem", fontWeight: 400, color: "#111", lineHeight: 1.1, maxWidth: "200px" }}>{brand.ownership}</div>
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.4, marginTop: 8 }}>{brand.dealTooltip}</div>
                        </div>
                      </div>

                      {/* Card: Social / Rating + Instagram */}
                      <div style={{ width: "100vw", flexShrink: 0, padding: "0 16px", boxSizing: "border-box" }}>
                        <div style={{ display: "flex", gap: "16px" }}>
                          <div style={{ flex: 1, background: "#f4f5f7", padding: "32px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "16px" }}>
                            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", color: "#444", fontSize: 22, flexShrink: 0 }}>★</div>
                            <div>
                              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", lineHeight: 1 }}>{brand.rating}</div>
                              <div style={{ fontSize: 13, color: "#555", marginTop: 4, fontWeight: 600 }}>{brand.reviews}</div>
                            </div>
                          </div>

                          <a href={brand.instagram} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: "#f4f5f7", padding: "32px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "16px", textDecoration: "none" }}>
                            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", color: "#444", flexShrink: 0 }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </div>
                            <div>
                              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111", lineHeight: 1 }}>Instagram</div>
                              <div style={{ fontSize: 13, color: "#555", marginTop: 4, fontWeight: 600 }}>View Profile</div>
                            </div>
                          </a>
                        </div>
                      </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIEW ALL OPTIONS – ACCORDION LIST ── */}
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "60px 48px 120px" }}>
        {/* Toggle button */}
        {/* Toggle button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 64, gap: "20px" }} ref={optionsHeadingRef}>
          <div style={{ overflow: "hidden" }}>
            <h2 className={optionsHeadingVisible ? "animate-slice-up delay-100" : "slice-hidden"} style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 400, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: "#111", margin: 0, letterSpacing: "-1px" }}>
              Explore Additional <span style={{ fontStyle: "italic" }}>Opportunities</span>
            </h2>
          </div>
          <p style={{ fontSize: "1.1rem", color: "#555", maxWidth: "600px", margin: 0, lineHeight: 1.6 }}>
            Browse through our extended catalogue of high-potential culinary franchises. We have carefully vetted numerous options, making sure there is an opportunity to fit every investment thesis.
          </p>
          <button
            onClick={() => { setShowAllOptions(!showAllOptions); setExpandedBrand(null); }}
            style={{
              background: "#111",
              color: "#fff",
              padding: "18px 40px",
              borderRadius: "999px",
              fontSize: "1.15rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            {showAllOptions ? "Hide Expanded Catalogue" : "View Expanded Catalogue"}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s ease", transform: showAllOptions ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </div>

        {showAllOptions && (
          <div>
            {/* List border bottom */}
            {([
              { logo: "/chopchips.png", name: "Chopped Chips", tag: "Food & Beverage", investment: "3cr", sales: "1-4L", profit: "10-17L", ownership: "Franchise Only", dealTooltip: "Investor buys rights, runs own branch, pays ~10% royalty.", instagram: "https://www.instagram.com/chopchips.pk/", rating: "4.8", reviews: "1.2k reviews", photos: ["/chopchips/img6.jpg", "/chopchips/img2.jpg", "/chopchips/images.jpg", "/chopchips/img4.jpg", "/chopchips/img5.jpg", "/chopchips/img3.jpg", "/chopchips/img7.jpg"] },
              { logo: "/enaarilogo.jpg", name: "Enaari", tag: "Fine Dining", investment: "£150,000", sales: "£350,000/yr", profit: "22%", ownership: "Franchise Only", dealTooltip: "Franchise model. Investor runs own branch and pays royalty.", instagram: "https://www.instagram.com/_enaari_/", rating: "4.9", reviews: "850 reviews", photos: [] },
              { logo: "/lastcrumb.jpg", name: "The Last Crumb", tag: "Dessert & Bakery", investment: "£120,000", sales: "£280,000/yr", profit: "20%", ownership: "Franchise Only", dealTooltip: "Franchise model. Investor runs own branch and pays royalty.", instagram: "https://www.instagram.com/lastcrumbcookiespakistan/?hl=en", rating: "4.7", reviews: "2.1k reviews", photos: ["/lastcrumb/img1.jpeg", "/lastcrumb/img2.jpg", "/lastcrumb/img3.jpg", "/lastcrumb/img4.jpg", "/lastcrumb/img5.jpg"] },
              { logo: "/artisan.png", name: "Artisan", tag: "Cafe & Roastery", investment: "£140,000", sales: "£310,000/yr", profit: "21%", ownership: "Franchise Only", dealTooltip: "Franchise model. Investor runs own branch and pays royalty.", instagram: "https://www.instagram.com/artisancoffeeroasterpk/?hl=en", rating: "4.8", reviews: "1.5k reviews", photos: ["/artisan/img2.jpg", "/artisan/img3.jpg", "/artisan/img4.jpg", "/artisan/img5.jpg", "/artisan/img6.webp", "/artisan/img7.jpg", "/artisan/img8.jpg"] },
              { logo: "/softswirl.jpg", name: "Soft Swirl", tag: "Dessert & Ice Cream", investment: "£90,000", sales: "£200,000/yr", profit: "25%", ownership: "Franchise Only", dealTooltip: "Franchise model. Investor runs own branch and pays royalty.", instagram: "https://www.instagram.com/softswirlpk/", rating: "4.9", reviews: "3.2k reviews", photos: ["/softswirl/img1.jpg", "/softswirl/img2.jpg", "/softswirl/img3.jpg", "/softswirl/img4.jpg"] },
              { logo: "/saadidisajji.jpg", name: "Saadi di Sajji", tag: "Restaurant", investment: "£160,000", sales: "£360,000/yr", profit: "17%", ownership: "Franchise Only", dealTooltip: "Franchise model. Investor runs own branch and pays royalty.", instagram: "https://www.instagram.com/saadidisajjipk/", rating: "4.5", reviews: "1.1k reviews", photos: ["/saadidisajji/img1.jpg", "/saadidisajji/img2.jpg", "/saadidisajji/img3.jpg", "/saadidisajji/img4.jpg", "/saadidisajji/img5.jpg"] },
              { logo: "/cafepraha.jpg", name: "Cafe Praha", tag: "Cafe", investment: "£130,000", sales: "£290,000/yr", profit: "22%", ownership: "Franchise Only", dealTooltip: "Franchise model. Investor runs own branch and pays royalty.", instagram: "https://www.instagram.com/caffepraha/?hl=en", rating: "4.7", reviews: "1.8k reviews", photos: ["/cafepraha/img1.jpg", "/cafepraha/img2.jpg", "/cafepraha/img3.jpg", "/cafepraha/img4.jpg", "/cafepraha/img5.jpg", "/cafepraha/img6.jpg", "/cafepraha/img7.jpg", "/cafepraha/img8.jpg"] },
              { logo: "/chaayekhana.jpg", name: "Chai Khaana", tag: "Cafe", investment: "£75,000", sales: "£150,000/yr", profit: "24%", ownership: "Franchise Only", dealTooltip: "Franchise model. Investor runs own branch and pays royalty.", instagram: "https://www.instagram.com/chaaye_khana/?hl=en", rating: "4.8", reviews: "4.5k reviews", photos: ["/chaayekhana/img1.jpg", "/chaayekhana/img2.jpeg", "/chaayekhana/img3.jpg", "/chaayekhana/img4.jpg", "/chaayekhana/img5.webp", "/chaayekhana/img6.jpg", "/chaayekhana/img7.jpg", "/chaayekhana/img8.jpg"] },
              { logo: "/thefatboy.png", name: "The Fat Boy", tag: "Restaurant", investment: "4cr", sales: "1-5L", profit: "15-25L", ownership: "50/50 or Franchise", dealTooltip: "50/50 Partnership (~4cr) or full franchise rights.", instagram: "https://www.instagram.com/thefatboylahore/?hl=en", rating: "4.6", reviews: "820 reviews", photos: ["/thefatboy/img1.jpg", "/thefatboy/img2.jpg"] },
            ]).map((brand, idx) => (
              <div key={idx}>
                {/* List Row */}
                <div
                  className="brand-list-row"
                  onClick={() => setExpandedBrand(expandedBrand === idx ? null : idx)}
                  role="button"
                  aria-expanded={expandedBrand === idx}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <span className="row-num" style={{ fontSize: "0.9rem", color: "#aaa", fontWeight: 500, minWidth: 32 }}>0{idx + 1}</span>
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: "#f4f5f7", overflow: "hidden", flexShrink: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={brand.logo} alt={brand.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <span className="row-name" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 400, color: "#111", letterSpacing: "-0.5px" }}>{brand.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <span className="row-tag" style={{ fontSize: 13, color: "#888", fontWeight: 500, display: "none" }}>{brand.tag}</span>
                    <span className="row-arrow" style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", color: "#444", flexShrink: 0, transition: "transform 0.25s ease", transform: expandedBrand === idx ? "rotate(45deg)" : "rotate(0)" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </span>
                  </div>
                </div>

                {/* Expanded Detail Panel */}
                <div style={{
                  display: "grid",
                  gridTemplateRows: expandedBrand === idx ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ 
                      padding: expandedBrand === idx ? "48px 0 80px" : "0", 
                      borderBottom: expandedBrand === idx ? "1px solid #e5e5e5" : "none",
                      opacity: expandedBrand === idx ? 1 : 0,
                      transition: "opacity 0.4s ease-out 0.1s, padding 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      visibility: expandedBrand === idx ? "visible" : "hidden"
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "64px", flexWrap: "wrap" }}>

                        {/* Left: Info */}
                        <div style={{ flex: "1 1 350px" }}>
                          <div style={{ marginBottom: 24, background: "#f4f5f7", borderRadius: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", height: 80, width: 96, overflow: "hidden" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={brand.logo} alt={brand.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <h3 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontFamily: "var(--font-playfair), serif", fontWeight: 400, margin: "0 0 24px 0", color: "#111", letterSpacing: "-1px" }}>{brand.name}</h3>
                          <p style={{ fontSize: "1.05rem", color: "#444", lineHeight: 1.6, maxWidth: "400px", marginBottom: 16 }}>A highly profitable franchise brand with an established customer base and proven market demand in Pakistan.</p>
                          <p style={{ fontSize: "1.05rem", color: "#444", lineHeight: 1.6, maxWidth: "400px" }}>By building strong, centralized operating systems, we reduce dependency on third-party aggregators and protect your margins.</p>
                        </div>

                        {/* Right: Metric Cards */}
                        <div style={{ flex: "1 1 50%", maxWidth: "560px", display: "flex", flexDirection: "column", gap: "16px" }}>
                          <div style={{ display: "flex", gap: 16 }}>
                            <div style={{ flex: 1, background: "#f4f5f7", padding: "28px", borderRadius: "8px", minHeight: "160px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                              <div style={{ fontSize: "1rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Investment</div>
                              <div style={{ fontSize: "2rem", fontWeight: 400, color: "#111" }}>{brand.investment}</div>
                            </div>
                            <div style={{ flex: 1, background: "#f4f5f7", padding: "28px", borderRadius: "8px", minHeight: "160px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                              <div style={{ fontSize: "1rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Avg. Daily Sales</div>
                              <div style={{ fontSize: "2rem", fontWeight: 400, color: "#111" }}>{brand.sales}</div>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 16 }}>
                            <div style={{ flex: 1, background: "#f4f5f7", padding: "28px", borderRadius: "8px", minHeight: "160px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                              <div style={{ fontSize: "1rem", fontFamily: "var(--font-playfair), serif", color: "#111" }}>Monthly Net Profit</div>
                              <div style={{ fontSize: "2rem", fontWeight: 400, color: "#111" }}>{brand.profit}</div>
                            </div>
                            <div className="tooltip-container" style={{ flex: 1, position: "relative", background: "#f4f5f7", padding: "28px", borderRadius: "8px", minHeight: "160px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
                              <div style={{ fontSize: "1rem", fontFamily: "var(--font-playfair), serif", color: "#111", display: "flex", alignItems: "center", gap: 6 }}>
                                Ownership
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                              </div>
                              <div style={{ fontSize: "1.2rem", fontWeight: 400, color: "#111" }}>{brand.ownership}</div>
                              <div className="tooltip-content" style={{ opacity: 0, visibility: "hidden", transform: "translateY(10px)", transition: "all 0.2s ease", position: "absolute", bottom: "110%", left: 0, width: "100%", fontSize: "0.9rem", color: "#4b5563", lineHeight: 1.5, padding: "14px", background: "#fff", borderRadius: "8px", border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10 }}>{brand.dealTooltip}</div>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 16 }}>
                            <div style={{ flex: 1, background: "#f4f5f7", padding: "28px", borderRadius: "8px", display: "flex", alignItems: "center", gap: 16 }}>
                              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", color: "#444", fontSize: 20, flexShrink: 0 }}>★</div>
                              <div>
                                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#111" }}>{brand.rating}</div>
                                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{brand.reviews}</div>
                              </div>
                            </div>
                            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: "#f4f5f7", padding: "28px", borderRadius: "8px", display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
                              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", color: "#444", flexShrink: 0 }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                              </div>
                              <div>
                                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111" }}>Instagram</div>
                                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>View Profile</div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom: Pictures Layout */}
                      <div style={{ width: "100%", marginTop: 64, position: "relative" }}>
                        {(() => {
                          const fallbackImages = [
                            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
                            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
                            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
                            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
                            "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
                            "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80",
                            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
                            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
                          ];
                          const pics = [0, 1, 2, 3, 4, 5, 6, 7].map(i => brand.photos?.[i] || fallbackImages[i]);
                          
                          return (
                            <div style={{ 
                              display: "grid", 
                              gridTemplateColumns: "repeat(12, 1fr)", 
                              gridTemplateRows: "repeat(5, 120px)", 
                              gap: 16 
                            }}>
                              {/* Top Left */}
                              <div style={{ gridColumn: "1 / 4", gridRow: "1 / 3", borderRadius: 16, overflow: "hidden" }}>
                                <img src={pics[1]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              
                              {/* Bottom Left */}
                              <div style={{ gridColumn: "1 / 4", gridRow: "3 / 6", borderRadius: 16, overflow: "hidden" }}>
                                <img src={pics[6]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              
                              {/* Top Mid-Left */}
                              <div style={{ gridColumn: "4 / 7", gridRow: "1 / 2", borderRadius: 12, overflow: "hidden" }}>
                                <img src={pics[2]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              
                              {/* Top Mid-Right */}
                              <div style={{ gridColumn: "7 / 10", gridRow: "1 / 2", borderRadius: 12, overflow: "hidden" }}>
                                <img src={pics[5]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              
                              {/* Large Center Main */}
                              <div style={{ gridColumn: "4 / 10", gridRow: "2 / 5", borderRadius: 24, overflow: "hidden", zIndex: 1, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                                <img src={pics[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              
                              {/* Bottom Mid */}
                              <div style={{ gridColumn: "5 / 9", gridRow: "5 / 6", borderRadius: 12, overflow: "hidden" }}>
                                <img src={pics[7]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              
                              {/* Top Right */}
                              <div style={{ gridColumn: "10 / 13", gridRow: "1 / 3", borderRadius: 16, overflow: "hidden" }}>
                                <img src={pics[3]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              
                              {/* Bottom Right */}
                              <div style={{ gridColumn: "10 / 13", gridRow: "3 / 6", borderRadius: 16, overflow: "hidden" }}>
                                <img src={pics[4]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Last divider */}
            <div style={{ borderBottom: "1px solid #e5e5e5" }} />
          </div>
        )}
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 160px", scrollMarginTop: 90 }}>
        <div style={{ overflow: "hidden", marginBottom: "48px" }} ref={faqHeadingRef}>
          <h2 className={faqHeadingVisible ? "animate-slice-up delay-100" : "slice-hidden"} style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(3rem, 5vw, 4rem)",
            fontWeight: 400,
            margin: 0,
            color: "#111"
          }}>
            Frequently Asked <span style={{ fontStyle: "italic" }}>Questions</span>
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
                    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    fontWeight: 400,
                    color: "#111",
                    fontFamily: "var(--font-playfair), serif",
                    letterSpacing: "-0.3px",
                    lineHeight: 1.3,
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
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* TOP: Text Content */}
        <div style={{ marginBottom: 80 }}>
          <h2 style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-2px",
            color: "#111",
            margin: "0 0 32px",
            maxWidth: 900
          }}>
            Your Investment <span style={{ fontStyle: "italic" }}>Roadmap</span>
          </h2>
          <p style={{ color: "#666", fontSize: 17, lineHeight: 1.7, maxWidth: 560, marginBottom: 48 }}>
            From initial selection to your first dividend payout, we handle the complexities of cross-border franchise investment.
          </p>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 48 }}>
            {[
              { step: "01", title: "Select Brand", desc: "Review financials and lock in the territory." },
              { step: "02", title: "Due Diligence", desc: "Legal structuring and profit repatriation setup for UK investors." },
              { step: "03", title: "Buildout & Hiring", desc: "Handled seamlessly by the verified local franchise team." },
              { step: "04", title: "Launch & Returns", desc: "Store opening and transparent monthly dividend distributions." }
            ].map((item) => (
              <div key={item.step} style={{ flex: "1 1 200px", paddingLeft: 20, borderLeft: "2px solid #e5e5e5" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#999", letterSpacing: "0.08em", marginBottom: 10 }}>{item.step}</div>
                <div style={{ fontSize: "1.15rem", fontFamily: "var(--font-playfair), serif", color: "#111", marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <a
            href="#get-started"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#111",
              borderRadius: 999,
              padding: "16px 32px",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Explore Now
            <ArrowIcon color="#fff" />
          </a>
        </div>

        {/* BOTTOM: Full-width image with caption */}
        <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: "clamp(400px, 50vw, 680px)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80"
            alt="Restaurant dining experience"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Dark gradient overlay at bottom */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
          {/* Caption text */}
          <div style={{ position: "absolute", bottom: 48, left: 48, right: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Investment Opportunity</p>
              <h3 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#fff", margin: 0, lineHeight: 1.2 }}>Begin your franchise journey<br /><span style={{ fontStyle: "italic" }}>across Pakistan.</span></h3>
            </div>
            <a
              href="#get-started"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 999,
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                textDecoration: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Get Started
              <ArrowIcon color="#fff" />
            </a>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpeg" alt="Polaris Commercials" style={{ width: "100px", objectFit: "contain", mixBlendMode: "multiply" }} />
          </Link>

          <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
            © {new Date().getFullYear()} Polaris Commercials. All rights reserved.
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

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        a:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}

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
    question: "How does Polaris Commercials select which brands to pitch?",
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
