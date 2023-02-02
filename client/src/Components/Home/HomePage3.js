import React from 'react'
import banner2 from '../../images/banner1.jpg'
import png1 from '../../images/png1.png';
import png3 from '../../images/png3.png';
import png2 from '../../images/png2.png';
import './HomePage.css'
function HomePage3() {
  return (
    <div className='home-background max-w-screen-2xl mx-auto'>
        <div className='pt-9 '>
          <div className='position-relative '>
            <img src={banner2} className="max-w-full h-auto" alt="banner not found" />
            {/* <h1 className='absolute  text-3xl '>Join Premium</h1>
            <ul className='absolute  left-25 text-2xl text-bold text-red-500 text-center'>
              <li>1000+ training and workout plans for your pet.</li>
              <li>50+ daily diet plans.</li>
              <li>Weekly checkup on your pet by trainer.</li>
              <li>Videos,live sessions and more...</li>
              <li>Ask any query related with your pet at any time.</li>
            </ul> */}
            </div>
        </div>
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
    </div>
  )
}

export default HomePage3