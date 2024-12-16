import React, { useState } from "react";
import { FaEdit, FaMapMarkerAlt, FaLink, FaBriefcase, FaCalendarAlt, FaBuilding, FaTimes, FaPlus, FaTrash, FaUsers, FaLinkedin, FaTwitter, FaSave } from "react-icons/fa";
import EditableField from "./EditableInput";
import SocialLink from "./SocialInput";

function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    logo: "https://via.placeholder.com/150", // Default logo
    coverPhoto: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Default cover photo
    name: "Tech Innovators Inc.",
    bio: "Leading innovators in cutting-edge software and hardware solutions.",
    type: "IT & Software",
    industry: "Technology",
    establishedYear: "2010",
    teamSize: "200+ Employees",
    headquarters: "San Francisco, CA",
    branches: ["New York, USA", "Berlin, Germany"],
    services: "Software Development, Hardware Engineering, Cloud Solutions",
    achievements: [
      "Winner of Best Startup Award 2012",
      "Fortune 500 Listed Company 2020",
    ],
    social: {
      website: "www.techinnovators.com",
      linkedin: "linkedin.com/company/techinnovators",
      twitter: "@techinnovators",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value,
      },
    }));
  };

  const handleAchievementChange = (e, index) => {
    const updatedAchievements = [...companyData.achievements];
    updatedAchievements[index] = e.target.value;
    setCompanyData((prev) => ({
      ...prev,
      achievements: updatedAchievements,
    }));
  };

  const addAchievement = () => {
    setCompanyData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }));
  };

  const deleteAchievement = (index) => {
    const updatedAchievements = companyData.achievements.filter((_, i) => i !== index);
    setCompanyData((prev) => ({
      ...prev,
      achievements: updatedAchievements,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyData((prev) => ({
          ...prev,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Here you would typically send a request to the backend to save the updated data
    console.log("Company data updated:", companyData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally, reset the state to the original company data
    // setCompanyData(originalCompanyData); // Uncomment if you want to reset to the original data
  };

  const handleLogoClick = () => {
    document.getElementById("logoInput").click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="relative h-48 md:h-64 lg:h-80">
        <img src={companyData.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
          {/* Company Logo & Name */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <img
                  src={companyData.logo}
                  alt={companyData.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto md:mx-0 cursor-pointer"
                  onClick={handleLogoClick}
                />
                {isEditing && (
                  <input
                    id="logoInput"
                    type="file"
                    onChange={handleLogoChange}
                    className="hidden"
                    accept="image/*"
                  />
                )}
              </div>
              <div className="text-center md:text-left pt-2">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={companyData.name}
                      onChange={handleInputChange}
                      className="text-2xl font-bold w-full border rounded-md p-2"
                    />
                  </div>
                ) : (
                  <h1 className="text-2xl font-bold">{companyData.name}</h1>
                )}
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors w-full md:w-auto"
              >
                <FaEdit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {/* Editable Fields */}
          <div className="space-y-1 divide-y mt-5">
            <EditableField
              label="Bio"
              name="bio"
              value={companyData.bio}
              icon={FaBriefcase}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
              multiline
            />
            <EditableField
              label="Company Type"
              name="type"
              value={companyData.type}
              icon={FaBuilding}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Industry"
              name="industry"
              value={companyData.industry}
              icon={FaBriefcase}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Established Year"
              name="establishedYear"
              value={companyData.establishedYear}
              icon={FaCalendarAlt}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Team Size"
              name="teamSize"
              value={companyData.teamSize}
              icon={FaUsers}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
            <EditableField
              label="Headquarters"
              name="headquarters"
              value={companyData.headquarters}
              icon={FaMapMarkerAlt}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          </div>

          {/* Achievements Section */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            {companyData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => handleAchievementChange(e, index)}
                      className="flex-1 border rounded-md p-2"
                    />
                    <button onClick={() => deleteAchievement(index)} className="text-red-500">
                      <FaTrash />
                    </button>
                  </>
                ) : (
                  <p>{achievement}</p>
                )}
              </div>
            ))}
            {isEditing && (
              <button onClick={addAchievement} className="text-blue-600 flex items-center gap-2">
                <FaPlus />
                Add Achievement
              </button>
            )}
          </div>

          {/* Social Links */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <SocialLink
              platform="website"
              icon={FaLink}
              value={companyData.social.website}
              isEditing={isEditing}
              handleSocialChange={handleSocialChange}
            />
            <SocialLink
              platform="linkedin"
              icon={FaLinkedin}
              value={companyData.social.linkedin}
              isEditing={isEditing}
              handleSocialChange={handleSocialChange}
            />
            <SocialLink
              platform="twitter"
              icon={FaTwitter}
              value={companyData.social.twitter}
              isEditing={isEditing}
              handleSocialChange={handleSocialChange}
            />
          </div>

          {/* Buttons (Cancel and Save) */}
          {isEditing && (
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <FaSave className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyProfilePage;
