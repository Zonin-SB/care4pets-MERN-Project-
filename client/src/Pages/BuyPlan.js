import React from 'react';
import { BuyPlanPage, UserHomeNavPage, UserViewPlanPage } from '../Components';
import { useSelector } from 'react-redux';
function BuyPlan() {
  const { selectedPlanDetails } = useSelector((state) => state.user);
  return (
    <div>
      <UserHomeNavPage />
      <div>{selectedPlanDetails ? <BuyPlanPage /> : <UserViewPlanPage />}</div>
    </div>
  );
}

export default BuyPlan;
