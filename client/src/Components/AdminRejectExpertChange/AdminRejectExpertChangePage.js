import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { adminRejectExpertChange } from '../../Axios/Services/AdminServices';
import { rejectionExpertChangeSchema } from '../../Validation/Validation';

function AdminRejectExpertChangePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const initialValues = {
    reason: '',
    message: '',
  };

  const onSubmit = async (values, action) => {
    const token = localStorage.getItem('adminToken');
    const data = await adminRejectExpertChange(token, id, values);
    if (data.status === 'ok') {
      Swal.fire({
        icon: 'success',
        title: 'The application has been rejected',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/adminExpertChangeList');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      setError('Something went wrong....try again after some time...');
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: rejectionExpertChangeSchema,
      onSubmit,
      enableReinitialize: true,
    });
  return (
    <div className="mt-9 max-w-screen-2xl mx-auto">
      <section className="p-6 text-gray-800">
        <form
          onSubmit={handleSubmit}
          className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow ng-untouched ng-pristine ng-valid bg-gray-50"
        >
          <h2 className="w-full text-3xl font-bold leading-tight">
            Reason for Rejection
          </h2>
          {error ? (
            <p style={{ color: 'red' }} className="text-center">
              {error}
            </p>
          ) : (
            ''
          )}

          <div>
            <label className="block mb-1 ml-1">Reason</label>
            <input
              id="reason"
              name="reason"
              type="text"
              value={values.reason}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Reason"
              required=""
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-rose-600 bg-gray-100"
            />
            {errors.reason && touched.reason && (
              <p className="red-error">{errors.reason}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 ml-1">Message</label>
            <textarea
              id="message"
              name="message"
              type="text"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Message..."
              className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-rose-600 bg-gray-100"
            />
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

export default AdminRejectExpertChangePage;
