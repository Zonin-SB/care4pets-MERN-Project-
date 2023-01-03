import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { getAllPlan, deletePlan } from '../../Axios/Services/AdminServices';

function ViewPlansPage() {
  const [plan, setPlan] = useState();
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    fetchData();

    async function fetchData() {
      const response = await getAllPlan(token);
      setPlan(response.planDetails);
    }
  }, []);

  async function deleteplan(id) {
    const token = localStorage.getItem('adminToken');
    const response = await deletePlan(token, id);
    setPlan(response.planDetails)
  }

  const columns = [
    {
      name: 'Plan Name',
      selector: (row) => row.planName,
    },
    {
      name: 'Validity',
      selector: (row) => row.validity,
    },
    {
      name: 'Price',
      selector: (row) => row.currentPrice,
    },
    {
      name: 'Checkup/month',
      selector: (row) => row.numberOfCheckup,
    },
    {
      name: 'Edit',
      selector: (row) => {
        return (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Edit
          </button>
        );
      },
    },
    {
      name: 'Delete',
      selector: (row) => {
        return (
          <div>
            <button onClick={() => deleteplan(row._id)}>🗑️</button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="container mx-auto mt-9">
        <Link to="/adminAddPlans">
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
            Add Plan
          </button>
        </Link>
        <div className="container mx-auto mt-9">
          <DataTable
            title="All Plans"
            columns={columns}
            data={plan}
            fixedHeader
            fixedHeaderScrollHeight="400px"
            highlightOnHover
            pagination
          />
        </div>
      </div>
    </div>
  );
}

export default ViewPlansPage;
