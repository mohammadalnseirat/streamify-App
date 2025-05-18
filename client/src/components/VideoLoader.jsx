import React from 'react';

const VideoLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px] w-full">
      <div>
        <div className="relative w-20 h-20 animate-pulse">
          {/* Video icon border */}
          <div className="absolute inset-0 border-4 border-blue-500 rounded-xl"></div>
          {/* Play triangle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-0 h-0 border-solid border-transparent border-t-[20px] border-b-[20px] border-l-[35px] border-l-blue-500"></div>
          </div>
        </div>
        <p className="mt-5 text-gray-600 text-base text-center">Loading video...</p>
      </div>
    </div>
  );
};

export default VideoLoader;
