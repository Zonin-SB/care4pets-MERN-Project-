import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  uploadProfilePic,
  userProfilePicUpdate,
} from '../../Axios/Services/UserServices';

function UserEditProfilePicPage() {
  const [fileInputState, setFileInputState] = useState('');
  // const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = useSelector((state) => state.admin.userDetails.userId);
 
  let values = {};

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    const { imageData } = await uploadProfilePic(base64EncodedImage);
    console.log(imageData, 'in prof');

    if (imageData.url) {
      const imageLink = imageData.url;
      values.profileImage = imageLink;
      values.id = userId;
      console.log(values, 'values in edit pro');
      const token = localStorage.getItem('userToken');
      const response = await userProfilePicUpdate(token, values);

      if (response.status === 'ok') {
        navigate('/userProfile');
      } else {
        setError('Image upload failed');
      }
    }
  };

  return (
    <div>
      <>
        {/* component */}
        <div className="h-screen flex justify-center">
          <div className="flex justify-center items-center bg-white">
            <form className="bg-white" onSubmit={handleSubmitFile}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Update Profile Pic !
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-7">
                Welcome Back
              </p>
              {error ? (
                <p style={{ color: 'red' }} className="text-center">
                  {error}
                </p>
              ) : (
                ''
              )}
              {previewSource && (
                <img src={previewSource} className="h-20" alt="profile pic" />
              )}

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  id="propic"
                  type="file"
                  name="propic"
                  value={fileInputState}
                  onChange={handleFileInputChange}
                />
              </div>

              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    </div>
  );
}

export default UserEditProfilePicPage;
