import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { getVideoApprovalList } from '../../Axios/Services/AdminServices';

function AdminVideoApprovalListPage() {
  const [approvalDetails, setApprovalDetails] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredVideoDetails, setFilteredVideoDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    fetchApprovalList();

    async function fetchApprovalList() {
      const response = await getVideoApprovalList(token);
      setApprovalDetails(response.videoDetails);
    }
  }, []);

  useEffect(() => {
    const result = approvalDetails.filter((video) => {
      return video.title.toLowerCase().match(search.toLowerCase());
    });
    setFilteredVideoDetails(result);
  }, [search, approvalDetails]);

  const columns = [
    {
      name: 'Title',
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: 'Video Type',
      sortable: true,
      selector: (row) => row.type,
    },

    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'Expert Name',
      sortable: true,
      selector: (row) => row.experts.name,
    },
    {
      name: 'Expert Type',
      sortable: true,
      selector: (row) => row.experts.expertisedIn,
    },
    {
      name: 'Video Category',
      sortable: true,
      selector: (row) => row.category,
    },

    {
      name: 'More Details',
      selector: (row) => {
        return (
          <div>
            <button
              onClick={() => navigate(`/videoDetailedView/${row._id}`)}
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
    <div className="container mx-auto mt-9">
      <DataTable
        title="Video Approval List"
        columns={columns}
        data={filteredVideoDetails}
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
  );
}

export default AdminVideoApprovalListPage;
