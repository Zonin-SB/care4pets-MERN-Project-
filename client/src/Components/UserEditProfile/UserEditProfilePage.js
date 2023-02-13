import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { userAllDetails } from '../../redux/adminReducer';
import { userEditProfileSchema } from '../../Validation/Validation';
import { useFormik } from 'formik';
import { updateUserProfile } from '../../Axios/Services/UserServices';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function UserEditProfilePage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { userAllDetails } = useSelector((state) => state.admin);
  // const token = useSelector((state) => state.admin.userToken);

  const initialValues = {
    id: userAllDetails._id,
    name: userAllDetails.name,
    email: userAllDetails.email,
    mobile: userAllDetails.mobile,
    pet: userAllDetails.pet,
  };

  const onSubmit = async (values, action) => {
    const token = localStorage.getItem('userToken');
    const data = await updateUserProfile(token, values);
    if (data.status === 'ok') {
      Swal.fire({
        icon: 'success',
        title: 'Your profile has been updated',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/userProfile');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      setError('Update Failed,try again after some time.');
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userEditProfileSchema,
      onSubmit,
    });

  return (
    <div>
      <>
        {/* component */}
        <div className="h-screen flex justify-center">
          <div className="flex justify-center items-center bg-white">
            <form className="bg-white" onSubmit={handleSubmit}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Update Profile !
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
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.name && touched.name && (
                <p className="red-error">{errors.name}</p>
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
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  id="mobile"
                  type="tel"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.mobile && touched.mobile && (
                <p className="red-error">{errors.mobile}</p>
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
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
                <select
                  name="pet"
                  id="pet"
                  value={values.pet}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Exotic-birds">Exotic birds</option>
                </select>
              </div>
              {errors.pet && touched.pet && (
                <p className="red-error">{errors.pet}</p>
              )}

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

export default UserEditProfilePage;
