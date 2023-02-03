import React, { useEffect, useState } from 'react';
// import {Link} from 'react-router-dom'
import { selectPlan, viewAllPlan } from '../../Axios/Services/UserServices';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSelectedPlanDetails } from '../../redux/userReducer';
import Swal from 'sweetalert2';
// import './HomePage.css';

function HomePage4(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [plan, setPlan] = useState('');
  useEffect(() => {
    fetchPlan();

    async function fetchPlan() {
      const data = await viewAllPlan();
      setPlan(data.planDetails);
    }
  }, []);

  // async function userSelectPlan(id) {
  //   const token = localStorage.getItem('userToken');
  //   if(!token){
  //     navigate('/userLogin')
  //   }else{
  //     const data = await selectPlan(token, id);
  //     if (data.status === 'ok') {
  //       dispatch(getSelectedPlanDetails(data.planDetails[0]));
  //       navigate('/userSelectExpert')
  //     }else if(data.status==='error'){
  //       setError('Something went wrong...please try again after sometimes...')
  //     }else{
  //       navigate('/userLogin')
  //     }
  //   }
   
  // }

  const userSelectPlanAlert=(id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to select this plan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, select it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
          const token = localStorage.getItem('userToken');
          if(!token){
            navigate('/userLogin')
          }else{
            const data = await selectPlan(token, id);
            if (data.status === 'ok') {
              Swal.fire({         
                icon: 'success',
                title: 'You selected this plan',
                showConfirmButton: false,
                timer: 1500
              })
              dispatch(getSelectedPlanDetails(data.planDetails[0]));
              navigate('/userSelectExpert')
            }else if(data.status==='error'){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
              setError('Something went wrong...please try again after sometimes...')
            }else{
              navigate('/userLogin')
            }
          }
         
        
      }
    })
  }

  return (
    <div
      className={
        props.userplan
          ? ' max-w-screen-2xl mx-auto'
          : 'home-background max-w-screen-2xl mx-auto'
      }
    >
      <div>
        <section>
          <h1 className="pt-9 text-4xl font-sans text-center font-black text-slate-700 ">
            CHOOSE YOUR PLAN
          </h1>
          {error?<p style={{color:'red'}} className="text-center">{error}</p> : ''}
          <div className="container mx-auto flex justify-evenly flex-wrap mt-9 px-4">
            {plan
              ? plan.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="plan-card mx-2 my-2 rounded-3xl shadow-lg bg-violet-400 max-w-xs transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
                    >
                      <div className="flex justify-around">
                        <div>
                          <h5 className="text-gray-900 text-4xl font-bold  ml-3">
                            {data.validity}
                          </h5>
                          <p className="text-sm font-bold">months</p>
                        </div>
                        <div className="text-center">
                          <h2 className="text-gray-900 text-5xl font-bold text-center">
                            ₹{data.currentPrice}/-
                          </h2>
                          <p className="text-center text-red-600">
                            <strike>₹{data.previousPrice}/-</strike>
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="card-body">
                        <h1 className="text-center text-3xl font-bold text-violet-900">
                          {data.planName}
                        </h1>
                      </div>
                      <div className="mt-5 ml-9 font-semibold text-white">
                        <ul class="list-disc list-outside break-normal">
                          <li className="pb-2">
                            Daily Expert Availability :{' '}
                            {data.expertAvailability} mins
                          </li>

                          <li className="pt-2 pb-2">
                            Diet/Training Plans : {data.dietPlan}+
                          </li>
                          <li className="pt-2 pb-2">
                            Checkup on pets : {data.numberOfCheckup} times
                            /month
                          </li>
                          <li className="pt-2 pb-2">
                            Pro Care Tips : {data.tipAvailabilty}
                          </li>
                        </ul>
                      </div>
                      <div className="flex justify-center items-end ">
                        <button
                          onClick={() => userSelectPlanAlert(data._id)}
                          // onClick={() => userSelectPlan(data._id)}
                          type="submit"
                          className="mt-4 rounded-full hover:bg-red-500 bg-slate-300 mb-2 py-2 px-3 text-xs font-bold tracking-wider border-red-500 hover:border-white hover:text-white  border-2 text-red-700"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  );
                })
              : ''}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage4;
