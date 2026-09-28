'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const memberFlags = [
    { code: 'lk', name: 'Sri Lanka' },
    { code: 'in', name: 'India' },
    { code: 'au', name: 'Australia' },
    { code: 'nz', name: 'New Zealand' },
    { code: 'pk', name: 'Pakistan' },
    { code: 'ca', name: 'Canada' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'us', name: 'United States' },
    { code: 'jp', name: 'Japan' },
    { code: 'kr', name: 'South Korea' },
    { code: 'my', name: 'Malaysia' },
    { code: 'id', name: 'Indonesia' },
  ];

  const duplicatedFlags = [...memberFlags, ...memberFlags];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px', display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cp-flags-marquee {
          overflow: hidden;
          width: 100%;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .cp-flags-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: cpFlagScroll 25s linear infinite;
        }
        .cp-flags-track:hover {
          animation-play-state: paused;
        }
        @keyframes cpFlagScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* 1 වන සහ 2 වන කොටස් සඳහා එකතු කළ සුමට ඇනිමේෂන්ස් (Smooth Hover Effects) */
        .cp-hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .cp-hover-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 35px rgba(11, 31, 58, 0.1) !important;
          border-color: #cbd5e1 !important;
        }

        .cp-hover-section {
          transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
          border-radius: 16px;
          padding: 8px 12px;
        }
        .cp-hover-section:hover {
          transform: translateX(6px);
          background-color: #f1f5f9;
        }
      `}} />

      <div style={{ width: '100%', maxWidth: '1160px', backgroundColor: '#ffffff', borderRadius: '24px', padding: '48px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '28px' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#0f172a', fontWeight: '600' }}>About Us</span>
        </div>

        {/* 1. What is the Colombo Plan & Video Section */}
        <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563eb', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Established 1 July 1951
            </span>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', marginBottom: '16px', lineHeight: '1.25' }}>
              What is the Colombo Plan?
            </h1>
            <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: '1.7', margin: '0 0 14px' }}>
              One of the world&apos;s oldest regional intergovernmental organisations. Established on 1 July 1951 by seven founding Commonwealth nations, it now encompasses 26 sovereign member countries across Asia and the Pacific.
            </p>
            <p style={{ fontSize: '14.5px', color: '#64748b', lineHeight: '1.7', margin: 0 }}>
              Operating on the enduring principles of <strong>self-help and mutual help</strong>, the organisation focuses heavily on human resource development, technical assistance, and sustainable South-to-South cooperation.
            </p>
          </div>

          {/* Interactive Video Player Box */}
          <div 
            style={{ 
              width: '380px', 
              height: '200px', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              position: 'relative', 
              flexShrink: 0, 
              backgroundColor: '#000000',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)' 
            }}
          >
            {isPlaying ? (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="75th Anniversary Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
              />
            ) : (
              <div 
                onClick={() => setIsPlaying(true)}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  position: 'relative', 
                  cursor: 'pointer',
                  backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.6)), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <div 
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    marginBottom: '8px'
                  }}
                >
                  <div 
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '9px solid transparent',
                      borderBottom: '9px solid transparent',
                      borderLeft: '15px solid #1e085a',
                      marginLeft: '3px'
                    }}
                  />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  75th Anniv. Feature Video
                </span>
              </div>
            )}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '35px 0' }} />

        {/* 2. History & Evolution with Hover Animation */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#2563eb', letterSpacing: '1.2px', marginBottom: '14px', textTransform: 'uppercase' }}>
            OUR HISTORY &amp; EVOLUTION
          </h2>
          <div className="cp-hover-section" style={{ marginLeft: '-12px', marginRight: '-12px' }}>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', margin: '0 0 12px' }}>
              The concept of the Colombo Plan originated at the Commonwealth Foreign Ministers&apos; Conference held in Colombo, Ceylon, in January 1950. Conceived as a cooperative effort to raise the standard of living of the people in the region, it transitioned from a six-year development plan into a vibrant framework for technical assistance and specialized capacity building.
            </p>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', margin: 0 }}>
              Over the past seven decades, the Colombo Plan has successfully adapted to emerging economic, social, and technological trends, continually empowering government officials, institutions, and private sectors across member states.
            </p>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '35px 0' }} />

        {/* 3. Core Pillars & Strategic Framework */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '13px', 
            fontWeight: '800', 
            color: '#2563eb', 
            letterSpacing: '1.2px', 
            marginBottom: '16px', 
            textTransform: 'uppercase' }}>

            CORE DEVELOPMENTAL PILLARS

          </h2>
          <div style={{ display: 'grid',
             gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
             gap: '20px' }}>
              
            <div className="cp-hover-card" style={{ borderRadius: '18px', padding: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Human Resource Development</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Providing extensive fellowship grants, professional skill building, and leadership training to officials across developing member nations.
              </p>
            </div>
            <div className="cp-hover-card" style={{ borderRadius: '18px', padding: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Drug Advisory Programme (DAP)</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Leading regional initiatives in evidence-based drug prevention, specialized treatment certifications, and community health protection.
              </p>
            </div>
            <div className="cp-hover-card" style={{ borderRadius: '18px', padding: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>South-South Technical Cooperation</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Encouraging technical assistance exchanges and collaborative public policy frameworks among developing and developed partner states.
              </p>
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '35px 0' }} />

        {/* 4. Leadership Section */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#2563eb', letterSpacing: '1.2px', marginBottom: '16px', textTransform: 'uppercase' }}>
            EXECUTIVE LEADERSHIP
          </h2>
          <div className="cp-hover-card" style={{ display: 'flex', alignItems: 'center', gap: '24px', backgroundColor: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
            <div style={{ width: '84px', height: '84px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', flexShrink: 0 }}>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80" 
                alt="Secretary-General" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ fontSize: '16px', color: '#0f172a', lineHeight: '1.5', fontWeight: '700', marginBottom: '4px' }}>
                H.E. Chulamanee Chartsuwan <span style={{ color: '#64748b', fontWeight: '400', fontSize: '13.5px' }}>— 9th Secretary-General (Took office 1 July 2026)</span>
              </div>
              <p style={{ fontSize: '13.5px', color: '#475569', margin: '0 0 8px', lineHeight: '1.6' }}>
                Guiding the secretariat&apos;s strategic initiatives, developmental programs, and diplomatic relations across all member nations.
              </p>
              <Link href="/leadership" style={{ fontSize: '13px', color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>
                Read full executive biography &rarr;
              </Link>
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '35px 0' }} />

        {/* 5. Membership — Scrolling Flags Marquee */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#2563eb', letterSpacing: '1.2px', marginBottom: '16px', textTransform: 'uppercase' }}>
            MEMBERSHIP — 26 SOVEREIGN STATES
          </h2>
          <p style={{ fontSize: '14.5px', color: '#475569', margin: '0 0 24px', lineHeight: '1.6' }}>
            Spanning diverse economies across Asia and the Pacific, united through shared values of partnership, technical assistance, and mutual support.
          </p>
          
          <div className="cp-flags-marquee">
            <div className="cp-flags-track">
              {duplicatedFlags.map((flag, index) => (
                <div 
                  key={`${flag.code}-${index}`} 
                  title={flag.name}
                  style={{ 
                    width: '70px', 
                    height: '46px', 
                    borderRadius: '8px', 
                    overflow: 'hidden', 
                    border: '1px solid #cbd5e1', 
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    flexShrink: 0,
                    backgroundColor: '#fff'
                  }}
                >
                  <img 
                    src={`https://flagcdn.com/w80/${flag.code}.png`} 
                    alt={flag.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '35px 0' }} />

        {/* 6. Governance Organs with Smooth Hover Animation */}
        <section>
          <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#2563eb', letterSpacing: '1.2px', marginBottom: '16px', textTransform: 'uppercase' }}>
            GOVERNANCE ORGANS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            <div className="cp-hover-card" style={{ borderRadius: '18px', padding: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>Consultative Committee</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                The apex policy-review body meeting biennially at ministerial level to evaluate regional development strategies and guidelines.
              </p>
            </div>

            <div className="cp-hover-card" style={{ borderRadius: '18px', padding: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>The Colombo Plan Council</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Comprising resident diplomatic heads from member states, meeting quarterly under a rotating presidency to oversee operations.
              </p>
            </div>

            <div className="cp-hover-card" style={{ borderRadius: '18px', padding: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>The Secretariat</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Headquartered in Colombo, Sri Lanka, executing administrative functions, coordinating programs, and facilitating member support.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}