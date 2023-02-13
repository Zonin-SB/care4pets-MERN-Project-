import React, { useState } from 'react';
import { useFormik } from 'formik';
import { expertChangingSchema } from '../../Validation/Validation';
import { useNavigate, useParams } from 'react-router-dom';
import { userChangeExpert } from '../../Axios/Services/UserServices';
import Swal from 'sweetalert2';

function UserChangeExpertPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = async (values, action) => {
    const token = localStorage.getItem('userToken');
    const data = await userChangeExpert(token, values);
    if (data.status === 'ok') {
      Swal.fire({
        icon: 'success',
        title: 'Your request has beed submitted',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/userSelectExpert');
    } else if (data.status === 'error') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You already changed your expert once !',
      });
      navigate('/userSelectExpert');
    } else {
      setError('Something went wrong...Please try after sometimes.');
    }
  };

  const initialValues = {
    reason: '',
    expertId: '',
    userId: id,
    pet: '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: expertChangingSchema,
      onSubmit,
      enableReinitialize: true,
    });

  return (
    <div>
      <>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              {/* Get started today */}
              {error ? (
                <p style={{ color: 'red' }} className="text-center">
                  {error}
                </p>
              ) : (
                ''
              )}
            </h1>

            <form
              onSubmit={handleSubmit}
              className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl"
            >
              <p className="text-lg font-medium">Change your Expert?</p>
              <div>
                <label className="text-sm font-medium">
                  Reason for changing
                </label>
                <div className="relative mt-1">
                  <textarea
                    name="reason"
                    id="reason"
                    value={values.reason}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                    placeholder="Enter reason"
                  />
                  {errors.reason && touched.reason && (
                    <p className="red-error">{errors.reason}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Select Your Pet</label>
                <div className="relative mt-1">
                  <select
                    name="pet"
                    id="pet"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option>Select a pet</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Exotic-birds">Exotic birds</option>
                  </select>

                  {errors.pet && touched.pet && (
                    <p className="red-error">{errors.pet}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">
                  ID of Expert you want
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    name="expertId"
                    value={values.expertId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="expertId"
                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                    placeholder="Enter expert's ID"
                  />
                  {errors.expertId && touched.expertId && (
                    <p className="red-error">{errors.expertId}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
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

export default UserChangeExpertPage;
