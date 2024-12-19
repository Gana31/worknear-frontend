import React from 'react';

export const Filters = ({
  locations,
  selectedLocations,
  onLocationChange,
  onSalaryChange,
  onDateChange,
}) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-md">
      <div>
        <h3 className="text-lg font-semibold mb-3">Locations</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <label key={location} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedLocations.includes(location)}
                onChange={() => onLocationChange(location)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{location}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Salary Range</h3>
        <select
          onChange={(e) => onSalaryChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All Salaries</option>
          <option value="0-50000">$0 - $50,000</option>
          <option value="50000-100000">$50,000 - $100,000</option>
          <option value="100000+">$100,000+</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Posted Date</h3>
        <select
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
    </div>
  );
};