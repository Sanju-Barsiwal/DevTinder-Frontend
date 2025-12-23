import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections)
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem', 
        color: 'var(--text, #1a1a1a)' 
      }}>
        Loading Connections...
      </div>
    );

  if (connections.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem', 
        color: 'var(--text, #1a1a1a)' 
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700' 
        }}>
          No Connections Found
        </h1>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem 1rem', 
      maxWidth: '1200px', 
      margin: '0 auto' 
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: '2rem',
        backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Connections
      </h1>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem' 
      }}>
        {connections.map((conn) => {
          const { firstName, lastName, photoUrl, age, gender, about, skills } = conn;
          return (
            <div
              key={conn._id}
              style={{
                background: 'var(--card-bg, #ffffff)',
                borderRadius: '16px',
                display: 'flex',
                overflow: 'hidden',
                boxShadow: '0 4px 16px var(--shadow, rgba(0, 0, 0, 0.1))',
                border: '1px solid var(--border, #e5e7eb)',
              }}
            >
              <div style={{ width: '200px', flexShrink: 0 }}>
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </div>
              
              <div style={{ padding: '1.5rem', flex: 1 }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--text, #1a1a1a)',
                  margin: '0 0 0.5rem 0',
                }}>
                  {firstName} {lastName}
                </h2>
                
                {age && gender && (
                  <p style={{
                    color: 'var(--text-secondary, #6c757d)',
                    margin: '0 0 0.75rem 0',
                  }}>
                    {age} years • {gender}
                  </p>
                )}
                
                {about && (
                  <p style={{
                    color: 'var(--text, #1a1a1a)',
                    opacity: 0.9,
                    margin: '0 0 1rem 0',
                  }}>
                    {about}
                  </p>
                )}
                
                {skills && skills.length > 0 && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.5rem', 
                    flexWrap: 'wrap' 
                  }}>
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        style={{
                          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                          color: '#fff',
                          padding: '0.35rem 0.875rem',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;