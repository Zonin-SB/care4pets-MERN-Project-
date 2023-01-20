import React, { useEffect } from 'react';
import { UserHomeNavPage, UserHomePage } from '../Components';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginDetails } from '../redux/adminReducer';

function UserHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('userToken');
  
    if (token) {
      const user = jwt(token);
      console.log(user,'red use');
      dispatch(userLoginDetails(user));
      if (user) {
        navigate('/userHome');
      } else {
        navigate('/userLogin');
      }
    } else {
      navigate('/userLogin');
    }
  }, [navigate, dispatch]);

  return (
    <div>
      <UserHomeNavPage />
      <UserHomePage />
    </div>
  );
}

export default UserHome;
