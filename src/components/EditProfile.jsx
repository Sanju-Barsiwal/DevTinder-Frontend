import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import Card from './Card';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || '');
  const [gender, setGender] = useState(user.gender || '');
  const [about, setAbout] = useState(user.about || '');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError('');
    try {
      // Build the request body, only include gender if it has a valid value
      const profileData = {
        firstName,
        lastName,
        photoUrl,
        age,
        about,
      };

      // Only add gender if it's not empty
      if (gender && gender.trim() !== '') {
        profileData.gender = gender;
      }

      const res = await axios.post(BASE_URL + '/profile/edit', profileData, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          'Failed to save profile',
      );
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    border: '2px solid var(--border, #e5e7eb)',
    borderRadius: '12px',
    fontSize: '1rem',
    color: 'var(--text, #1a1a1a)',
    background: 'var(--bg-color, #f8f9fa)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'var(--text, #1a1a1a)',
    fontWeight: '600',
    fontSize: '0.95rem',
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          padding: '2rem 1rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '24px',
            padding: '2.5rem',
            width: '100%',
            maxWidth: '550px',
            boxShadow: '0 10px 40px var(--shadow, rgba(0, 0, 0, 0.1))',
            border: '1px solid var(--border, #e5e7eb)',
          }}
        >
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              backgroundImage:
                'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            Edit Profile
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <label style={labelStyle}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>Photo URL</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <label style={labelStyle}>Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={labelStyle}>About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="3"
              style={{
                ...inputStyle,
                minHeight: '120px',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: '#ef4444',
                marginBottom: '1rem',
                padding: '0.75rem',
                background: '#fee2e2',
                borderRadius: '8px',
              }}
            >
              {error}
            </p>
          )}

          <button
            onClick={saveProfile}
            style={{
              width: '100%',
              padding: '1rem',
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '1.125rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            💾 Save Profile
          </button>
        </div>

        <div>
          <Card user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
      </div>

      {showToast && (
        <div
          style={{
            position: 'fixed',
            top: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#10b981',
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            fontWeight: '600',
            zIndex: 9999,
          }}
        >
          ✓ Profile saved successfully!
        </div>
      )}
    </>
  );
};

export default EditProfile;
