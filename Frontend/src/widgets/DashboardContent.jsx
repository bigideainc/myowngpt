import { Delete, Visibility } from '@mui/icons-material';
import { Paper, Button as MuiButton, IconButton } from '@mui/material';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../auth/AuthContext';
import { deleteFineTuningJob } from '../auth/config/firebase-config';
import JobDetails from './JobDetails';
import logo from '../../public/static/img/logoMain.png'; 

function DashboardContent({
  filteredJobs,
  searchTerm,
  setSearchTerm,
  handleDateFilterChange,
  dateFilter,
  currentJobs,
  getStatusColor,
  currentPage,
  jobsPerPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
  changePage,
  fetchJobs, // You may have this passed as a prop from a parent component
  setActiveScreen // Add this prop
}) {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth(); // Get the current user from context

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(
      collection(db, 'fine_tuning_jobs'),
      (snapshot) => {
        if (currentUser) {
          try {
            setLoading(true);
            const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const sortedJobs = jobs.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
            setActiveScreen(sortedJobs);
          } catch (error) {
            console.error('Error fetching jobs:', error);
          } finally {
            setLoading(false);
          }
        } else {
          console.log("No user is currently signed in.");
          setLoading(false);
        }
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [currentUser, setActiveScreen]);

  const toggleRow = index => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const getRowStyle = index => ({
    backgroundColor: expandedRow === index ? '#ccffcc' : 'white',
    borderBottom: '1px solid #e0e0e0',
    fontFamily: 'Poppins',
    fontSize: '14px'
  });

  const handleSelectJob = (jobId) => {
    setSelectedJobs(prevSelected => {
      if (prevSelected.includes(jobId)) {
        return prevSelected.filter(id => id !== jobId);
      } else {
        return [...prevSelected, jobId];
      }
    });
  };

  const handleDeleteJob = async (jobIds) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete the selected models?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await Promise.all(jobIds.map(id => deleteFineTuningJob(id)));
        Swal.fire('Deleted!', 'Your jobs have been deleted.', 'success');
        setSelectedJobs([]);
        fetchJobs(); // Refresh the jobs after deletion
      } catch (error) {
        console.error('Error deleting jobs:', error);
        Swal.fire('Error!', 'There was an error deleting your jobs.', 'error');
      }
    }
  };

  const handleDeleteSelectedJobs = () => {
    handleDeleteJob(selectedJobs);
  };

  const handleSelectAllJobs = () => {
    if (selectedJobs.length === currentJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(currentJobs.map(job => job.id));
    }
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredByStatusJobs = currentJobs.filter(job => {
    if (statusFilter === 'All') {
      return true;
    }
    return job.status === statusFilter;
  });

  const sortedJobs = filteredByStatusJobs.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  return (
    <div className="flex flex-col ml-64 bg-slate-100 p-6 mt-16" style={{ fontFamily: 'Poppins', fontSize: '12px' }}>
      <Paper sx={{ padding: 2, mb: 4 }}>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">MANAGE YOUR TRAINING JOBS</h1>
          <MuiButton
            variant="contained"
            color="success"
            onClick={() => navigate('/jobs')}
          >
            Create New Job
          </MuiButton>
        </div>
      </Paper>
      <h1 className="text-xl mb-4 font-bold">Training Runs</h1>
      <Paper elevation={2} sx={{ padding: 2, mb: 4 }}>
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div className="flex items-center">
            <div className="relative inline-flex">
              <svg
                className="w-3 h-3 text-gray-500 me-3 absolute left-3 top-1/2 transform -translate-y-1/2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              <select onChange={handleDateFilterChange} value={dateFilter} className="pl-10 pr-3 py-1.5 rounded border border-gray-300 bg-white text-gray-500 focus:ring-4 focus:ring-gray-100 focus:outline-none">
                <option value="All">All time</option>
                <option value="Last day">Last day</option>
                <option value="Last 7 days">Last 7 days</option>
                <option value="Last 30 days">Last 30 days</option>
                <option value="Last year">Last year</option>
              </select>
            </div>
            <div className="ml-4">
              <label htmlFor="status-filter" className="mr-2 text-gray-700">Status:</label>
              <select
                id="status-filter"
                onChange={handleStatusFilterChange}
                value={statusFilter}
                className="pl-3 pr-3 py-1.5 rounded border border-gray-300 bg-white text-gray-500 focus:ring-4 focus:ring-gray-100 focus:outline-none"
              >
                <option value="All">All</option>
                <option value="pending">Pending</option>
                <option value="running">Running</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-green-500 focus:border-green-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        {selectedJobs.length > 0 && (
          <MuiButton
            variant="contained"
            color="error"
            onClick={handleDeleteSelectedJobs}
            disabled={selectedJobs.length === 0}
            sx={{ mb: 2 }}
          >
            Delete Selected
          </MuiButton>
        )}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50" style={{ backgroundColor: 'black', color: 'white' }}>
            <tr>
              <th className="p-4">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  checked={selectedJobs.length === currentJobs.length}
                  onChange={handleSelectAllJobs}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 "
                />
              </th>
              <th className="px-6 py-3">Model Id</th>
              <th className="px-6 py-3">Job Type</th>
              <th className="px-6 py-3">Last Updated</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: sortedJobs.length > 0 ? 'white' : 'gray', textAlign: 'center' }}>
            {sortedJobs.length > 0 ? (
              sortedJobs.map((job, index) => (
                <React.Fragment key={index}>
                  <tr onClick={() => toggleRow(index)} style={getRowStyle(index)} className="bg-white border-b hover:bg-gray-50">
                    <td className="w-4 p-4">
                      <input
                        id={`checkbox-table-search-${index}`}
                        type="checkbox"
                        checked={selectedJobs.includes(job.id)}
                        onChange={() => handleSelectJob(job.id)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                      />
                    </td>
                    <td className="px-6 py-4">{job.baseModel}</td>
                    <td className="px-6 py-4">{job.fineTuningType}</td>
                    <td className="px-6 py-4">{moment.unix(job.createdAt.seconds).fromNow()}</td>
                    <td className={`px-6 py-4 font-medium ${getStatusColor(job.status)}`}>{job.status}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <IconButton aria-label="view" color="primary">
                          <Visibility />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteJob([job.id]);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr className="bg-green-100">
                      <td colSpan="6" className="p-4">
                        <JobDetails job={job} setActiveScreen={setActiveScreen} /> {/* Pass setActiveScreen here */}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
              <td colSpan="6" className="p-4">
                <div className="flex flex-col items-center justify-center text-white" style={{ height: '300px' }}>
                  <img src={logo} alt="Logo" className="w-32 h-32 mb-4" />
                  <MuiButton
                    variant="contained"
                    color="success"
                    onClick={() => navigate('/jobs')}
                  >
                    Create New Job
                  </MuiButton>
                </div>
              </td>
            </tr>
            )}
          </tbody>
        </table>
        {sortedJobs.length > 0 && (
          <div className="flex justify-between mt-4">
            <MuiButton
              variant="contained"
              color="primary"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </MuiButton>
            <span>Page {currentPage} of {totalPages}</span>
            <MuiButton
              variant="contained"
              color="primary"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </MuiButton>
          </div>
        )}
      </Paper>
    </div>
  );
}

export default DashboardContent;
