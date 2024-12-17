import React from 'react';
import { IoTrash, IoCreate } from 'react-icons/io5';

const CategoryList = ({ categories, onDeleteCategory, onEditCategory }) => {
  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEditCategory(category)}
                className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors"
              >
                <IoCreate className="text-xl" />
              </button>
              <button
                onClick={() => onDeleteCategory(category.id)} // Ensure only the clicked category is deleted
                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
              >
                <IoTrash className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
