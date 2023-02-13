import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import {
  getUserDetails,
  blockUser,
  unblockUser,
} from '../../Axios/Services/AdminServices';
function AdminUserInfoPage() {
  const [userDetails, setUserDetails] = useState([]);
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);
  const [search, setSearch] = useState('');

  const blockAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to block this account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('adminToken');
        const data = await blockUser(token, id);
        if (data.blocked) {
          setUserDetails(data.userDetails);
          setFilteredUserDetails(data.userDetails);
        }
        Swal.fire('Blocked!', 'This account has been blocked.', 'success');
      }
    });
  };

  const unblockAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to unblock this account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, unblock it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('adminToken');
        const data = await unblockUser(token, id);
        if (data.unblocked) {
          setUserDetails(data.userDetails);
          setFilteredUserDetails(data.userDetails);
        }
        Swal.fire('Unblocked!', 'This account has been unblocked.', 'success');
      }
    });
  };

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
    const result = userDetails.filter((user) => {
      return user.email.toLowerCase().match(search.toLowerCase());
    });
    setFilteredUserDetails(result);
  }, [search, userDetails]);

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
      name: 'Action',
      selector: (row) => {
        return (
          <div>
            {row.blocked ? (
              <div>
                <button
                  onClick={() => unblockAlert(row._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Unblock
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => blockAlert(row._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full"
                >
                  Block
                </button>
              </div>
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

export default AdminUserInfoPage;
