import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { getPaymentDetails } from '../../Axios/Services/AdminServices';

function AdminViewPaymentPage() {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPaymentDetails();

    async function fetchPaymentDetails() {
      const token = localStorage.getItem('adminToken');
      const data = await getPaymentDetails(token);
      setPaymentDetails(data.details);
    }
  }, []);

  const columns = [
    {
      name: 'User',
      sortable: true,
      selector: (row) => row.user.name,
    },
    {
      name: 'Pet',
      sortable: true,
      selector: (row) => row.user.pet,
    },
    {
      name: 'Plan',
      sortable: true,
      selector: (row) => row.plan.planName,
    },
    {
      name: 'Expert',
      sortable: true,
      selector: (row) => row.expert.name,
    },
    {
      name: 'Date',
      sortable: true,
      selector: (row) => row.validFrom,
    },
    {
      name: 'Amount',
      sortable: true,
      selector: (row) => '₹' + row.plan.currentPrice,
    },
    {
      name: 'More Details',
      selector: (row) => {
        return (
          <div>
            <button
              type="button"
              onClick={() => navigate(`/adminViewPaymentDetails/${row._id}`)}
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
    <div className="container mx-auto mt-9">
      <DataTable
        title="All Payments"
        columns={columns}
        data={paymentDetails}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
      />
    </div>
  );
}

export default AdminViewPaymentPage;
