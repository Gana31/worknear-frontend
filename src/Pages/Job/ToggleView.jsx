import React from 'react';

export const ViewToggle = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex items-center gap-4 p-4">
      <button
        onClick={() => onViewChange('normal')}
        className={`px-4 py-2 rounded-lg transition-all ${
          viewMode === 'normal'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Normal View
      </button>
      <button
        onClick={() => onViewChange('instagram')}
        className={`px-4 py-2 rounded-lg transition-all ${
          viewMode === 'instagram'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Posts View
      </button>
    </div>
  );
};