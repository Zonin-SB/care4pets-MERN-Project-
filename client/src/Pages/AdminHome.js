import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'
import { useDispatch } from 'react-redux';
import {adminLoginDetails} from '../redux/adminReducer'
import { AdminHomeNavPage, AdminHomePage } from '../Components'

function AdminHome() {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
      const token=localStorage.getItem('adminToken')
      if(token){
        const admin=jwt(token)
        dispatch(adminLoginDetails(admin));
        if(admin){
          navigate('/adminHome')
        }else{
          navigate('/admin')
        }
      }else{
        navigate('/admin')
      }
    
      
    }, [navigate,dispatch])
    
  return (
    <div>
        <AdminHomeNavPage/>
        <AdminHomePage/>
    </div>
  )
}

export default AdminHome