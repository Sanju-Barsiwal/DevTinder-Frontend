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
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    getfeed();
  }, []);

  if (!feed)
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--text, #1a1a1a)',
      }}>
        Loading Feed...
      </div>
    );

  if (feed.length <= 0)
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--text, #1a1a1a)',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1rem',
        }}>
          No More Users in Feed!
        </h1>
        <p style={{
          color: 'var(--text-secondary, #6c757d)',
          fontSize: '1.125rem',
        }}>
          Check back later 🚀
        </p>
      </div>
    );

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '3rem 1rem',
      minHeight: 'calc(100vh - 200px)',
    }}>
      <Card user={feed[0]} />
    </div>
  );
};

export default Feed;