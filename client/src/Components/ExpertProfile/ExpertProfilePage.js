import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getClientsCount,
  getExpertDetails,
  getVideosCount,
} from '../../Axios/Services/ExpertServices';
import expertProfile from '../../images/proImg.jpg';
import expertVerified from '../../images/verifiedExpert.png';
import notification from '../../images/notification.png';
import Swal from 'sweetalert2';

function ExpertProfilePage() {
  const [expertDetails, setExpertDetails] = useState([]);
  const [videoCount, setVideoCount] = useState('');
  const [clientCount, setClientCount] = useState('');
  const navigate = useNavigate();
  const expertId = useSelector((state) => state.admin.expertDetails.expertId);
  useEffect(() => {
    const token = localStorage.getItem('expertToken');

    fetchData();
    fetchVideoCount();
    fetchClientCount();

    async function fetchData() {
      const data = await getExpertDetails(token, expertId);

      setExpertDetails(data.expertDetails);
    }

    async function fetchVideoCount() {
      const data = await getVideosCount(token, expertId);
      setVideoCount(data.videoCount);
    }

    async function fetchClientCount() {
      const data = await getClientsCount(token, expertId);
      setClientCount(data.clientCount);
    }
  }, [expertId]);

  const expertEditProfileAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to edit your profile!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/expertEditProfile/${id}`);
      }
    });
  };

  const expertApplyAlert = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to apply for verification!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, apply it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate('/expertApplyForm');
      }
    });
  };

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <>
        {/* component */}
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
        />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        />
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              />
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: 'translateZ(0px)' }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x={0}
                y={0}
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="profile pic"
                          src={
                            expertDetails.profilePic
                              ? expertDetails.profilePic
                              : expertProfile
                          }
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        {expertDetails.verified ? (
                          <img
                            className="w-18 h-20 lg:ml-28"
                            src={expertVerified}
                            alt="verified"
                          />
                        ) : (
                          <button
                            onClick={() => expertApplyAlert()}
                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Apply for Verification
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      {expertDetails.rejected ? (
                        <div>
                          {' '}
                          <img
                            onClick={() =>
                              navigate(
                                `/expertRejectedReason/${expertDetails._id}`
                              )
                            }
                            className="w-14 cursor-pointer"
                            src={notification}
                            alt="notification"
                          />
                        </div>
                      ) : (
                        ''
                      )}
                      {expertDetails.accepted ? (
                        <div>
                          {' '}
                          <img
                            onClick={() =>
                              navigate(`/expertAccepted/${expertDetails._id}`)
                            }
                            className="w-14 cursor-pointer"
                            src={notification}
                            alt="notification"
                          />
                        </div>
                      ) : (
                        ''
                      )}
                      {expertDetails.verified ? (
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                              {clientCount ? clientCount : 0}
                            </span>
                            <span className="text-sm text-blueGray-400">
                              Clients
                            </span>
                          </div>
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                              {videoCount ? videoCount : 0}
                            </span>
                            <span className="text-sm text-blueGray-400">
                              Videos
                            </span>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                      {expertDetails ? expertDetails.name : ''}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      Expert : {expertDetails ? expertDetails.expertisedIn : ''}
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      {/* <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" /> */}
                      Email : {expertDetails ? expertDetails.email : ''}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      {/* <i className="fas fa-university mr-2 text-lg text-blueGray-400" /> */}
                      Mobile : {expertDetails ? expertDetails.mobile : ''}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      {/* <i className="fas fa-university mr-2 text-lg text-blueGray-400" /> */}
                      Experience :{' '}
                      {expertDetails ? expertDetails.experience : ''}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      {/* <i className="fas fa-university mr-2 text-lg text-blueGray-400" /> */}
                      DOB : {expertDetails ? expertDetails.dob : ''}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      {/* <i className="fas fa-university mr-2 text-lg text-blueGray-400" /> */}
                      Gender : {expertDetails ? expertDetails.gender : ''}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <button
                          onClick={() =>
                            expertEditProfileAlert(expertDetails._id)
                          }
                          // onClick={()=>navigate(`/expertEditProfile/${expertDetails._id}`)}
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    </div>
  );
}

export default ExpertProfilePage;
