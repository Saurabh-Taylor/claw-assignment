import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from "../utils/axiosInstance";
import { removeUser } from '../redux/features/authSlice';

import { useQueryClient } from '@tanstack/react-query';


const Navbar = () => {
  const user = useSelector(store => store.auth.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const {data} = await axiosInstance.get('/logout');
      queryClient.clear(); 
      dispatch(removeUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return null;

  return (
    <nav className="bg-primary text-primary-content">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Todo App</Link>
        <div className="flex items-center">
          <span className="mr-4">Welcome, {user}</span>
          <Link to="/sessions" className="btn btn-ghost">View Sessions</Link>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;