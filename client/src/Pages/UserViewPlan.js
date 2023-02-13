import React, { useEffect, useState } from 'react';
import { UserHomeNavPage, UserPlanPage, UserViewPlanPage } from '../Components';
import { useSelector } from 'react-redux';
import { getPlanDetails } from '../Axios/Services/UserServices';

function UserViewPlan() {
  const userId = useSelector((state) => state.admin.userDetails.userId);
  const [plan, setPlan] = useState(false);

  useEffect(() => {
    getUserPlan();

    async function getUserPlan() {
      const token = localStorage.getItem('userToken');
      const userPlan = await getPlanDetails(token, userId);
      setPlan(userPlan.plan);
    }
  }, [userId]);

  return (
    <div>
      <UserHomeNavPage />
      <div>
        {plan ? <UserPlanPage /> : ''}

        <UserViewPlanPage />
      </div>
    </div>
  );
}

export default UserViewPlan;
