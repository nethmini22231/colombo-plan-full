'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin';

  const handleSignOut = () => {
    router.push('/admin');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' }}>

      <aside style={{ width: '260px', backgroundColor: '#0b192c', color: '#cbd5e1', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', flexShrink: 0 }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #1e293b' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>The Colombo Plan</h1>
          <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Secretariat Admin</p>
        </div>

        <nav style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="/admin/dashboard" style={{ padding: '10px 14px', backgroundColor: pathname === '/admin/dashboard' ? '#1e293b' : 'transparent', color: '#ffffff', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Dashboard
          </a>

          <a href="/admin/what-we-do" style={{ padding: '10px 14px', backgroundColor: pathname === '/admin/what-we-do' ? '#1e293b' : 'transparent', color: '#cbd5e1', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
            What We Do
          </a>

          <a href="/admin/institutions" style={{ padding: '10px 14px', backgroundColor: pathname === '/admin/institutions' ? '#1e293b' : 'transparent', color: '#cbd5e1', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
            Institutions
          </a>

          <a href="/admin/private-sector" style={{ padding: '10px 14px', backgroundColor: pathname === '/admin/private-sector' ? '#1e293b' : 'transparent', color: '#cbd5e1', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
            Private Sector
          </a>

          <a href="/admin/individuals" style={{ padding: '10px 14px', backgroundColor: pathname === '/admin/individuals' ? '#1e293b' : 'transparent', color: '#cbd5e1', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
            Individuals
          </a>

          <a href="/admin/member-portal" style={{ padding: '10px 14px', backgroundColor: pathname === '/admin/member-portal' ? '#1e293b' : 'transparent', color: '#cbd5e1', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
            Member Portal
          </a>

          <a href="/admin/news-events" style={{ padding: '10px 14px', backgroundColor: pathname === '/admin/news-events' ? '#1e293b' : 'transparent', color: '#cbd5e1', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
            News & Events
          </a>
          <a href="/admin/publications" style={{ padding: '10px 14px', backgroundColor: pathname === '/admin/publications' ? '#1e293b' : 'transparent', color: '#cbd5e1', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
            Publications
          </a>
          <a href="/admin/logs" style={{ padding: '10px 14px', backgroundColor: pathname === '/admin/logs' ? '#1e293b' : 'transparent', color: '#cbd5e1', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
            Activity Logs
          </a>

          <div style={{ marginTop: 'auto', borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
            <button
              onClick={handleSignOut}
              style={{ width: '100%', padding: '10px 14px', backgroundColor: 'transparent', color: '#f87171', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '14px', borderRadius: '8px' }}
            >
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '32px', boxSizing: 'border-box', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}