import React from 'react';
import './index.css';

import { Routes, Route } from 'react-router-dom';
import {
  UserProtectorRoute,
  ExpertProtectorRoute,
  AdminProtectorRoute,
} from './ProtectorRoutes';
import {
  AdminAcceptExpert,
  AdminAddPlans,
  AdminApprovalDetailedView,
  AdminApprovalList,
  AdminEditPlan,
  AdminEditVideo,
  AdminExpertInfo,
  AdminHome,
  AdminLogin,
  AdminManageVideos,
  AdminRejectExpert,
  AdminRejectVideo,
  AdminUserInfo,
  AdminVideoApprovalDetails,
  AdminVideoApprovalList,
  AdminViewPayment,
  AdminViewPlans,
  BuyPlan,
  BuyPlanSuccess,
  Error,
  ExpertAcceptedMessage,
  ExpertAddVideo,
  ExpertApplyForm,
  ExpertChat,
  ExpertClientView,
  ExpertEditVideo,
  ExpertHome,
  ExpertLogin,
  ExpertProfile,
  ExpertRejectedReason,
  ExpertRejectedVideoDetailedViewPage,
  ExpertRejectedVideoList,
  ExpertSignup,
  ExpertVideos,
  Home,
  UserChat,
  UserEditProfile,
  UserEditProfilePic,
  UserHome,
  UserLogin,
  UserProfile,
  UserSelectExpert,
  UserSignup,
  UserVideos,
  UserViewExpert,
  UserViewPlan,
} from './Pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/userHome" element={<UserHome />} />
        <Route element={<UserProtectorRoute />}>
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/userEditProfile" element={<UserEditProfile />} />
          <Route path="/userEditProfilePic" element={<UserEditProfilePic />} />
          <Route path="/userSelectExpert" element={<UserSelectExpert />} />
          <Route path="/userViewPlan" element={<UserViewPlan />} />
          <Route path="/userBuyPlan" element={<BuyPlan />} />
          <Route path="/buyPlanSuccess" element={<BuyPlanSuccess />} />
          <Route path="/userVideos" element={<UserVideos />} />
          <Route path="/userViewExpert/:id" element={<UserViewExpert />} />
          <Route path="/userChat/:id" element={<UserChat />} />
        </Route>

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminHome" element={<AdminHome />} />

        <Route element={<AdminProtectorRoute />}>
          <Route path="/userinfo" element={<AdminUserInfo />} />
          <Route path="/expertinfo" element={<AdminExpertInfo />} />
          <Route path="/adminViewPlans" element={<AdminViewPlans />} />
          <Route path="/adminAddPlans" element={<AdminAddPlans />} />
          <Route path="/adminEditPlan/:id" element={<AdminEditPlan />} />
          <Route path="/adminApprovalList" element={<AdminApprovalList />} />
          <Route
            path="/expertDetailedView/:id"
            element={<AdminApprovalDetailedView />}
          />
          <Route
            path="/adminRejectExpert/:id"
            element={<AdminRejectExpert />}
          />
          <Route
            path="/adminAcceptExpert/:id"
            element={<AdminAcceptExpert />}
          />
          <Route
            path="/adminVideoApproval"
            element={<AdminVideoApprovalList />}
          />
          <Route
            path="/videoDetailedView/:id"
            element={<AdminVideoApprovalDetails />}
          />
          <Route path="/adminManageVideos" element={<AdminManageVideos />} />
          <Route path="/adminEditVideo/:id" element={<AdminEditVideo />} />
          <Route path="/adminRejectVideo/:id" element={<AdminRejectVideo />} />
          <Route path="/adminViewPayment" element={<AdminViewPayment />} />
        </Route>

        <Route path="/expertLogin" element={<ExpertLogin />} />
        <Route path="/expertSignup" element={<ExpertSignup />} />
        <Route path="/expertHome" element={<ExpertHome />} />

        <Route element={<ExpertProtectorRoute />}>
          <Route path="/expertProfile" element={<ExpertProfile />} />
          <Route path="/expertApplyForm" element={<ExpertApplyForm />} />
          <Route
            path="/expertRejectedReason/:id"
            element={<ExpertRejectedReason />}
          />
          <Route
            path="/expertAccepted/:id"
            element={<ExpertAcceptedMessage />}
          />
          <Route path="/expertVideos" element={<ExpertVideos />} />
          <Route path="/expertAddVideos" element={<ExpertAddVideo />} />
          <Route path="/expertEditVideo/:id" element={<ExpertEditVideo />} />
          <Route path="/expertClientView" element={<ExpertClientView />} />
          <Route path="/expertChat/:id" element={<ExpertChat />} />
          <Route
            path="/expertRejectedVideos"
            element={<ExpertRejectedVideoList />}
          />
          <Route
            path="/expertRejectedVideoDetails/:id"
            element={<ExpertRejectedVideoDetailedViewPage />}
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
