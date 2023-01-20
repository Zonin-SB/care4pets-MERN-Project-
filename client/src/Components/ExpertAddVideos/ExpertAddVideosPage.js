import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { expertVideoUpload } from '../../Axios/Services/ExpertServices';
import { videoUploadSchema } from '../../Validation/Validation';

const initialValues = {
  title: '',
  type: '',
  link: '',
  description: '',
};

function ExpertAddVideosPage() {
  const expertId = useSelector((state) => state.admin.expertDetails.expertId);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (values, action) => {
    values.approved = false;
    values.expertId = expertId;
    const token = localStorage.getItem('expertToken');
    const data = await expertVideoUpload(token, values);
    if(data.status==='ok'){
      navigate('/expertVideos')
    }else{
      setError('Something went wrong...please try again after sometimes...')
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: videoUploadSchema,
      onSubmit,
    });
  // console.log(errors,'err');

  return (
    <div>
      <>
        {/* component */}
        <section className="max-w-2xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-16 mb-10">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            ADD NEW VIDEO
          </h1>
          {error ? <p className="red-error">{error}</p> : ''}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 ">
              <div>
                <label className="text-white dark:text-gray-200">
                  Video Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.title && touched.title && (
                  <p className="red-error">{errors.title}</p>
                )}
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Video Type
                </label>
                <select
                  name="type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option>Select Video Type</option>
                  <option value="Free">Free</option>
                  <option value="Classic">Classic</option>
                  <option value="Super">Super</option>
                  <option value="Premium">Premium</option>
                </select>
                {errors.type && touched.type && (
                  <p className="red-error">{errors.type}</p>
                )}
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Video Link
                </label>
                <input
                  id="link"
                  name="link"
                  value={values.link}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.link && touched.link && (
                  <p className="red-error">{errors.link}</p>
                )}
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.description && touched.description && (
                  <p className="red-error">{errors.description}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              >
                Upload
              </button>
            </div>
          </form>
        </section>
      </>
    </div>
  );
}

export default ExpertAddVideosPage;
