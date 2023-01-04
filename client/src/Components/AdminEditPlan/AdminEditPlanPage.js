import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { addPlanSchema } from '../../Validation/Validation';
import { getPlanDetails } from '../../Axios/Services/AdminServices';
import {useDispatch} from 'react-redux';
import { planData} from '../../redux/adminReducer';
import { useSelector } from 'react-redux';

// const initialValues = {
//   planName: '',
//   validity: '',
//   currentPrice: '',
//   previousPrice: '',
//   dietPlan: '',
//   expertAvailability: '',
//   numberOfCheckup: '',
//   tipAvailabilty: '',
// };

function AdminEditPlanPage() {
  const { id } = useParams();
  const [error, setError] = useState('');
  const [plan, setPlan] = useState([]);
  const dispatch=useDispatch();

  const { planDetails } = useSelector((state) => {
    console.log(state.admin,'state admin'); return  state.admin});
  console.log(planDetails,'from redux');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    fetchPlan();
    
    async function fetchPlan() {
      const data = await getPlanDetails(token, id);
      dispatch(planData(data.planDetails[0]))
      setPlan(data.planDetails[0]);
      
    }
    return  ()=>{dispatch(planData(null))}
       
    
  }, [id,dispatch]);
   console.log(plan, 'in ed plan');

  

  const onSubmit = async (values, action) => {
    // const token = localStorage.getItem('adminToken');
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        planName: planDetails?.planName||'',
        validity: planDetails?.validity || '',
        currentPrice: planDetails?.currentPrice || '',
        previousPrice: planDetails?.previousPrice || '',
        dietPlan: planDetails?.dietPlan || '',
        expertAvailability: planDetails?.expertAvailability || '',
        numberOfCheckup: planDetails?.numberOfCheckup || '',
        tipAvailabilty: planDetails?.tipAvailabilty || '',
      },
      validationSchema: addPlanSchema,
      onSubmit,
    });
    console.log(values,'formik values');

  return (
    <div>
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
                  value={values.validity}
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
                  value={values.expertAvailability}
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
                  value={values.numberOfCheckup}
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
                  value={values.tipAvailabilty}
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
                Update
              </button>
            </div>
          </form>
        </section>
      </>
    </div>
  );
}

export default AdminEditPlanPage;