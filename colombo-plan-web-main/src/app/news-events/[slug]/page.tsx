'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Newspaper, ArrowLeft, FileText, Download } from 'lucide-react';

const API = 'https://colombo-plan-full-production.up.railway.app';

export default function NewsEventArticlePage() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/news-events`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (i) => i.slug === params.slug || String(i.id) === params.slug
        );
        if (found && found.status === 'Published') {
          setItem(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.slug]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const resolveUrl = (url) => (url && url.startsWith('http') ? url : API + url);

  const openAttachment = () => {
    if (!item || !item.fileUrl) return;
    window.open(resolveUrl(item.fileUrl), '_blank', 'noopener,noreferrer');
  };

  const renderContent = (content) => {
    if (!content) return null;
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} style={{ fontSize: '22px', fontWeight: '800', color: '#0B2A4A', margin: '28px 0 12px' }}>
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} style={{ fontSize: '15px', color: '#334155', lineHeight: '1.8' }}>
            {line.replace('- ', '')}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={index} style={{ height: '8px' }} />;
      }
      return (
        <p key={index} style={{ fontSize: '15px', color: '#334155', lineHeight: '1.8', margin: '0 0 14px' }}>
          {line}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748b', fontFamily: 'Arial, sans-serif' }}>Loading...</p>
      </main>
    );
  }

  if (notFound || !item) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', fontWeight: '700', color: '#0B2A4A', marginBottom: '12px' }}>Article not found</p>
          <Link href="/news-events" style={{ color: '#1E5A91', fontWeight: '700', textDecoration: 'none' }}>
            Back to News and Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif', color: '#0f172a' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '50px 24px 90px' }}>

        <Link href="/news-events" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#1E5A91', textDecoration: 'none', marginBottom: '28px' }}>
          <ArrowLeft size={14} />
          Back to News and Events
        </Link>

        <div style={{ fontSize: '11px', fontWeight: '900', color: '#1E5A91', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
          {item.category} - {formatDate(item.publishDate)}
          {item.location ? ' - ' + item.location : ''}
        </div>

        <h1 style={{ fontSize: '34px', fontWeight: '900', color: '#0B2A4A', margin: '0 0 8px', lineHeight: 1.25 }}>
          {item.title}
        </h1>

        {item.author ? (
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 24px' }}>{'By ' + item.author}</p>
        ) : (
          <div style={{ marginBottom: '24px' }} />
        )}

        <div style={{ height: '360px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#0B2A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
          {item.imageUrl ? (
            <img
              src={resolveUrl(item.imageUrl)}
              alt={item.imageAlt || item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Newspaper size={56} color="rgba(255,255,255,0.3)" />
          )}
        </div>

        <div>
          {item.content ? renderContent(item.content) : (
            <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.8' }}>{item.description}</p>
          )}
        </div>

        {item.fileUrl ? (
          <button
            type="button"
            onClick={openAttachment}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '32px',
              padding: '12px 20px',
              backgroundColor: '#0B2A4A',
              color: '#fff',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '700',
            }}
          >
            <FileText size={16} />
            {item.fileName || 'Download Attachment'}
            <Download size={14} />
          </button>
        ) : null}

      </div>
    </main>
  );
}