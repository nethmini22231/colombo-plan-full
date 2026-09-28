'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const API = 'http://localhost:8080';

export default function WhatWeDoPage() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API + '/api/programs')
      .then((res) => res.json())
      .then((data) => {
        setProgrammes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setProgrammes([]);
        setLoading(false);
      });
  }, []);

  const resolveImage = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : API + url;
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px 80px', fontFamily: 'sans-serif', color: '#0f172a' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }

        .cp-prog-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .cp-prog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 35px rgba(11, 31, 58, 0.12) !important;
          border-color: #cbd5e1 !important;
        }
        .cp-prog-card:hover img {
          transform: scale(1.08);
        }
        .cp-prog-img {
          transition: transform 0.5s ease;
        }
        .cp-stat-box {
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }
        .cp-stat-box:hover {
          transform: translateY(-4px);
          background-color: #ffffff !important;
          box-shadow: 0 10px 25px rgba(11, 31, 58, 0.08);
          border-color: #cbd5e1 !important;
        }
      `}} />

      <div style={{ width: '100%', maxWidth: '1240px', margin: '0 auto' }}>

        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '25px' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#0f172a', fontWeight: '700' }}>What We Do</span>
        </div>

        {/* Header Section with Stat Cards (static content, unrelated to programme data) */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '45px', marginBottom: '45px', boxShadow: '0 6px 25px rgba(0,0,0,0.04)' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563eb', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Strategic Regional Initiatives &amp; Mandates
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', marginBottom: '14px', lineHeight: '1.2' }}>
            Active Programmes &amp; Core Operations
          </h1>
          <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: '1.7', margin: '0 0 32px', maxWidth: '900px' }}>
            The Colombo Plan currently spearheads specialized regional cooperation programmes designed to tackle critical socio-economic challenges, foster sustainable development, and uplift human capital across 26 member states through targeted technical assistance.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '30px' }}>
            <div className="cp-stat-box" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '22px' }}>
              <strong style={{ display: 'block', fontSize: '22px', color: '#1e5a91', marginBottom: '6px', fontWeight: '900' }}>70+ Years</strong>
              <span style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.5', display: 'block' }}>Of impactful regional cooperation &amp; technical assistance.</span>
            </div>
            <div className="cp-stat-box" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '22px' }}>
              <strong style={{ display: 'block', fontSize: '22px', color: '#1e5a91', marginBottom: '6px', fontWeight: '900' }}>{programmes.length || '4'} Core Sectors</strong>
              <span style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.5', display: 'block' }}>Covering drug advisory, capacity building, climate, and maritime safety.</span>
            </div>
            <div className="cp-stat-box" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '22px' }}>
              <strong style={{ display: 'block', fontSize: '22px', color: '#1e5a91', marginBottom: '6px', fontWeight: '900' }}>Global Reach</strong>
              <span style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.5', display: 'block' }}>Programmes extending professional training to over 80+ countries.</span>
            </div>
          </div>
        </div>

        {/* Programme Cards Grid — now driven by the admin API */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px' }}>Loading programmes...</p>
        ) : programmes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px' }}>No programmes have been published yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '28px' }}>
            {programmes.map((prog) => (
              <div
                key={prog.id}
                className="cp-prog-card"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                }}
              >
                {/* Card Image */}
                <div style={{ height: '170px', width: '100%', overflow: 'hidden', position: 'relative', backgroundColor: '#f1f5f9' }}>
                  {prog.imageUrl && (
                    <img
                      src={resolveImage(prog.imageUrl)}
                      alt={prog.title}
                      className="cp-prog-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )}
                  {prog.categoryBadge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(7, 24, 45, 0.85)',
                        color: '#38bdf8',
                        fontSize: '10px',
                        fontWeight: '800',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        zIndex: 2,
                      }}
                    >
                      {prog.categoryBadge}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {prog.shortCode && (
                    <div style={{ fontSize: '22px', fontWeight: '900', color: '#2563eb', marginBottom: '4px' }}>{prog.shortCode}</div>
                  )}
                  <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px' }}>{prog.title}</h3>
                  {prog.description && (
                    <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.6', margin: '0 0 12px' }}>{prog.description}</p>
                  )}

                  <div style={{ flex: 1 }} />

                  <Link
                    href={'/what-we-do/' + prog.slug}
                    style={{ fontSize: '13px', fontWeight: '800', color: '#1e5a91', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    Explore Programme &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}