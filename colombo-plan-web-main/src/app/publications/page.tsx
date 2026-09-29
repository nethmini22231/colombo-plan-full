'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

const API = 'http://   https://colombo-plan-full-production.up.railway.app';

export default function PublicationsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/publications`)
      .then((res) => res.json())
      .then((data) => {
        const published = data.filter((item) => item.status === 'Published');
        setPublications(published);
      })
      .catch(() => setPublications([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(publications.map((p) => p.category).filter(Boolean))];

  const filteredPublications = activeCategory === 'All'
    ? publications
    : publications.filter((item) => item.category === activeCategory);

  const resolveUrl = (url) => (url && url.startsWith('http') ? url : `${API}${url}`);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif', color: '#0f172a', paddingBottom: '80px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }

        .cp-side-btn {
          text-align: left;
          background: transparent;
          border: none;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          color: #1e5a91;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .cp-side-btn:hover, .cp-side-btn.active {
          background: #07182d;
          color: #ffffff;
        }

        .cp-pub-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cp-pub-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
        }
      `}} />

      <div style={{ backgroundColor: '#07182d', color: '#ffffff', padding: '45px 20px', textAlign: 'center', marginBottom: '35px', backgroundImage: 'linear-gradient(rgba(7, 24, 45, 0.9), rgba(7, 24, 45, 0.9)), url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <span style={{ fontSize: '11px', fontWeight: '900', color: '#38bdf8', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Resource Archives
          </span>
          <h1 style={{ fontSize: '34px', fontWeight: '900', margin: '8px 0 12px' }}>
            Publications &amp; Reports
          </h1>
          <p style={{ fontSize: '14.5px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
            Browse official reports, foundational documents, monographs, and meeting proceedings from the Colombo Plan Secretariat.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '25px' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#0f172a', fontWeight: '700' }}>Publications</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '30px', alignItems: 'start' }}>

          <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', padding: '6px 10px 10px' }}>
              Categories
            </div>
            <button
              className={`cp-side-btn ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All Publications
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cp-side-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div>
            {loading ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>Loading...</div>
            ) : filteredPublications.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {filteredPublications.map((item) => (
                  <div className="cp-pub-card" key={item.id}>
                    <div style={{ height: '200px', width: '100%', overflow: 'hidden', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.imageUrl ? (
                        <img src={resolveUrl(item.imageUrl)} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <FileText size={40} color="#94a3b8" />
                      )}
                    </div>
                    <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                        {item.category} {item.publishDate ? `• ${item.publishDate}` : ''}
                      </span>
                      <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px', lineHeight: '1.35' }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 18px', lineHeight: '1.6', flex: 1 }}>
                        {item.description}
                      </p>
                      {item.fileUrl && (
                        <a href={resolveUrl(item.fileUrl)} target="_blank" rel="noreferrer" style={{ fontSize: '13px', fontWeight: '800', color: '#1e5a91', textDecoration: 'none' }}>
                          Download File &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#64748b' }}>
                <p style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>No publications found in this category.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}