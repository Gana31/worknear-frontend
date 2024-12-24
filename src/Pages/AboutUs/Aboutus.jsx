import React from 'react';
import { FaChevronDown, FaBullseye, FaHandHoldingHeart, FaLightbulb, FaUsers, FaHandshake, FaTools, FaLinkedin, FaTwitter } from 'react-icons/fa';
import backgroundimg from '../../assets/background.png'
const AboutPage = () => {
  const values = [
    {
      icon: <FaBullseye className="w-8 h-8 text-blue-500" />,
      title: "Our Mission",
      description: "To connect skilled service providers with those who need them, creating opportunities and strengthening local communities."
    },
    {
      icon: <FaHandHoldingHeart className="w-8 h-8 text-blue-500" />,
      title: "Our Values",
      description: "Trust, transparency, and community empowerment are at the heart of everything we do."
    },
    {
      icon: <FaLightbulb className="w-8 h-8 text-blue-500" />,
      title: "Our Vision",
      description: "To be the go-to platform for local services, making it easier for everyone to find reliable help when they need it."
    }
  ];

  const stats = [
    {
      icon: <FaUsers className="w-8 h-8 text-blue-500" />,
      number: "10,000+",
      label: "Active Users"
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-blue-500" />,
      number: "15,000+",
      label: "Jobs Completed"
    },
    {
      icon: <FaTools className="w-8 h-8 text-blue-500" />,
      number: "1,000+",
      label: "Service Providers"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
      bio: "10+ years experience in connecting communities"
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
      bio: "Expert in scaling service platforms"
    },
    {
      name: "Lisa Rodriguez",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
      bio: "Passionate about empowering local service providers"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px]  bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out ">
        <div className="absolute inset-0">
          <img
            src={backgroundimg}
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About WorkConnect</h1>
          <p className="text-xl max-w-2xl">
            Connecting communities through trusted local services since 2020
          </p>
          <FaChevronDown className="absolute bottom-8 w-6 h-6 animate-bounce" />
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Purpose</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're on a mission to revolutionize how people connect with local service providers, making it simpler and more reliable than ever before.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
                <div className="flex justify-center mb-4  text-blue-500 group-hover:text-purple-500 transition-colors duration-300">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
                <div className="flex justify-center mb-4 ">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    <FaLinkedin className="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer" />
                    <FaTwitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
