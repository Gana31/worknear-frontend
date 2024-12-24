import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaLink,
  FaUsers,
  FaBriefcase,
  FaCertificate,
  FaCode,
  FaCalendarAlt,
  FaTag,
  FaCity,
} from "react-icons/fa";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { setLoading } from "../../Slices/authSlice";
import { useLocation } from "react-router-dom";
import apiClient from "../../Services/ApiConnector";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../Component/Common/Spinner";

function CompanyProfilePage() {
  const location = useLocation();
  const {loading} = useSelector((state)=>state.auth)
  const coverPhoto = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  const [profileData , setProfileData] = useState({
    name: "",
    role: "",
    bio: "",
    avatar: "",
    location: "",
    website: "",
    joinDate: "",
    city: "",
    category: [],
    services: "",
    availability: "",
    experience: "",
    education: [ ],
    social: { },
  })


  useEffect(() => {
    // console.log(location.state)
    if(location.state && location.state.jobid){
      fetchProfile();
    }
    async function fetchProfile() {
        setLoading(true)
        try {
            const response = await apiClient.post("/getuserprofile",{id:location.state.jobid});
            const data = response.data.data
            setProfileData(data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

}, [location.state]);

if(loading){
  return <div className="w-[100%] h-[100%]"> <LoadingSpinner/></div>
}
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-48 md:h-64 lg:h-80">
        <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto md:mx-0"
                />
              </div>
              <div className="text-center md:text-left pt-2">
                <h1 className="text-2xl font-bold"><span className="font-bold text-black mr-2">Name: </span>{profileData.name}</h1>
               {profileData.role &&  <p className="text-gray-600 "><span className="font-bold text-black mr-2">Role: </span>{profileData.role}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-5">
            <div className="flex items-center gap-4 p-3">
              <FaUsers className="text-gray-500 w-5 h-5" />
              <p className="text-gray-600 w-[100%] text-wrap"><span className="font-bold text-black mr-4">Bio: </span>{profileData.bio}</p>
            </div>
            <div className="flex items-center gap-4 p-3">
              <FaMapMarkerAlt className="text-gray-500 w-5 h-5" />
              <p className="text-gray-600"><span className="font-bold text-black mr-4">Location: </span>{profileData.location}</p>
            </div>
            <div className="flex items-center gap-4 p-3">
              <FaCity className="text-gray-500 w-5 h-5" />
              <p className="text-gray-600"><span className="font-bold text-black mr-4">City: </span>{profileData.city}</p>
            </div>
            <div className="flex items-center gap-4 p-3">
              <FaLink className="text-gray-500 w-5 h-5" />
              <p className="text-gray-600"><span className="font-bold text-black mr-4">Website: </span>{profileData.website}</p>
            </div>
            <div className="flex items-center gap-4 p-3">
              <FaBriefcase className="text-gray-500 w-5 h-5" />
              <p className="text-gray-600"> <span className="font-bold text-black mr-4">Experience: </span>{profileData.experience}</p>
            </div>
            <div className="flex items-center gap-4 p-3">
              <FaCalendarAlt className="text-gray-500 w-5 h-5" />
              <p className="text-gray-600"><span className="font-bold text-black mr-4">Availability: </span>{profileData.availability}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaTag className="text-gray-500" />
              <span className="font-bold text-black mr-4">Categories</span>
            </h3>
            <div className="flex flex-wrap gap-2 mt-2 text-black">
              {profileData.category.map((categoryName, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm flex items-center gap-1"
                >
                  {categoryName}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            {profileData.education.map((education, index) => (
              <div key={index} className="space-y-4 mb-4 p-7  bg-gray-100 rounded-lg">
                <p className="text-gray-600">  <span className=" font-bold text-black mr-4">College: </span>{education.college}</p>
                <p className="text-gray-600">  <span className=" font-bold text-black mr-4">Marks: </span> {education.marks}</p>
                <p className="text-gray-600"> <span className=" font-bold text-black mr-4"> Branch: </span>{education.branch}</p>
                <p className="text-gray-600"> <span className=" font-bold text-black mr-4">Passed Year:  </span>{education.passedYear}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <FaGithub className="text-gray-500 w-5 h-5" />
                <p className="text-gray-600"> <span className=" font-bold text-black mr-4">GitHub: </span>{profileData.social.github}</p>
              </div>
              <div className="flex items-center gap-4">
                <FaLinkedin className="text-gray-500 w-5 h-5" />
                <p className="text-gray-600"><span className=" font-bold text-black mr-4">LinkedIn: </span> {profileData.social.linkedin}</p>
              </div>
              <div className="flex items-center gap-4">
                <FaTwitter className="text-gray-500 w-5 h-5" />
                <p className="text-gray-600"> <span className=" font-bold text-black mr-4">Twitter: </span> {profileData.social.twitter}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfilePage;
