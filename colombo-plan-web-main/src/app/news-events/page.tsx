'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Newspaper } from 'lucide-react';

const API = 'https://colombo-plan-full-production.up.railway.app';

export default function NewsEventsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/news-events`)
      .then((res) => res.json())
      .then((data) => {
        const published = data.filter((item) => item.status === 'Published');
        setItems(published);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(items.map((i) => i.category).filter(Boolean))];
  const tabs = ['All', ...categories];

  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter((item) => item.category === activeFilter);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif', color: '#0f172a' }}>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cp-news-fade { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .cp-filter-btn {
          background: #ffffff; border: 1px solid #cbd5e1; color: #334155;
          padding: 10px 22px; border-radius: 8px; font-size: 13px; font-weight: 800;
          cursor: pointer; transition: all 0.2s ease;
        }
        .cp-filter-btn:hover, .cp-filter-btn.active {
          background: #0B2A4A; color: #ffffff; border-color: #0B2A4A;
        }
        .cp-article-card {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;
          display: grid; grid-template-columns: 360px 1fr; gap: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02); transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cp-article-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(11,31,58,0.08); }
        @media (max-width: 850px) { .cp-article-card { grid-template-columns: 1fr; } }
      `}} />

      <div className="cp-news-fade" style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 24px 90px' }}>

        <div style={{ marginBottom: '35px' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700', marginBottom: '12px' }}>
            <Link href="/" style={{ color: '#1E5A91', textDecoration: 'none' }}>Home</Link> &gt; News &amp; Events
          </div>
          <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#0B2A4A', letterSpacing: '-1px', margin: 0 }}>
            News &amp; Events
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '45px' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`cp-filter-btn ${activeFilter === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: '#64748b' }}>Loading...</p>
        ) : filteredItems.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#64748b' }}>
            <p style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>No news or events found in this category.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {filteredItems.map((item) => (
              <article key={item.id} className="cp-article-card">
                <div style={{ height: '240px', overflow: 'hidden', backgroundColor: '#0B2A4A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl.startsWith('http') ? item.imageUrl : API + item.imageUrl}
                      alt={item.imageAlt || item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Newspaper size={48} color="rgba(255,255,255,0.3)" />
                  )}
                </div>

                <div style={{ padding: '30px 30px 30px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: '900', color: '#1E5A91', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    {item.category} &bull; {formatDate(item.publishDate)}
                    {item.location ? ` • ${item.location}` : ''}
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0B2A4A', margin: '0 0 12px', lineHeight: 1.35 }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.7', margin: '0 0 20px', maxWidth: '700px' }}>
                    {item.description}
                  </p>

                  <div>
                    <Link
                      href={`/news-events/${item.slug || item.id}`}
                      style={{ fontSize: '12.5px', fontWeight: '900', color: '#0B2A4A', textDecoration: 'none' }}
                    >
                      Read full article &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}