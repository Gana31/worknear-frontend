import React, { useState } from "react";
import { FaEdit, FaMapMarkerAlt, FaLink, FaUsers, FaBriefcase, FaClock, FaCertificate, FaCode, FaSave, FaTimes, FaGithub, FaLinkedin, FaTwitter, FaCalendarAlt, FaTrash, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import EditableField from "./EditableInput";
import SocialLink from "./SocialInput";

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Sarah Anderson",
    role: "Senior Frontend Developer",
    bio: "Passionate about creating beautiful and intuitive user interfaces. Specialized in React ecosystem and modern web technologies.",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    coverPhoto: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    location: "San Francisco, CA",
    website: "www.sarahanderson.dev",
    joinDate: "January 2024",
    expertise: "React, JavaScript, Next.js, Tailwind CSS",
    services: "Frontend Development, UI/UX Design, Performance Optimization",
    availability: "Open to opportunities",
    experience: "8+ years",
    certifications: "AWS Certified Developer, Google Cloud Professional",
    education: [
      { college: "Harvard University", marks: "3.8 GPA", branch: "Computer Science", passedYear: "2023" },
      { college: "MIT", marks: "4.0 GPA", branch: "Software Engineering", passedYear: "2020" },
    ],
    social: {
      github: "github.com/sarahanderson",
      linkedin: "linkedin.com/in/sarahanderson",
      twitter: "@sarahanderson",
    },
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const img_urls = [
    "https://res.cloudinary.com/dnyhn7loo/image/upload/v1732534321/profile_images/g1xzno2gegyixplrqky2.webp",
    "https://res.cloudinary.com/dnyhn7loo/image/upload/v1732534320/profile_images/xyrs8o9vgo8qjhz1dlaw.webp",
    "https://res.cloudinary.com/dnyhn7loo/image/upload/v1732534320/profile_images/lhwlf42g7q5wzqafrkfu.webp",
    "https://res.cloudinary.com/dnyhn7loo/image/upload/v1732534320/profile_images/mzsr5qkbppzbix9xl89w.webp",
    "https://res.cloudinary.com/dnyhn7loo/image/upload/v1732534320/profile_images/kpt4t3bkjkvi63gtaduy.webp",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value,
      },
    }));
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducation = [...profileData.education];
    updatedEducation[index][name] = value;
    setProfileData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  const addEducation = () => {
    setProfileData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { college: "", marks: "", branch: "", passedYear: "" },
      ],
    }));
  };

  const deleteEducation = (index) => {
    const updatedEducation = profileData.education.filter((_, i) => i !== index);
    setProfileData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  const editableFields = [
    { label: "Bio", name: "bio", icon: FaUsers, multiline: true },
    { label: "Location", name: "location", icon: FaMapMarkerAlt },
    { label: "Website", name: "website", icon: FaLink },
    // { label: "Expertise", name: "expertise", icon: FaCode },
    // { label: "Services", name: "services", icon: FaBriefcase },
    { label: "Availability", name: "availability", icon: FaClock },
    { label: "Experience", name: "experience", icon: FaBriefcase },
    { label: "Certifications", name: "certifications", icon: FaCertificate },
  ];

  const socialLinks = [
    { platform: "github", icon: FaGithub, value: profileData.social.github },
    { platform: "linkedin", icon: FaLinkedin, value: profileData.social.linkedin },
    { platform: "twitter", icon: FaTwitter, value: profileData.social.twitter },
  ];

  const handleProfileImageChange = (imageUrl) => {
    setProfileData((prev) => ({
      ...prev,
      avatar: imageUrl,
    }));
    setIsDropdownOpen(false); // Close dropdown after selecting image
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-48 md:h-64 lg:h-80">
        <img src={profileData.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
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
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto md:mx-0 cursor-pointer"
                  onClick={() => isEditing ? setIsDropdownOpen(!isDropdownOpen) : null}
                />
                {isDropdownOpen && (
                  <div className="absolute flex bg-white border rounded-md shadow-lg w-auto lg:w-[300px] mt-2 z-10">
                    {img_urls.map((url, index) => (
                      <div
                        key={index}
                        className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
                        onClick={() => handleProfileImageChange(url)}
                      >
                        <img src={url} alt={`Profile option ${index + 1}`} className="w-8 h-8 rounded-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-center md:text-left pt-2">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="text-2xl font-bold w-full border rounded-md p-2"
                    />
                    <input
                      type="text"
                      name="role"
                      value={profileData.role}
                      onChange={handleInputChange}
                      className="text-gray-600 w-full border rounded-md p-2"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold">{profileData.name}</h1>
                    <p className="text-gray-600">{profileData.role}</p>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors w-full md:w-auto"
            >
              {isEditing ? (
                <>
                  <FaTimes className="w-4 h-4" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <FaEdit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-1 divide-y mt-5">
            {editableFields.map((field) => (
              <EditableField
                key={field.name}
                label={field.label}
                name={field.name}
                value={profileData[field.name]}
                icon={field.icon}
                isEditing={isEditing}
                handleInputChange={handleInputChange}
                multiline={field.multiline}
              />
            ))}
          </div>

          {/* Education Section */}
          <div className="mt-6  rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            {profileData.education.map((education, index) => (
              <div key={index} className="space-y-2 mb-4 bg-gray-50 rounded-md">
                <h3 className="text-lg px-3 font-semibold mb-4 pt-3">Collage {index + 1}</h3>
                <EditableField
                  label="College Name"
                  name="college"
                  value={education.college}
                  icon={FaUsers}
                  isEditing={isEditing}
                  handleInputChange={(e) => handleEducationChange(e, index)}
                />
                <EditableField
                  label="Marks"
                  name="marks"
                  value={education.marks}
                  icon={FaCertificate}
                  isEditing={isEditing}
                  handleInputChange={(e) => handleEducationChange(e, index)}
                />
                <EditableField
                  label="Branch"
                  name="branch"
                  value={education.branch}
                  icon={FaCode}
                  isEditing={isEditing}
                  handleInputChange={(e) => handleEducationChange(e, index)}
                />
                <EditableField
                  label="Passed Year"
                  name="passedYear"
                  value={education.passedYear}
                  icon={FaCalendarAlt}
                  isEditing={isEditing}
                  handleInputChange={(e) => handleEducationChange(e, index)}
                />
                {isEditing && (
                  <button
                    onClick={() => deleteEducation(index)}
                    className="flex items-center gap-2 text-red-500 mt-2"
                  >
                    <FaTrash className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addEducation}
                className="flex items-center gap-2 text-blue-600 mt-4"
              >
                <FaPlus className="w-4 h-4" />
                <span>Add New College</span>
              </button>
            )}
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.platform}
                  platform={link.platform}
                  icon={link.icon}
                  value={link.value}
                  isEditing={isEditing}
                  handleSocialChange={handleSocialChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
