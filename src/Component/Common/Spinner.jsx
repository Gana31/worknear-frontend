import React from "react";

const LoadingSpinner = ({
  size = "w-8 h-8",
  color = "blue",
}) => {
  return (
    <div className="spinner-container w-full h-full flex items-center justify-center">
      <div
        className={`${size} border-4 border-solid rounded-full animate-spin`}
        style={{
          borderTopColor: color,
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;