import React, { useEffect } from 'react'
import { UserHomeNavPage, UserHomePage } from '../Components'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

function UserHome() {
    const navigate=useNavigate()
    useEffect(() => {
        const token=localStorage.getItem('userToken')
        if(token){
            const user=jwt(token)
            
            if(user){
              navigate('/userHome')
            }else{
              navigate('/userLogin')
            }
          }else{
            navigate('/userLogin')
          }
        
    
     
    }, [navigate])
    
  return (
    <div>
        <UserHomeNavPage/>
        <UserHomePage/>
    </div>
  )
}

export default UserHome