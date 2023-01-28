import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllClients } from '../../Axios/Services/ExpertServices';
import userProfilePic from '../../images/proImg.jpg';

function ExpertClientViewPage() {
  const expertId = useSelector((state) => state.admin.expertDetails.expertId);
  const [clients, setClients] = useState([]);
  const navigate=useNavigate();
  
  useEffect(() => {
    fetchClients();

    async function fetchClients() {
      const token = localStorage.getItem('expertToken');
      const data = await getAllClients(token, expertId);
      setClients(data.clients);
    }
  }, [expertId]);

  return (
    <div className="container mx-auto mt-9">
      <h1 className="text-2xl font-semibold text-center">All Clients</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-9">
        {clients
          ? clients.map((data, index) => {
              return (
                <div key={index} className="relative mx-auto w-full">
                  <button className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                    <div className="shadow p-4 rounded-lg bg-white">
                      <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                        <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                          {/* <div className="absolute inset-0 bg-black opacity-10" /> */}
                          <img
                            src={
                              data.clientDetails.profileImage
                                ? data.clientDetails.profileImage
                                : userProfilePic
                            }
                            alt=""
                          />
                        </div>
                        {/* <div className="absolute flex justify-center bottom-0 mb-3">
                          <div className="flex bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow">
                            <p className="flex items-center font-medium text-gray-800">
                              <svg
                                className="w-5 h-5 fill-current mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M480,226.15V80a48,48,0,0,0-48-48H80A48,48,0,0,0,32,80V226.15C13.74,231,0,246.89,0,266.67V472a8,8,0,0,0,8,8H24a8,8,0,0,0,8-8V416H480v56a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V266.67C512,246.89,498.26,231,480,226.15ZM64,192a32,32,0,0,1,32-32H208a32,32,0,0,1,32,32v32H64Zm384,32H272V192a32,32,0,0,1,32-32H416a32,32,0,0,1,32,32ZM80,64H432a16,16,0,0,1,16,16v56.9a63.27,63.27,0,0,0-32-8.9H304a63.9,63.9,0,0,0-48,21.71A63.9,63.9,0,0,0,208,128H96a63.27,63.27,0,0,0-32,8.9V80A16,16,0,0,1,80,64ZM32,384V266.67A10.69,10.69,0,0,1,42.67,256H469.33A10.69,10.69,0,0,1,480,266.67V384Z" />
                              </svg>
                              3 + 1
                            </p>
                            <p className="flex items-center font-medium text-gray-800">
                              <svg
                                className="w-5 h-5 fill-current mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 480 512"
                              >
                                <path d="M423.18 195.81l-24.94-76.58C387.51 86.29 356.81 64 322.17 64H157.83c-34.64 0-65.34 22.29-76.07 55.22L56.82 195.8C24.02 205.79 0 235.92 0 271.99V400c0 26.47 21.53 48 48 48h16c26.47 0 48-21.53 48-48v-16h256v16c0 26.47 21.53 48 48 48h16c26.47 0 48-21.53 48-48V271.99c0-36.07-24.02-66.2-56.82-76.18zm-310.99-66.67c6.46-19.82 24.8-33.14 45.64-33.14h164.34c20.84 0 39.18 13.32 45.64 33.13l20.47 62.85H91.72l20.47-62.84zM80 400c0 8.83-7.19 16-16 16H48c-8.81 0-16-7.17-16-16v-16h48v16zm368 0c0 8.83-7.19 16-16 16h-16c-8.81 0-16-7.17-16-16v-16h48v16zm0-80.01v32H32v-80c0-26.47 21.53-48 48-48h320c26.47 0 48 21.53 48 48v48zM104.8 248C78.84 248 60 264.8 60 287.95c0 23.15 18.84 39.95 44.8 39.95l10.14.1c39.21 0 45.06-20.1 45.06-32.08 0-24.68-31.1-47.92-55.2-47.92zm10.14 56c-3.51 0-7.02-.1-10.14-.1-12.48 0-20.8-6.38-20.8-15.95S92.32 272 104.8 272s31.2 14.36 31.2 23.93c0 7.17-10.53 8.07-21.06 8.07zm260.26-56c-24.1 0-55.2 23.24-55.2 47.93 0 11.98 5.85 32.08 45.06 32.08l10.14-.1c25.96 0 44.8-16.8 44.8-39.95 0-23.16-18.84-39.96-44.8-39.96zm0 55.9c-3.12 0-6.63.1-10.14.1-10.53 0-21.06-.9-21.06-8.07 0-9.57 18.72-23.93 31.2-23.93s20.8 6.38 20.8 15.95-8.32 15.95-20.8 15.95z" />
                              </svg>
                              2
                            </p>
                            <p className="flex items-center font-medium text-gray-800">
                              <svg
                                className="w-5 h-5 fill-current mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M504,256H64V61.25a29.26,29.26,0,0,1,49.94-20.69L139.18,65.8A71.49,71.49,0,0,0,128,104c0,20.3,8.8,38.21,22.34,51.26L138.58,167a8,8,0,0,0,0,11.31l11.31,11.32a8,8,0,0,0,11.32,0L285.66,65.21a8,8,0,0,0,0-11.32L274.34,42.58a8,8,0,0,0-11.31,0L251.26,54.34C238.21,40.8,220.3,32,200,32a71.44,71.44,0,0,0-38.2,11.18L136.56,18A61.24,61.24,0,0,0,32,61.25V256H8a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H32v96c0,41.74,26.8,76.9,64,90.12V504a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V480H384v24a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V474.12c37.2-13.22,64-48.38,64-90.12V288h24a8,8,0,0,0,8-8V264A8,8,0,0,0,504,256ZM228.71,76.9,172.9,132.71A38.67,38.67,0,0,1,160,104a40,40,0,0,1,40-40A38.67,38.67,0,0,1,228.71,76.9ZM448,384a64.07,64.07,0,0,1-64,64H128a64.07,64.07,0,0,1-64-64V288H448Z" />
                              </svg>
                              3
                            </p>
                          </div>
                        </div> */}
                        <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
                          {data.plan}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h2
                          className="font-medium text-base md:text-lg text-gray-800 line-clamp-1"
                          title="New York"
                        >
                          {data.clientDetails.name}
                        </h2>
                        <p
                          className="mt-2 text-sm text-gray-800 line-clamp-1"
                          title="New York, NY 10004, United States"
                        >
                          {data.clientDetails.email}
                        </p>
                        <p
                          className="mt-2 text-sm text-gray-800 line-clamp-1"
                          title="New York, NY 10004, United States"
                        >
                          {data.clientDetails.mobile}
                        </p>
                        <p
                          className="mt-2 text-sm text-gray-800 line-clamp-1"
                          title="New York, NY 10004, United States"
                        >
                          Pet : {data.clientDetails.pet}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                          <svg
                            className="inline-block w-5 h-5 xl:w-4 xl:h-4 mr-3 fill-current text-gray-800"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path d="M570.53,242,512,190.75V48a16,16,0,0,0-16-16H400a16,16,0,0,0-16,16V78.75L298.53,4a16,16,0,0,0-21.06,0L5.47,242a16,16,0,0,0,21.07,24.09L64,233.27V464a48.05,48.05,0,0,0,48,48H464a48.05,48.05,0,0,0,48-48V233.27l37.46,32.79A16,16,0,0,0,570.53,242ZM480,464a16,16,0,0,1-16,16H112a16,16,0,0,1-16-16V205.27l192-168,192,168Zm0-301.25-64-56V64h64ZM208,218.67V325.34A26.75,26.75,0,0,0,234.66,352H341.3A26.76,26.76,0,0,0,368,325.34V218.67A26.75,26.75,0,0,0,341.3,192H234.66A26.74,26.74,0,0,0,208,218.67ZM240,224h96v96H240Z" />
                          </svg>
                          <span className="mt-2 xl:mt-0">Valid From :</span>
                        </p>
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                          <span className="mt-2 xl:mt-0">{data.validFrom}</span>
                        </p>
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                          <svg
                            className="inline-block w-5 h-5 xl:w-4 xl:h-4 mr-3 fill-current text-gray-800"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M399.959 170.585c-4.686 4.686-4.686 12.284 0 16.971L451.887 239H60.113l51.928-51.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-84.485 84c-4.686 4.686-4.686 12.284 0 16.971l84.485 84c4.686 4.686 12.284 4.686 16.97 0l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273h391.773l-51.928 51.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l84.485-84c4.687-4.686 4.687-12.284 0-16.971l-84.485-84c-4.686-4.686-12.284-4.686-16.97 0l-7.07 7.071z" />
                          </svg>
                          <span className="mt-2 xl:mt-0">Valid Till :</span>
                        </p>
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                          <span className="mt-2 xl:mt-0">{data.validTill}</span>
                        </p>
                      </div>
                      <div className="grid grid-cols-2 mt-8">
                        <button
                        onClick={()=>navigate(`/expertChat/${data.userId}`)}
                          type="button"
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Chat Now
                          <svg
                            aria-hidden="true"
                            class="w-5 h-5 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>

                        <div className="flex justify-end">
                          <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                            <span className="text-sm uppercase">$</span>
                            <span className="text-lg">3,200</span>/m
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })
          : 'No clients found'}
      </div>
    </div>
  );
}

export default ExpertClientViewPage;
