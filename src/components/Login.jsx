import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      return navigate('/profile');
    } catch (err) {
      setError(err?.response?.data || 'Sign Up failed');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data));
      return navigate('/');
    } catch (err) {
      setError(err?.response?.data || 'Login failed');
      console.error(err);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 3rem',
    border: '2px solid var(--border, #e5e7eb)',
    borderRadius: '12px',
    fontSize: '1rem',
    color: 'var(--text, #1a1a1a)',
    background: 'var(--bg-color, #f8f9fa)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'var(--text, #1a1a1a)',
    fontWeight: '600',
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'var(--card-bg, #ffffff)',
          borderRadius: '24px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 20px 60px var(--shadow, rgba(0, 0, 0, 0.1))',
          border: '1px solid var(--border, #e5e7eb)',
        }}
      >
        <h2
          style={{
            fontSize: '2.25rem',
            fontWeight: '800',
            backgroundImage:
              'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          {isLoggedIn ? 'Welcome Back' : 'Join DevTinder'}
        </h2>

        {!isLoggedIn && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>First Name</label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.25rem',
                  }}
                >
                  👤
                </span>
                <input
                  type="text"
                  required
                  placeholder="John"
                  minLength="3"
                  maxLength="30"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Last Name</label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.25rem',
                  }}
                >
                  👤
                </span>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  minLength="3"
                  maxLength="30"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>Email</label>
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.25rem',
              }}
            >
              ✉️
            </span>
            <input
              type="email"
              placeholder="mail@example.com"
              required
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>Password</label>
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.25rem',
              }}
            >
              🔒
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              placeholder="••••••••"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem',
                padding: '0.25rem',
              }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        {error && (
          <p
            style={{
              color: '#ef4444',
              marginBottom: '1rem',
              padding: '0.75rem',
              background: '#fee2e2',
              borderRadius: '8px',
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={isLoggedIn ? handleLogin : handleSignUp}
          style={{
            width: '100%',
            padding: '1rem',
            border: 'none',
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {isLoggedIn ? 'Sign In' : 'Create Account'}
        </button>

        <div
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary, #6c757d)',
            marginBottom: '1rem',
          }}
        >
          OR
        </div>

        <p
          onClick={() => setIsLoggedIn((value) => !value)}
          style={{
            textAlign: 'center',
            color: 'var(--primary, #6366f1)',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          {isLoggedIn
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Sign In'}
        </p>
      </div>
    </div>
  );
};

export default Login;
