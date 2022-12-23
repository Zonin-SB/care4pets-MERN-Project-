import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { Error, Home, UserHome, UserLogin, UserSignup } from '../Pages'

function userRoutes() {
  return (
    <> 
    <Routes>
    <Route path='*' element={<Error/>}/>
    <Route  path='/' element={<Home/>}/>
        <Route  path='/userHome' element={<UserHome/>}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        <Route path='/userSignup' element={<UserSignup/>}/>
        
        
    </Routes>
    </>
  )
}

export default userRoutes