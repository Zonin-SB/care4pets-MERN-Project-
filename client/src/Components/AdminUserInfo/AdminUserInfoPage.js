import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  getUserDetails,
  blockUser,
  unblockUser,
} from '../../Axios/Services/AdminServices';
function AdminUserInfoPage() {
  const [userDetails, setUserDetails] = useState([]);
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    getAllUsers();

    async function getAllUsers() {
      const response = await getUserDetails(token);
    
      setUserDetails(response.userDetails);
    
      setFilteredUserDetails(response.userDetails);
    }
  }, []);

  useEffect(() => {
    const result = userDetails.filter(user=>{
      return user.email.toLowerCase().match(search.toLowerCase())
    })
    setFilteredUserDetails(result)
   
  }, [search,userDetails])
  

  async function block(id) {
    const token = localStorage.getItem('adminToken');
    const data = await blockUser(token, id);
    if (data.blocked) {
      setUserDetails(data.userDetails);
      setFilteredUserDetails(data.userDetails)
      
    }
  }

  async function unblock(id) {
    const token = localStorage.getItem('adminToken');
    const data = await unblockUser(token, id);
    if (data.unblocked) {
      setUserDetails(data.userDetails);
      setFilteredUserDetails(data.userDetails)
    }
  }

  const columns = [
    {
      name: 'Name',
      sortable:true,
      selector: (row) => row.name,
    },
    {
      name: 'Email',
      sortable:true,
      selector: (row) => row.email,
    },
    {
      name: 'Mobile',
      selector: (row) => row.mobile,
    },
    {
      name: 'Action',
      selector: (row) => {
        return (
          <div>
            {row.blocked ? (
              
                <button
                
                  onClick={() => unblock(row._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Unblock
                </button>

            ) : (
              <button
                onClick={() => block(row._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full"
              >
                Block
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="container mx-auto mt-9">

    

        <DataTable
          title="All Users"
          columns={columns}
          data={filteredUserDetails}
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

export default AdminUserInfoPage;
