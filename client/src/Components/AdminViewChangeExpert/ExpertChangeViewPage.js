import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getChangeRequestDetails,
  getNewExpertDetails,
} from '../../Axios/Services/AdminServices';
import userProfile from '../../images/proImg.jpg';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function ExpertChangeViewPage() {
  const [details, setDetails] = useState(false);
  const [expertDetails, setExpertDetails] = useState(false);
  const navigate = useNavigate();
  const expertId = useSelector((state) => state.admin.changeExpertId);
  const { id } = useParams();
  useEffect(() => {
    fetchData();
    fetchNewExpert();

    async function fetchData() {
      const token = localStorage.getItem('adminToken');
      const data = await getChangeRequestDetails(token, id);
      setDetails(data.request[0]);
    }

    async function fetchNewExpert() {
      const token = localStorage.getItem('adminToken');
      const data = await getNewExpertDetails(token, expertId);
      setExpertDetails(data.expert[0]);
    }
  }, [id, expertId]);

  const rejectExpertChangeAlert = (id) => {
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
        navigate(`/adminRejectExpertChange/${id}`);
      }
    });
  };

  const acceptExpertChangeAlert = (id1, id2) => {
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
        navigate('/adminApproveExpertChange', { state: { id1, id2 } });
      }
    });
  };

  return (
    <div>
      <>
        {/* component */}
        {details ? (
          <section className="py-40 bg-gray-100  bg-opacity-50 ">
            <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
              <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
                <div className="max-w-sm mx-auto md:w-full md:mx-0">
                  <div className="inline-flex items-center space-x-4">
                    <img
                      className="w-10 h-10 object-cover rounded-full"
                      alt="User avatar"
                      src={
                        details.user.profileImage
                          ? details.user.profileImage
                          : userProfile
                      }
                    />
                    <h1 className="text-gray-600">
                      {details.user.name ? details.user.name : ''}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="bg-white space-y-6">
                <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
                  <h2 className="md:w-1/3 max-w-sm mx-auto">User Info</h2>
                  <div className="md:w-2/3 max-w-sm mx-auto">
                    {/* <p>Name : {details.user.name ? details.user.name : ''}</p> */}
                    <p>
                      Email : {details.user.email ? details.user.email : ''}
                    </p>
                    <p>
                      Mobile : {details.user.mobile ? details.user.mobile : ''}
                    </p>
                    <p>Pet : {details.pet ? details.pet : ''}</p>
                    <p>Plan : {details.plan ? details.plan : ''}</p>
                    <p>
                      Valid From : {details.validFrom ? details.validFrom : ''}
                    </p>
                    <p>
                      Valid Till : {details.validTill ? details.validTill : ''}
                    </p>
                    <p>
                      Reason for changing expert :{' '}
                      {details.expertChangeRequest.reason
                        ? details.expertChangeRequest.reason
                        : ''}
                    </p>
                  </div>
                </div>
                <hr />

                <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                  <h2 className="md:w-1/3 mx-auto max-w-sm">Current Expert</h2>
                  <div className="md:w-2/3 max-w-sm mx-auto">
                    <p>
                      Name :{' '}
                      {details.currentExpert.name
                        ? details.currentExpert.name
                        : ''}
                    </p>
                    <p>
                      Email :{' '}
                      {details.currentExpert.email
                        ? details.currentExpert.email
                        : ''}
                    </p>
                    <p>
                      Mobile :{' '}
                      {details.currentExpert.mobile
                        ? details.currentExpert.mobile
                        : ''}
                    </p>
                    <p>
                      DOB :{' '}
                      {details.currentExpert.dob
                        ? details.currentExpert.dob
                        : ''}
                    </p>
                    <p>
                      Gender :{' '}
                      {details.currentExpert.gender
                        ? details.currentExpert.gender
                        : ''}
                    </p>
                    <p>
                      Expert in :{' '}
                      {details.currentExpert.expertisedIn
                        ? details.currentExpert.expertisedIn
                        : ''}
                    </p>
                    <p>
                      Experience :{' '}
                      {details.currentExpert.experience
                        ? details.currentExpert.experience
                        : ''}
                    </p>
                    <p>
                      Expert From :{' '}
                      {details.currentExpert.expertFrom
                        ? details.currentExpert.expertFrom
                        : ''}
                    </p>
                  </div>
                </div>
                <hr />

                <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                  <h2 className="md:w-1/3 mx-auto max-w-sm">
                    Expert user want
                  </h2>
                  {expertDetails ? (
                    <div className="md:w-2/3 max-w-sm mx-auto">
                      <p>
                        Name : {expertDetails.name ? expertDetails.name : ''}
                      </p>
                      <p>
                        Email : {expertDetails.email ? expertDetails.email : ''}
                      </p>
                      <p>
                        Mobile :{' '}
                        {expertDetails.mobile ? expertDetails.mobile : ''}
                      </p>
                      <p>DOB : {expertDetails.dob ? expertDetails.dob : ''}</p>
                      <p>
                        Gender :{' '}
                        {expertDetails.gender ? expertDetails.gender : ''}
                      </p>
                      <p>
                        Expert in :{' '}
                        {expertDetails.expertisedIn
                          ? expertDetails.expertisedIn
                          : ''}
                      </p>
                      <p>
                        Experience :{' '}
                        {expertDetails.experience
                          ? expertDetails.experience
                          : ''}
                      </p>
                      <p>
                        Expert From :{' '}
                        {expertDetails.expertFrom
                          ? expertDetails.expertFrom
                          : ''}
                      </p>
                    </div>
                  ) : (
                    <p>No Expert found with this ID</p>
                  )}
                </div>
                <hr />

                <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
                  <div className="md:w-3/12 text-center md:pl-6">
                    <button
                      onClick={() => rejectExpertChangeAlert(details._id)}
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
                      onClick={() =>
                        acceptExpertChangeAlert(details._id, expertDetails._id)
                      }
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
              </div>
            </div>
          </section>
        ) : (
          ''
        )}
      </>
    </div>
  );
}

export default ExpertChangeViewPage;
