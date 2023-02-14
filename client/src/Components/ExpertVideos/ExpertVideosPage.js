import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getAllVideos,
  deleteVideo,
  getRejectedVideoCount,
  getDetails,
} from '../../Axios/Services/ExpertServices';
import verified from '../../images/verified.png';
import notverified from '../../images/notverified.png';
import Swal from 'sweetalert2';

function ExpertVideosPage() {
  const [videos, setVideos] = useState([]);

  const navigate = useNavigate();
  const expertId = useSelector((state) => state.admin.expertDetails.expertId);
  const [filteredVideoDetails, setFilteredVideoDetails] = useState([]);
  const [search, setSearch] = useState('');
  const [count, setCount] = useState('');
  const [details, setDetails] = useState(false);

  useEffect(() => {
    fetchVideos();
    fetchRejectedCount();
    fetchDetails();

    async function fetchVideos() {
      const token = localStorage.getItem('expertToken');
      const data = await getAllVideos(token, expertId);
      setVideos(data.videoDetails);
    }

    async function fetchRejectedCount() {
      const token = localStorage.getItem('expertToken');
      const data = await getRejectedVideoCount(token, expertId);
      setCount(data.videoCount);
    }

    async function fetchDetails() {
      const token = localStorage.getItem('expertToken');
      const data = await getDetails(token, expertId);
      setDetails(data.data[0].verified);
    }
  }, [expertId]);

  const editVideoAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to edit this video!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/expertEditVideo/${id}`);
      }
    });
  };

  const deleteVidAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this video!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let values = {};
        values.videoId = id;
        values.expertId = expertId;
        const token = localStorage.getItem('expertToken');
        const response = await deleteVideo(token, values);
        setVideos(response.videoDetails);
        Swal.fire('Deleted!', 'This video has been deleted.', 'success');
      }
    });
  };

  useEffect(() => {
    const result = videos.filter((details) => {
      return details.title.toLowerCase().match(search.toLowerCase());
    });
    setFilteredVideoDetails(result);
  }, [search, videos]);
  const columns = [
    {
      name: 'Video Title',
      selector: (row) => row.title,
    },
    {
      name: 'Video Type',
      selector: (row) => row.type,
    },
    {
      name: 'Approved',
      selector: (row) => {
        return (
          <div>
            {' '}
            {row.approved ? (
              <img className="w-7" alt="verified" src={verified} />
            ) : (
              <img className="w-7" alt="not verified" src={notverified} />
            )}
          </div>
        );
      },
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'Edit',
      selector: (row) => {
        return (
          <div>
            <button
              onClick={() => editVideoAlert(row._id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Edit
            </button>
          </div>
        );
      },
    },
    {
      name: 'Delete',
      selector: (row) => {
        return (
          <div>
            <button onClick={() => deleteVidAlert(row._id)}>🗑️</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className='max-w-screen-2xl mx-auto'>
      {details ? (
        <div className="container mx-auto mt-9">
          <div className="flex justify-between p-4">
            <Link to="/expertAddVideos">
              <button
                type="button"
                className="px-6
            py-2.5
bg-blue-600
text-white
font-medium
text-xs
leading-tight
uppercase
rounded
shadow-md
hover:bg-blue-700 hover:shadow-lg
focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-blue-800 active:shadow-lg
transition
duration-150
ease-in-out"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Video
              </button>
            </Link>

            <Link to={'/expertRejectedVideos'}>
              <button
                type="button"
                className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                  {count ? count : 0}
                </div>
              </button>
            </Link>
          </div>

          <div className="container mx-auto mt-9">
            <DataTable
              title="All Videos"
              columns={columns}
              data={filteredVideoDetails}
              fixedHeader
              fixedHeaderScrollHeight="400px"
              highlightOnHover
              pagination
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
      ) : (
        <div>
          <h1 className="font-bold text-2xl text-center mt-16">
            Get verified for uploading videos
          </h1>
        </div>
      )}
    </div>
  );
}

export default ExpertVideosPage;
