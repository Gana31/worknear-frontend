import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoLayersSharp } from "react-icons/io5";

import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { addCategory, addService, deleteCategory, deleteService } from "../../Slices/categorySlice";


function Category() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const handleAddCategory = (newCategory) => {
    dispatch(addCategory({ name: newCategory.name }));
  };

  const handleAddService = (categoryId, newService) => {
    dispatch(addService({ categoryId, service: newService }));
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  const handleDeleteService = (categoryId, serviceId) => {
    dispatch(deleteService({ categoryId, serviceId }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image */}
      <div className="relative h-48 md:h-64 lg:h-80">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex items-center gap-2 mb-8">
            <IoLayersSharp className="text-3xl text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Job Categories Manager</h1>
          </div>

          {/* Category Form */}
          <CategoryForm onAddCategory={handleAddCategory} />

          {/* Category List or Placeholder */}
          {categories.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg shadow">
              <IoLayersSharp className="mx-auto text-4xl text-gray-400 mb-3" />
              <p className="text-gray-500">No categories yet. Add your first category above!</p>
            </div>
          ) : (
            <CategoryList
              categories={categories}
              onAddService={handleAddService}
              onDeleteCategory={handleDeleteCategory}
              onDeleteService={handleDeleteService}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
