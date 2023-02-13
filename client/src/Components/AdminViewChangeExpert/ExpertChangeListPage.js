import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRequestList } from '../../Axios/Services/AdminServices';
import userProfile from '../../images/proImg.jpg';
import { expertChangeDetails } from '../../redux/adminReducer';

function ExpertChangeListPage() {
  const dispatch = useDispatch();

  const [requestDetails, setRequestDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRequestList();

    async function fetchRequestList() {
      const token = localStorage.getItem('adminToken');
      const data = await getRequestList(token);
      setRequestDetails(data.request);
    }
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mt-9">
        Expert Change Request Lists
      </h1>

      {requestDetails
        ? requestDetails.map((data, index) => {
            return (
              <div
                key={index}
                className="mt-9 mx-9 relative block overflow-hidden rounded-lg border border-gray-100 p-8"
              >
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
                <div className="justify-between sm:flex">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {data.user.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-gray-600">
                      Pet : {data.pet}
                    </p>
                    <p className="mt-1 text-xs font-medium text-gray-600">
                      Plan : {data.plan}
                    </p>
                    <p className="mt-1 text-xs font-medium text-gray-600">
                      Email : {data.user.email}
                    </p>
                  </div>
                  <div className="ml-3 hidden flex-shrink-0 sm:block">
                    <img
                      alt="Paul Clapton"
                      src={
                        data.user.profileImage
                          ? data.user.profileImage
                          : userProfile
                      }
                      className="h-16 w-16 rounded-lg object-cover shadow-sm"
                    />
                  </div>
                </div>
                <div className="mt-4 sm:pr-8">
                  <p className="text-sm text-gray-500">
                    Reason : {data.expertChangeRequest.reason}
                  </p>
                </div>
                <dl className="mt-6 flex">
                  <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                      Valid From
                    </dt>
                    <dd className="text-xs text-gray-500">{data.validFrom}</dd>
                  </div>
                  <div className="ml-3 flex flex-col-reverse sm:ml-6">
                    <dt className="text-sm font-medium text-gray-600">
                      Valid Till
                    </dt>
                    <dd className="text-xs text-gray-500">{data.validTill}</dd>
                  </div>
                </dl>

                <button
                  onClick={() => {
                    dispatch(
                      expertChangeDetails(data.expertChangeRequest.expertId)
                    );
                    navigate(`/adminExpertChangeView/${data._id}`);
                  }}
                  type="button"
                  class="absolute right-0 bottom-4 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
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
              </div>
            );
          })
        : ''}
    </div>
  );
}

export default ExpertChangeListPage;
