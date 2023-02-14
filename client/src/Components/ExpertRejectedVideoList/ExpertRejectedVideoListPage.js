import React, { useEffect, useState } from 'react';
import { getRejectedVideos } from '../../Axios/Services/ExpertServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ExpertRejectedVideoListPage() {
  const expertId = useSelector((state) => state.admin.expertDetails.expertId);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchVideos();

    async function fetchVideos() {
      const token = localStorage.getItem('expertToken');
      const data = await getRejectedVideos(token, expertId);
      setVideos(data.videos);
    }
  }, [expertId]);

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8 max-w-screen-2xl">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Rejected Videos
            </h2>
          </div>

          {videos ? (
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Link
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" />
                    </tr>
                  </thead>
                  <tbody>
                    {videos
                      ? videos.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {data.title}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {data.type}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {data.description}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {data.link}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/expertRejectedVideoDetails/${data._id}`
                                    )
                                  }
                                  type="button"
                                  class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                                >
                                  <svg
                                    aria-hidden="true"
                                    class="w-5 h-5"
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
                                  <span class="sr-only">Icon description</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : 'No rejected videos'}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
              <div className="max-w-7xl mx-auto">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <svg
                      className="w-8 h-8 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
                      />
                    </svg>
                    <div className="space-y-2">
                      <p className="text-slate-800">
                        Learn how to make a glowing gradient background!
                      </p>
                      <button
                        className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                        target="_blank"
                      >
                        Read Article →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpertRejectedVideoListPage;
