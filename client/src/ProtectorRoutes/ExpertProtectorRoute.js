import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const expert = useSelector((state) => state.admin.expertDetails);
  // const user = email
  return expert;
};

const ExpertProtectorRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/expertLogin" />;
};

export default ExpertProtectorRoute;
