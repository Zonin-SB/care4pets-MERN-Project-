import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import { expertSignupSchema } from '../../Validation/Validation'
import { expertSignup } from '../../Axios/Services/ExpertServices'
import '../UserSignup/UserSignupPage.css'

const initialValues={
    name:'',
    email:'',
    mobile:'',
    dob:'',
    gender:'',
    expertisedIn:'',
    experience:'',
    password:'',
    confirmPassword:''

}

function ExpertSignupPage() {
    const [error,setError]=useState('')
    const navigate=useNavigate()

    const onSubmit=async (values,action)=>{
        const response=await expertSignup(values)
        if(response.status==='error'){
            setError('This email/mobile already exists,try another one.')
        }else if(response.status==='success'){
            navigate('/expertLogin')
        }

    }

    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:initialValues,
        validationSchema:expertSignupSchema,
        onSubmit
    })
    // console.log(errors);
  return (
    <div className='max-w-screen-2xl mx-auto'>
        <section className="max-w-4xl p-6 mx-auto bg-teal-900 rounded-md shadow-md dark:bg-gray-800 mt-20">
    <h1 className="text-4xl font-bold text-white capitalize dark:text-white flex justify-center">Expert Signup</h1>
    <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-white dark:text-gray-200" >Username</label>
                <input id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} name='name' type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                { errors.name && touched.name && ( <p className='red-error'>{errors.name}</p> )}
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Email</label>
                <input id="email"  value={values.email} onChange={handleChange} onBlur={handleBlur} name='email' type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                { errors.email && touched.email && ( <p className='red-error'>{errors.email}</p> )}
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Mobile</label>
                <input id="mobile"  value={values.mobile} onChange={handleChange} onBlur={handleBlur} name='mobile' type="tel" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                { errors.mobile && touched.mobile && ( <p className='red-error'>{errors.mobile}</p> )}
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Date of Birth</label>
                <input id="dob"  value={values.dob} onChange={handleChange} onBlur={handleBlur} name='dob' type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                { errors.dob && touched.dob && ( <p className='red-error'>{errors.dob}</p> )}
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Gender</label>
                <select name='gender'  onChange={handleChange} onBlur={handleBlur} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-teal-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                    <option >Select gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                   
                </select>
                { errors.gender && touched.gender && ( <p className='red-error'>{errors.gender}</p> )}
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Expertised in</label>
                <select name='expertisedIn' id='expertisedIn' onChange={handleChange} onBlur={handleBlur}  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                <option>Select a pet</option>
                    <option  value='Dog' >Dog</option>
                    <option value='Cat'>Cat</option>
                    <option value='Exotic-birds'>Exotic birds</option>
                   
                </select>
                { errors.expertisedIn && touched.expertisedIn && ( <p className='red-error'>{errors.expertisedIn}</p> )}
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Years of Experience</label>
                <input id="experience"  value={values.experience} onChange={handleChange} onBlur={handleBlur} name='experience' type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                { errors.experience && touched.experience && ( <p className='red-error'>{errors.experience}</p> )}
            </div>
            

            <div>
                <label className="text-white dark:text-gray-200" >Password</label>
                <input id="password"  value={values.password} onChange={handleChange} onBlur={handleBlur} name='password' type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                { errors.password && touched.password && ( <p className='red-error'>{errors.password}</p> )}
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Password Confirmation</label>
                <input id="confirmPassword"  value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} name='confirmPassword' type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                { errors.confirmPassword && touched.confirmPassword && ( <p className='red-error'>{errors.confirmPassword}</p> )}
            </div>
          
          
        
           
           
          
        </div>

        {error?<p style={{color:'red'}} className="text-center">{error}</p> : ''}
        <div className="flex justify-center mt-6">
        
            <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Signup</button>
           
        </div>
        <div className="flex justify-center mt-2">
           
            <p className='text-slate-50'>Already have an account?<Link to='/expertLogin'><span className='text-white cursor-pointer'>Login here</span></Link></p>
        </div>
    </form>
</section>

    </div>
  )
}

export default ExpertSignupPage