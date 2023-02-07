import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserPlanDetails } from '../../Axios/Services/UserServices';

function UserPlanPage() {
  const [plan, setPlan] = useState(false);
  const userId = useSelector((state) => state.admin.userDetails.userId);
  useEffect(() => {
    getPlan();
    async function getPlan() {
      const token = localStorage.getItem('userToken');
      const data = await getUserPlanDetails(token, userId);
      if (data.plan) {
        setPlan(data.plan[0]);
      }
    }
  }, [userId]);
 

  return (
    <div>
      <h1 className="font-semibold text-2xl p-4">Your Plan</h1>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          {plan?plan.plan.planName:''}
        </h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">₹</span>
          <span className="text-5xl font-extrabold tracking-tight">
            {plan ? plan.plan.currentPrice : ''}
          </span>
          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
            /{plan ? plan.plan.validity : ''}month
          </span>
        </div>
        {/* List */}
        <ul className="space-y-5 my-7">
          <li className="flex space-x-3">
            {/* Icon */}
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              Diet/Training Plans : {plan ? plan.plan.dietPlan : ''}+
            </span>
          </li>
          <li className="flex space-x-3">
            {/* Icon */}
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              Daily Expert Availability :{' '}
              {plan ? plan.plan.expertAvailability : ''}mins
            </span>
          </li>
          <li className="flex space-x-3">
            {/* Icon */}
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              Checkup on pets : {plan ? plan.plan.numberOfCheckup : ''}
              times/month
            </span>
          </li>
          <li className="flex space-x-3">
            {/* Icon */}
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              Valid From : {plan ? plan.validFrom : ''} 
            </span>
          </li>
          <li className="flex space-x-3">
            {/* Icon */}
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              Valid Till : {plan ? plan.validTill : ''}
            </span>
          </li>
        </ul>
        {/* <button
    type="button"
    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
  >
    Choose plan
  </button> */}
      </div>
    </div>
  );
}

export default UserPlanPage;
