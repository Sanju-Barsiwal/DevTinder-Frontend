import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = ({ isDark, toggleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  
  const fetchUser = async () => {
    try {
      if (userData) return;
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response === 401) {
        navigate('/login');
      }
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--bg-color, #f8f9fa)',
      transition: 'all 0.3s ease'
    }}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Body;