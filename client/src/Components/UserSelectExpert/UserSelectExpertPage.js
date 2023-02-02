import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  getUsersExpert,
  getYourExpertDetails,
  selectExpert,
} from '../../Axios/Services/UserServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSelectedExpertDetails } from '../../redux/userReducer';

function UserSelectExpertPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.admin.userDetails.userId);
  const [expertDetails, setExpertDetails] = useState([]);
  const [yourExpertDetails,setYourExpertDetails]=useState([])
  const [error, setError] = useState('');
  const [filteredExpertDetails, setFilteredExpertDetails] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetchExpert();
    fetchYourExpert();

    async function fetchExpert() {
      const token = localStorage.getItem('userToken');
      const response = await getUsersExpert(token, id);
      if (response.status === 'ok') {
        // console.log(response.expertDetails[0].experts);
        setExpertDetails(response.expertDetails);
        setFilteredExpertDetails(response.expertDetails);
      } else {
        setError('Something went wrong...please try again after sometimes...');
      }
    }

    async function fetchYourExpert(){
      const token = localStorage.getItem('userToken');
      const response=await getYourExpertDetails(token,id)
      setYourExpertDetails(response.expert[0])
    }
  }, [id]);
  // console.log(expertDetails, 'in exp');

  useEffect(() => {
    const result = expertDetails.filter((expert) => {
      return expert.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredExpertDetails(result);
  }, [search, expertDetails]);

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
  async function select(id) {
    const token = localStorage.getItem('userToken');
    const data = await selectExpert(token, id);
    if (data.status === 'ok') {
      // console.log(data.expertDetails[0],'reduc exp');
      dispatch(getSelectedExpertDetails(data.expertDetails[0]));
      navigate('/userBuyPlan');
    } else {
      setError('Something went wrong...please try again after sometimes...');
    }
  }

  const columns = [
  
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
            <button
              onClick={() => select(row._id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Select
            </button>
          </div>
        );
      },
    },
    {
      name: 'More Details',
      selector: (row) => {
        return (
          <button
          onClick={()=>navigate(`/userViewExpert/${row._id}`)}
            type="button"
            class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Icon description</span>
          </button>
        );
      },
    },
  ];
  return (
    <div>
{yourExpertDetails?
      <div>
      <h1 className='text-center font-semibold text-2xl mt-6'>Your Expert</h1>
  {/* component */}
  <div className="mx-5 min-h-screen grid place-content-center mt-9">
    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl text-white p-8 text-center h-72 max-w-sm mx-auto">
      <button onClick={()=>navigate(`/userViewExpert/${yourExpertDetails._id}`)} className="text-2xl mb-3 border border-white rounded-xl">More Info</button>
      <p className="text-lg">
        You can contact us whenever you need help or just curious about
        something.
      </p>
    </div>
    <div className="bg-white py-8 px-10 text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
      <h2 className="font-semibold text-2xl mb-6">Start chatting</h2>
      <img
        className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
        src={yourExpertDetails.profilePic}
        alt="User avatar"
      />
      <p className="capitalize text-xl mt-1">{yourExpertDetails.name}</p>
      <span className="flex items-center border rounded-full w-24 pr-2 justify-center mx-auto mt-2 mb-12">
        <div className="bg-green-400 rounded-full w-2.5 h-2.5 block mr-2" />
        Active
      </span>
      <button onClick={()=>navigate(`/userChat/${yourExpertDetails._id}`)} className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-xl text-white pt-3 pb-4 px-8 inline">
        Send a message
      </button>
    </div>
  </div>
</div>
:''
}



      <div className="container mx-auto mt-2">
        {error ? (
          <p style={{ color: 'red' }} className="text-center">
            {error}
          </p>
        ) : (
          ''
        )}
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
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="block w-25 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          }
        />
      </div>
      
    </div>
  );
}

export default UserSelectExpertPage;
