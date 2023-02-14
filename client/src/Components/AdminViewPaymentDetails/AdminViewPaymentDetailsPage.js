import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { getPaymentAllDetails } from '../../Axios/Services/AdminServices';

function AdminViewPaymentDetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  useEffect(() => {
    fetchData();

    async function fetchData() {
      const token = localStorage.getItem('adminToken');
      const data = await getPaymentAllDetails(token, id);
      setDetails(data.details);
    }
  }, [id]);

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <>
        {/* component */}
        {details
          ? details.map((data, index) => {
              return (
                <section
                  key={index}
                  className="py-40 bg-gray-100  bg-opacity-50 "
                >
                  <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
                    <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
                      <div className="max-w-sm mx-auto md:w-full md:mx-0">
                        <div className="inline-flex items-center space-x-4">
                          <h1 className="text-gray-600">Payment Details</h1>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white space-y-6">
                      <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
                        <h2 className="md:w-1/3 max-w-sm mx-auto">User Info</h2>
                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <p>Name : {data.user.name}</p>
                          <p>Email : {data.user.email}</p>
                          <p>Mobile : {data.user.mobile}</p>
                          <p>Pet : {data.user.pet}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                        <h2 className="md:w-1/3 mx-auto max-w-sm">Plan Info</h2>
                        <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                          <div>
                            <p>Plan : {data.plan.planName}</p>
                            <p>Amount : ₹ {data.plan.currentPrice}</p>
                            <p>Validity : {data.plan.validity} months</p>
                            <p>Valid From : {data.validFrom}</p>
                            <p>Valid Till : {data.validTill}</p>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                        <h2 className="md:w-1/3 mx-auto max-w-sm">
                          Expert Info
                        </h2>
                        <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                          <div>
                            <p>Name : {data.expert.name}</p>
                            <p>Expert in : {data.expert.expertisedIn}</p>
                            <p>Experience : {data.expert.experience} Yrs</p>
                            <p>DOB : {data.expert.dob} Yrs</p>
                            <p>Email : {data.expert.email}</p>
                            <p>Mobile : {data.expert.mobile}</p>
                            <p>Gender : {data.expert.gender}</p>
                            <p>Mobile : {data.expert.mobile}</p>
                          </div>
                        </div>
                      </div>

                      <hr />
                      {/* <div className="w-full p-4 text-right text-gray-500">
                        <button className="inline-flex items-center focus:outline-none mr-4">
                          <svg
                            fill="none"
                            className="w-4 mr-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete account
                        </button>
                      </div> */}
                    </div>
                  </div>
                </section>
              );
            })
          : 'No data found'}
      </>
    </div>
  );
}

export default AdminViewPaymentDetailsPage;
