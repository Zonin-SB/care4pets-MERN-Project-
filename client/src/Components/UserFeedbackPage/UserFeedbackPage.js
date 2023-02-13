import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { userFeedbackSchema } from '../../Validation/Validation';
import { sendFeedback } from '../../Axios/Services/UserServices';
import Swal from 'sweetalert2';

function UserFeedbackPage() {
  const id = useSelector((state) => state.admin.userDetails.userId);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (values, action) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/userLogin');
    }
    const response = await sendFeedback(token, values);
    if (response.status === 'ok') {
      Swal.fire({
        icon: 'success',
        title: 'Your feedback has been submitted',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      setError('Something went wrong...Please try again after some time.');
    }
  };

  const initialValues = {
    name: '',
    feedback: '',
    message: '',
    userId: id,
    approved: false,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: userFeedbackSchema,
      onSubmit,
    });

  return (
    <div>
      <section className="p-6 text-gray-800">
        <form
          onSubmit={handleSubmit}
          className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow bg-gray-50 ng-untouched ng-pristine ng-valid"
        >
          {error ? (
            <p style={{ color: 'red' }} className="text-center">
              {error}
            </p>
          ) : (
            ''
          )}
          <h2 className="w-full text-3xl font-bold leading-tight">Feedback</h2>
          <div>
            <label for="name" className="block mb-1 ml-1">
              Name
            </label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              id="name"
              type="text"
              placeholder="Your name"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-rose-600 bg-gray-100"
            />
            {errors.name && touched.name && (
              <p className="red-error">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 ml-1">Feedback</label>
            <input
              value={values.feedback}
              onChange={handleChange}
              onBlur={handleBlur}
              id="feedback"
              name="feedback"
              type="text"
              placeholder="Type feedback"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-rose-600 bg-gray-100"
            />
            {errors.feedback && touched.feedback && (
              <p className="red-error">{errors.name}</p>
            )}
          </div>
          <div>
            <label for="message" className="block mb-1 ml-1">
              Experience
            </label>
            <textarea
              id="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              name="message"
              type="text"
              placeholder="Share your experience"
              className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-rose-600 bg-gray-100"
            ></textarea>
            {errors.message && touched.message && (
              <p className="red-error">{errors.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-rose-600 focus:ring-rose-600 hover:ring-rose-600 text-gray-50"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UserFeedbackPage;
