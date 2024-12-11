import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const Hero = () => {
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
          
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center border rounded-md p-2">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full bg-transparent outline-none"
                />
              </div>
              <div className="flex items-center border rounded-md p-2">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent outline-none"
                />
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out shadow-lg">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;