import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { userSignupSchema } from '../../Validation/Validation';
import { userSignup } from '../../Axios/Services/UserServices';

import './UserSignupPage.css';

const initialValues = {
  name: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
};

function UserSignupPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (values, action) => {
    const response = await userSignup(values);
    if (response.status === 'error') {
      setError('This email/mobile already exists,try another one.');
    } else if (response.status === 'success') {
      navigate('/userLogin');
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userSignupSchema,
      onSubmit,
    });

  return (
    <div className="max-w-screen-2xl mx-auto">
      <body className="font-mono bg-gray-400">
        <div className="container mx-auto">
          {/* my-12 */}
          <div className="flex justify-center px-6 py-6">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                style={{
                  backgroundImage: `url('https://source.unsplash.com/K4mSJ7kc0As/600x800')`,
                }}
              ></div>

              <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">User Signup</h3>
                <form
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Username
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      name="name"
                      placeholder="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                      <p className="red-error">{errors.name}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="user@gmail.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <p className="red-error">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Mobile
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="mobile"
                      type="tel"
                      name="mobile"
                      placeholder="Enter Mobile Number"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.mobile && touched.mobile && (
                      <p className="red-error">{errors.mobile}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="***************"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <p className="red-error">{errors.password}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="***************"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="red-error">{errors.confirmPassword}</p>
                    )}
                    {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
                  </div>
                  <div className="mb-4">
                    <br />
                    {error ? (
                      <p style={{ color: 'red' }} className="text-center">
                        {error}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Signup
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <p className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                      Already have an account?!
                      <Link to="/userLogin">
                        <span className="font-bold cursor-pointer">Login</span>
                      </Link>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 cursor-pointer">
                      <Link to="/expertSignup">Expert's Signup</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default UserSignupPage;
