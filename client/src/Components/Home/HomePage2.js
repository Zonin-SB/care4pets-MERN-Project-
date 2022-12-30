import React from 'react'
import trainer1 from '../../images/trainer1.png'
import './HomePage.css'
function HomePage2() {
  return (
    <div className='home-background max-w-screen-2xl mx-auto'>
        <div className='home-background'>
            <p className='text-2xl font-black font-sans text-center text-slate-700 pt-9'>BEST IN CLASS EXPERTS</p>
            <p className='text-5xl font-black font-sans text-center text-slate-700 mt-2'>FOR <span className='text-red-500'>Y</span>OUR PETS</p>
        </div>

        <div className="container mx-auto flex justify-evenly flex-wrap mt-9 px-4">
        <div className="rounded-lg shadow-lg bg-violet-400 max-w-xs mx-2 my-2">
    <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
      <img className="rounded-t-lg " src={trainer1} alt=""/>
    </a>
    <div className="p-1">
      <h5 className="text-gray-900 text-2xl font-bold mb-2 text-center">David</h5>
      <p className="text-gray-700 text-base mb-4 text-center">
        Canine Expert
      </p>
      {/* <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
    </div>
  </div>
  
  <div className="rounded-lg shadow-lg bg-violet-400 max-w-xs mx-2 my-2">
    <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
      <img className="rounded-t-lg" src={trainer1} alt=""/>
    </a>
    <div className="p-2">
      <h5 className="text-gray-900 text-xl font-bold mb-2 text-center">David</h5>
      <p className="text-gray-700 text-base mb-4 text-center">
      Canine Expert
      </p>
      {/* <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
    </div>
  </div>

  <div className="rounded-lg shadow-lg bg-violet-400 max-w-xs mx-2 my-2">
    <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
      <img className="rounded-t-lg" src={trainer1} alt=""/>
    </a>
    <div className="p-2">
      <h5 className="text-gray-900 text-xl font-bold mb-2 text-center">David</h5>
      <p className="text-gray-700 text-base mb-4 text-center">
      Canine Expert
      </p>
      {/* <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
    </div>
  </div>
 

  
</div>

    </div>
  )
}

export default HomePage2