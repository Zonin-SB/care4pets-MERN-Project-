import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  getUserDetails,
  blockUser,
  unblockUser,
} from '../../Axios/Services/AdminServices';
function AdminUserInfoPage() {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    getAllUsers();

    async function getAllUsers() {
      const response = await getUserDetails(token);

      setUserDetails(response.userDetails);
    }
  }, []);

  async function block(id) {
    const token = localStorage.getItem('adminToken');
    const data = await blockUser(token, id);
    if (data.blocked) {
      setUserDetails(data.userDetails);
    }
  }

  async function unblock(id) {
    const token = localStorage.getItem('adminToken');
    const data = await unblockUser(token, id);
    if (data.unblocked) {
      setUserDetails(data.userDetails);
    }
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Email',
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
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
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
          data={userDetails}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          selectableRows
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default AdminUserInfoPage;
