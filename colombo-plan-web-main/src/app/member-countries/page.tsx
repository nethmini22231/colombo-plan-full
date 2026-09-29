'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const API = 'http://   https://colombo-plan-full-production.up.railway.app';

interface MemberPortalItem {
  id: number;
  pageTag: string;
  pageTitle: string;
  pageDescription: string;
  badge: string;
  title: string;
  slug: string;
  linkUrl: string;
  description: string;
  bulletPoints: string;
  thumbnailUrl: string;
  sortOrder: number;
}

export default function MemberPortalPage() {
  const [items, setItems] = useState<MemberPortalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/member-portal`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching member portal data:', err);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${API}${url}`;
  };

  const headerInfo = items.length > 0 ? items[0] : {
    pageTag: 'REGIONAL COOPERATION & DEVELOPMENT HUB',
    pageTitle: 'Member Countries Portal',
    pageDescription: 'Access exclusive regional development resources, specialized training programmes, long-term scholarship archives, and official committee documentation designed to empower sovereign member states across Asia and the Pacific.'
  };

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>Loading...</div>;
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '30px 20px 80px',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'sans-serif'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1240px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px', color: '#94a3b8' }}>&gt;</span>
          <span style={{ color: '#0f172a', fontWeight: '600' }}>Member Countries Portal</span>
        </div>

        {/* Header */}
        <p style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb', letterSpacing: '0.06em', marginBottom: '8px' }}>
          {headerInfo.pageTag}
        </p>

        <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>
          {headerInfo.pageTitle}
        </h1>

        <p style={{ fontSize: '14.5px', color: '#475569', maxWidth: '800px', lineHeight: 1.6, marginBottom: '32px' }}>
          {headerInfo.pageDescription}
        </p>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}
        >
          {items.map((item) => {
            const bullets = item.bulletPoints
              ? item.bulletPoints.split('\n').filter((b) => b.trim() !== '')
              : [];

            const isMembersOnly = (item.badge || '').toLowerCase().includes('members');

            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ height: '160px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
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
                        backgroundColor: isMembersOnly ? '#7c3aed' : '#2563eb',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: '0 0 14px' }}>
                    {item.description}
                  </p>

                  {bullets.length > 0 && (
                    <ul style={{ margin: '0 0 18px', padding: 0, listStyle: 'none', flex: 1 }}>
                      {bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: '12.5px',
                            color: '#2563eb',
                            marginBottom: '6px',
                            paddingLeft: '14px',
                            position: 'relative'
                          }}
                        >
                          <span style={{ position: 'absolute', left: 0 }}>&bull;</span>
                          {bullet.trim()}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={item.linkUrl || `/member-portal/${item.slug}`}
                    style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb', textDecoration: 'none', marginTop: 'auto' }}
                  >
                    Access Section &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Login Banner */}
        <div
          style={{
            marginTop: '32px',
            background: 'linear-gradient(135deg, #0b0f2e, #14163a)',
            borderRadius: '18px',
            padding: '40px',
            textAlign: 'center',
            color: '#fff'
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 10px' }}>
            Are you an official representative or member state delegate?
          </h2>

          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Log in securely to access restricted administrative publications, voting documents, and specialized council archives.
          </p>

          <Link
            href="/member-login"
            style={{
              display: 'inline-block',
              background: '#2563eb',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
              padding: '12px 28px',
              borderRadius: '24px',
              textDecoration: 'none'
            }}
          >
            Log in to Member Portal
          </Link>
        </div>

      </div>
    </main>
  );
}