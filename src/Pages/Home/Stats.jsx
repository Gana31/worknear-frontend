import React from 'react';
import { FaUsers, FaBriefcase, FaBuilding } from 'react-icons/fa';

const StatCard = ({ icon: Icon, number, label }) => (
  <div className="text-center">
    <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
      <Icon className="w-8 h-8" />
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const Stats = () => {
  const stats = [
    { icon: FaUsers, number: "1M+", label: "Active Users" },
    { icon: FaBriefcase, number: "100K+", label: "Jobs Posted" },
    { icon: FaBuilding, number: "50K+", label: "Companies" }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;