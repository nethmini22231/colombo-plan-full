'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'News & Events', href: '/news-events' },
    { name: 'Publications', href: '/publications' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `

        .cp-navbar {
          position: sticky;
          top: 12px;
          z-index: 50;
          max-width: 1520px;
          margin: 0 auto 24px auto;
          padding: 0 36px;
          font-family: Arial, Helvetica, sans-serif;
        }

        .cp-navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.97);
          padding: 5px 32px;
          min-height: 90px;
          border-radius: 22px;
          box-shadow:
            0 10px 30px rgba(11, 31, 58, 0.10),
            0 3px 8px rgba(11, 31, 58, 0.05);
          border: 1px solid rgba(30, 90, 145, 0.14);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .cp-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .cp-logo img {
          height: 78px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: transform 0.25s ease;
        }

        .cp-logo:hover img {
          transform: scale(1.04);
        }

        .cp-nav-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cp-nav-link {
          position: relative;
          padding: 10px 13px;
          border-radius: 11px;
          font-size: 15px;
          font-weight: 700;
          color: #172033;
          text-decoration: none;
          white-space: nowrap;
          transition:
            color 0.25s ease,
            background-color 0.25s ease,
            transform 0.25s ease;
        }

        .cp-nav-link:hover {
          color: #0B2A4A;
          background: #edf4f9;
          transform: translateY(-2px);
        }

        .cp-nav-link.active {
          color: #ffffff;
          background: linear-gradient(
            135deg,
            #07182D,
            #164B78
          );
          box-shadow: 0 6px 15px rgba(11, 42, 74, 0.20);
        }

        .cp-nav-link.active:hover {
          color: #ffffff;
          background: linear-gradient(
            135deg,
            #0B2A4A,
            #1E5A91
          );
        }

        .cp-nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 4px;
          width: 0;
          height: 2px;
          border-radius: 5px;
          background: #1E5A91;
          transform: translateX(-50%);
          transition: width 0.25s ease;
        }

        .cp-nav-link:hover::after {
          width: 18px;
        }

        .cp-nav-link.active::after {
          display: none;
        }

        .cp-menu-button {
          display: none;
          width: 42px;
          height: 42px;
          border: none;
          border-radius: 11px;
          background: #0B2A4A;
          color: white;
          cursor: pointer;
          font-size: 22px;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .cp-menu-button:hover {
          background: #164B78;
          transform: scale(1.04);
        }

        .cp-mobile-menu {
          display: none;
        }

        @media (max-width: 1150px) {
          .cp-navbar {
            padding: 0 20px;
          }

          .cp-navbar-inner {
            padding: 5px 24px;
          }

          .cp-nav-links {
            gap: 6px;
          }

          .cp-nav-link {
            padding: 9px 9px;
            font-size: 14px;
          }
        }

        @media (max-width: 900px) {
          .cp-navbar {
            top: 10px;
            margin-bottom: 20px;
            padding: 0 10px;
          }

          .cp-navbar-inner {
            min-height: 72px;
            padding: 4px 15px;
            border-radius: 18px;
          }

          .cp-logo img {
            height: 62px;
          }

          .cp-nav-links {
            display: none;
          }

          .cp-menu-button {
            display: flex;
          }

          .cp-mobile-menu {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-top: 8px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.97);
            border: 1px solid rgba(30, 90, 145, 0.14);
            border-radius: 18px;
            box-shadow: 0 15px 35px rgba(11, 31, 58, 0.13);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            animation: cpMenuOpen 0.25s ease both;
          }

          .cp-mobile-link {
            padding: 13px 15px;
            border-radius: 11px;
            color: #172033;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .cp-mobile-link:hover {
            background: #edf4f9;
            color: #0B2A4A;
          }

          .cp-mobile-link.active {
            color: white;
            background: linear-gradient(
              135deg,
              #07182D,
              #164B78
            );
          }
        }

        @keyframes cpMenuOpen {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

      `}} />

      <header className="cp-navbar">

        <div className="cp-navbar-inner">

          {/* Logo */}
          <Link
            href="/"
            className="cp-logo"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUeZTp66UIphB8jyNh07mB3YIeXWxbM9Pu4ymqJdB8ZtkKTYl3ej9Hn3Q&s=10"
              alt="The Colombo Plan Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="cp-nav-links">
            {navLinks.map((link) => {

              const isActive =
                pathname === link.href ||
                (link.href !== '/' &&
                  pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`cp-nav-link ${
                    isActive ? 'active' : ''
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="cp-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="cp-mobile-menu">

            {navLinks.map((link) => {

              const isActive =
                pathname === link.href ||
                (link.href !== '/' &&
                  pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`cp-mobile-link ${
                    isActive ? 'active' : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}

          </nav>
        )}

      </header>
    </>
  );
}