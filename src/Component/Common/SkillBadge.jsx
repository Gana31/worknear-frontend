import React from 'react';

const SkillBadge = ({ skill }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
      {skill}
    </span>
  );
};

export default SkillBadge;