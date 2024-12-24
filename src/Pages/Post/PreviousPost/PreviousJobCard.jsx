import React from 'react';
import { FaEdit, FaTrash, FaMapMarkerAlt, FaDollarSign, FaClock } from 'react-icons/fa';
import SkillBadge from '../../../Component/Common/SkillBadge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const PreviousJobCard = ({ job, onEdit, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Function to format the date (only date, no time)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will format it to "MM/DD/YYYY"
  };

  // Function to remove HTML tags and limit description to 50 characters
  const formatDescription = (description) => {
    const cleanedDescription = description.replace(/<[^>]*>/g, '');
    return cleanedDescription.length > 50 ? cleanedDescription.slice(0, 50) + '...' : cleanedDescription;
  };

  // Handler for card click (Navigates to the "applied-user" page)
  const handleCardClick = async () => {
    const jobId = job.id;
    navigate("/applied-user", { state: { jobid: jobId ,job:job} });
   
   
  };

  // Handler for edit button click (Prevents card click event)
  const handleEditClick = (e, job) => {
    e.stopPropagation(); // Prevent the card click event from being triggered
    onEdit(job); // Call the edit function
  };

  // Handler for delete button click (Prevents card click event)
  const handleDeleteClick = (e, id) => {
    e.stopPropagation(); // Prevent the card click event from being triggered
    onDelete(id); // Call the delete function
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      onClick={handleCardClick} // Navigate to applied-user page
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <img
              src={user.avatar}
              alt={`${user.avatar} logo`}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
                <div className="text-lg text-gray-700 mb-2">{job.company}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={(e) => handleEditClick(e, job)} // Stop event propagation for edit
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Edit job"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={(e) => handleDeleteClick(e, job.id)} // Stop event propagation for delete
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete job"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaDollarSign className="mr-2 text-gray-400" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2 text-gray-400" />
                <span>{job.jobType}</span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600">{formatDescription(job.description)}</p>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>

            {/* Posted Date */}
            <div className="mt-4 text-sm text-gray-500">
              Posted on: {formatDate(job.updatedAt || job.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousJobCard;
