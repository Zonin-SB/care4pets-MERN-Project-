import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { AdminHome, AdminLogin } from '../Pages'

function adminRoutes() {
  return (
    <>
        <Routes>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/adminHome' element={<AdminHome/>}/>
        </Routes>
       

    </>
  )
}

export default adminRoutes