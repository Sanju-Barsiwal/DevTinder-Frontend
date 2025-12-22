import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      return navigate('/profile');
    } catch (err) {
      setError(err?.response?.data || 'Sign Up failed');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data));
      return navigate('/');
    } catch (err) {
      setError(err?.response?.data || 'Login failed');
      console.error(err);
    }
  };
  return (
   
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">
            {isLoggedIn ? 'Login' : 'Sign Up'}
          </h2>

          {!isLoggedIn && (
            <>
              {/* First Name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    className="h-4 w-4 opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                    />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </label>
                <div className="label">
                  <span className="label-text-alt text-gray-500">
                    3-30 characters
                  </span>
                </div>
              </label>

              {/* Last Name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    className="h-4 w-4 opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                    />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </label>
                <div className="label">
                  <span className="label-text-alt text-gray-500">
                    3-30 characters
                  </span>
                </div>
              </label>
            </>
          )}

          {/* Email */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                className="h-4 w-4 opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect
                  width="20"
                  height="16"
                  x="2"
                  y="4"
                  rx="2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                />
              </svg>
              <input
                type="email"
                className="grow"
                placeholder="mail@site.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </label>
          </label>

          {/* Password */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                className="h-4 w-4 opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {!isLoggedIn && (
              <div className="label">
                <span className="label-text-alt text-gray-500">
                  Min 8 chars with number, uppercase & lowercase
                </span>
              </div>
            )}
          </label>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error mt-2">
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={isLoggedIn ? handleLogin : handleSignUp}
            >
              {isLoggedIn ? 'Login' : 'Sign Up'}
            </button>
          </div>

          {/* Toggle Login/Signup */}
          <p
            className="text-center mt-4 cursor-pointer hover:underline"
            onClick={() => {
              setIsLoggedIn((value) => !value);
              setError('');
            }}
          >
            {isLoggedIn
              ? "New User? Sign Up here"
              : "Existing User? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};


export default Login;
