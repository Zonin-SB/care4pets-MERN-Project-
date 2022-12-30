import React from 'react';
import png1 from '../../images/png1.png';
import png3 from '../../images/png3.png';
import png2 from '../../images/png2.png';
import './HomePage.css';

function HomePage4() {
  return (
    <div className='home-background max-w-screen-2xl mx-auto'>
      <div className="flex justify-around pt-9">
        <div>
          <img src={png1} className="w-24 h-24" alt="png not found" />
          <h1 className="text-bold text-violet-700">Daily Workout</h1>
        </div>
        <div>
          <img src={png2} className="w-24 h-24" alt="png not found" />
          <h1 className="text-bold text-violet-700">Diet Plan</h1>
        </div>
        <div>
          <img src={png3} className="w-28 h-24" alt="png not found" />
          <h1 className=" text-extrabold text-violet-700">Tracking Progress</h1>
        </div>
      </div>

      <div>
        <section>
         
            <h1 className="mt-9 text-4xl font-sans text-center font-black text-slate-700 ">
              CHOOSE YOUR PLAN
            </h1>
            <div className="container mx-auto flex justify-evenly flex-wrap mt-9 px-4">
              <div className="mx-2 my-2 rounded-lg shadow-lg bg-violet-400 max-w-xs transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="flex justify-around">
                  <div>
                    <h5 className="text-gray-900 text-4xl font-bold mb-2 ml-3">
                      3
                    </h5>
                    <p className="text-sm font-bold">months</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-gray-900 text-5xl font-bold text-center">
                      ₹999/-
                    </h2>
                    <p className="text-center text-red-600">
                      <strike>₹1299/-</strike>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="card-body">
                  <h1 className="text-center text-3xl font-bold text-violet-900">
                    Classic
                  </h1>
                </div>
                <div className="px-2 plan-card mt-5 font-semibold text-white">
                  <h5>1000+ training and workout plans for your pet.</h5>
                  <h5>Monthly checkup on your pet by trainer.</h5>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className="rounded-full hover:bg-red-500 bg-slate-300 mb-2 py-2 px-3 text-xs font-bold tracking-wider border-red-500 hover:border-white hover:text-white  border-2 text-red-700"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="mx-2 my-2 rounded-lg shadow-lg bg-violet-400 max-w-xs transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="flex justify-around">
                  <div>
                    <h5 className="text-gray-900 text-4xl font-bold mb-2 ml-3">
                      3
                    </h5>
                    <p className="text-sm font-bold">months</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-gray-900 text-5xl font-bold text-center">
                      ₹999/-
                    </h2>
                    <p className="text-center text-red-600">
                      <strike>₹1299/-</strike>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="card-body">
                  <h1 className="text-center text-3xl font-bold text-violet-900">
                    Classic
                  </h1>
                </div>
                <div className="px-2 plan-card mt-5 font-semibold text-white">
                  <h5>1000+ training and workout plans for your pet.</h5>
                  <h5>Monthly checkup on your pet by trainer.</h5>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className="rounded-full hover:bg-red-500 bg-slate-300 mb-2 py-2 px-3 text-xs font-bold tracking-wider border-red-500 hover:border-white hover:text-white  border-2 text-red-700"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
              <div className="mx-2 my-2 rounded-lg shadow-lg bg-violet-400 max-w-xs transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="flex justify-around">
                  <div>
                    <h5 className="text-gray-900 text-4xl font-bold mb-2 ml-3">
                      3
                    </h5>
                    <p className="text-sm font-bold">months</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-gray-900 text-5xl font-bold text-center">
                      ₹999/-
                    </h2>
                    <p className="text-center text-red-600">
                      <strike>₹1299/-</strike>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="card-body">
                  <h1 className="text-center text-3xl font-bold text-violet-900">
                    Classic
                  </h1>
                </div>
                <div className="px-2 plan-card mt-5 font-semibold text-white">
                  <h5>1000+ training and workout plans for your pet.</h5>
                  <h5>Monthly checkup on your pet by trainer.</h5>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className="rounded-full hover:bg-red-500 bg-slate-300 mb-2 py-2 px-3 text-xs font-bold tracking-wider border-red-500 hover:border-white hover:text-white  border-2 text-red-700"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
         
        </section>
      </div>
    </div>
  );
}

export default HomePage4;
