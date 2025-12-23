import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--card-bg, #ffffff)',
      borderTop: '1px solid var(--border, #e5e7eb)',
      padding: '2.5rem 2rem',
      marginTop: '4rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ fontSize: '2rem' }}>💻</span>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}>
              DevTinder
            </h3>
          </div>
          <p style={{
            color: 'var(--text-secondary, #6c757d)',
            margin: 0,
          }}>
            Connect with developers worldwide
          </p>
          <p style={{
            color: 'var(--text-secondary, #6c757d)',
            fontSize: '0.875rem',
            margin: 0,
          }}>
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </div>

        <nav style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
        }}>
          <a
            href="https://github.com/Sanju-Barsiwal"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--text-secondary, #6c757d)',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary, #6366f1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--text-secondary, #6c757d)';
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;