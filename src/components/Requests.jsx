import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utils/requestsSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests)
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--text, #1a1a1a)',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
        }}>
          Loading Requests....
        </h1>
      </div>
    );

  if (requests.length === 0)
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--text, #1a1a1a)',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
        }}>
          No Requests Found
        </h1>
      </div>
    );

  return (
    <div style={{
      padding: '2rem 1rem',
      maxWidth: '900px',
      margin: '0 auto',
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
        Requests
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about, skills } =
            request.fromUserId;
          return (
            <div
              key={request._id}
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
                    objectFit: 'cover',
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
                    flexWrap: 'wrap',
                    marginBottom: '1rem',
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

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => reviewRequests('rejected', request._id)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '2px solid var(--secondary, #ec4899)',
                      background: 'transparent',
                      color: 'var(--secondary, #ec4899)',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
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
                    Reject
                  </button>

                  <button
                    onClick={() => reviewRequests('accepted', request._id)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: 'none',
                      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                      color: '#fff',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;