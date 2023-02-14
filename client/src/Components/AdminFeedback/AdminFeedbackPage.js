import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  approveFeedback,
  deleteFeedback,
  disapproveFeedback,
  getFeedback,
} from '../../Axios/Services/AdminServices';
import verified from '../../images/verified.png';
import notverified from '../../images/notverified.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchFeedback();

    async function fetchFeedback() {
      const token = localStorage.getItem('adminToken');
      const data = await getFeedback(token);
      setFeedback(data.feedback);
    }
  }, []);

  const approveAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to approve this feedback!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('adminToken');
        const data = await approveFeedback(token, id);
        if (data.approved) {
          setFeedback(data.feedback);
        }
        Swal.fire('Approved!', 'This feedback has been approved.', 'success');
      }
    });
  };

  const disapproveAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to disapprove this feedback!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, disapprove it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('adminToken');
        const data = await disapproveFeedback(token, id);
        if (data.disapproved) {
          setFeedback(data.feedback);
        }
        Swal.fire(
          'Disapproved!',
          'This feedback has been disapproved.',
          'success'
        );
      }
    });
  };

  const deleteFedAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this feedback!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('adminToken');
        const data = await deleteFeedback(token, id);
        setFeedback(data.feedback);
        Swal.fire('Deleted!', 'This feedback has been deleted.', 'success');
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
      name: 'Feedback',
      selector: (row) => row.feedback,
    },

    {
      name: 'Message',
      selector: (row) => row.message,
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
      name: 'Action',
      selector: (row) => {
        return (
          <div>
            {row.approved ? (
              <button
                onClick={() => disapproveAlert(row._id)}
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                disapprove
              </button>
            ) : (
              <button
                onClick={() => approveAlert(row._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
              >
                Approve
              </button>
            )}
          </div>
        );
      },
    },
    {
      name: 'Delete',
      selector: (row) => {
        return (
          <div>
            <button onClick={() => deleteFedAlert(row._id)}>🗑️</button>
          </div>
        );
      },
    },
    {
      name: 'Expand',
      selector: (row) => {
        return (
          <div>
            <button
              onClick={() => navigate(`/adminFeedbackExpand/${row._id}`)}
              type="button"
              class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mt-9 max-w-screen-2xl mx-auto">
      <DataTable
        title="All Videos"
        columns={columns}
        data={feedback}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        subHeader
      />
    </div>
  );
}

export default AdminFeedbackPage;
