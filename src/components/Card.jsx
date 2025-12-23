import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const Card = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, about, skills, age, gender } = user || {};
  
  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + '/profile/send/' + status + '/' + userId,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div style={{
      background: 'var(--card-bg, #ffffff)',
      borderRadius: '24px',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '380px',
      boxShadow: '0 10px 40px var(--shadow, rgba(0, 0, 0, 0.1))',
      border: '1px solid var(--border, #e5e7eb)',
    }}>
      <div style={{ position: 'relative', height: '400px' }}>
        <img 
          src={photoUrl} 
          alt={firstName}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          marginBottom: '0.5rem' 
        }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700', 
            color: 'var(--text, #1a1a1a)', 
            margin: 0 
          }}>
            {firstName} {lastName}
          </h2>
          {age && (
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              color: '#fff',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '600',
            }}>
              {age}
            </span>
          )}
        </div>
        
        {gender && (
          <p style={{ 
            color: 'var(--text-secondary, #6c757d)', 
            fontSize: '0.95rem', 
            margin: '0 0 1rem 0' 
          }}>
            {gender}
          </p>
        )}
        
        <p style={{ 
          color: 'var(--text, #1a1a1a)', 
          fontSize: '1rem', 
          lineHeight: '1.6', 
          margin: '0 0 1.5rem 0', 
          opacity: 0.9 
        }}>
          {about}
        </p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => handleRequest('ignored', _id)}
            style={{
              flex: 1,
              padding: '0.875rem',
              border: '2px solid var(--secondary, #ec4899)',
              background: 'transparent',
              color: 'var(--secondary, #ec4899)',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--secondary, #ec4899)';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--secondary, #ec4899)';
            }}
          >
            ✕ Pass
          </button>
          
          <button
            onClick={() => handleRequest('interested', _id)}
            style={{
              flex: 1,
              padding: '0.875rem',
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            ❤️ Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;