import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    // Don't fetch if we already have user data
    if (userData) {
      console.log('✅ User data already loaded');
      return;
    }

    try {
      console.log('🔍 Fetching user profile...');
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      console.log('✅ User profile fetched:', res.data);
      dispatch(addUser(res.data));
    } catch (err) {
      console.error('❌ Profile fetch error:', err);
      if (err.response?.status === 401) {
        console.log('❌ Unauthorized - redirecting to login');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Empty dependency array

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
