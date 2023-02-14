import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPlanOrderValues } from '../../Axios/Services/UserServices';
import {
  getPlanOrderValues,
  getSelectedExpertDetails,
  getSelectedPlanDetails,
} from '../../redux/userReducer';

function BuyPlanSuccessPage() {
  const { planOrderValues } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    postOrderValues();
    async function postOrderValues() {
      try {
        const succesurl = window.location.href;

        const data = await postPlanOrderValues(token, {
          succesurl,
          planOrderValues,
        });
        if (data.status === 'ok') {
        } else {
          setError(
            'Something went wrong...please try again after sometimes...'
          );
        }
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      dispatch(getSelectedExpertDetails(false));
      dispatch(getSelectedPlanDetails(false));
      dispatch(getPlanOrderValues(false));
    };
  }, [planOrderValues, dispatch]);

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <>
        <div className=" h-screen">
          <div className="bg-white p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            {error ? (
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Payment Failed!
                </h3>
                <p className="text-gray-600 my-2">
                  Something went wrong...please try again after sometimes...
                </p>
                <p> Have a great day!</p>
                {/* {error?<p style={{color:'red'}} className="text-center">{error}</p> : ''} */}
                <div className="py-10 text-center">
                  <Link to={'/userHome'}>
                    <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                      GO BACK
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Payment Done!
                </h3>
                <p className="text-gray-600 my-2">
                  Thank you for completing your secure online payment.
                </p>
                <p> Have a great day!</p>
                {/* {error?<p style={{color:'red'}} className="text-center">{error}</p> : ''} */}
                <div className="py-10 text-center">
                  <Link to={'/userHome'}>
                    <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                      GO BACK
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}

export default BuyPlanSuccessPage;
