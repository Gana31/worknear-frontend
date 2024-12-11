import React, { useState } from 'react';
import {
  FaEdit,
  FaMapMarkerAlt,
  FaLink,
  FaCalendarAlt,
  FaUsers,
  FaBriefcase,
  FaCertificate,
  FaClock,
  FaCode,
  FaSave,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa';
import { useSelector } from 'react-redux';

function ProfilePage() {
    const {user} = useSelector((state)=>state.auth)
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
    social: {
      github: "github.com/sarahanderson",
      linkedin: "linkedin.com/in/sarahanderson",
      twitter: "@sarahanderson"
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value
      }
    }));
  };

  const EditableField = ({ label, name, value, icon: Icon, multiline = false }) => {
    return (
      <div className="group relative flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <Icon className="mt-1 text-gray-500 w-5 h-5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          {isEditing ? (
            multiline ? (
              <textarea
                name={name}
                value={value}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            ) : (
              <input
                type="text"
                name={name}
                value={value}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )
          ) : (
            <p className="mt-1 text-gray-800 break-words">{value}</p>
          )}
        </div>
      </div>
    );
  };

  const StatCard = ({ value, label }) => (
    <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
      <div className="text-xl font-bold text-gray-900">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );

  const SocialLink = ({ platform, icon: Icon, value, onChange }) => (
    <div className="flex items-center gap-3 p-2">
      <Icon className="text-gray-600 w-5 h-5" />
      {isEditing ? (
        <input
          type="text"
          name={platform}
          value={value}
          onChange={onChange}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <a
          href={`https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="relative h-48 md:h-64 lg:h-80">
        <img
          src={profileData.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto md:mx-0"
              />
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

          {/* Profile Fields */}
          <div className="space-y-1 divide-y mt-5">
            <EditableField
              label="Bio"
              name="bio"
              value={profileData.bio}
              icon={FaUsers}
              multiline={true}
            />
            <EditableField
              label="Location"
              name="location"
              value={profileData.location}
              icon={FaMapMarkerAlt}
            />
            <EditableField
              label="Website"
              name="website"
              value={profileData.website}
              icon={FaLink}
            />
            <EditableField
              label="Expertise"
              name="expertise"
              value={profileData.expertise}
              icon={FaCode}
            />
            <EditableField
              label="Services"
              name="services"
              value={profileData.services}
              icon={FaBriefcase}
            />
            <EditableField
              label="Availability"
              name="availability"
              value={profileData.availability}
              icon={FaClock}
            />
            <EditableField
              label="Experience"
              name="experience"
              value={profileData.experience}
              icon={FaBriefcase}
            />
            <EditableField
              label="Certifications"
              name="certifications"
              value={profileData.certifications}
              icon={FaCertificate}
            />
          </div>

          {/* Social Links */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="space-y-2">
              <SocialLink
                platform="github"
                icon={FaGithub}
                value={profileData.social.github}
                onChange={handleSocialChange}
              />
              <SocialLink
                platform="linkedin"
                icon={FaLinkedin}
                value={profileData.social.linkedin}
                onChange={handleSocialChange}
              />
              <SocialLink
                platform="twitter"
                icon={FaTwitter}
                value={profileData.social.twitter}
                onChange={handleSocialChange}
              />
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaSave className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;