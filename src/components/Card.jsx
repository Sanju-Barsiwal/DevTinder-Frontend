import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const Card = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, about, skills, age, gender } =
    user || {};
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
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          {age && gender && <p>{age + ', ' + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4 mx-2 px-2">
            <button
              className="btn btn-secondary"
              onClick={() => handleRequest('ignored', _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleRequest('interested', _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
