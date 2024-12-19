import React from 'react';
import { FaBuilding } from 'react-icons/fa';


export const CompanyLogo = ({ company, size  }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const iconSizes = {
    small: 16,
    medium: 24,
    large: 32
  };

  return (
    <div className={`${sizeClasses[size]} rounded-lg bg-gray-100 flex items-center justify-center`}>
      <img src={company} size={iconSizes[size]} className="text-gray-600" />

    </div>
  );
};