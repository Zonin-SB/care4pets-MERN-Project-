import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  getExpertEditProfileDetails,
  updateExpertProfile,
} from '../../Axios/Services/ExpertServices';
import { expertEditProfileSchema } from '../../Validation/Validation';
import Swal from 'sweetalert2';

function ExpertEditProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expertDetails, setExpertDetails] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDetails();

    async function fetchDetails() {
      const token = localStorage.getItem('expertToken');
      const data = await getExpertEditProfileDetails(token, id);
      setExpertDetails(data.expertDetails[0]);
    }
  }, [id]);

  const initialValues = {
    id: id,
    name: expertDetails.name,
    mobile: expertDetails.mobile,
    gender: expertDetails.gender,
    expertisedIn: expertDetails.expertisedIn,
    experience: expertDetails.experience,
    dob: expertDetails.dob,
  };

  const onSubmit = async (values, action) => {
    const token = localStorage.getItem('expertToken');
    const data = await updateExpertProfile(token, values);
    if (data.status === 'ok') {
      Swal.fire({
        icon: 'success',
        title: 'Your profile has been updated',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/expertProfile');
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
      validationSchema: expertEditProfileSchema,
      onSubmit,
      enableReinitialize: true,
    });
  return (
    <div className='max-w-screen-2xl mx-auto'>
      <>
        {/* component */}
        <div className="h-screen flex justify-center mt-9">
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
              <label>Experience</label>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  id="experience"
                  type="experience"
                  name="experience"
                  value={values.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.experience && touched.experience && (
                <p className="red-error">{errors.experience}</p>
              )}

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  id="dob"
                  type="date"
                  name="dob"
                  value={values.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.dob && touched.dob && (
                <p className="red-error">{errors.dob}</p>
              )}

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
                <select
                  name="gender"
                  id="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {errors.gender && touched.gender && (
                <p className="red-error">{errors.gender}</p>
              )}

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
                <select
                  name="expertisedIn"
                  id="expertisedIn"
                  value={values.expertisedIn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Exotic-birds">Exotic birds</option>
                </select>
              </div>
              {errors.expertisedIn && touched.expertisedIn && (
                <p className="red-error">{errors.expertisedIn}</p>
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

export default ExpertEditProfilePage;
