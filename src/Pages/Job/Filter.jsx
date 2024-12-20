import React from "react";

export const Filters = ({
  locations,
  categories,
  selectedLocations,
  selectedCategory,
  onLocationChange,
  onCategoryChange,
  onDateChange,
}) => {
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    onLocationChange(selectedLocation);  // Update the selected location
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    onCategoryChange(selectedCategory);  // Update the selected category
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-md">
      {/* Location Dropdown */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Locations</h3>
        <select
          value={selectedLocations}
          onChange={handleLocationChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Category Dropdown */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All Categories</option> {/* Option to show all categories */}
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Date Dropdown */}
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
