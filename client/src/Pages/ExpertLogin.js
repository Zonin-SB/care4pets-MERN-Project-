import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { ExpertLoginPage, UserNav } from '../Components';

function ExpertLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('expertToken');
    if (token) {
      const expert = jwt(token);

      if (expert) {
        navigate('/expertHome');
      } else {
        navigate('/expertLogin');
      }
    } else {
      navigate('/expertLogin');
    }
  }, [navigate]);

  return (
    <div>
      <UserNav />
      <ExpertLoginPage />
    </div>
  );
}

export default ExpertLogin;
