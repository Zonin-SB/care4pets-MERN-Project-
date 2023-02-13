import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { UserLoginPage, UserNav } from '../Components';

function UserLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const user = jwt(token);

      if (user) {
        navigate('/userHome');
      } else {
        navigate('/userLogin');
      }
    } else {
      navigate('/userLogin');
    }
  }, [navigate]);

  return (
    <div>
      <UserNav />
      <UserLoginPage />
    </div>
  );
}

export default UserLogin;
