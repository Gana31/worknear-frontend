import React from 'react';

export const ApplyButton = ({ jobId }) => {
  const handleApply = () => {
    console.log(`Applying for job ${jobId}`);
  };

  return (
    <button
      onClick={handleApply}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
    >
      Apply Now
    </button>
  );
};