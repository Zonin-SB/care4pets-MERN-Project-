import React, { useState } from 'react';
import { useFormik } from 'formik';
import { expertApplyFormSchema } from '../../Validation/Validation';

const initialValues = {
  profilepic: '',
  idproof: '',
  licensepic: '',
};

function ExpertApplyFormPage() {
  const[profilePic,setProfilePic]=useState();
  const onSubmit = async (values, action) => {
    console.log(values,'values on submit');
    const formdata = new FormData();
    formdata.append('file',profilePic)
    console.log(formdata,'formdata');
  };

  const { values, errors, touched,setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: expertApplyFormSchema,
      onSubmit,
    });
  // console.log(values);

  const uploadImage1 = (e) => {
    
    setFieldValue('profilepic', e.target.files[0]);
    setProfilePic(e.target.files[0])
  };

  return (
    <div>
      <div className="w-3/5 mx-auto mt-9">
        {/* Component Start */}

        <form
          className="flex flex-col justify-center items-center bg-white rounded shadow-lg p-12 mt-12"
          onSubmit={handleSubmit}
        >
          <label className="font-bold text-xs">Upload Your Latest Photo</label>
          <input
            className="flex items-center h-12 px-6 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="file"
            name="profilepic"
            id="profilepic"
            onChange={uploadImage1}
            onBlur={handleBlur}
           
          />
          {errors.profilepic && touched.profilepic && (
            <p className="red-error">{errors.profilepic}</p>
          )}
          {/* <label className="font-bold text-xs">Upload Your ID</label>
          <input
            className="flex items-center h-12 px-6 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="file"
            name="idproof"
            id="idproof"
            onChange={handleChange}
            onBlur={handleBlur}
            
          />
          {errors.idproof && touched.idproof && (
            <p className="red-error">{errors.idproof}</p>
          )} */}
          {/* <label className="font-bold text-xs mt-3" htmlFor="passwordField">
            Upload Your Trainer's License
          </label>
          <input
            className="flex items-center h-12 px-6 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="file"
            name="licensepic"
            id="licensepic"
            onChange={handleChange}
            onBlur={handleBlur}
          
          />
          {errors.licensepic && touched.licensepic && (
            <p className="red-error">{errors.licensepic}</p>
          )} */}
          <button
            type="submit"
            className="flex items-center justify-center h-8 px-6 w-28 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
        {/* Component End  */}
      </div>
    </div>
  );
}

export default ExpertApplyFormPage;
