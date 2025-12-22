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
      // Remove the early return - let it fetch even if feed exists
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    getfeed();
  }, []);

  if (!feed) return <div className="text-center my-10">Loading Feed...</div>;
  if (feed.length <= 0) return <h1 className="text-center text-xl my-10">No Users in Feed!!</h1>;
  
  return (
    <div className="flex justify-center my-12">
      <Card user={feed[0]} />
    </div>
  );
};

export default Feed;