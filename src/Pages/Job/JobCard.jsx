import React from 'react';
import { CompanyLogo } from './Companylogo';
import { ApplyButton } from './ApplyButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

 const JobCard = ({ job, viewMode }) => {
  const {user} = useSelector((state)=> state.auth)
 const navigate = useNavigate()

  const handlerDetails = () =>{
    navigate("/post-detail",{ state: { job } })
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will format it to "MM/DD/YYYY"
  };

  // Function to remove HTML tags and limit description to 50 characters
  const formatDescription = (description) => {
    // Remove HTML tags using regex
    const cleanedDescription = description.replace(/<[^>]*>/g, '');
    // Limit the description to 50 characters
    return cleanedDescription.length > 50 ? cleanedDescription.slice(0, 50) + '...' : cleanedDescription;
  };



  if (viewMode === 'instagram') {
    return (
    <div className=' flex flex-col justify-center items-center  '>
        <div className="bg-white rounded-lg shadow-md w-[100%] md:w-[70%] overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3 mb-3">
            <CompanyLogo company={job.companyimgae} size="large" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{job.name}</h3>
              <p className="text-gray-600">{job.city}</p>
            </div>
          </div>
        </div>
        
        <img
          src={job.image}
          alt={job.title}
          className="w-full h-64 object-contain"
        />
        
        <div className="p-4">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h4>
          <p className="text-gray-700 mb-4">{formatDescription(job.description)}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">{formatDate (job.createdAt)}</span>
          </div>
          <ApplyButton jobId={job.id} />
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" onClick={handlerDetails}>
      <div className="flex flex-col md:flex-row items-start gap-4">
        <CompanyLogo company={job.companyimgae} size="medium" />
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h3>
              <p className="text-gray-600 font-medium">{job.name}</p>
            </div>
            <span className="text-blue-600 font-medium text-lg">
              ${job.salary.toLocaleString()}
            </span>
          </div>
          <p className="text-gray-700 my-4">{formatDescription(job.description)}</p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-3 mt-4">
            <div className="flex items-start md:items-center gap-4">
              <span className="text-gray-500">{job.city}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">{formatDate (job.createdAt)}</span>
            </div>
            <ApplyButton jobId={job.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard