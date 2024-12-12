// SocialLink.js
import React from "react";

const SocialLink = React.memo(({ platform, icon: Icon, value, isEditing, handleSocialChange }) => (
  <div className="md:flex items-center w-full gap-3  p-2">
    <Icon className="text-gray-600 w-5 h-5 mb-2" />
    {isEditing ? (
      <input
        type="text"
        name={platform}
        value={value}
        onChange={handleSocialChange}
        className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <a
        href={`https://${value}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {value}
      </a>
    )}
  </div>
));

export default SocialLink;
