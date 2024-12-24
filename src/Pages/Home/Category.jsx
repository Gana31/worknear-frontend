import React from "react";

import { FaBroom, FaCouch, FaHammer, FaLightbulb, FaTruck, FaWrench } from "react-icons/fa6";

const CategoryCard = ({ icon: Icon, title, count }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center group hover:scale-105">
    <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-transparent bg-clip-text mb-4 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
      {/* Render the Icon component */}
      <Icon className="w-8 h-8 text-blue-500 group-hover:text-purple-500 transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500">{count} jobs available</p>
  </div>
);


const Categories = () => {
  const categories = [
    { icon: FaWrench, title: "Plumbing", count: "1,500+" },
    { icon: FaHammer, title: "Carpentry", count: "1,200+" },
    { icon: FaCouch, title: "Furniture Assembly", count: "900+" },
    { icon: FaBroom, title: "Cleaning Services", count: "2,000+" },
    { icon: FaTruck, title: "Moving & Delivery", count: "800+" },
    { icon: FaLightbulb, title: "Electrical Work", count: "1,100+" },
  ];
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Categories</h2>
          <p className="text-gray-600">Explore opportunities by category</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
