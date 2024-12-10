import React from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaDollarSign } from 'react-icons/fa';

const JobCard = ({ job }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
        <p className="text-gray-600 mb-4">{job.company}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            {job.location}
          </span>
          <span className="flex items-center">
            <FaClock className="mr-2" />
            {job.type}
          </span>
          <span className="flex items-center">
            <FaDollarSign className="mr-2" />
            {job.salary}
          </span>
        </div>
      </div>
      <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-lg object-cover" />
    </div>
  </div>
);

const FeaturedJobs = () => {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      location: "New York, NY",
      type: "Full-time",
      salary: "$120k - $150k",
      logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $120k",
      logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      title: "DevOps Engineer",
      company: "Cloud Systems",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130k - $160k",
      logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
          <p className="text-gray-600">Discover your next career opportunity</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out shadow-lg">
            View All Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;