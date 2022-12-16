import React,{useEffect} from 'react'
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ExpertHomeNavPage, ExpertHomePage} from '../Components'

function ExpertHome() {
    const navigate=useNavigate()
    useEffect(() => {
     const token= localStorage.getItem('expertToken')
     if(token){
        const expert=jwt(token)
        if(!expert){
            localStorage.removeItem('expertToken')
            navigate('/expertLogin')

        }else{
            // populateQuote()
        }
      }else{
        navigate('/expertHome')
      }
      
    }, [navigate])
    

  return (
    <div>
        <ExpertHomeNavPage/>
        <ExpertHomePage/>
    </div>
  )
}

export default ExpertHome