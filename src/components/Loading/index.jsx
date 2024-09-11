import React from "react";
const Loading = () => {
  return (
    <div className="absolute z-50  min-h-screen inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <span className="loading loading-spinner loading-lg text-orange-400"></span>
    </div>
  );
};

export default Loading;
