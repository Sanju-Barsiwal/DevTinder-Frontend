import React from 'react';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: isDark ? '#2d3748' : '#e5e7eb',
        border: 'none',
        borderRadius: '50px',
        width: '60px',
        height: '32px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div
        style={{
          position: 'absolute',
          top: '4px',
          left: isDark ? '32px' : '4px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: isDark ? '#fbbf24' : '#f59e0b',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </div>
    </button>
  );
};

export default ThemeToggle;