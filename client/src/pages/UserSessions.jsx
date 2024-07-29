import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { Navbar } from '../components';

const UserSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axiosInstance.get('/sessions', { withCredentials: true });
      toast.success("sessions fetched successfully")
      setSessions(response.data.sessions);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch sessions');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-error">{error}</div>;

  return (
    <>
    <Navbar/>
       
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Sessions</h1>
      {sessions?.length <1 ? (
        <p>No sessions found.</p>
    ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Login Time</th>
                <th>ip address</th>
                <th>Logout Time</th>
              </tr>
            </thead>
            <tbody>
              {sessions?.map((session , index)=>{
                  let { loginTime , ipAddress , _id:id , logoutTime} = session
                let newloginTime =  convertToIST(loginTime)
                return <>
                 <tr key={id}>
                 <td>{newloginTime}</td>
                 <td>{ipAddress}</td>
                 <td>{convertToIST(logoutTime) || "NA"}</td>
               </tr>
               </>
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
      </>
  );
};


function convertToIST(dateString) {
    const date = new Date(dateString);
    const options = {
        timeZone: 'Asia/Kolkata', 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    return date.toLocaleString('en-IN', options);
}


export default UserSessions;