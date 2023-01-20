import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllVideos, deleteVideo } from '../../Axios/Services/ExpertServices';
import verified from '../../images/verified.png';
import notverified from '../../images/notverified.png';

function ExpertVideosPage() {
  const [videos, setVideos] = useState([]);
 
  const navigate = useNavigate();
  const expertId = useSelector((state) => state.admin.expertDetails.expertId);
  const [filteredVideoDetails, setFilteredVideoDetails] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetchVideos();

    async function fetchVideos() {
      const token = localStorage.getItem('expertToken');
      const data = await getAllVideos(token, expertId);
      setVideos(data.videoDetails);
    }
  }, [expertId]);

  let values = {};
  async function deleteVid(id) {
    values.videoId = id;
    values.expertId = expertId;
    const token = localStorage.getItem('expertToken');
    const response = await deleteVideo(token, values);
    setVideos(response.videoDetails);
  }

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
              onClick={() => {
                navigate(`/expertEditVideo/${row._id}`);
              }}
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
            <button onClick={() => deleteVid(row._id)}>🗑️</button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="container mx-auto mt-9">
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
    </div>
  );
}

export default ExpertVideosPage;
