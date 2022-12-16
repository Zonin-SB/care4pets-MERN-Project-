import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'
import { AdminLoginPage } from '../Components'
import AdminNav from '../Components/AdminNav/AdminNav'

function AdminLogin() {
  const navigate=useNavigate()
  useEffect(() => {
    const token=localStorage.getItem('adminToken')
    if(token){
      const admin=jwt(token)
      console.log(admin);
      if(admin){
        navigate('/adminHome')
      }else{
        navigate('/admin')
      }
    }else{
      navigate('/admin')
    }
  
    
  }, [navigate])
  
  return (
    <div>
        <AdminNav/>
        <AdminLoginPage/>
    </div>
  )
}

export default AdminLogin