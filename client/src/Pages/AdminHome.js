import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'
import { AdminHomeNavPage, AdminHomePage } from '../Components'

function AdminHome() {
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
        <AdminHomeNavPage/>
        <AdminHomePage/>
    </div>
  )
}

export default AdminHome