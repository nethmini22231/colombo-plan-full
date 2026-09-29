'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const API = 'https://colombo-plan-full-production.up.railway.app';

interface IndividualsItem {
  id: number;
  sectionTitle: string;
  sectionSubtitle: string;
  badge: string;
  title: string;
  slug: string;
  linkUrl: string;
  description: string;
  thumbnailUrl: string;
  sortOrder: number;
}

export default function IndividualsPage() {
  const [items, setItems] = useState<IndividualsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/individuals`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching individuals data:', err);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${API}${url}`;
  };

  const headerInfo = items.length > 0 ? items[0] : {
    sectionTitle: 'DAP e-learning platform',
    sectionSubtitle: 'Self-paced learning on drug prevention, treatment, and recovery curricula — open to professionals, practitioners, and anyone.'
  };

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

        {/* Breadcrumb */}
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px', color: '#94a3b8' }}>&gt;</span>
          <span style={{ color: '#0f172a', fontWeight: '600' }}>Individuals</span>
        </div>

        {/* Header banner */}
        <div
          style={{
            border: '2px dashed #93c5fd',
            borderRadius: '16px',
            padding: '28px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            marginBottom: '36px'
          }}
        >
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1e085a', margin: '0 0 8px' }}>
            {headerInfo.sectionTitle}
          </h1>
          <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
            {headerInfo.sectionSubtitle}
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ height: '190px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
                {item.thumbnailUrl && (
                  <img
                    src={getImageUrl(item.thumbnailUrl)}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: '#1e085a',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '8px'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: '0 0 18px', flex: 1 }}>
                  {item.description}
                </p>

                <Link
                  href={item.linkUrl || `/individuals/${item.slug}`}
                  style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb', textDecoration: 'none' }}
                >
                  Get Started &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}