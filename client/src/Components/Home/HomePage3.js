import React from 'react'
import banner2 from '../../images/banner.png'
import png1 from '../../images/png1.png';
import png3 from '../../images/png3.png';
import png2 from '../../images/png2.png';
import './HomePage.css'
function HomePage3() {
  return (
    <div className='home-background max-w-screen-2xl mx-auto'>
        <div className='pt-9'>
            <img src={banner2} className="max-w-full h-auto" alt="banner not found" />
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