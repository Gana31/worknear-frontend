import React from 'react';
import { FaEdit, FaTrash, FaMapMarkerAlt, FaDollarSign, FaClock } from 'react-icons/fa';
import SkillBadge from '../../../Component/Common/SkillBadge';


const PreviousJobCard= ({ job, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
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
                  onClick={() => onEdit(job)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Edit job"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => onDelete(job.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete job"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
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
                <span>{job.type}</span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600">{job.description}</p>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>

            {/* Posted Date */}
            <div className="mt-4 text-sm text-gray-500">
              Posted on: {new Date(job.postedDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousJobCard;