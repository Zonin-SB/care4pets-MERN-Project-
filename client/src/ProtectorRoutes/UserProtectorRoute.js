import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const user = useSelector((state) => state.admin.userDetails);
  // const user = email
  return user;
};

const UserProtectorRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/userLogin" />;
};

export default UserProtectorRoute;
