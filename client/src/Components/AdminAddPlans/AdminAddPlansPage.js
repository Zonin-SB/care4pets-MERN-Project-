import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { addPlanSchema } from '../../Validation/Validation';
import { addPlan } from '../../Axios/Services/AdminServices';
import Swal from 'sweetalert2';

const initialValues = {
  planName: '',
  validity: '',
  currentPrice: '',
  previousPrice: '',
  dietPlan: '',
  expertAvailability: '',
  numberOfCheckup: '',
  tipAvailabilty: '',
};
function AdminAddPlansPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (values, action) => {
    const token = localStorage.getItem('adminToken');
    const response = await addPlan(token, values);
    if (response.status === 'error') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      setError('Action Failed,Please try again after some time.');
    } else if (response.status === 'ok') {
      Swal.fire({
        icon: 'success',
        title: 'New plan has been added',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/adminViewPlans');
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addPlanSchema,
      onSubmit,
    });

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <>
        {/* component */}
        <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-16 mb-10">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            ADD NEW PLAN
          </h1>
          {error ? <p className="red-error">{error}</p> : ''}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-white dark:text-gray-200">
                  Plan Name
                </label>
                <input
                  id="planName"
                  type="text"
                  name="planName"
                  value={values.planName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.planName && touched.planName && (
                  <p className="red-error">{errors.planName}</p>
                )}
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Validity in Months
                </label>
                <select
                  name="validity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option>Select plan validity</option>
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="12">12</option>
                </select>
                {errors.validity && touched.validity && (
                  <p className="red-error">{errors.validity}</p>
                )}
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Current Price
                </label>
                <input
                  id="currentPrice"
                  name="currentPrice"
                  value={values.currentPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="tel"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.currentPrice && touched.currentPrice && (
                  <p className="red-error">{errors.currentPrice}</p>
                )}
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Previous Price
                </label>
                <input
                  id="previousPrice"
                  name="previousPrice"
                  value={values.previousPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="tel"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.previousPrice && touched.previousPrice && (
                  <p className="red-error">{errors.previousPrice}</p>
                )}
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Diet/Training Plans
                </label>
                <input
                  id="dietPlan"
                  name="dietPlan"
                  value={values.dietPlan}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="tel"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.dietPlan && touched.dietPlan && (
                  <p className="red-error">{errors.dietPlan}</p>
                )}
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Daily Expert Availability Time
                </label>
                <select
                  name="expertAvailability"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option>Available Time</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
                  <option value="120">120</option>
                </select>
                {errors.expertAvailability && touched.expertAvailability && (
                  <p className="red-error">{errors.expertAvailability}</p>
                )}
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  No. of Checkup on Pets
                </label>
                <select
                  name="numberOfCheckup"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option>Select No. of checkup's</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                {errors.numberOfCheckup && touched.numberOfCheckup && (
                  <p className="red-error">{errors.numberOfCheckup}</p>
                )}
              </div>

              <div>
                <label className="text-white dark:text-gray-200">
                  Pro Care Tips
                </label>
                <select
                  name="tipAvailabilty"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option>Tips availability</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.tipAvailabilty && touched.tipAvailabilty && (
                  <p className="red-error">{errors.tipAvailabilty}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </>
    </div>
  );
}

export default AdminAddPlansPage;
