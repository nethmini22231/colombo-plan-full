'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const API = 'https://colombo-plan-full-production.up.railway.app';

const THEME_COLORS = {
  blue: '#1d4ed8',
  green: '#15803d',
  purple: '#7e22ce',
  orange: '#c2410c',
  teal: '#0f766e',
  red: '#b91c1c',
};

function safeParseArray(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function resolveUrl(url) {
  if (!url) return '';
  return url.startsWith('http') ? url : API + url;
}

export default function ProgrammeDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const [programme, setProgramme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(API + '/api/programs')
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        const match = list.find((p) => p.slug === slug);
        if (match) {
          setProgramme(match);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main style={styles.page}>
        <p style={{ textAlign: 'center', color: '#64748b' }}>Loading...</p>
      </main>
    );
  }

  if (notFound || !programme) {
    return (
      <main style={styles.page}>
        <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center' }}>
          <h2 style={{ color: '#0f172a' }}>Programme not found</h2>
          <p style={{ color: '#64748b' }}>This programme may have been removed or the link is incorrect.</p>
          <Link href="/what-we-do" style={{ color: '#1d4ed8' }}>&larr; Back to What We Do</Link>
        </div>
      </main>
    );
  }

  const accent = THEME_COLORS[programme.themeColor] || THEME_COLORS.blue;
  const featureCards = safeParseArray(programme.featureCardsJson);
  const partnershipStats = safeParseArray(programme.partnershipStatsJson);
  const initiatives = safeParseArray(programme.initiativesJson);
  const impactBadges = safeParseArray(programme.impactBadgesJson);

  const showPartnership = programme.partnershipLabel || programme.partnershipTitle || partnershipStats.length > 0;
  const showFeatures = featureCards.length > 0;
  const showInitiatives = initiatives.length > 0;
  const showImpact = programme.impactTitle || programme.impactDescription || impactBadges.length > 0;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        {/* Breadcrumb */}
        <div style={styles.breadcrumb}>
          <Link href="/" style={styles.breadcrumbLink}>Home</Link>
          <span style={{ margin: '0 6px' }}>&gt;</span>
          <Link href="/what-we-do" style={styles.breadcrumbLink}>What We Do</Link>
          <span style={{ margin: '0 6px' }}>&gt;</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>{programme.title}</span>
        </div>

        {/* Hero */}
        <section style={styles.card}>
          <div style={styles.heroRow}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ marginBottom: '10px' }}>
                {programme.categoryBadge && (
                  <span style={{ ...styles.categoryBadge, color: accent }}>{programme.categoryBadge}</span>
                )}
                {programme.categoryBadge && programme.establishedInfo && <span style={{ color: '#94a3b8', margin: '0 8px' }}>&middot;</span>}
                {programme.establishedInfo && <span style={styles.establishedText}>{programme.establishedInfo}</span>}
              </div>
              <h1 style={styles.heroTitle}>{programme.title}</h1>
              {programme.description && <p style={styles.heroDesc}>{programme.description}</p>}
              {programme.fullDescription && <p style={styles.heroDescMuted}>{programme.fullDescription}</p>}
              {programme.portalButtonText && programme.portalUrl && (
                <a href={programme.portalUrl} target="_blank" rel="noopener noreferrer" style={{ ...styles.portalButton, backgroundColor: '#0b192c' }}>
                  {programme.portalButtonText} &rarr;
                </a>
              )}
            </div>

            <div style={styles.heroImageWrap}>
              {programme.heroImageUrl ? (
                <img src={resolveUrl(programme.heroImageUrl)} alt={programme.title} style={styles.heroImage} />
              ) : (
                <div style={styles.heroLogoCard}>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: accent }}>{programme.shortCode || programme.title}</div>
                  <div style={{ width: '60px', height: '2px', backgroundColor: accent, margin: '8px 0' }} />
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    {programme.title}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Partnership banner */}
        {showPartnership && (
          <section style={styles.partnershipBanner}>
            <div>
              {programme.partnershipLabel && (
                <p style={{ ...styles.partnershipLabel, color: accent }}>{programme.partnershipLabel}</p>
              )}
              {programme.partnershipTitle && <p style={styles.partnershipTitle}>{programme.partnershipTitle}</p>}
            </div>
            {partnershipStats.length > 0 && (
              <div style={styles.partnershipStats}>
                {partnershipStats.map((stat, i) => (
                  <div key={i} style={styles.partnershipStatBox}>
                    {stat.label && <p style={styles.partnershipStatLabel}>{stat.label}</p>}
                    {stat.value && <p style={styles.partnershipStatValue}>{stat.value}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Feature cards */}
        {showFeatures && (
          <section style={{ marginTop: '32px' }}>
            {programme.featureSectionTitle && (
              <h2 style={styles.sectionTitle}>
                <span style={{ ...styles.sectionTitleBar, backgroundColor: accent }} />
                {programme.featureSectionTitle}
              </h2>
            )}
            <div style={styles.featureGrid}>
              {featureCards.map((card, i) => (
                <div key={i} style={styles.featureCard}>
                  {card.icon ? (
                    <div style={{ fontSize: '22px', marginBottom: '10px' }}>{card.icon}</div>
                  ) : (
                    <div style={{ ...styles.featureNumberBadge, color: accent }}>{String(i + 1).padStart(2, '0')}</div>
                  )}
                  {card.tag && <p style={{ ...styles.featureTag, color: accent }}>{card.tag}</p>}
                  {card.title && <p style={styles.featureCardTitle}>{card.title}</p>}
                  {card.description && <p style={styles.featureCardDesc}>{card.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Initiatives / Reports */}
        {showInitiatives && (
          <section style={{ marginTop: '32px' }}>
            {programme.initiativesSectionTitle && (
              <h2 style={styles.sectionTitle}>
                <span style={{ ...styles.sectionTitleBar, backgroundColor: accent }} />
                {programme.initiativesSectionTitle}
              </h2>
            )}
            <div style={styles.initiativesGrid}>
              {initiatives.map((item, i) => (
                <div key={i} style={styles.initiativeCard}>
                  {item.imageUrl && (
                    <div style={styles.initiativeImageWrap}>
                      <img src={resolveUrl(item.imageUrl)} alt={item.title} style={styles.initiativeImage} />
                    </div>
                  )}
                  <div style={{ padding: '16px' }}>
                    {item.label && <p style={{ ...styles.initiativeLabel, color: accent }}>{item.label}</p>}
                    {item.title && <p style={styles.initiativeTitle}>{item.title}</p>}
                    {item.description && <p style={styles.initiativeDesc}>{item.description}</p>}
                    {item.pdfUrl && (
                      <a href={resolveUrl(item.pdfUrl)} target="_blank" rel="noopener noreferrer" style={{ ...styles.readReportLink, color: accent }}>
                        Read Full Report &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Impact section */}
        {showImpact && (
          <section style={{ ...styles.card, marginTop: '32px' }}>
            {programme.impactTitle && <p style={styles.impactTitle}>{programme.impactTitle}</p>}
            {programme.impactDescription && <p style={styles.impactDesc}>{programme.impactDescription}</p>}
            {impactBadges.length > 0 && (
              <div style={styles.badgeRow}>
                {impactBadges.map((badge, i) => (
                  <span key={i} style={{ ...styles.badgePill, color: accent, backgroundColor: accent + '15' }}>
                    &#10003; {badge}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px 20px 80px', fontFamily: 'sans-serif', color: '#0f172a' },
  container: { width: '100%', maxWidth: '1100px', margin: '0 auto' },
  breadcrumb: { fontSize: '13px', color: '#64748b', marginBottom: '20px' },
  breadcrumbLink: { color: '#2563eb', textDecoration: 'none' },

  card: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' },
  heroRow: { display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' },
  categoryBadge: { fontSize: '11px', fontWeight: 800, letterSpacing: '0.6px', textTransform: 'uppercase' },
  establishedText: { fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.6px', textTransform: 'uppercase' },
  heroTitle: { fontSize: '30px', fontWeight: 900, margin: '4px 0 12px', lineHeight: 1.2 },
  heroDesc: { fontSize: '14.5px', color: '#475569', lineHeight: 1.6, margin: '0 0 10px' },
  heroDescMuted: { fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 18px' },
  portalButton: { display: 'inline-block', color: '#fff', padding: '11px 20px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' },
  heroImageWrap: { width: '240px', flexShrink: 0 },
  heroImage: { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', display: 'block' },
  heroLogoCard: {
    width: '100%',
    height: '180px',
    borderRadius: '12px',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '16px',
  },

  partnershipBanner: {
    backgroundColor: '#0b192c',
    borderRadius: '16px',
    padding: '26px 32px',
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  partnershipLabel: { fontSize: '11px', fontWeight: 800, letterSpacing: '0.6px', textTransform: 'uppercase', margin: '0 0 6px' },
  partnershipTitle: { fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 },
  partnershipStats: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  partnershipStatBox: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 16px' },
  partnershipStatLabel: { fontSize: '9.5px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 3px' },
  partnershipStatValue: { fontSize: '13px', fontWeight: 700, color: '#fff', margin: 0 },

  sectionTitle: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '19px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' },
  sectionTitleBar: { display: 'inline-block', width: '4px', height: '18px', borderRadius: '2px' },

  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' },
  featureCard: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px' },
  featureNumberBadge: { display: 'inline-block', fontSize: '12px', fontWeight: 800, backgroundColor: '#eff6ff', padding: '3px 9px', borderRadius: '6px', marginBottom: '12px' },
  featureTag: { fontSize: '10px', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 6px' },
  featureCardTitle: { fontSize: '14.5px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' },
  featureCardDesc: { fontSize: '13px', color: '#64748b', lineHeight: 1.55, margin: 0 },

  initiativesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' },
  initiativeCard: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' },
  initiativeImageWrap: { height: '150px', overflow: 'hidden', backgroundColor: '#f1f5f9' },
  initiativeImage: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  initiativeLabel: { fontSize: '10px', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 6px' },
  initiativeTitle: { fontSize: '14.5px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' },
  initiativeDesc: { fontSize: '13px', color: '#64748b', lineHeight: 1.55, margin: '0 0 12px' },
  readReportLink: { fontSize: '13px', fontWeight: 700, textDecoration: 'none' },

  impactTitle: { fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' },
  impactDesc: { fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, margin: '0 0 16px' },
  badgeRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  badgePill: { fontSize: '12.5px', fontWeight: 600, padding: '7px 14px', borderRadius: '999px' },
};