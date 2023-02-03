import React, { useEffect, useState } from 'react';
import { getHomeFeedback } from '../../Axios/Services/UserServices';
import './HomePage.css';
function HomePage5() {
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    fetchFeedback();

    async function fetchFeedback() {
      const data = await getHomeFeedback();
      setFeedback(data.feedback);
    }
  }, []);
  

  return (
    <div className="home-background max-w-screen-2xl mx-auto">
      <div>
        <h1 className="pt-9 text-3xl font-sans text-center font-black text-slate-700 ">
          FROM OUR SUBSCRIBERS
        </h1>
        <div className="testimonials pt-9">
          {/* <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-2 my-2">
            <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
              Excellent sessions by experts
            </h5>
            <p class="text-gray-700 text-base mb-4">
              I’m a premium member,overall excellent session by experts.It’s
              worth every penny.
            </p>
            <h1 className="text-center">Name</h1>
          </div> */}
          {/* <div class="block p-6 rounded-lg shadow-lg bg-white  mx-2 my-2 ">
            <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
              Excellent sessions by experts
            </h5>
            <p class="text-gray-700 text-base mb-4">
              I’m a premium member,overall excellent session by experts.It’s
              worth every penny.
            </p>
            <h1 className="text-center">Name</h1>
          </div>
          <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-2 my-2">
            <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
              Excellent sessions by experts
            </h5>
            <p class="text-gray-700 text-base mb-4">
              I’m a premium member,overall excellent session by experts.It’s
              worth every penny.
            </p>
            <h1 className="text-center">Name</h1>
          </div>
          <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-2 my-2">
            <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
              Excellent sessions by experts
            </h5>
            <p class="text-gray-700 text-base mb-4">
              I’m a premium member,overall excellent session by experts.It’s
              worth every penny.
            </p>
            <h1 className="text-center">Name</h1>
          </div> */}

          <>
            {/* component */}
            <div className="flex flex-col bg-[#E3F2FD] m-auto p-auto">
              {/* <h1 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">
      Example
    </h1> */}
              <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
                  {feedback
                    ? feedback.map((data, index) => {
                        return (
                          <div key={index} className="inline-block px-3">
                            <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                              <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2 p-1">
                                {data.feedback}
                              </h5>
                              <p class="text-gray-700 text-base mb-4 p-1">
                               {data.message}
                              </p>
                              <h1 className="text-center">
                                Name : {data.name}
                              </h1>
                            </div>
                          </div>
                        );
                      })
                    : ''}

             
                </div>
              </div>
            </div>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  '\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n',
              }}
            />
          </>
        </div>
      </div>
    </div>
  );
}

export default HomePage5;
