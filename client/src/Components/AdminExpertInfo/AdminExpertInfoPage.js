import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getExpertDetails,blockExpert,unblockExpert } from '../../Axios/Services/AdminServices';
import verified from '../../images/verified.png';
import notverified from '../../images/notverified.png';

function AdminExpertInfoPage() {
  const [expertDetails, setExpertDetails] = useState([]);
  const [filteredExpertDetails, setFilteredExpertDetails] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    getAllExperts();

    async function getAllExperts() {
      const response = await getExpertDetails(token);
      setExpertDetails(response.expertDetails);
      setFilteredExpertDetails(response.expertDetails);
    }
  }, []);

  useEffect(() => {
    const result = expertDetails.filter(expert=>{
      return expert.email.toLowerCase().match(search.toLowerCase())
    })
    setFilteredExpertDetails(result)
   
  }, [search,expertDetails])

  async function block(id){
    const token = localStorage.getItem('adminToken');
    const data = await blockExpert(token, id);
    if (data.blocked) {
      setExpertDetails(data.expertDetails);
      setFilteredExpertDetails(data.expertDetails)
      
    }
  }

  async function unblock(id){
    const token = localStorage.getItem('adminToken');
    const data = await unblockExpert(token, id);
    if (data.unblocked) {
      setExpertDetails(data.expertDetails);
      setFilteredExpertDetails(data.expertDetails)
      
    }
  }

  const columns = [
    {
      name: 'Name',
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: 'Email',
      sortable: true,
      selector: (row) => row.email,
    },
    {
      name: 'Mobile',
      selector: (row) => row.mobile,
    },
    {
      name: 'Verified',
      selector: (row) => {
        return (
          <div>
            {' '}
            {row.verified ? (
              <img className="w-7" alt="verified" src={verified} />
            ) : (
              <img className="w-7" alt="not verified" src={notverified} />
            )}
          </div>
        );
      },
    },
    {
      name: 'Action',
      selector: (row) => {
        return (
          <div>
            {row.blocked ? (
              <button onClick={() => unblock(row._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Unblock
              </button>
            ) : (
              <button onClick={() => block(row._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full">
                Block
              </button>
            )}
          </div>
        );
      },
    },
    {
      name: 'More Details',
      selector: (row) => {
        return (
          <div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Details
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="container mx-auto mt-9">
        <DataTable
         title="All Experts" 
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

export default AdminExpertInfoPage;
