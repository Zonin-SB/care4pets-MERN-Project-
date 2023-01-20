import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getUsersExpert, selectExpert } from '../../Axios/Services/UserServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { getSelectedExpertDetails } from '../../redux/userReducer';

function UserSelectExpertPage() {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const id = useSelector((state) => state.admin.userDetails.userId);
  const [expertDetails, setExpertDetails] = useState([]);
  const [error, setError] = useState('');
  const [filteredExpertDetails, setFilteredExpertDetails] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetchExpert();

    async function fetchExpert() {
      const token = localStorage.getItem('userToken');
      const response = await getUsersExpert(token, id);
      if (response.status === 'ok') {
        // console.log(response.expertDetails[0].experts);
        setExpertDetails(response.expertDetails);
        setFilteredExpertDetails(response.expertDetails)
      } else {
        setError('Something went wrong...please try again after sometimes...');
      }
    }
  }, [id]);
  console.log(expertDetails, 'in exp');

  useEffect(() => {
    const result = expertDetails.filter(expert=>{
      return expert.name.toLowerCase().match(search.toLowerCase())
    })
    setFilteredExpertDetails(result)
    
   
  }, [search,expertDetails])

  // let ids={}
  // async function select(id){
  //   const token=localStorage.getItem('userToken')
  //   ids.userId=userId;
  //   ids.expertId=id;
  //   const data=await selectExpert(token,ids)
  //   if(data.status==='ok'){
  //     navigate('')
  //   }
  // }
  async function select(id){
    const token=localStorage.getItem('userToken')
    const data=await selectExpert(token,id)
    if(data.status==='ok'){
      // console.log(data.expertDetails[0],'reduc exp');
      dispatch(getSelectedExpertDetails(data.expertDetails[0]))
      navigate('/userBuyPlan')
    }else{
      setError('Something went wrong...please try again after sometimes...')
    }
  }

  const columns = [
    {
      name: 'Pic',
      sortable: true,
      selector: (row) => (
        <img className="w-20" src={row.profilePic} alt="Not found" />
      ),
    },
    {
      name: 'Name',
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: 'Gender',
      sortable: true,
      selector: (row) => row.gender,
    },
    {
      name: 'Experience',
      selector: (row) => row.experience,
    },
    {
      name: 'Expert',
      selector: (row) => row.expertisedIn,
    },

    {
      name: 'Select',
      selector: (row) => {
        return (
          <div>
            <button onClick={()=>select(row._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Select
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="container mx-auto mt-9">
      {error?<p style={{color:'red'}} className="text-center">{error}</p> : ''}
        <DataTable
          title="Select your Expert"
          columns={columns}
          data={filteredExpertDetails}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input type='text' 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search" 
            className='block w-25 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'/>
          }
        />
      </div>
    </div>
  );
}

export default UserSelectExpertPage;
