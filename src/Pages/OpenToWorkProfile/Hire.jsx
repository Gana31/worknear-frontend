import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaUserMd } from 'react-icons/fa';
import apiClient from '../../Services/ApiConnector';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Component/Common/Spinner';
import SkillBadge from '../../Component/Common/SkillBadge';
import { useNavigate } from 'react-router-dom';


export default function Hire() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
const navigate = useNavigate();
  // Function to filter profiles based on selected category and location
  const filterProfiles = async () => {
    setLoading(true);
    let filtered = [];

    try {
      const response = await apiClient.get('/getallprofile'); // Replace with your correct API endpoint
      const fetchedProfiles = response.data.data;
      // console.log(fetchedProfiles) 
     if(fetchedProfiles.length > 0){
      setProfiles(fetchedProfiles); // Set profiles data
     }
     setProfiles([]);

      // Extract unique locations
      const uniqueLocations = Array.from(new Set(fetchedProfiles.map((profile) => profile.city)));

      // Extract categories and handle both strings and arrays
      const allCategories = fetchedProfiles.flatMap((profile) => {
        let categories = profile.category;
        
        // If it's a string, split by commas, else assume it's already an array
        if (typeof categories === 'string') {
          categories = categories.split(',').map((cat) => cat.trim());
        }

        return categories;
      });

      const uniqueCategories = Array.from(new Set(allCategories)); // Remove duplicates

      setCategories(uniqueCategories);
      setLocations(uniqueLocations); // Set locations

      filtered = [...fetchedProfiles]; // Start with the full list of profiles
    } catch (error) {
      toast.error('Failed to load profiles');
      console.error(error);
    } finally {
      setLoading(false);
    }

    if (selectedLocation) {
      filtered = filtered.filter(profile => profile.city === selectedLocation);
    }

    if (selectedCategory) {
      filtered = filtered.filter(profile => {
        // Handle category filtering for both string and array categories
        let profileCategories = profile.category;
        
        if (typeof profileCategories === 'string') {
          profileCategories = profileCategories.split(',').map((cat) => cat.trim());
        }

        return profileCategories.includes(selectedCategory);
      });
    }

    setFilteredProfiles(filtered); // Update the filtered profiles
  };

  useEffect(() => {
    filterProfiles(); // Re-filter profiles whenever the selected filters change
  }, [selectedLocation, selectedCategory]);

  const getinfohandler = async(id) =>{
    
    navigate("/cprofile", { state: { jobid: id } });
  }
  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="w-full max-w-screen-xl px-4">
        <div className="flex justify-between mb-6">
          <div className="flex gap-4">
            {/* Location Dropdown */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Location</option>
              {locations.map((location, idx) => (
                <option key={idx} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader"><LoadingSpinner/></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.length === 0 ? (
              <div className="text-center text-gray-500">No profiles found.</div>
            ) : (
              filteredProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-500 transform hover:scale-105 p-6 flex flex-col border border-gray-300"
                onClick={()=>getinfohandler(profile.id)}
                >
                  <div className='items-center flex flex-col'>
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-32 h-32 rounded-xl object-cover mb-4 border-4 border-white shadow-lg"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-justify">{profile.name}</h2>
                  </div>
                  <p className="text-left text-gray-600 mt-2">{profile.bio}</p>
                  
                  {/* Render skills as SkillBadge */}
                  <div className="mt-4 space-x-2">
                    {profile.skills && profile.skills.length > 0 && profile.skills.map((skill, index) => (
                      <SkillBadge key={index} skill={skill} />
                    ))}
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex w-full items-start gap-2">
                      <FaEnvelope className="text-lg text-gray-600" />
                      <span className="text-gray-700">{profile.email}</span>
                    </div>
                   {
                    profile.phone &&  <div className="flex w-full items-start gap-2">
                    <FaPhone className="text-lg text-gray-600" />
                    <span className="text-gray-700">{profile.phone}</span>
                  </div>
                   }

                    <div className="flex items-center gap-2">
                      <FaBriefcase className="text-lg text-gray-600" />
                      <span className="text-gray-700">{profile.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-lg text-gray-600" />
                      <span className="text-gray-700">{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUserMd className="text-lg text-gray-600" />
                      <span className="text-gray-700">{profile.category}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
