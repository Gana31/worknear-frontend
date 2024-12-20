import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const SearchBar = ({ onSearch, initialKeywords = "", initialLocation = "" }) => {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [location, setLocation] = useState(initialLocation);

  const handleSearch = () => {
    onSearch({ keywords, location });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center border rounded-md p-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Job title or keyword"
            className="w-full bg-transparent outline-none"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <div className="flex items-center border rounded-md p-2">
          <FaMapMarkerAlt className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Location"
            className="w-full bg-transparent outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out shadow-lg"
          onClick={handleSearch}
        >
          Search Jobs
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
