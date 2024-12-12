import React from 'react';
import { IoTrash, IoCodeWorking } from 'react-icons/io5';
import ServiceForm from './ServiceForm';


const CategoryList = ({ categories, onAddService, onDeleteCategory, onDeleteService }) => {
  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <IoCodeWorking className="text-2xl text-blue-500" />
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </div>
            <button
              onClick={() => onDeleteCategory(category.id)}
              className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
            >
              <IoTrash className="text-xl" />
            </button>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Services</h3>
            <div className="space-y-2">
              {category.services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                  </div>
                  <button
                    onClick={() => onDeleteService(category.id, service.id)}
                    className="p-1.5 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <IoTrash className="text-lg" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-2">Add New Service</h3>
            <ServiceForm
              onAddService={(service) => onAddService(category.id, service)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList