import { axiosExpertInstance } from "../Axios";

export const expertSignup=async(values)=>{
    values.verified=false
    values.blocked=false
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
  
    const {data}=await axiosExpertInstance.post('/expertSignup',values,config)
    console.log(data);
    if(data.status){
        return data;
    }
}

export const expertLogin=async(values)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data}=await axiosExpertInstance.post('/expertLogin',values,config)
  
   if(data){
    return data
   }
}