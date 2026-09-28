'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const API = 'http://localhost:8080';

interface Institution {
  id: number;
  sectionTitle: string;
  sectionSubtitle: string;
  title: string;
  slug: string;
  regionTag: string;
  contactPerson: string;
  description: string;
  thumbnailUrl: string;
  attachmentUrl: string;
  cardsJson: string;
}

export default function GovernmentInstitutionsPage() {
  const [dataList, setDataList] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/institutions')
      .then((res) => res.json())
      .then((data) => {
        setDataList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching public institutions:', err);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${API}${url}`;
  };

 
  const headerInfo = dataList.length > 0 ? dataList[0] : {
    sectionTitle: 'SERVICES AVAILABLE',
    sectionSubtitle: 'Partnerships in the drug demand reduction field — for member and non-member government agencies.',
    contactPerson: 'Director–DAP'
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
        
        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px', color: '#94a3b8' }}>&gt;</span>
          <span style={{ color: '#0f172a', fontWeight: '600' }}>Government Institutions & Training Providers</span>
        </div>

        {/* Services Available Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.3px' }}>
            {headerInfo.sectionTitle || 'SERVICES AVAILABLE'}
          </h1>
          <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
            {headerInfo.sectionSubtitle || 'Partnerships in the drug demand reduction field — for member and non-member government agencies.'}
          </p>
        </div>

        {/* How to Engage Section */}
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.2px' }}>
          HOW TO ENGAGE
        </h2>

        {/* Regional Cards Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '24px',
            marginBottom: '40px'
          }}
        >
          {dataList.map((item) => (
            <Link
              key={item.id}
              href={`/government-institutions/${item.slug || 'region'}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                textDecoration: 'none',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Region Cover Image */}
              <div style={{ height: '170px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
                <img
                  src={
                    item.thumbnailUrl && item.thumbnailUrl !== ''
                      ? getImageUrl(item.thumbnailUrl)
                      : 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80'
                  }
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {item.regionTag && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: '#1e085a',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {item.regionTag}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div 
                style={{ 
                  padding: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  flex: 1 
                }}
              >
                <h3 
                  style={{ 
                    fontSize: '17px', 
                    fontWeight: '800', 
                    color: '#0f172a', 
                    marginBottom: '10px' 
                  }}
                >
                  {item.title}
                </h3>
                
                <p 
                  style={{ 
                    fontSize: '13.5px', 
                    color: '#64748b', 
                    lineHeight: '1.6', 
                    margin: '0 0 20px', 
                    flex: 1 
                  }}
                >
                  {item.description}
                </p>

                <span 
                  style={{ 
                    fontSize: '13px', 
                    fontWeight: '700', 
                    color: '#2563eb', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '4px' 
                  }}
                >
                  Explore Region &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact and Get in Touch Action */}
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
            Contact: <span style={{ color: '#2563eb', fontWeight: '800' }}>{headerInfo.contactPerson || 'Director–DAP'}</span> (or nominee)
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