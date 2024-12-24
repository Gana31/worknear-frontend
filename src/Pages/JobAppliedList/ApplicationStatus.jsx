import { FaCheckCircle } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";


export function ApplicationTable({ applications, onStatusChange }) {
  return (
    <div className="hidden md:block overflow-hidden bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applicant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Experience
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((application) => (
            <tr key={application.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img 
                    className="h-10 w-10 rounded-full object-cover"
                    src={application.profileImage}
                    alt={application.name}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{application.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{application.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{application.experience}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
                  {application.status !== 'accept' && (
                    <button
                      onClick={() => onStatusChange(application.id, 'accept',application.email)}
                      className="text-green-600 hover:text-green-900 flex items-center gap-1"
                    >
                      <FaCheckCircle className="w-4 h-4" />
                      Accept
                    </button>
                  )}
                  {application.status !== 'reject' && (
                    <button
                      onClick={() => onStatusChange(application.id, 'reject',application.email)}
                      className="text-red-600 hover:text-red-900 flex items-center gap-1"
                    >
                      <FiXCircle className="w-4 h-4" />
                      Reject
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}