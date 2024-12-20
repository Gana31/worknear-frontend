import React from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaUsers, FaMoneyBillWave, FaBuilding } from 'react-icons/fa';
import { FcSelfServiceKiosk } from 'react-icons/fc';

const JobDetails = ({job}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Company Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row  items-start gap-6">
          <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
            <img src={job.companyimgae} className=" object-fill" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-lg text-gray-700 mt-1">{job.name}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="inline-flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2" />
                {job.location}
              </span>
              <span className="inline-flex items-center text-gray-600">
                <FaClock className="mr-2" />
                Posted 2 days ago
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-x-3 mt-5 gap-y-4">
              <div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
              </div>
        
            </div>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">About the role</h2>
            <div
              className="text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
        
          </div>
        </div>

        {/* Job Overview Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Job Overview</h2>
            <div className="space-y-4">
            <div className="flex items-center">
                <FcSelfServiceKiosk className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Company Category</p>
                  <p className="font-medium">{job.category}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaBriefcase className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Job Type</p>
                  <p className="font-medium">{job.jobType}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaMoneyBillWave className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Salary Range</p>
                  <p className="font-medium">{job.salary}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaBriefcase className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Job Mode</p>
                  <p className="font-medium">{job.jobMode}</p>
                </div>
              </div>
             
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;