import React, { useEffect, useState } from 'react';
import { Link,  } from 'react-router-dom';
import { getExpertsCount, getPendingApprovalCount, getUsersCount, getVideoApprovalCount } from '../../Axios/Services/AdminServices';

function AdminHomePage() {
  const[approvalCount,setApprovalCount]=useState('')
  const [usersCount,setUsersCount]=useState('')
  const [expertsCount,setExpertsCount]=useState('')
  const [videoApprovalCount,setVideoApprovalCount]=useState('')


  useEffect(() => {
    fetchPendingApproval()
    fetchUsersCount()
    fetchExpertsCount()
    fetchVideoApprovalCount()
    
  }, [])
  async function fetchPendingApproval(){
    const token=localStorage.getItem('adminToken')
    const approvalCount=await getPendingApprovalCount(token);
    setApprovalCount(approvalCount.count)
  }
  async function fetchUsersCount(){
    const token=localStorage.getItem('adminToken')
    const userCount=await getUsersCount(token);
    setUsersCount(userCount.count)
  }
  async function fetchExpertsCount(){
    const token=localStorage.getItem('adminToken')
    const expertsCount=await getExpertsCount(token);
    setExpertsCount(expertsCount.count)
  }
  async function fetchVideoApprovalCount(){
    const token=localStorage.getItem('adminToken')
    const videos=await getVideoApprovalCount(token)
    setVideoApprovalCount(videos.videoCount)
  }
  
  return (
    <div className="m-12">
      <div className="flex  justify-around  flex-wrap ">
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className='flex-row'>
          <p className='text-3xl font-bold text-center'>{usersCount?usersCount:0}</p>
          <p className='text-lg  font-semibold'>Users</p>
          </div>
        </div>
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className='flex-row'>
        <p className='text-3xl  font-bold text-center'>{expertsCount?expertsCount:0}</p>
        <p className='text-lg  font-semibold'>Experts</p>
        </div>
          </div>
          <Link to={'/adminVideoApproval'}><div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className='flex-row'>
        <p className='text-3xl  font-bold text-center'>{videoApprovalCount?videoApprovalCount:0}</p>
        <p className='text-lg  font-semibold'>Video Pending Approvals</p>
        </div>
          </div></Link>
          <Link to={'/adminApprovalList'}> <div  className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg hover:cursor-pointer">
          <div className='flex-row'>
        <p className='text-3xl  font-bold text-center'>{approvalCount?approvalCount:0}</p>
        <p className='text-lg  font-semibold '>Expert Pending Approval</p>
        </div>
          </div></Link>

        {/* <main class="antialiased bg-gray-200 text-gray-900 font-sans overflow-x-hidden">
  <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
    <div class="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
    <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
      <div class="md:flex items-center">
        <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
          <i class="bx bx-error text-3xl"></i>
        </div>
        <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <p class="font-bold">Delete your account</p>
          <p class="text-sm text-gray-700 mt-1">You will lose all of your data by deleting your account. This action cannot be undone.
          </p>
        </div>
      </div>
      <div class="text-center md:text-right mt-4 md:flex md:justify-end">
        <button class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">Delete
            Account</button>
        <button class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1">Cancel</button>
      </div>
    </div>
  </div>
</main> */}
      </div>
      
    </div>
  );
}

export default AdminHomePage;
