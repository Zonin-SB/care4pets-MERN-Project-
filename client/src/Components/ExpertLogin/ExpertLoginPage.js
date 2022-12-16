import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import jwt from 'jwt-decode';
import { expertLoginSchema } from '../../Validation/Validation';
import { expertLogin } from '../../Axios/Services/ExpertServices';

const initialValues = {
  email: '',
  password: '',
};

function ExpertLoginPage() {
  const navigate = useNavigate();
  const [error,setError]=useState('')

  const onSubmit = async (values, action) => {
    const response = await expertLogin(values);
    console.log(response);
    if (response.expert) {
      localStorage.setItem('expertToken', response.expert);
      const expert = jwt(response.expert);

      localStorage.setItem('expertDetails', expert.name);
      navigate('/expertHome')
    }else{
        setError('Incorrect email or password')
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: expertLoginSchema,
      onSubmit,
    });

  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-slate-600/40 ring-2 ring-black-400 sm:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-cyan-800 underline uppercase decoration-wavy">
            Expert Login
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="expert@gmail.com"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.email && touched.email && (
                <p className="red-error">{errors.email}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="***************"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.password && touched.password && (
                <p className="red-error">{errors.password}</p>
              )}
            </div>
            <p className="text-xs text-cyan-800 cursor-pointer">
              Forget Password?
            </p>
            {error?<p style={{color:'red'}} className="text-center">{error}</p> : ''}
            <div className="mt-6">
           
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {' '}
            Don't have an account?{' '}
            <p className="font-medium text-purple-600  cursor-pointer">
              <Link to="/expertSignup">Sign up</Link>
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExpertLoginPage;
