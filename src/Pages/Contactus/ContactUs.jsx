import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { FiMail, FiUser, FiPhone, FiMessageSquare, FiMapPin, FiClock, FiMessageCircle } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const contactDetails = [
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: 'Our Location',
      info: '123 Service Street, New York, NY 10001',
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Phone Number',
      info: '+1 (555) 123-4567',
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Email Address',
      info: 'contact@workconnect.com',
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: 'Working Hours',
      info: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
        <div className="relative h-[500px]  bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out ">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Ust</h1>
          <p className="text-xl max-w-2xl">
          Have questions or need assistance? We're here to help! Fill out the form below, and our team will get back to you shortly.
          </p>
          <FaChevronDown className="absolute bottom-8 w-6 h-6 animate-bounce" />
        </div>
      </div>
        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-9 px-4 ">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <FiUser className="mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <FiMail className="mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <FiPhone className="mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <FiMessageSquare className="mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <FiMessageSquare className="mr-2 " />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-6">
                {contactDetails.map((detail, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-blue-500 mt-1">{detail.icon}</div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{detail.title}</h4>
                      <p className="text-gray-600">{detail.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ContactPage;