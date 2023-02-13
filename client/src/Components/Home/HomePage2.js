import React, { useEffect, useState } from 'react';
import { getExperts } from '../../Axios/Services/UserServices';
import trainer1 from '../../images/trainer1.png';
import './HomePage.css';
function HomePage2() {
  const [experts, setExperts] = useState([]);
  useEffect(() => {
    fetchExpert();

    async function fetchExpert() {
      const data = await getExperts();
      setExperts(data.experts);
    }
  }, []);
  return (
    <div className="home-background max-w-screen-2xl mx-auto">
      <div className="home-background">
        <p className="text-2xl font-black font-sans text-center text-slate-700 pt-9">
          BEST IN CLASS EXPERTS
        </p>
        <p className="text-5xl font-black font-sans text-center text-slate-700 mt-2">
          FOR <span className="text-red-500">Y</span>OUR PETS
        </p>
      </div>

      <div className="expertCard  mt-9 px-4 flex-no-wrap">
        {/* <div  className="rounded-lg shadow-lg bg-violet-400 max-w-xs mx-2 my-2">
    {/* <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light"> */}
        {/* <img className="rounded-t-lg w-70 h-60" src={''} alt="noImage"/> */}
        {/* </a> 
    <div className="p-1">
      <h5 className="text-gray-900 text-2xl font-bold mb-2 text-center">hh</h5>
      <p className="text-gray-700 text-base mb-4 text-center">
         Expert
      </p>
      {/* <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> 
    </div>
  </div> */}

        {/* <div className="rounded-lg shadow-lg bg-violet-400 max-w-xs mx-2 my-2">
    <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
      <img className="rounded-t-lg" src={trainer1} alt=""/>
    </a>
    <div className="p-2">
      <h5 className="text-gray-900 text-xl font-bold mb-2 text-center">David</h5>
      <p className="text-gray-700 text-base mb-4 text-center">
      Canine Expert
      </p>
      {/* <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> 
    </div>
  </div> */}
      </div>
      <div className="video-list grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-9 scrolling-touch">
        {experts
          ? experts.map((data, index) => {
              return (
                <div
                  key={index}
                  className="relative mx-auto w-full flex-none  md:w-1/3  md:pb-4 border rounded-lg"
                >
                  <div className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                    <div className="shadow p-4 rounded-lg bg-violet-300">
                      <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                        <div>
                          {/* <div className="absolute inset-0 bg-black opacity-10 " /> */}

                          <img src={data.profilePic} alt="noImage" />
                        </div>

                        <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
                          {data.experience} Yrs
                        </span>
                      </div>

                      <div className="mt-4">
                        <h2
                          className="font-medium text-base md:text-lg text-gray-800 line-clamp-1"
                          title="New York"
                        >
                          {data.name}
                        </h2>
                        <p
                          className="mt-2 text-sm text-gray-800 line-clamp-1"
                          title="New York, NY 10004, United States"
                        >
                          {data.expertisedIn} Expert
                        </p>
                      </div>
                      <div className="grid grid-cols-1 grid-rows-1 gap-2 mt-8">
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                          <span className="mt-2 xl:mt-0">Expert From</span>
                        </p>
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                          <span className="mt-2 xl:mt-0">
                            {data.expertFrom}
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
  );
}

export default HomePage2;
