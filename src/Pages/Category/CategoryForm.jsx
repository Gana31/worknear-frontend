import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';

const CategoryForm = ({ onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onAddCategory({
        id: Date.now(),
        name: categoryName,
        services: []
      });
      setCategoryName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                rounded-lg shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
        >
          <IoAdd className="text-xl" />
          Add Category
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;