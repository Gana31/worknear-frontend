// EditableField.js
import React from "react";

const EditableField = ({ label, name, value, icon: Icon, isEditing, handleInputChange, multiline = false }) => {
  return (
    <div className="group relative flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <Icon className="mt-1 text-gray-500 w-5 h-5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        {isEditing ? (
          multiline ? (
            <textarea
              name={name}
              value={value}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <input
              type="text"
              name={name}
              value={value}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )
        ) : (
          <p className="mt-1 text-gray-800 break-words">{value}</p>
        )}
      </div>
    </div>
  );
};

export default EditableField;
