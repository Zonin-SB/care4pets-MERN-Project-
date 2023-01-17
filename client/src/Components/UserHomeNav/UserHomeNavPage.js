import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import './UserHomeNavPage.css';
import { useDispatch } from 'react-redux';
import {
  clearUserLoginDetails,
  clearUserAllDetails,
  clearUserToken,
} from '../../redux/adminReducer';
import { getPlanOrderValues, getSelectedExpertDetails, getSelectedPlanDetails } from '../../redux/userReducer';
function UserNav() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userDetails');
    dispatch(clearUserToken());
    dispatch(clearUserLoginDetails());
    dispatch(clearUserAllDetails());
    dispatch(getSelectedExpertDetails(false))
    dispatch(getSelectedPlanDetails(false));
    dispatch(getPlanOrderValues(false))
    navigate('/');
  };
  return (
    <div>
      <div className="min-h-full max-w-screen-2xl mx-auto">
        <nav className="nav-color">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div>
                    <Link to="/userHome">
                      <span className="logo1">care</span>
                      <span className="logo2">4</span>
                      <span className="logo1">pets</span>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"  */}
                    <button
                      className=" hover:bg-gray-700 hover:text-white text-black-300 px-3 py-2 rounded-md text-sm font-medium"
                      aria-current="page"
                    >
                      Home
                    </button>

                   <Link to={'/userSelectExpert'}> <button className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Experts
                    </button></Link>

                    <Link to={'/userViewPlan'}> <button className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Plan
                    </button></Link>

                    <button className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Chat
                    </button>

                    <Link to="/userProfile">
                      {' '}
                      <button className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Profile
                      </button>
                    </Link>

                    {/* <button className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</button> */}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown  */}
                  <div className="relative ml-3">
                    <div>
                      <button
                        onClick={logout}
                        type="button"
                        className="rounded-full py-2 px-3 text-xs font-bold cursor-pointer tracking-wider border-blue-900 border-2 text-blue-900 hover:bg-blue-900 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button  */}
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>

                  {/* Heroicon name: outline/bars-3

              Menu open: "hidden", Menu closed: "block"
             */}
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="hidden h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="md:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"  */}
                  <button
                    className=" text-gray-300 block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
                    aria-current="page"
                  >
                    Home
                  </button>

                  <Link to={'/userSelectExpert'}> <button className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Experts
                  </button> </Link>

                  <button className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Chat
                  </button>

                  <button className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Profile
                  </button>

                  {/* <button  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Reports</button> */}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <button
                        onClick={logout}
                        type="button"
                        className="rounded-full py-2 px-3 text-xs font-bold cursor-pointer tracking-wider border-blue-900 border-2 text-blue-900  hover:bg-blue-900 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </div>
    </div>
  );
}

export default UserNav;
