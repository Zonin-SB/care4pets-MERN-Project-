import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  approveVideo,
  deleteVideo,
  getVideoDetails,
} from '../../Axios/Services/AdminServices';

function AdminVideoApprovalDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState([]);
  const [expertDetails, setExpertDetails] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    fetchVideoDetails();

    async function fetchVideoDetails() {
      const data = await getVideoDetails(token, id);

      setVideoDetails(data.videoDetails[0]);
      setExpertDetails(data.videoDetails[0].expert);
    }
  }, [id]);

  // async function accept(id) {
  //   const token = localStorage.getItem('adminToken');
  //   const data = await approveVideo(token, id);
  //   if (data.status === 'ok') {
  //     navigate('/adminVideoApproval');
  //   } else {
  //     setError('Something went wrong...please try again after sometimes...');
  //   }
  // }

  const deleteVidAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this video!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // async function deleteVid(id) {
        const token = localStorage.getItem('adminToken');
        const data = await deleteVideo(token, id);
        if (data.status === 'ok') {
          navigate('/adminManageVideos');
        } else {
          setError(
            'Something went wrong...please try again after sometimes...'
          );
        }
        // }
        Swal.fire('Deleted!', 'This video has been deleted.', 'success');
      }
    });
  };

  const acceptVidAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to accept this video!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, accept it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // async function accept(id) {
        const token = localStorage.getItem('adminToken');
        const data = await approveVideo(token, id);
        if (data.status === 'ok') {
          navigate('/adminVideoApproval');
        } else {
          setError(
            'Something went wrong...please try again after sometimes...'
          );
        }
        // }
        Swal.fire('Accepted!', 'This video has been accepted.', 'success');
      }
    });
  };

  const rejectVidAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to reject this video!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/adminRejectVideo/${id}`);
      }
    });
  };

  const editVidAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to edit this video!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/adminEditVideo/${id}`);
      }
    });
  };

  return (
    <div>
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
                Video info
              </h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <p>Title : {videoDetails.title}</p>
                <p>Type : {videoDetails.type}</p>
                <p>Description : {videoDetails.description}</p>
                <p>Category : {videoDetails.category}</p>
              </div>
            </div>
            <hr />

            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm font-bold">
                Expert info
              </h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <p>Name : {expertDetails.name}</p>
                  <p>Expert : {expertDetails.expertisedIn}</p>
                  <p>Email : {expertDetails.email}</p>
                  <p>Mobile : {expertDetails.mobile}</p>
                  <p>DOB : {expertDetails.dob}</p>
                  <p>Gender : {expertDetails.gender}</p>
                  <p>Expert From : {expertDetails.expertFrom}</p>
                </div>
                <div></div>
              </div>
            </div>
            <hr />

            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm font-bold">Video</h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <iframe
                    src={videoDetails.link}
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
                <div></div>
              </div>
            </div>
            <hr />
            {error ? <p className="red-error">{error}</p> : ''}
            <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
              <div className="md:w-3/12 text-center md:pl-6">
                {videoDetails.approved ? (
                  <button
                    onClick={() => editVidAlert(videoDetails._id)}
                    className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-blue-500 py-2 px-4 inline-flex items-center focus:outline-none md:float-right"
                  >
                    <svg
                      fill="none"
                      className="w-4 text-white mr-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    ></svg>
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => rejectVidAlert(videoDetails._id)}
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
                )}
              </div>

              <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
                <div className="w-full inline-flex border-b"></div>
              </div>
              <div className="md:w-3/12 text-center md:pl-6">
                {videoDetails.approved ? (
                  <button
                    onClick={() => deleteVidAlert(videoDetails._id)}
                    className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-red-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right"
                  >
                    <svg
                      fill="none"
                      className="w-4 text-white mr-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    ></svg>
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => acceptVidAlert(videoDetails._id)}
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
                )}
              </div>
            </div>
            <hr />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminVideoApprovalDetailsPage;
