import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { getAllVideos } from '../../Axios/Services/AdminServices';

function AdminManageVideosPage() {
    const navigate=useNavigate();
    const [videos,setVideos]=useState([])
    const [search,setSearch]=useState('')
    const [filteredVideoDetails, setFilteredVideoDetails] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        fetchVideos();
    
        async function fetchVideos() {
          const response = await getAllVideos(token);
          setVideos(response.videoDetails);
        }
      }, []);

      useEffect(() => {
        const result = videos.filter(video=>{
          return video.title.toLowerCase().match(search.toLowerCase())
        })
        setFilteredVideoDetails(result)
       
      }, [search,videos])



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
    <div  className="container mx-auto mt-9">
 <DataTable
        title="All Videos"
        columns={columns}
        data={filteredVideoDetails}
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
  )
}

export default AdminManageVideosPage