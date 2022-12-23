import React from 'react';
import './index.css'

import {Routes,Route} from 'react-router-dom'
import { AdminHome, AdminLogin, AdminUserInfo, Error, ExpertHome, ExpertLogin, ExpertSignup, Home, UserHome, UserLogin, UserSignup } from './Pages';


function App() {
  return (
    <div className="App">
      
      <Routes>
      <Route  path='/' element={<Home/>}/>
        <Route  path='/userHome' element={<UserHome/>}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        <Route path='/userSignup' element={<UserSignup/>}/>
        
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/adminHome' element={<AdminHome/>}/>
        <Route path='/userinfo' element={<AdminUserInfo/>}/>

        <Route path='/expertLogin' element={<ExpertLogin/>}/>
        <Route path='/expertSignup' element={<ExpertSignup/>}/>
        <Route path='/expertHome' element={<ExpertHome/>}/> 

        <Route path='*' element={<Error/>}/>
        </Routes>
       
    </div>
  );
}

export default App;
