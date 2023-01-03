import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import jwt from 'jwt-decode';
import { userLoginSchema } from '../../Validation/Validation';
import { userLogin } from '../../Axios/Services/UserServices';
import {useDispatch} from 'react-redux';
import '../UserLogin/UserLoginPage.css';
import { userToken } from '../../redux/adminReducer';

const initialValues = {
  email: '',
  password: '',
};

function UserLoginPage() {
  const dispatch=useDispatch()
	const [error,setError]=useState('')
	const navigate=useNavigate()
  const onSubmit = async (values, action) => {
	const response = await userLogin(values);
	
if(response.blocked){
  setError('This account is blocked !')
}else{
	if (response.user) {
		localStorage.setItem('userToken', response.user);
   
    dispatch(userToken(response.user))
		const user = jwt(response.user);
		console.log(user);
		localStorage.setItem('userDetails', user.name);
	
		navigate('/userHome')
	  }else{
		  setError('Incorrect email or password')
	  }
}

  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: userLoginSchema,
      onSubmit,
    });

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <body className="font-mono bg-gray-400 h-full">
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
                <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                <form
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4">
                  {error?<p style={{color:'red'}} className="text-center">{error}</p> : ''}
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="user@gmail.com"
                    />
                    {errors.email && touched.email && (
                      <p className="red-error">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      placeholder="***************"
                    />
                    {errors.password && touched.password && (
                      <p className="red-error">{errors.password}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <br />
					
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <p className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                      <Link to="/userSignup"> Create an Account! </Link>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 cursor-pointer">
                      <Link to="/expertLogin">Expert's Login here</Link>
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

export default UserLoginPage;
