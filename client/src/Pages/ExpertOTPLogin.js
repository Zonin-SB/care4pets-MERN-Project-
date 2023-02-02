import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'
import {  ExpertOTPLoginPage, UserNav } from '../Components'

function ExpertOTPLogin() {
  const navigate=useNavigate()
  useEffect(() => {
    const token=localStorage.getItem('expertToken')
    if(token){
      const expert=jwt(token)
      
      if(expert){
        navigate('/expertHome')
      }
    }else{
      navigate('/expertOTPLogin')
    }
  
    
  }, [navigate])
  return (
    <div>
        <UserNav/>
        <ExpertOTPLoginPage/>
    </div>
  )
}

export default ExpertOTPLogin