'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PrivateSectorData {
  id: number;
  title: string;
  slug: string;
  focalPoint: string;
  description: string;
  whatWeOffer: string;
  csrPartnerships: string;
  thumbnailUrl: string;
}

export default function PrivateSectorPage() {
  const [content, setContent] = useState<PrivateSectorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/private-sector/slug/private-sector')
      .then((res) => {
        if (res.status === 404) {
          // Data database eke thawama nathi, error widiyata handle karanna epa
          return null;
        }
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching private sector page data:', err);
        setLoading(false);
      });
  }, []);

  // What We Offer ලැයිස්තුව අදාළ ෆෝමැට් එකට වෙන් කරගැනීමට (newline මඟින් split කරනු ලැබේ)
  const offeringsList = content?.whatWeOffer 
    ? content.whatWeOffer.split('\n').map(item => {
        const parts = item.split('—');
        return {
          title: parts[0]?.trim() || item,
          desc: parts[1]?.trim() || ''
        };
      })
    : [
        { title: 'Global Network of Trainers', desc: 'certified specialists across partner countries' },
        { title: 'Evidence-Based Prevention Curricula', desc: 'workplace, youth, community, family' },
        { title: 'Women, Youth & Community Programmes', desc: 'empowerment and inclusive capacity building' },
        { title: 'Corporate Prevention Programmes', desc: 'tailored substance use risk management for workforces' },
        { title: 'African Network Partnerships', desc: 'expanding collaborative prevention frameworks across Africa' },
      ];

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>Loading...</div>;
  }

  return (
    <main 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f1f5f9',
        backgroundImage: `
          linear-gradient(rgba(241, 245, 249, 0.94), rgba(241, 245, 249, 0.94)),
          url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&auto=format&fit=crop&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '30px 20px 80px', 
        display: 'flex', 
        justifyContent: 'center', 
        fontFamily: 'sans-serif' 
      }}
    >
      <div style={{ width: '100%', maxWidth: '1240px' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px', color: '#94a3b8' }}>&gt;</span>
          <span style={{ color: '#0f172a', fontWeight: '600' }}>{content?.title || 'Private Sector'}</span>
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.3px' }}>
            Partnering with the Colombo Plan
          </h1>
          <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
            75 years of trusted partnership &bull; presence in 18 Asia-Pacific + 28 African member countries. A proven, cost-effective delivery platform.
          </p>
        </div>

        {/* What We Offer Section */}
        <div 
          style={{ 
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '32px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
            marginBottom: '28px'
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '24px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            WHAT WE OFFER
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {offeringsList.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div 
                  style={{ 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    backgroundColor: '#eff6ff', 
                    border: '1px solid #bfdbfe',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
                </div>
                <div>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                    {item.title}
                  </span>
                  {item.desc && (
                    <span style={{ fontSize: '15px', color: '#64748b', fontWeight: '500' }}>
                      {' '}&mdash; {item.desc}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CSR Partnerships Box */}
        <div 
          style={{ 
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '24px 32px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
            marginBottom: '32px'
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            CSR PARTNERSHIPS
          </h3>
          <p style={{ fontSize: '14.5px', color: '#475569', margin: 0, fontWeight: '500' }}>
            &bull; {content?.csrPartnerships || 'Independent, delivery-focused implementation'}
          </p>
        </div>

        {/* Focal Point & Get in Touch Bar */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            backgroundColor: '#ffffff',
            padding: '20px 28px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: '600' }}>
            Focal point: <span style={{ color: '#2563eb', fontWeight: '800' }}>{content?.focalPoint || 'Pulsara G'}</span>
          </div>

          <Link
            href="/contact"
            style={{
              backgroundColor: '#1e085a',
              color: '#ffffff',
              fontSize: '13.5px',
              fontWeight: '700',
              padding: '11px 26px',
              borderRadius: '20px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(30, 8, 90, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            Get in touch
          </Link>
        </div>

      </div>
    </main>
  );
}