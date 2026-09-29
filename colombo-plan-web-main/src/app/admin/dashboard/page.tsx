'use client';

import { useState, useEffect } from 'react';
import { FolderOpen, Newspaper, FileText, Clock } from 'lucide-react';

const API = 'http://   https://colombo-plan-full-production.up.railway.app';

export default function AdminDashboard() {
  const [adminName] = useState('Secretariat Admin');
  const [loading, setLoading] = useState(true);

  const [programCount, setProgramCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [publicationCount, setPublicationCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [todayLabel, setTodayLabel] = useState('');

  const safeFetch = async (path) => {
    try {
      const res = await fetch(API + path);
      if (res.ok) return await res.json();
      return [];
    } catch {
      return [];
    }
  };

  const loadDashboard = async () => {
    setLoading(true);

    const [programs, news, publications] = await Promise.all([
      safeFetch('/api/programs'),
      safeFetch('/api/news-events'),
      safeFetch('/api/publications'),
    ]);

    const programsArr = Array.isArray(programs) ? programs : [];
    const newsArr = Array.isArray(news) ? news : [];
    const publicationsArr = Array.isArray(publications) ? publications : [];

    setProgramCount(programsArr.length);
    setNewsCount(newsArr.length);
    setPublicationCount(publicationsArr.length);

    const drafts = newsArr.filter((n) => n.status === 'Draft').length;
    setDraftCount(drafts);

    // Recent activities
    const combined = [
      ...programsArr.map((p) => ({
        id: 'PRG-' + p.id,
        details: 'Programme added: ' + (p.title || 'Untitled'),
        user: 'Admin',
        status: 'Programme',
        date: null, // Program entity 
      })),
      ...newsArr.map((n) => ({
        id: 'NEWS-' + n.id,
        details: (n.status === 'Published' ? 'Published: ' : 'Drafted: ') + (n.title || 'Untitled'),
        user: n.author || 'Admin',
        status: n.status || 'Draft',
        date: n.publishDate || null,
      })),
      ...publicationsArr.map((pub) => ({
        id: 'PUB-' + pub.id,
        details: (pub.status === 'Published' ? 'Published: ' : 'Drafted: ') + (pub.title || 'Untitled'),
        user: pub.author || 'Admin',
        status: pub.status || 'Draft',
        date: pub.publishDate || null,
      })),
    ];

    
    const sorted = combined
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5);

    setRecentActivities(sorted);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
    const today = new Date();
    setTodayLabel(today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: '2-digit' }));
  }, []);

  const formatDate = (value) => {
    if (!value) return '-';
    try {
      return new Date(value).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return value;
    }
  };

  const statusStyle = (status) => {
    const s = (status || '').toLowerCase();
    if (s.indexOf('publish') === 0 || s.indexOf('complet') === 0) {
      return { bg: '#ecfdf5', text: '#065f46' };
    }
    if (s.indexOf('draft') === 0 || s.indexOf('pending') === 0) {
      return { bg: '#fef3c7', text: '#b45309' };
    }
    if (s.indexOf('programme') === 0) {
      return { bg: '#f5f3ff', text: '#6d28d9' };
    }
    return { bg: '#eff6ff', text: '#1d4ed8' };
  };

  const styles = {
    page: { flex: 1, padding: '32px', boxSizing: 'border-box', backgroundColor: '#f1f5f9', minHeight: '100vh', overflowY: 'auto' },
    headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' },
    title: { fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: 0 },
    subtitle: { fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' },
    dateBadge: { fontSize: '13px', backgroundColor: '#ffffff', padding: '8px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#475569', fontWeight: '500' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' },
    statCard: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' },
    statIconWrap: { width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' },
    statNumber: { fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 },
    statLabel: { fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' },
    tableSection: { backgroundColor: '#ffffff', padding: '24px', borderRadius: '10px', border: '1px solid #e2e8f0' },
    tableTitle: { fontSize: '16px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 16px 0' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' },
    thRow: { borderBottom: '1px solid #e2e8f0', color: '#64748b' },
    th: { padding: '10px' },
    tdRow: { borderBottom: '1px solid #f1f5f9', color: '#334155' },
    td: { padding: '12px 10px' },
    emptyRow: { padding: '32px 10px', textAlign: 'center', color: '#94a3b8' },
  };

  return (
    <main style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>Dashboard</h2>
          <p style={styles.subtitle}>{'Welcome back, ' + adminName}</p>
        </div>
        <div style={styles.dateBadge}>{todayLabel}</div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIconWrap}>
            <FolderOpen size={16} color="#1d4ed8" />
          </div>
          <p style={styles.statNumber}>{loading ? '-' : programCount}</p>
          <p style={styles.statLabel}>Active Programmes</p>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIconWrap}>
            <Newspaper size={16} color="#1d4ed8" />
          </div>
          <p style={styles.statNumber}>{loading ? '-' : newsCount}</p>
          <p style={styles.statLabel}>News & Events</p>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIconWrap}>
            <FileText size={16} color="#1d4ed8" />
          </div>
          <p style={styles.statNumber}>{loading ? '-' : publicationCount}</p>
          <p style={styles.statLabel}>Publications</p>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIconWrap}>
            <Clock size={16} color="#1d4ed8" />
          </div>
          <p style={styles.statNumber}>{loading ? '-' : draftCount}</p>
          <p style={styles.statLabel}>Drafts Pending</p>
        </div>
      </div>

      <div style={styles.tableSection}>
        <h3 style={styles.tableTitle}>Recent Secretariat Activities</h3>

        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Log ID</th>
              <th style={styles.th}>Action Description</th>
              <th style={styles.th}>User / Entity</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={styles.emptyRow}>Loading activity...</td></tr>
            ) : recentActivities.length === 0 ? (
              <tr><td colSpan={5} style={styles.emptyRow}>No recent activity recorded yet.</td></tr>
            ) : (
              recentActivities.map((log, index) => {
                const colors = statusStyle(log.status);
                return (
                  <tr key={log.id || index} style={styles.tdRow}>
                    <td style={{ ...styles.td, fontWeight: '500' }}>{log.id}</td>
                    <td style={styles.td}>{log.details}</td>
                    <td style={{ ...styles.td, color: '#64748b' }}>{log.user}</td>
                    <td style={styles.td}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500', backgroundColor: colors.bg, color: colors.text }}>
                        {log.status}
                      </span>
                    </td>
                    <td style={{ ...styles.td, color: '#94a3b8' }}>{formatDate(log.date)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}