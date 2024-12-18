import React from "react";
import { FaCity } from "react-icons/fa";
import { useSelector } from "react-redux";

const VisualJobCard = ({ job, onEdit, onDelete }) => {
    const {user} = useSelector((state) => state.auth)
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

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6 flex flex-col gap-4">

        {/* Top Section: Company Image and Company Name */}
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || "https://via.placeholder.com/50"} // Placeholder for company image
            alt={`${user.avatar} logo`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-gray-900">{user.name}</span>
        </div>

        {/* Middle Section: Full-size Job Image */}
        <div className="mt-4">
          <img
            src={job.image || "https://via.placeholder.com/600x400"} // Placeholder for job image
            alt={`${job.title} image`}
            className="w-full  h-[50vh] rounded-lg object-contain"
          />
        </div>

        {/* Bottom Section: Description and Location */}
        <div className="mt-4">
          {/* Location */}
          <div className="flex items-center text-gray-600">
            <FaCity className="mr-2 text-gray-400" />
            City : <span>{job.city}</span>
          </div>

          {/* Description */}
          <div className="mt-4 text-lg text-gray-700"> Description : {formatDescription(job.description)}</div>
          <div className="mt-4 text-sm text-gray-500">
              Posted on: {formatDate(job.updatedAt || job.createdAt)}
            </div>
        </div>

        {/* Action Buttons (Edit and Delete) */}
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onEdit(job)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit job"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete job"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualJobCard;
