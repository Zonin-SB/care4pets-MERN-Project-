import React,{useState} from 'react';
import { useFormik } from 'formik';
import { adminLoginSchema } from '../../Validation/Validation';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { adminLogin } from '../../Axios/Services/AdminServices';

const initialValues = {
  email: '',
  password: '',
};
function AdminLoginPage() {
	const [error,setError]=useState('')
	const navigate=useNavigate()

  const onSubmit = async (values, action) => {
	const response = await adminLogin(values);
  if (response.admin) {
    localStorage.setItem('adminToken', response.admin);
    const admin = jwt(response.admin);
   
    localStorage.setItem('adminDetails', admin.email);
    navigate('/adminHome')
  }else{
      setError('Incorrect email or password')
  }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: adminLoginSchema,
      onSubmit,
    });
  return (
    <div className='max-w-screen-2xl mx-auto'>
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold text-sky-800">
                    Admin Login
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                      />
					   {errors.email && touched.email && (
                <p className="red-error">{errors.email}</p>
              )}
                      <label
                     
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
						value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                      />
					   {errors.password && touched.password && (
                <p className="red-error">{errors.password}</p>
              )}
                      <label
                        
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
					{error?<p style={{color:'red'}} className="text-center">{error}</p> : ''}
                    <div className="relative">
                      <button type='submit' className="bg-blue-500 text-white rounded-md px-2 py-1">
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminLoginPage;
