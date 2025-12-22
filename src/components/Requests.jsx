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
      <h1 className="text-2xl font-bold text-center my-10">
        Loading Requests....
      </h1>
    );

  if (requests.length === 0)
    return (
      <h1 className="text-2xl font-bold text-center my-10">
        No Requests found!!
      </h1>
    );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Requests</h1>
      <div className="flex flex-col gap-4 w-1/2 mx-auto">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about, skills } =
            request.fromUserId;
          return (
            <div
              key={request._id}
              className="card card-side bg-base-200 shadow-xl"
            >
              <figure className="w-48">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm ">
                    {age} years old • {gender}
                  </p>
                )}
                {about && <p>{about}</p>}
                {skills && skills.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {skills.map((skill, index) => (
                      <span key={index} className="badge badge-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequests('rejected', request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequests('accepted', request._id)}
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
