import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkUserPlan, getFreeVideos, getPlanVideos } from '../../Axios/Services/UserServices';
import './UserVideosPage.css'

function UserVideosPage() {
  const userId = useSelector((state) => state.admin.userDetails.userId);
 
  const [videos, setVideos] = useState([]);
  const [planVideos,setPlanVideos]=useState([]);
  const [plan,setPlan]=useState('')
  const navigate = useNavigate();

  useEffect(() => {
    fetchFreeVideos();
    fetchPlanVideos();
    fetchPlan()

    async function fetchFreeVideos() {
      const token = localStorage.getItem('userToken');
      const data = await getFreeVideos(token, userId);
      setVideos(data.freeVideos);
    }

    async function fetchPlan(){
      const token = localStorage.getItem('userToken');
      const data=await checkUserPlan(token,userId)
      
      setPlan(data.plan)
    }

    async function fetchPlanVideos(){
      const token = localStorage.getItem('userToken');
      const data=await getPlanVideos(token,userId)
      setPlanVideos(data.planVideos);
    }
  }, [userId]);

  return (
    <div>

      {plan?

<div>
      <h1 className="font-semibold text-2xl p-6 mt-4">Videos</h1>
      <div className="video-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-9">
        {planVideos
          ? planVideos.map((data, index) => {
              return (
                <div key={index} className="relative mx-auto w-full">
                  <div className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                    <div className="shadow p-4 rounded-lg bg-white">
                      <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                        <div>
                          {/* <div className="absolute inset-0 bg-black opacity-10 " /> */}
                          <iframe
                            src={data.link}
                            title="YouTube video"
                            allowFullScreen
                          ></iframe>
                        </div>
                   
                        <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
                          {data.type}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h2
                          className="font-medium text-base md:text-lg text-gray-800 line-clamp-1"
                          title="New York"
                        >
                          {data.title}
                        </h2>
                        <p
                          className="mt-2 text-sm text-gray-800 line-clamp-1"
                          title="New York, NY 10004, United States"
                        >
                          {data.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 grid-rows-1 gap-2 mt-8">
                     
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                          <span className="mt-2 xl:mt-0">Posted on</span>
                        </p>
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                          <span className="mt-2 xl:mt-0">
                            {data.videoPosted}
                          </span>
                        </p>
                      </div>

                      
                    </div>
                  </div>
                </div>
              );
            })
          : 'No videos Found'}
      </div>
    </div>
:''}



    <div>
      <h1 className="font-semibold text-2xl p-6 mt-4">Free Videos</h1>
      <div className="video-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-9">
        {videos
          ? videos.map((data, index) => {
              return (
                <div key={index} className="relative mx-auto w-full">
                  <div className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                    <div className="shadow p-4 rounded-lg bg-white">
                      <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                        <div>
                          {/* <div className="absolute inset-0 bg-black opacity-10 " /> */}
                          <iframe
                            src={data.link}
                            title="YouTube video"
                            allowFullScreen
                          ></iframe>
                        </div>
                   
                        <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
                          {data.type}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h2
                          className="font-medium text-base md:text-lg text-gray-800 line-clamp-1"
                          title="New York"
                        >
                          {data.title}
                        </h2>
                        <p
                          className="mt-2 text-sm text-gray-800 line-clamp-1"
                          title="New York, NY 10004, United States"
                        >
                          {data.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 grid-rows-1 gap-2 mt-8">
                     
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                          <span className="mt-2 xl:mt-0">Posted on</span>
                        </p>
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                          <span className="mt-2 xl:mt-0">
                            {data.videoPosted}
                          </span>
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          navigate(`/userViewExpert/${data.expertId}`)
                        }
                      >
                        {' '}
                        <div className="grid grid-cols-2 mt-8">
                          <div className="flex items-center">
                            <div className="relative">
                              {/* <div className="rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-200" /> */}
                              <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-primary-red rounded-full" />
                              <img
                                className="rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-200"
                                src={data.experts.profilePic}
                                alt="expert profile pic"
                              />
                            </div>
                            <p className="ml-2 text-gray-800 line-clamp-1">
                              {data.experts.name}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : 'No videos Found'}
      </div>
    </div>
    </div>
  );
}

export default UserVideosPage;
