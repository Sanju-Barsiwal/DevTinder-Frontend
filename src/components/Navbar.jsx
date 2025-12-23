import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ isDark, toggleTheme }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + '/logout',
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      return navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav style={{
      background: 'var(--card-bg, #ffffff)',
      borderBottom: '1px solid var(--border, #e5e7eb)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px var(--shadow, rgba(0, 0, 0, 0.1))',
    }}>
      <Link
        to={'/'}
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>💻</span>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: '800',
          backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
        }}>
          DevTinder
        </h1>
      </Link>

      {user && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          
          <span style={{
            color: 'var(--text, #1a1a1a)',
            fontWeight: '500',
          }}>
            Welcome, {user.firstName}
          </span>

          <div style={{ position: 'relative' }}>
            <img
              src={user.photoUrl}
              alt={user.firstName}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                cursor: 'pointer',
                border: '3px solid var(--primary, #6366f1)',
                objectFit: 'cover',
              }}
            />

            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '60px',
                right: '0',
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--border, #e5e7eb)',
                borderRadius: '12px',
                minWidth: '200px',
                boxShadow: '0 8px 24px var(--shadow, rgba(0, 0, 0, 0.1))',
                zIndex: 1000,
                overflow: 'hidden',
              }}>
                <Link
                  to={'/profile'}
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.875rem 1.25rem',
                    color: 'var(--text, #1a1a1a)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border, #e5e7eb)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--primary, #6366f1)';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--text, #1a1a1a)';
                  }}
                >
                  <span>Profile</span>
                  <span style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    color: '#fff',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                  }}>
                    New
                  </span>
                </Link>

                <Link
                  to={'/connections'}
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.875rem 1.25rem',
                    color: 'var(--text, #1a1a1a)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border, #e5e7eb)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--primary, #6366f1)';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--text, #1a1a1a)';
                  }}
                >
                  Connections
                </Link>

                <Link
                  to={'/requests'}
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.875rem 1.25rem',
                    color: 'var(--text, #1a1a1a)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border, #e5e7eb)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--primary, #6366f1)';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--text, #1a1a1a)';
                  }}
                >
                  Requests
                </Link>

                <div
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: '0.875rem 1.25rem',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#fee2e2';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;