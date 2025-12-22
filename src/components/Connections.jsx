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
      //console.log('Connections Data:', res.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections)
    return <div className="text-center my-10">Loading Connections...</div>;

  if (connections.length === 0) {
    return <h1 className="text-center text-xl my-10">No Connections Found</h1>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Connections</h1>
      <div className="flex flex-col gap-4 w-3/4 mx-auto">
        {connections.map((conn) => {
          const { firstName, lastName, photoUrl, age, gender, about, skills } =
            conn;
          return (
            <div
              key={conn._id}
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
                {/* <div className="card-actions justify-end mt-4">
                  <button className="btn btn-secondary">Ignore</button>
                  <button className="btn btn-primary">Interested</button>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
