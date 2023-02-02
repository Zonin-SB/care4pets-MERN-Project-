import React from 'react'
import homeBanner from '../../images/c4p-banner-home.png'
import './HomePage.css'
function HomePage() {
  return (
    <div className='home-background max-w-screen-2xl mx-auto'>
      <div className='relative'>
       
      <img src={homeBanner} className="max-w-full h-auto" alt="..." />
      
      </div>
    </div>
  )
}

export default HomePage