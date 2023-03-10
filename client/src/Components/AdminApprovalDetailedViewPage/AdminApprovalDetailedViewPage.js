import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getExpertAllDetails } from '../../Axios/Services/AdminServices';
import Swal from 'sweetalert2';

function AdminApprovalDetailedViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expertDetails, setExpertDetails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    fetchExpertDetails();

    async function fetchExpertDetails() {
      const data = await getExpertAllDetails(token, id);

      setExpertDetails(data.expertDetails[0]);
    }
  }, [id]);

  const rejectExpertAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to reject this application!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/adminRejectExpert/${id}`);
      }
    });
  };

  const acceptExpertAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to accept this application!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, accept it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/adminAcceptExpert/${id}`);
      }
    });
  };

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <section className="py-28 bg-gray-100  bg-opacity-50 h-max">
        <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
          <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t ">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  alt="User avatar"
                  src={expertDetails.profilePic}
                />
                <h1 className="text-gray-600 font-bold text-xl">
                  {expertDetails.name}
                </h1>
              </div>
            </div>
          </div>
          <div className="bg-white space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto font-bold">
                Career info
              </h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <p>Expertized in : {expertDetails.expertisedIn}</p>
                <p>Experience : {expertDetails.experience} Yrs</p>
              </div>
            </div>
            <hr />

            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm font-bold">
                Personal info
              </h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <p>Email : {expertDetails.email}</p>
                  <p>Mobile : {expertDetails.mobile}</p>
                  <p>DOB : {expertDetails.dob}</p>
                  <p>Gender : {expertDetails.gender}</p>
                </div>
                <div></div>
              </div>
            </div>
            <hr />

            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm font-bold">Documents</h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <p className="font-bold">
                    Id Proof :{' '}
                    <img
                      className="w-72"
                      src={expertDetails.idProofPic}
                      alt=""
                    />
                  </p>
                  <p className="font-bold">
                    Expert's License :{' '}
                    <img
                      className="w-72"
                      src={expertDetails.trainersLicensePic}
                      alt=""
                    />
                  </p>
                </div>
                <div></div>
              </div>
            </div>
            <hr />

            <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
              <div className="md:w-3/12 text-center md:pl-6">
                <button
                  // onClick={() => {
                  //   navigate(`/adminRejectExpert/${expertDetails._id}`);
                  // }}
                  onClick={() => rejectExpertAlert(expertDetails._id)}
                  className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-red-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right"
                >
                  <svg
                    fill="none"
                    className="w-4 text-white mr-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  ></svg>
                  Reject
                </button>
              </div>

              <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
                <div className="w-full inline-flex border-b"></div>
              </div>
              <div className="md:w-3/12 text-center md:pl-6">
                <button
                  // onClick={() => {
                  //   navigate(`/adminAcceptExpert/${expertDetails._id}`);
                  // }}
                  onClick={() => acceptExpertAlert(expertDetails._id)}
                  className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-green-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right"
                >
                  <svg
                    fill="none"
                    className="w-4 text-white mr-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  ></svg>
                  Accept
                </button>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminApprovalDetailedViewPage;
