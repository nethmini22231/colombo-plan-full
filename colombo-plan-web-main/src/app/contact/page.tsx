'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactUsPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#e2ecf7',
        padding: '30px 20px 80px',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'sans-serif'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
        }}
      >
        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#1e293b', fontWeight: '600' }}>Contact Us</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          Colombo Plan Secretariat
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '36px' }}>
          Get in touch with our team for partnerships, programme inquiries, or official communication.
        </p>

        {/* 2-Column Layout: Contact Details & Google Map */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column: Contact Information Cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#f8fafc',
              padding: '32px',
              borderRadius: '20px',
              border: '1px solid #e2e8f0'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Address */}
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#2563eb',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  Physical Address
                </span>
                <p style={{ fontSize: '15px', color: '#1e293b', lineHeight: '1.6', margin: '6px 0 0', fontWeight: '500' }}>
                  5th Floor, M2M Veranda Offices,<br />
                  No. 34, W.A.D. Ramanayake Mawatha,<br />
                  Colombo 02, Sri Lanka.
                </p>
              </div>

              {/* General Email */}
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#2563eb',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  General Email
                </span>
                <p style={{ margin: '6px 0 0' }}>
                  <a
                    href="mailto:info@colombo-plan.org"
                    style={{ fontSize: '15px', color: '#1e085a', textDecoration: 'none', fontWeight: '700' }}
                  >
                    info@colombo-plan.org
                  </a>
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#2563eb',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  Phone Number
                </span>
                <p style={{ margin: '6px 0 0' }}>
                  <a
                    href="tel:+94112576322"
                    style={{ fontSize: '15px', color: '#1e085a', textDecoration: 'none', fontWeight: '700' }}
                  >
                    +94 11 2576 322
                  </a>
                </p>
              </div>
            </div>

            {/* Social Media Square Icon Buttons */}
            <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '12px' }}>
                Follow us on:
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                
                {/* Facebook Icon Button */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#07182d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* LinkedIn Icon Button */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#07182d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* X (Twitter) Icon Button */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  title="X (Twitter)"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#07182d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Google Map Embed */}
          <div
            style={{
              width: '100%',
              minHeight: '380px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e2e8f0'
            }}
          >
            <iframe
              title="Colombo Plan Secretariat Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798485293427!2d79.8517226758849!3d6.914755518503833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593b44888887%3A0x6a05e263c9b7b8a7!2sW%20A%20D%20Ramanayake%20Mawatha%2C%20Colombo!5e0!3m2!1sen!2slk!4v1710000000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', display: 'block' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </main>
  );
}