import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { ExpertHome, ExpertLogin, ExpertSignup } from '../Pages'

function expertRoutes() {
  return (
    <>
    <Routes>
    <Route path='/expertLogin' element={<ExpertLogin/>}/>
        <Route path='/expertSignup' element={<ExpertSignup/>}/>
        <Route path='/expertHome' element={<ExpertHome/>}/> 
      
    </Routes>
    </>
  )
}

export default expertRoutes