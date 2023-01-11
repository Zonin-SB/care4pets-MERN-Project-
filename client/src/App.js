import React from 'react';
import './index.css';

import { Routes, Route } from 'react-router-dom';
import {
  AdminAddPlans,
  AdminApprovalDetailedView,
  AdminApprovalList,
  AdminEditPlan,
  AdminExpertInfo,
  AdminHome,
  AdminLogin,
  AdminRejectExpert,
  AdminUserInfo,
  AdminViewPlans,
  Error,
  ExpertApplyForm,
  ExpertHome,
  ExpertLogin,
  ExpertProfile,
  ExpertRejectedReason,
  ExpertSignup,
  Home,
  UserEditProfile,
  UserEditProfilePic,
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
        <Route path="/userEditProfilePic" element={<UserEditProfilePic/>} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/userinfo" element={<AdminUserInfo />} />
        <Route path="/expertinfo" element={<AdminExpertInfo />} />
        <Route path="/adminViewPlans" element={<AdminViewPlans />} />
        <Route path="/adminAddPlans" element={<AdminAddPlans />} />
        <Route path="/adminEditPlan/:id" element={<AdminEditPlan />} />
        <Route path="/adminApprovalList" element={<AdminApprovalList/>} />
        <Route path="/expertDetailedView/:id" element={<AdminApprovalDetailedView/>} />
        <Route path="/adminRejectExpert/:id" element={<AdminRejectExpert/>} />

        <Route path="/expertLogin" element={<ExpertLogin />} />
        <Route path="/expertSignup" element={<ExpertSignup />} />
        <Route path="/expertHome" element={<ExpertHome />} />
        <Route path="/expertProfile" element={<ExpertProfile/>} />
        <Route path="/expertApplyForm" element={<ExpertApplyForm/>} />
        <Route path="/expertRejectedReason/:id" element={<ExpertRejectedReason/>} />
        

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
