import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getExpertsCount,
  getPendingApprovalCount,
  getUsersCount,
  getVideoApprovalCount,
} from '../../Axios/Services/AdminServices';

function AdminHomePage() {
  const [approvalCount, setApprovalCount] = useState('');
  const [usersCount, setUsersCount] = useState('');
  const [expertsCount, setExpertsCount] = useState('');
  const [videoApprovalCount, setVideoApprovalCount] = useState('');

  useEffect(() => {
    fetchPendingApproval();
    fetchUsersCount();
    fetchExpertsCount();
    fetchVideoApprovalCount();
  }, []);
  async function fetchPendingApproval() {
    const token = localStorage.getItem('adminToken');
    const approvalCount = await getPendingApprovalCount(token);
    setApprovalCount(approvalCount.count);
  }
  async function fetchUsersCount() {
    const token = localStorage.getItem('adminToken');
    const userCount = await getUsersCount(token);
    setUsersCount(userCount.count);
  }
  async function fetchExpertsCount() {
    const token = localStorage.getItem('adminToken');
    const expertsCount = await getExpertsCount(token);
    setExpertsCount(expertsCount.count);
  }
  async function fetchVideoApprovalCount() {
    const token = localStorage.getItem('adminToken');
    const videos = await getVideoApprovalCount(token);
    setVideoApprovalCount(videos.videoCount);
  }

  return (
    <div className="m-12">
      <div className="flex  justify-around  flex-wrap ">
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className="flex-row">
            <p className="text-3xl font-bold text-center">
              {usersCount ? usersCount : 0}
            </p>
            <p className="text-lg  font-semibold">Users</p>
          </div>
        </div>
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className="flex-row">
            <p className="text-3xl  font-bold text-center">
              {expertsCount ? expertsCount : 0}
            </p>
            <p className="text-lg  font-semibold">Experts</p>
          </div>
        </div>
        <Link to={'/adminVideoApproval'}>
          <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
            <div className="flex-row">
              <p className="text-3xl  font-bold text-center">
                {videoApprovalCount ? videoApprovalCount : 0}
              </p>
              <p className="text-lg  font-semibold">Video Pending Approvals</p>
            </div>
          </div>
        </Link>
        <Link to={'/adminApprovalList'}>
          {' '}
          <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg hover:cursor-pointer">
            <div className="flex-row">
              <p className="text-3xl  font-bold text-center">
                {approvalCount ? approvalCount : 0}
              </p>
              <p className="text-lg  font-semibold ">Expert Pending Approval</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminHomePage;
