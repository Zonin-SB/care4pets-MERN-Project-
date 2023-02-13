import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { UserNav, UserOTPLoginPage } from '../Components';

function UserOTPLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const user = jwt(token);

      if (user) {
        navigate('/userHome');
      }
    } else {
      navigate('/userOTPLogin');
    }
  }, [navigate]);
  return (
    <div>
      <UserNav />
      <UserOTPLoginPage />
    </div>
  );
}

export default UserOTPLogin;
