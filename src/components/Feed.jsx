import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import Card from './Card';

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);

  const getfeed = async () => {
    try {
      console.log('🔍 Fetching feed...');
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });
      console.log('✅ Feed fetched:', res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error('❌ Feed error:', err);
      if (err.response?.status === 401) {
        console.log('❌ Unauthorized - redirecting to login');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    getfeed();
  }, []); // Keep empty dependency array

  if (!feed) return <div className="text-center my-10">Loading Feed...</div>;
  if (feed.length <= 0) return <h1 className="text-center text-xl my-10">No Users in Feed!!</h1>;
  
  return (
    <div className="flex justify-center my-12">
      <Card user={feed[0]} />
    </div>
  );
};

export default Feed;