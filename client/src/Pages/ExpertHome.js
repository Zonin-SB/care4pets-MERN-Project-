import React,{useEffect} from 'react'
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {expertLoginDetails} from '../redux/adminReducer'
import { ExpertHomeNavPage, ExpertHomePage} from '../Components'

function ExpertHome() {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
     const token= localStorage.getItem('expertToken')
     if(token){
        const expert=jwt(token)
        dispatch(expertLoginDetails(expert))
        if(!expert){
            localStorage.removeItem('expertToken')
            navigate('/expertLogin')

        }else{
            // populateQuote()
        }
      }else{
        navigate('/expertHome')
      }
      
    }, [navigate,dispatch])
    

  return (
    <div>
        <ExpertHomeNavPage/>
        <ExpertHomePage/>
    </div>
  )
}

export default ExpertHome