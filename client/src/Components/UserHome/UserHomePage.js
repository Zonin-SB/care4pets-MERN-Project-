import React from 'react'
// import {  getUserHomePlan } from '../../Axios/Services/UserServices'
// import { useSelector } from 'react-redux';
import userHome from '../../images/userHome.jpg'


function UserHomePage() {
//   const [plan,setPlan]=useState([])
//   const userId = useSelector((state) => state.admin.userDetails.userId);
//   useEffect(() => {
//    getPlan()
// console.log(userId,'user id in home');
//    async function getPlan(){
   
//     const data=await getUserHomePlan(userId)
//     setPlan(data.plan)
//    }
   
//   }, [userId])
//   console.log(plan,'plan in home');
  
  return (
    <div className='max-w-screen-2xl mx-auto'>
       <div className='relative'>
       
       <img src={userHome} className="max-w-full h-auto" alt="..." />
       
       </div>
{/* {plan?(
  <div>
<h1 className='font-bold text-2xl mt-9 ml-4'>Your Plan</h1>
      <div className="items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-9 p-4">
  <div className="relative mx-auto w-full">
    <div
   
      className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full"
    >
      <div className="shadow p-4 rounded-lg bg-violet-400">
       
        <div className="mt-4">
             
          <h2
            className="font-medium text-bold md:text-lg text-gray-800 line-clamp-1"
            title="New York"
          >
            
           {plan?plan.planName:''}
          </h2>
          
          <p
            className="mt-2 text-sm text-gray-800 line-clamp-1"
            title="New York, NY 10004, United States"
          >
            Validity : {plan?plan.validity+'Months':''}
          </p>
          
        </div>
        
        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
          <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
           
            <span className="mt-2 xl:mt-0">Diet Plan </span>
          </p>
          <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
          
            <span className="mt-2 xl:mt-0">{plan?plan.dietPlan+'+':''}</span>
          </p>
          <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
           
            <span className="mt-2 xl:mt-0">Expert Availability </span>
          </p>
          <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
            
            <span className="mt-2 xl:mt-0">{plan?plan.expertAvailability+'min/day':''}</span>
          </p>
          <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
           
           <span className="mt-2 xl:mt-0">Checkup on Pets </span>
         </p>
         <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
         
           <span className="mt-2 xl:mt-0">{plan?plan.numberOfCheckup+'time/month':''}</span>
         </p>
         
        </div>
        <div className="grid grid-cols-2 mt-8">
          
          <div className="flex justify-end">
            <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
              <span className="text-sm uppercase">₹</span>
              <span className="text-lg">{plan?plan.currentPrice:''}</span>/-
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>):(
  <div>
    <h1 className=''>You have no plan...Buy one for additional features</h1>
  </div>
)} */}



    </div>
  )
}

export default UserHomePage