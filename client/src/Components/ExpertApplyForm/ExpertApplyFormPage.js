import React, { useState } from 'react';
import { expertApplyVerification, uploadDocuments } from '../../Axios/Services/ExpertServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ExpertApplyFormPage() {
  const [previewSource1, setPreviewSource1] = useState();
  const [previewSource2, setPreviewSource2] = useState();
  const [previewSource3, setPreviewSource3] = useState();
  const [fileInputState, setFileInputState] = useState('');
  const [error,setError]=useState('')
  const navigate=useNavigate();

  const expertId = useSelector((state) => state.admin.expertDetails.expertId);

  const handleFileInputChange1 = (e) => {
    const file = e.target.files[0];
    previewFile1(file);
  };
  const handleFileInputChange2 = (e) => {
    const file = e.target.files[0];
    previewFile2(file);
  };
  const handleFileInputChange3 = (e) => {
    const file = e.target.files[0];
    previewFile3(file);
  };

  const previewFile1 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource1(reader.result);
    };
  };
  const previewFile2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource2(reader.result);
    };
  };
  const previewFile3 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource3(reader.result);
    };
  };

  let values = {};

 const handleSubmit = async(e) => {
    e.preventDefault();
    if (!previewSource1) return;
    if (!previewSource2) return;
    if (!previewSource3) return;
    const uploadImage=async(base64EncodedImage)=>{
      const {imageData}= await uploadDocuments(base64EncodedImage)
      console.log(imageData,'in uploadImage');
      if(imageData.url){
        return imageData.url
      }else{
        setError('Image upload failed')
      }
     }
  const profilePic=await  uploadImage(previewSource1);
   const idProof=await uploadImage(previewSource2);
   const licensePic=await uploadImage(previewSource3);

   if(profilePic && idProof&& licensePic){
    values.profilePic=profilePic
    values.idProofPic=idProof
    values.licensePic=licensePic
    values.applied=true
    values.id=expertId

   
   const token= localStorage.getItem('expertToken')
   const response=await expertApplyVerification(token,values)
   if (response.status === 'ok') {
    navigate('/expertProfile');
  } else {
    setError('Documents upload failed');
  }
   }
  };

 
  return (
    <div>
      <div className="w-3/5 mx-auto mt-9">
        {/* Component Start */}

        <form
          className="flex flex-col justify-center items-center bg-white rounded shadow-lg p-12 mt-12"
          onSubmit={handleSubmit}
        >
           {error ? (
                <p style={{ color: 'red' }} className="text-center">
                  {error}
                </p>
              ) : (
                ''
              )}
          <label className="font-bold text-xs">Upload Your Latest Photo</label>
          {previewSource1 && (
                <img src={previewSource1} className="h-20" alt="profile pic" />
              )}
          <input
            className="flex items-center h-12 px-6 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="file"
            name="profilepic"
            id="profilepic"
            value={fileInputState}
            onChange={handleFileInputChange1} 
                      
          />

        
          <label className="font-bold text-xs">Upload Your ID</label>
          {previewSource2 && (
                <img src={previewSource2} className="h-20" alt="profile pic" />
              )}
          <input
            className="flex items-center h-12 px-6 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="file"
            name="idproof"
            id="idproof"
            value={fileInputState}
            onChange={handleFileInputChange2}           
          />
        
            <label className="font-bold text-xs mt-3" htmlFor="passwordField">
            Upload Your Trainer's License
          </label>
          {previewSource3 && (
                <img src={previewSource3} className="h-20" alt="profile pic" />
              )}
          <input
            className="flex items-center h-12 px-6 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="file"
            name="licensepic"
            id="licensepic"
            value={fileInputState}
            onChange={handleFileInputChange3}
          />
        
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
