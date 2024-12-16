import { FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';


export function JobCard({ company, position, location, posted, logo, description }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center flex-col md:flex-row md:items-start gap-4">
        <img src={logo} alt={company} className="w-16 h-16 rounded-lg object-cover" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{position}</h3>
          <p className="text-gray-600 font-medium mt-1">{company}</p>
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-gray-400" />
              <span>Full-time</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-gray-400" />
              <span>{posted}</span>
            </div>
          </div>
          
          <p className="mt-4 text-gray-600 line-clamp-2">{description}</p>
          
          <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out shadow-lg">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}