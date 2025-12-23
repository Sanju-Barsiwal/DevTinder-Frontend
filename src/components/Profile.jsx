import React from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.user);
  
  if (!user) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--text, #1a1a1a)',
      }}>
        Loading profile...
      </div>
    );
  }

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;