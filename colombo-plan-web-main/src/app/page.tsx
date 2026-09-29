'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [newsItems, setNewsItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://   https://colombo-plan-full-production.up.railway.app/api/programs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPrograms(data);
        }
      })
      .catch((err) => console.error('Error fetching programs from backend:', err));

    fetch('http://   https://colombo-plan-full-production.up.railway.app/api/news-events')
      .then((res) => res.json())
      .then((data) => {
        const published = data.filter((item: any) => item.status === 'Published');
        const formatted = published.slice(0, 6).map((item: any) => ({
          category: `${item.category || 'News'} • ${item.publishDate || ''}`,
          title: item.title,
          desc: item.description || '',
          image: item.imageUrl
            ? (item.imageUrl.startsWith('http') ? item.imageUrl : `http://   https://colombo-plan-full-production.up.railway.app${item.imageUrl}`)
            : 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
          link: `/news-events/${item.slug || item.id}`,
        }));
        setNewsItems(formatted);
      })
      .catch((err) => console.error('Error fetching news from backend:', err));
  }, []);

  const audiences = [
    {
      title: (
        <>
          MEMBER
          <br />
          COUNTRIES
        </>
      ),
      desc: 'Explore member countries, programmes and regional resources',
      image:
        'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&auto=format&fit=crop&q=80',
      href: '/member-countries',
      icon: '🌏',
    },
    {
      title: (
        <>
          GOVERNMENT
          <br />
          INSTITUTIONS
        </>
      ),
      desc: 'Connect with government institutions and development initiatives',
      image:
        'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500&auto=format&fit=crop&q=80',
      href: '/government-institutions',
      icon: '🏛️',
    },
    {
      title: (
        <>
          PRIVATE
          <br />
          SECTOR
        </>
      ),
      desc: 'Workforce upskilling, partnerships and CSR opportunities',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=80',
      href: '/private-sector',
      icon: '💼',
    },
    {
      title: <>INDIVIDUALS</>,
      desc: 'Browse DDR courses and access archival records for research',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=80',
      href: '/individuals',
      icon: '👥',
    },
  ];

  const duplicatedNews = newsItems.length > 0 ? [...newsItems, ...newsItems, ...newsItems] : [];

  return (
    <main className="cp-home">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        * {
          box-sizing: border-box;
        }

        .cp-home {
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          color: #0f172a;
          font-family: Arial, Helvetica, sans-serif;

          background:
            radial-gradient(
              circle at 10% 10%,
              rgba(11, 31, 58, .16),
              transparent 28%
            ),
            radial-gradient(
              circle at 90% 15%,
              rgba(30, 90, 145, .18),
              transparent 28%
            ),
            radial-gradient(
              circle at 50% 75%,
              rgba(45, 112, 150, .12),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #f4f8fc 0%,
              #e8f0f7 50%,
              #f7fafc 100%
            );
        }

        .cp-shell {
          position: relative;
          z-index: 1;
          max-width: 1240px;
          margin: 0 auto;
          padding: 5px 16px 70px;
        }

        .cp-hero {
          min-height: 520px;
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          gap: 34px;
          align-items: center;
          position: relative;
          margin-bottom: 40px;
        }

        .cp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,.72);
          border: 1px solid rgba(30,90,145,.20);
          color: #0B2A4A;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.7px;
          text-transform: uppercase;
          box-shadow: 0 8px 25px rgba(11,31,58,.08);
          animation: cpFadeInDown 0.6s ease-out forwards;
        }

        .cp-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82a0;
          box-shadow: 0 0 0 0 rgba(20,184,166,.6);
          animation: cpPulse 2s infinite;
        }

        @keyframes cpBalancedSlideLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            filter: blur(0px);
          }
        }

        @keyframes cpFadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cp-title {
          margin: 14px 0 14px;
          font-size: clamp(42px, 6vw, 76px);
          line-height: .98;
          letter-spacing: -3px;
          font-weight: 900;
          background:
            linear-gradient(
              100deg,
              #0f172a 0%,
              #3730a3 42%,
              #1E5A91 78%,
              #2D6F96 100%
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: cpBalancedSlideLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .cp-title-accent {
          display: block;
          font-size: .42em;
          line-height: 1.2;
          letter-spacing: 2px;
          margin-top: 10px;
          background:
            linear-gradient(
              90deg,
              #164B78,
              #1E5A91
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .cp-intro {
          max-width: 680px;
          margin: 0 0 20px;
          color: #334155;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.75;
          animation: cpBalancedSlideLeft 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .cp-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          animation: cpFadeInDown 1s ease-out forwards;
        }

        .cp-btn {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 22px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .7px;
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .cp-btn:hover {
          transform: translateY(-4px);
        }

        .cp-btn-primary {
          color: white;
          background: linear-gradient(135deg, #07182D, #164B78);
          box-shadow: 0 14px 28px rgba(11,31,58,.25);
        }

        .cp-btn-secondary {
          color: #0B1F3A;
          background: rgba(255,255,255,.78);
          border: 1px solid rgba(11,31,58,.16);
          box-shadow: 0 10px 25px rgba(30,41,59,.07);
        }

        .cp-visual {
          min-height: 390px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cp-globe {
          width: min(330px, 72vw);
          aspect-ratio: 1;
          border-radius: 50%;
          position: relative;
          background:
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 40%),
            url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg');
          background-size: 200% 100%;
          background-color: #0B2A4A;
          box-shadow: inset -25px -25px 55px rgba(15,23,42,.6), inset 20px 15px 45px rgba(255,255,255,.2), 0 35px 70px rgba(11,31,58,.28);
          animation: cpMapScroll 25s linear infinite, cpGlobe 9s ease-in-out infinite;
          filter: drop-shadow(0 0 15px rgba(30,90,145,0.4));
        }

        .cp-ring {
          position: absolute;
          width: 390px;
          height: 150px;
          border: 1px solid rgba(79,70,229,.28);
          border-radius: 50%;
          transform: rotate(-18deg);
          animation: cpRing 7s linear infinite;
        }

        .cp-ring.two {
          width: 430px;
          height: 175px;
          transform: rotate(28deg);
          border-color: rgba(30,90,145,.22);
          animation-direction: reverse;
          animation-duration: 10s;
        }

        .cp-float-card {
          position: absolute;
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255,255,255,.82);
          border: 1px solid rgba(255,255,255,.9);
          box-shadow: 0 18px 35px rgba(11,31,58,.14);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          font-size: 12px;
          font-weight: 800;
          color: #334155;
          animation: cpCardFloat 4s ease-in-out infinite;
          z-index: 2;
        }

        .cp-float-card.a { top: 10%; right: 2%; }
        .cp-float-card.b { bottom: 12%; left: 0; animation-delay: -2s; }
        .cp-float-card span { display: block; font-size: 22px; color: #0B2A4A; margin-bottom: 4px; }

        .cp-glass {
          background: rgba(255,255,255,.85);
          border: 1px solid rgba(255,255,255,.95);
          box-shadow: 0 18px 45px rgba(11,31,58,.10);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }

        @keyframes cpFloatMotion {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .cp-floating-banner {
          animation: cpFloatMotion 4s ease-in-out infinite;
        }

        .cp-description {
          border-radius: 24px;
          padding: 28px 38px;
          text-align: center;
          margin-bottom: 25px;
        }

        .cp-description p {
          margin: 0;
          color: #0f172a;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.8;
        }

        .cp-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin: 0 0 50px;
        }

        .cp-stat {
          border-radius: 20px;
          padding: 24px 16px;
          text-align: center;
          transition: transform .25s ease;
        }

        .cp-stat:hover {
          transform: translateY(-6px);
        }

        .cp-stat strong {
          display: block;
          font-size: 34px;
          line-height: 1;
          margin-bottom: 8px;
          font-weight: 900;
          background: linear-gradient(90deg, #0B2A4A, #1E5A91);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .cp-stat span {
          color: #334155;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .cp-section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .cp-kicker {
          color: #1E5A91;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1.7px;
          text-transform: uppercase;
          margin-bottom: 7px;
        }

        .cp-section-heading h2 {
          margin: 0;
          font-size: 30px;
          letter-spacing: -.7px;
          color: #0f172a;
          font-weight: 900;
        }

        .cp-section-heading a {
          color: #0B2A4A;
          font-size: 13.5px;
          font-weight: 900;
          text-decoration: none;
        }

        .cp-audiences {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 60px;
        }

        .cp-audience {
          position: relative;
          min-height: 350px;
          padding: 18px;
          overflow: hidden;
          border-radius: 24px;
          text-decoration: none;
          color: white;
          box-shadow: 0 18px 35px rgba(11,31,58,.13);
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .cp-audience:hover {
          transform: translateY(-9px);
          box-shadow: 0 28px 50px rgba(11,31,58,.18);
        }

        .cp-audience img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s ease;
        }

        .cp-audience:hover img {
          transform: scale(1.08);
        }

        .cp-audience::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15,23,42,.1), rgba(15,23,42,.92));
        }

        .cp-audience-content {
          position: absolute;
          z-index: 2;
          left: 20px;
          right: 20px;
          bottom: 20px;
        }

        .cp-audience-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          margin-bottom: 14px;
          background: rgba(255,255,255,.22);
          border: 1px solid rgba(255,255,255,.35);
          backdrop-filter: blur(10px);
          font-size: 20px;
        }

        .cp-audience h3 {
          margin: 0 0 8px;
          font-size: 17px;
          font-weight: 900;
          line-height: 1.25;
          letter-spacing: .5px;
        }

        .cp-audience p {
          margin: 0;
          color: rgba(255,255,255,.92);
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.6;
        }

        .cp-impact {
          margin-bottom: 60px;
        }

        .cp-impact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .cp-impact-card {
          position: relative;
          min-height: 260px;
          padding: 30px;
          border-radius: 24px;
          overflow: hidden;
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .cp-impact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(11,31,58,.14);
        }

        .cp-impact-number {
          position: relative;
          z-index: 1;
          font-size: 46px;
          line-height: 1;
          font-weight: 900;
          margin-bottom: 16px;
          background: linear-gradient(90deg, #0B2A4A, #1E5A91);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .cp-impact-card h3 {
          position: relative;
          z-index: 1;
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 19px;
          font-weight: 900;
        }

        .cp-impact-card p {
          position: relative;
          z-index: 1;
          margin: 0 0 20px;
          color: #334155;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.7;
        }

        .cp-news {
          margin-bottom: 35px;
        }

        .cp-marquee {
          overflow: hidden;
          padding: 8px 0 25px;
          mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
        }

        .cp-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: cpMarquee 34s linear infinite;
        }

        .cp-track:hover {
          animation-play-state: paused;
        }

        .cp-news-card {
          width: 410px;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 22px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 16px 35px rgba(11,31,58,.10);
          transition: transform .25s ease;
        }

        .cp-news-card:hover {
          transform: translateY(-7px);
        }

        .cp-news-image {
          height: 215px;
          overflow: hidden;
        }

        .cp-news-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .5s ease;
        }

        .cp-news-card:hover .cp-news-image img {
          transform: scale(1.06);
        }

        .cp-news-body {
          padding: 24px;
        }

        .cp-news-meta {
          display: block;
          color: #1E5A91;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .8px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .cp-news-body h3 {
          margin: 0 0 10px;
          font-size: 18px;
          line-height: 1.4;
          color: #0f172a;
          font-weight: 900;
        }

        .cp-news-body p {
          margin: 0 0 18px;
          color: #334155;
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.65;
        }

        .cp-news-body a {
          color: #0B2A4A;
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 900;
        }

        .cp-news-empty {
          padding: 40px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
        }

        @keyframes cpPulse {
          70% { box-shadow: 0 0 0 9px rgba(20,184,166,0); }
          100% { box-shadow: 0 0 0 0 rgba(20,184,166,0); }
        }

        @keyframes cpGlobe {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }

        @keyframes cpMapScroll {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes cpRing {
          to { transform: rotate(342deg); }
        }

        @keyframes cpCardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes cpMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-66.666%); }
        }

        @media (max-width: 980px) {
          .cp-hero { grid-template-columns: 1fr; text-align: center; }
          .cp-intro { margin-left: auto; margin-right: auto; }
          .cp-actions { justify-content: center; }
          .cp-audiences, .cp-stats { grid-template-columns: repeat(2, 1fr); }
          .cp-impact-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .cp-shell { padding: 10px 12px 55px; }
          .cp-title { font-size: 46px; }
          .cp-audiences, .cp-stats, .cp-impact-grid { grid-template-columns: 1fr; }
          .cp-news-card { width: 330px; }
        }
      `,
        }}
      />

      <div className="cp-shell">

        {/* Hero */}
        <section className="cp-hero">
          <div className="cp-hero-copy">
            <div className="cp-eyebrow">
              <span className="cp-pulse" />
              South-to-South Cooperation
            </div>

            <h1 className="cp-title">
              THE COLOMBO
              <span className="cp-title-accent">
                PLAN SECRETARIAT
              </span>
            </h1>

            <p className="cp-intro">
              Connecting Asia and the Pacific through human resource
              development, knowledge sharing, capacity building and
              meaningful international partnerships.
            </p>

            <div className="cp-actions">
              <Link href="/about" className="cp-btn cp-btn-primary">
                EXPLORE THE COLOMBO PLAN →
              </Link>
              <Link href="/news-events" className="cp-btn cp-btn-secondary">
                LATEST UPDATES
              </Link>
            </div>
          </div>

          <div className="cp-visual" aria-hidden="true">
            <div className="cp-ring" />
            <div className="cp-ring two" />
            <div className="cp-globe" />
            <div className="cp-float-card a">
              <span>26</span>
              Member States
            </div>
            <div className="cp-float-card b">
              <span>1951</span>
              Founded
            </div>
          </div>
        </section>

        {/* Description with Floating Animation */}
        <section className="cp-description cp-floating-banner">
          <p>
            The Colombo Plan is an intergovernmental organisation of 26
            member states dedicated to human resource development and
            South-to-South cooperation across Asia and the Pacific,
            grounded in a spirit of self-help and mutual help.
          </p>
        </section>

        {/* Stats */}
        <section className="cp-stats" aria-label="Colombo Plan highlights">
          <div className="cp-stat cp-glass">
            <strong>26</strong>
            <span>Member States</span>
          </div>
          <div className="cp-stat cp-glass">
            <strong>70+</strong>
            <span>Years of Cooperation</span>
          </div>
          <div className="cp-stat cp-glass">
            <strong>6</strong>
            <span>Core Programmes</span>
          </div>
          <div className="cp-stat cp-glass">
            <strong>1951</strong>
            <span>Established</span>
          </div>
        </section>

        {/* Audience Section */}
        <section>
          <div className="cp-section-heading">
            <div>
              <div className="cp-kicker">Find your pathway</div>
              <h2>How can we help you?</h2>
            </div>
            <Link href="/about">Discover more →</Link>
          </div>

          <div className="cp-audiences">
            {audiences.map((item) => (
              <Link href={item.href} className="cp-audience" key={item.href}>
                <img src={item.image} alt="" />
                <div className="cp-audience-content">
                  <div className="cp-audience-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="cp-impact">
          <div className="cp-section-heading">
            <div>
              <div className="cp-kicker">Our impact</div>
              <h2>Building stronger communities together</h2>
            </div>
            <Link href="/programmes">Explore Programmes →</Link>
          </div>

          <div className="cp-impact-grid">
            <div className="cp-impact-card cp-glass">
              <div className="cp-impact-number">70+</div>
              <h3>Years of Cooperation</h3>
              <p>Supporting human resource development and strengthening South-to-South cooperation across Asia and the Pacific.</p>
              <Link href="/about">Learn More →</Link>
            </div>

            <div className="cp-impact-card cp-glass">
              <div className="cp-impact-number">26</div>
              <h3>Member Countries</h3>
              <p>Bringing member countries together through knowledge, experience, training and regional partnerships.</p>
              <Link href="/member-countries">View Members →</Link>
            </div>

            <div className="cp-impact-card cp-glass">
              <div className="cp-impact-number">6</div>
              <h3>Core Programmes</h3>
              <p>Delivering specialised programmes focused on capacity building, education, development and regional cooperation.</p>
              <Link href="/programmes">View Programmes →</Link>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="cp-news">
          <div className="cp-section-heading">
            <div>
              <div className="cp-kicker">Stay informed</div>
              <h2>What&apos;s New</h2>
            </div>
            <Link href="/news-events">View All News →</Link>
          </div>

          {newsItems.length === 0 ? (
            <p className="cp-news-empty">No published news yet. Add one from the admin panel to see it here.</p>
          ) : (
            <div className="cp-marquee">
              <div className="cp-track">
                {duplicatedNews.map((item, index) => (
                  <article className="cp-news-card" key={`${item.title}-${index}`}>
                    <div className="cp-news-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="cp-news-body">
                      <span className="cp-news-meta">{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                      <Link href={item.link}>READ ARTICLE →</Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}