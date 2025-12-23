// Theme utility functions and constants

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Get the initial theme from localStorage or default to light
export const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  
  // Check if user prefers dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? THEMES.DARK : THEMES.LIGHT;
};

// Save theme to localStorage
export const saveTheme = (theme) => {
  localStorage.setItem('theme', theme);
};

// Apply theme to document
export const applyTheme = (theme) => {
  if (theme === THEMES.DARK) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
};

// Toggle between light and dark theme
export const toggleTheme = (currentTheme) => {
  return currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
};