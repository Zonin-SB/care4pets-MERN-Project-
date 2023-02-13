import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExpertDetailedView } from '../../Axios/Services/AdminServices';
import userProfile from '../../images/proImg.jpg';

function AdminExpertDetailedViewPage() {
  const { id } = useParams();
  const [expertDetails, setExpertDetails] = useState([]);

  useEffect(() => {
    getExpertDetails();

    async function getExpertDetails() {
      const token = localStorage.getItem('adminToken');
      const data = await getExpertDetailedView(token, id);
      setExpertDetails(data.details[0]);
    }
  }, [id]);

  return (
    <div>
      {/* component */}
      <section className="py-40 bg-gray-100  bg-opacity-50 ">
        <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
          <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  alt="User avatar"
                  src={expertDetails ? expertDetails.profilePic : userProfile}
                />
                <h1 className="text-gray-600">
                  {expertDetails ? expertDetails.name : ''}
                </h1>
              </div>
            </div>
          </div>
          <div className="bg-white space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Personal Info</h2>

              <div className="md:w-2/3 max-w-sm mx-auto">
                <p>Name : {expertDetails ? expertDetails.name : ''}</p>
                <p>Email : {expertDetails ? expertDetails.email : ''}</p>
                <p>Mobile : {expertDetails ? expertDetails.mobile : ''}</p>
                <p>DOB : {expertDetails ? expertDetails.dob : ''}</p>
                <p>Gender : {expertDetails ? expertDetails.gender : ''}</p>
              </div>
            </div>
            <hr />
            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm">Career Info</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <p>
                  Expert in : {expertDetails ? expertDetails.expertisedIn : ''}
                </p>
                <p>
                  Experience : {expertDetails ? expertDetails.experience : ''}
                </p>
                <p>
                  Expert From :{' '}
                  {expertDetails ? expertDetails.expertFrom : 'Not Verified'}
                </p>
                <p>
                  Active Clients :{' '}
                  {expertDetails
                    ? expertDetails.usersCount
                    : 'No clients found'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminExpertDetailedViewPage;
