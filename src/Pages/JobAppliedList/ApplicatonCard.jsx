import { FaCheckCircle } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";


export function ApplicationCards({ applications, onStatusChange }) {
  return (
    <div className="md:hidden space-y-4">
      {applications.map((application) => (
        <div key={application.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-4 mb-3">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={application.profileImage}
              alt={application.name}
            />
            <div>
              <h3 className="text-sm font-medium text-gray-900">{application.name}</h3>
              <p className="text-sm text-gray-500">{application.role}</p>
            </div>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Experience:</span> {application.experience}
            </p>
          </div>
          <div className="flex gap-2">
            {application.status !== 'accept' && (
              <button
                onClick={() => onStatusChange(application.id, 'accept')}
                className="flex-1 bg-green-50 text-green-600 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-1"
              >
                <FaCheckCircle className="w-4 h-4" />
                Accept
              </button>
            )}
            {application.status !== 'reject' && (
              <button
                onClick={() => onStatusChange(application.id, 'reject')}
                className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-1"
              >
                <FiXCircle className="w-4 h-4" />
                Reject
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}