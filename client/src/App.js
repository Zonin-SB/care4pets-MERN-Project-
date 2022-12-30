import React from 'react';
import './index.css';

import { Routes, Route } from 'react-router-dom';
import {
  AdminExpertInfo,
  AdminHome,
  AdminLogin,
  AdminUserInfo,
  Error,
  ExpertApplyForm,
  ExpertHome,
  ExpertLogin,
  ExpertProfile,
  ExpertSignup,
  Home,
  UserEditProfile,
  UserHome,
  UserLogin,
  UserProfile,
  UserSignup,
} from './Pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userHome" element={<UserHome />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/userProfile" element={<UserProfile/>} />
        <Route path="/userEditProfile" element={<UserEditProfile/>} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/userinfo" element={<AdminUserInfo />} />
        <Route path="/expertinfo" element={<AdminExpertInfo />} />

        <Route path="/expertLogin" element={<ExpertLogin />} />
        <Route path="/expertSignup" element={<ExpertSignup />} />
        <Route path="/expertHome" element={<ExpertHome />} />
        <Route path="/expertProfile" element={<ExpertProfile/>} />
        <Route path="/expertApplyForm" element={<ExpertApplyForm/>} />
        

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
