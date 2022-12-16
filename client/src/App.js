import React from 'react';
import {Routes,Route} from 'react-router-dom'
import './index.css'
import { AdminHome, AdminLogin, Error, ExpertHome, ExpertLogin, ExpertSignup, Home, UserHome, UserLogin, UserSignup } from './Pages';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/userHome' element={<UserHome/>}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        <Route path='/userSignup' element={<UserSignup/>}/>
        <Route path='/expertLogin' element={<ExpertLogin/>}/>
        <Route path='/expertSignup' element={<ExpertSignup/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/adminHome' element={<AdminHome/>}/>
        <Route path='/expertHome' element={<ExpertHome/>}/>
        <Route path='/*' element={<Error/>}/>

        
      </Routes>
    
    </div>
  );
}

export default App;
