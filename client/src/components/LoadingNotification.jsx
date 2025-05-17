import React from "react";

const LoadingNotification = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center py-10">
      <div className="w-10 h-10 border-t-2 border-b-2 border-t-primary border-b-secondary rounded-full animate-spin"></div>
      <p className="text-lg text-gray-500">Loading...</p>
    </div>
  );
};

export default LoadingNotification;
