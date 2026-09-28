'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#07182d', color: '#94a3b8', padding: '60px 24px 30px', fontFamily: 'Arial, sans-serif', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cp-footer-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.25s ease, transform 0.25s ease;
          display: inline-block;
        }
        .cp-footer-link:hover {
          color: #ffffff;
          transform: translateX(4px);
        }
        .cp-footer-soc {
          transition: transform 0.25s ease, background-color 0.25s ease;
        }
        .cp-footer-soc:hover {
          transform: translateY(-4px);
          background-color: #1e5a91 !important;
        }
      `}} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '50px' }}>

        {/* Col 1: Logo using image link & About */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#ffffff', overflow: 'hidden', display: 'grid', placeItems: 'center', padding: '4px', flexShrink: 0 }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhlBgvo1XafkVGmqDxvY6pLWG9cH2b6WbBg7ybZyy_QOzSp7AXSvuKNk&s=10"
                alt="The Colombo Plan Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div>
              <span style={{ fontSize: '14px', fontWeight: '900', color: '#ffffff', display: 'block', letterSpacing: '-0.3px' }}>THE COLOMBO PLAN</span>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase', display: 'block' }}>SECRETARIAT</span>
            </div>
          </div>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 20px' }}>
            An intergovernmental organisation of 26 member states dedicated to human resource development, south-south cooperation, and regional socio-economic growth.
          </p>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { label: 'f', href: 'https://facebook.com' },
              { label: 'in', href: 'https://linkedin.com' },
              { label: 'x', href: 'https://twitter.com' }
            ].map((soc, i) => (
              <a key={i} href={soc.href} target="_blank" rel="noreferrer" className="cp-footer-soc" style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#0f294a', color: '#fff', display: 'grid', placeItems: 'center', textDecoration: 'none', fontWeight: '800', fontSize: '13px' }}>
                {soc.label}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Secretariat Headquarters */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Secretariat Headquarters</h4>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 14px' }}>
            5th Floor, M2M Veranda Offices,<br />No. 34, W.A.D. Ramanayake Mawatha,<br />Colombo 02, Sri Lanka.
          </p>
          <div style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6 }}>
            <span>Phone: </span><a href="tel:+94112576322" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '700' }}>+94 11 2576 322</a><br />
            <span>Email: </span><a href="mailto:info@colombo-plan.org" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '700' }}>info@colombo-plan.org</a>
          </div>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><Link href="/" className="cp-footer-link">Home</Link></li>
            <li><Link href="/about" className="cp-footer-link">About Us</Link></li>
            <li><Link href="/what-we-do" className="cp-footer-link">What We Do</Link></li>
            <li><Link href="/news-events" className="cp-footer-link">News &amp; Events</Link></li>
            <li><Link href="/publications" className="cp-footer-link">Publications</Link></li>
            <li><Link href="/contact" className="cp-footer-link">Contact Us</Link></li>
          </ul>
        </div>

        {/* Col 4: Member Support */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Member Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><Link href="/member-countries" className="cp-footer-link">Member Portals</Link></li>
            <li><Link href="/member-countries" className="cp-footer-link">Institutional Resources</Link></li>
            <li><Link href="/privacy-policy" className="cp-footer-link">Privacy Policy</Link></li>
            <li><Link href="/terms-conditions" className="cp-footer-link">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Sub-footer */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b', flexWrap: 'wrap', gap: '14px' }}>
        <span>&copy; {new Date().getFullYear()} The Colombo Plan Secretariat. All rights reserved.</span>
        <span>Designed &amp; Developed by Vogue Software Solutions</span>
      </div>
    </footer>
  );
}