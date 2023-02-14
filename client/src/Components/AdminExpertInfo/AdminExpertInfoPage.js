import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import {
  getExpertDetails,
  blockExpert,
  unblockExpert,
  getExpertChangeRequestCount,
} from '../../Axios/Services/AdminServices';
import verified from '../../images/verified.png';
import notverified from '../../images/notverified.png';
import { Link, useNavigate } from 'react-router-dom';

function AdminExpertInfoPage() {
  const navigate = useNavigate();
  const [expertDetails, setExpertDetails] = useState([]);
  const [filteredExpertDetails, setFilteredExpertDetails] = useState([]);
  const [search, setSearch] = useState('');
  const [changeCount, setChangeCount] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    getAllExperts();
    getExpertChangeRequest();

    async function getAllExperts() {
      const response = await getExpertDetails(token);

      setExpertDetails(response.expertDetails);

      setFilteredExpertDetails(response.expertDetails);
    }
    async function getExpertChangeRequest() {
      const token = localStorage.getItem('adminToken');
      const data = await getExpertChangeRequestCount(token);
      setChangeCount(data.count);
    }
  }, []);

  useEffect(() => {
    const result = expertDetails.filter((expert) => {
      return expert.email.toLowerCase().match(search.toLowerCase());
    });
    setFilteredExpertDetails(result);
  }, [search, expertDetails]);

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
        // async function block(id) {
        const token = localStorage.getItem('adminToken');
        const data = await blockExpert(token, id);
        if (data.blocked) {
          setExpertDetails(data.expertDetails);
          setFilteredExpertDetails(data.expertDetails);
          // }
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
        // async function unblock(id) {
        const token = localStorage.getItem('adminToken');
        const data = await unblockExpert(token, id);
        if (data.unblocked) {
          setExpertDetails(data.expertDetails);
          setFilteredExpertDetails(data.expertDetails);
        }
        // }
        Swal.fire('Unblocked!', 'This account has been unblocked.', 'success');
      }
    });
  };

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
              <button
                onClick={() => unblockAlert(row._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Unblock
              </button>
            ) : (
              <button
                onClick={() => blockAlert(row._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full"
              >
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
            <button
              onClick={() => navigate(`/adminExpertDetailedView/${row._id}`)}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Details
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <div className="flex justify-between p-4  mt-9 flex-wrap">
        <h1 className="text-2xl font-bold">All Experts</h1>
        <Link to={'/adminExpertChangeList'}>
          <button
            type="button"
            className="mt-2 relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Expert Change Requests
            <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
              {changeCount ? changeCount : 0}
            </span>
          </button>
        </Link>
      </div>
      <div className="container mx-auto mt-9">
        <DataTable
          // title="All Experts"
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

export default AdminExpertInfoPage;
