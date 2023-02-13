import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  sendverificationOTP,
  verifyOTP,
} from '../../Axios/Services/UserServices';
import { userToken } from '../../redux/adminReducer';
import jwt from 'jwt-decode';
import { useDispatch } from 'react-redux';

function UserOTPLoginPage() {
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState('');
  const [otpSend, setOtpSend] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function sendOTP(event) {
    event.preventDefault();
    const values = { Email: email };
    const data = await sendverificationOTP(values);

    if (data.status) {
      setOtpSend('OTP send successfully. Please check your Email.');
    } else {
      setError(data.message);
    }
  }

  async function Login(event) {
    event.preventDefault();
    const values = { Email: email, OTP: OTP };
    const response = await verifyOTP(values);
    if (response.status) {
      localStorage.setItem('userToken', response.user);

      dispatch(userToken(response.user));
      const user = jwt(response.user);

      localStorage.setItem('userDetails', user.name);

      navigate('/userHome');
    } else {
      setError('Please enter valid OTP..');
    }
  }
  return (
    <div>
      <>
        {/* component */}
        <div className="h-screen flex justify-center">
          <div className="flex justify-center items-center bg-white">
            <form className="bg-white">
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Hello Again!
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-7">
                {otpSend ? <p>{otpSend}</p> : ''}
              </p>
              {error ? (
                <p style={{ color: 'red' }} className="red-error">
                  {error}
                </p>
              ) : (
                ' '
              )}

              {/* <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name=""
            id=""
            placeholder="Full name"
          />
        </div> */}
              {/* <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name=""
            id=""
            placeholder="Username"
          />
        </div> */}
              {/* <label htmlFor="">Enter Your Email</label> */}
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                />
              </div>

              {otpSend ? (
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    type="OTP"
                    name="OTP"
                    id="OTP"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    placeholder="Enter OTP"
                    required
                  />
                </div>
              ) : (
                ''
              )}

              {otpSend ? (
                <button
                  onClick={Login}
                  type="submit"
                  className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={sendOTP}
                  type="submit"
                  className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                  Send OTP
                </button>
              )}
              {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                Resend OTP ?
              </span> */}
            </form>
          </div>
        </div>
      </>
    </div>
  );
}

export default UserOTPLoginPage;
