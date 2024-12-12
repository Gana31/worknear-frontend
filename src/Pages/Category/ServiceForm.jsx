import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';

const ServiceForm = ({ onAddService }) => {
  const [serviceName, setServiceName] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (serviceName.trim() ) {
      onAddService({
        id: Date.now(),
        name: serviceName,
      });
      setServiceName('');
    
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        placeholder="Service name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                rounded-lg shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
      >
        <IoAdd className="text-xl" />
        Add Service
      </button>
    </form>
  );
};

export default ServiceForm;