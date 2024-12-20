import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../Component/Common/Searchbar";

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = ({ keywords, location }) => {
    const queryParams = new URLSearchParams();
    if (keywords) queryParams.append("keywords", keywords);
    if (location) queryParams.append("location", location);

    navigate(`/job?${queryParams.toString()}`); // Redirect to JobMain with filters
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl text-gray-100 mb-8">
            Over 1 million+ jobs available. Find the one that suits you.
          </p>
          <div className="bg-transparent backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-3xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
