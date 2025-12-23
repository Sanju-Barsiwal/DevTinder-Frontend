import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useState, useEffect } from 'react';
import Body from './components/Body';
import Login from './components/Login';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Connections from './components/Connections';
import Requests from './components/Requests';
import appStore from './utils/appStore';
import {
  getInitialTheme,
  saveTheme,
  applyTheme,
  toggleTheme as toggleThemeUtil,
} from './utils/theme';
import './App.css';
import './styles.css';

function App() {
  const [theme, setTheme] = useState(getInitialTheme());

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  // Handle theme toggle
  const handleToggleTheme = () => {
    setTheme((currentTheme) => toggleThemeUtil(currentTheme));
  };

  const isDark = theme === 'dark';

  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Body isDark={isDark} toggleTheme={handleToggleTheme} />}
          >
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
