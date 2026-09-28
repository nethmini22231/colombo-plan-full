'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Search, ClipboardList } from 'lucide-react';

const API = 'http://localhost:8080';

export default function ActivityLogsAdmin() {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [loading, setLoading] = useState(false);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/logs`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      } else {
        const resV1 = await fetch(`${API}/api/v1/logs`);
        if (resV1.ok) {
          const dataV1 = await resV1.json();
          setLogs(dataV1);
        } else {
          setLogs([]);
        }
      }
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      (log.action || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.user || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.entity || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'All' || log.category === filterType;

    return matchesSearch && matchesFilter;
  });

  const styles = {
    page: { width: '100%', minHeight: '85vh', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxSizing: 'border-box', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', fontFamily: 'sans-serif' },
    headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' },
    title: { fontSize: '26px', fontWeight: 'bold', color: '#0f172a', margin: 0 },
    subtitle: { fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' },
    refreshButton: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0b192c', color: '#fff', border: 'none', padding: '12px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    filterRow: { display: 'flex', gap: '16px', marginBottom: '24px' },
    searchWrap: { flex: 1, position: 'relative', display: 'flex', alignItems: 'center' },
    searchIcon: { position: 'absolute', left: '14px', color: '#94a3b8' },
    searchInput: { width: '100%', padding: '12px 14px 12px 42px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '10px', outline: 'none', backgroundColor: '#fff', color: '#0f172a' },
    select: { padding: '12px 16px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '10px', backgroundColor: '#fff', outline: 'none', color: '#0f172a', cursor: 'pointer' },
    container: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    th: { backgroundColor: '#f8fafc', padding: '14px 20px', fontSize: '12px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' },
    td: { padding: '16px 20px', fontSize: '14px', color: '#0f172a', borderBottom: '1px solid #f1f5f9' },
    emptyState: { textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff' },
    emptyIconWrap: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' },
    emptyTitle: { fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: '0 0 4px 0' },
    emptyText: { fontSize: '13px', color: '#64748b', margin: 0 },
    badge: { fontSize: '11px', fontWeight: '600', backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '3px 10px', borderRadius: '6px' },
  };

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>Activity Logs</h2>
          <p style={styles.subtitle}>Track all admin actions across the system</p>
        </div>
        <button onClick={loadLogs} disabled={loading} style={styles.refreshButton}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchWrap}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by user, action, or entity..."
            style={styles.searchInput}
          />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={styles.select}>
          <option value="All">All Categories</option>
          <option value="Create">Create</option>
          <option value="Update">Update</option>
          <option value="Delete">Delete</option>
          <option value="Auth">Auth</option>
        </select>
      </div>

      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Log ID</th>
              <th style={styles.th}>Action Description</th>
              <th style={styles.th}>User / Entity</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={5} style={styles.emptyState}>
                  <div style={styles.emptyIconWrap}>
                    <ClipboardList size={22} color="#64748b" />
                  </div>
                  <p style={styles.emptyTitle}>No activity logs found</p>
                  <p style={styles.emptyText}>Admin actions will appear here once they happen.</p>
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ ...styles.td, fontWeight: '500', color: '#64748b' }}>#{log.id}</td>
                  <td style={{ ...styles.td, fontWeight: '500' }}>{log.action}</td>
                  <td style={styles.td}>{log.user || log.entity || 'System Admin'}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{log.status || 'Success'}</span>
                  </td>
                  <td style={{ ...styles.td, color: '#64748b', fontSize: '13px' }}>{log.timestamp || log.date || 'Just now'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}