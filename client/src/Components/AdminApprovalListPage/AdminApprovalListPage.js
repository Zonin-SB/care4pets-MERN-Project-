import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { getPendingApprovalDetails } from '../../Axios/Services/AdminServices';

function AdminApprovalListPage() {
  const [approvalDetails, setApprovalDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    fetchApprovalList();

    async function fetchApprovalList() {
      const response = await getPendingApprovalDetails(token);

      setApprovalDetails(response.approvalDetails);
    }
  }, []);

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
      name: 'Experience',
      selector: (row) => row.experience,
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
    },
    {
      name: 'More Details',
      selector: (row) => {
        return (
          <div>
            <button
              onClick={() => navigate(`/expertDetailedView/${row._id}`)}
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
    <div className="container mt-9 max-w-screen-2xl mx-auto">
      <DataTable
        title="Pending Requests"
        columns={columns}
        data={approvalDetails}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
      />
    </div>
  );
}

export default AdminApprovalListPage;
